import mongoose from "mongoose";


const orderSchema = new mongoose.Schema({}, { strict: false });


export const ShopifyOrder = mongoose.model('shopifyOrder', orderSchema, 'shopifyOrders');