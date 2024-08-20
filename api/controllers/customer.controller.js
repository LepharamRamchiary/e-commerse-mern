import { ShopifyCustomer } from '../models/customer.model.js';
import { ShopifyOrder } from '../models/order.model.js';

export const getNewCustomersOverTime = async (req, res) => {
    try {
        const interval = req.query.interval || 'monthly';

        const groupBy = {
            daily: {
                year: { $year: { $toDate: "$created_at" } },
                month: { $month: { $toDate: "$created_at" } },
                day: { $dayOfMonth: { $toDate: "$created_at" } }
            },
            monthly: {
                year: { $year: { $toDate: "$created_at" } },
                month: { $month: { $toDate: "$created_at" } }
            },
            yearly: {
                year: { $year: { $toDate: "$created_at" } }
            }
        }[interval];

        const newCustomers = await ShopifyCustomer.aggregate([
            {
                $project: {
                    created_at: { $toDate: "$created_at" }
                }
            },
            {
                $group: {
                    _id: groupBy,
                    newCustomersCount: { $sum: 1 }
                }
            },
            { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } }
        ]);

        res.json(newCustomers);
    } catch (error) {
        res.status(500).send(error.message);
    }
};


export const getRepeatCustomersOverTime = async (req, res) => {
    try {
        const interval = req.query.interval || 'monthly';

        const groupBy = {
            daily: {
                year: { $year: { $toDate: "$created_at" } },
                month: { $month: { $toDate: "$created_at" } },
                day: { $dayOfMonth: { $toDate: "$created_at" } }
            },
            monthly: {
                year: { $year: { $toDate: "$created_at" } },
                month: { $month: { $toDate: "$created_at" } }
            },
            quarterly: {
                year: { $year: { $toDate: "$created_at" } },
                quarter: { $ceil: { $divide: [{ $month: { $toDate: "$created_at" } }, 3] } }
            },
            yearly: {
                year: { $year: { $toDate: "$created_at" } }
            }
        }[interval];

        const customerPurchases = await ShopifyOrder.aggregate([
            {
                $group: {
                    _id: {
                        customerId: "$customer.id",
                        period: groupBy
                    },
                    purchaseCount: { $sum: 1 }
                }
            },
            {
                $match: {
                    purchaseCount: { $gt: 1 }
                }
            },
            {
                $group: {
                    _id: "$_id.period",
                    repeatCustomersCount: { $sum: 1 }
                }
            },
            { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1, "_id.quarter": 1 } }
        ]);

        res.json(customerPurchases);
    } catch (error) {
        res.status(500).send(error.message);
    }
};


export const getGeographicalDistribution = async (req, res) => {
    try {
        const cityDistribution = await ShopifyCustomer.aggregate([
            {
                $group: {
                    _id: "$default_address.city",
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { count: -1 }
            }
        ]);

        res.json(cityDistribution);
    } catch (error) {
        res.status(500).send(error.message);
    }
};



export const getCLVByCohorts = async (req, res) => {
    try {
        const clvByCohorts = await ShopifyOrder.aggregate([
            {
                $addFields: {
                    createdAtDate: {
                        $dateFromString: { dateString: "$created_at" }
                    }
                }
            },
            {
                $sort: { "customer.id": 1, "createdAtDate": 1 }
            },
            {
                $group: {
                    _id: "$customer.id",
                    firstPurchaseDate: { $first: "$createdAtDate" },
                    totalCLV: { $sum: { $toDouble: "$total_price" } }
                }
            },
            {
                $group: {
                    _id: {
                        year: { $year: "$firstPurchaseDate" },
                        month: { $month: "$firstPurchaseDate" }
                    },
                    cohortCLV: { $sum: "$totalCLV" },
                    customerCount: { $sum: 1 }
                }
            },

            {
                $sort: { "_id.year": 1, "_id.month": 1 }
            },

            {
                $project: {
                    _id: 0,
                    year: "$_id.year",
                    month: "$_id.month",
                    cohortCLV: 1,
                    customerCount: 1
                }
            }
        ]);

        res.status(200).json(clvByCohorts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while calculating CLV by cohorts' });
    }
};
