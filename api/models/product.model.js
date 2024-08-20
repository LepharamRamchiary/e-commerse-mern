import mongoose from "mongoose";

const productSchema = new mongoose.Schema({}, { strict: false });

export const ShopifyProduct = mongoose.model('shopifyProduct', productSchema, 'shopifyProducts');