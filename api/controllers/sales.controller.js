import { ShopifyOrder } from '../models/order.model.js';

export const getSalesOverTime = async (req, res) => {
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

        const sales = await ShopifyOrder.aggregate([
            {
                $group: {
                    _id: groupBy,
                    totalSales: { $sum: { $toDouble: "$total_price" } }
                }
            },
            { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1, "_id.quarter": 1 } }
        ]);

        res.json(sales);
    } catch (error) {
        res.status(500).send(error.message);
    }
};


export const getSalesGrowthRate = async (req, res) => {
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

        const salesData = await ShopifyOrder.aggregate([
            {
                $project: {
                    totalPrice: { $toDouble: "$total_price_set.shop_money.amount" }, // Convert to number
                    created_at: { $toDate: "$created_at" }
                }
            },
            {
                $group: {
                    _id: groupBy,
                    totalSales: { $sum: "$totalPrice" }
                }
            },
            { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1, "_id.quarter": 1 } }
        ]);

        // Calculate growth rate
        const growthRate = salesData.map((data, index, array) => {
            if (index === 0) return { ...data, growthRate: 0 }; 
            const previousTotalSales = array[index - 1].totalSales;
            if (previousTotalSales === 0) return { ...data, growthRate: 0 }; 
            const growth = ((data.totalSales - previousTotalSales) / previousTotalSales) * 100;
            return { ...data, growthRate: growth.toFixed(2) };
        });

        res.json(growthRate);
    } catch (error) {
        res.status(500).send(error.message);
    }
};