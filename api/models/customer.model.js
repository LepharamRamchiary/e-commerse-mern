import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({}, { strict: false });

export const ShopifyCustomer = mongoose.model('shopifyCustomer', customerSchema, 'shopifyCustomers');