import { ShopifyCustomer } from '../models/customer.model.js';

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
                    created_at: { $toDate: "$created_at" } // Ensure the date is in the correct format
                }
            },
            {
                $group: {
                    _id: groupBy,
                    newCustomersCount: { $sum: 1 } // Count the number of new customers
                }
            },
            { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } }
        ]);

        res.json(newCustomers);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
