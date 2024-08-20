import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import orderRoutes from './routes/sales.routes.js';
import customerRoutes from './routes/customer.routes.js';
import 'dotenv/config'
// import { ShopifyCustomer } from "./models/customer.model.js"

const app = express();
app.use(cors())
app.use(express.json())
const port = process.env.PORT || 5000;


// Correct the connection string
const mongoURI = process.env.MONGODB_URL;

mongoose.connect(mongoURI)
    .then(() => {
        console.log("Connected to MongoDB");

        // Fetch data from shopifyCustomers collection
        // ShopifyCustomer.find()
        //     .then((customers) => {
        //         console.log('Customers:', customers);
        //     })
        //     .catch((error) => {
        //         console.error('Error fetching customers:', error);
        //     });
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB: ", error);
    });


app.use('/api/sales', orderRoutes);
app.use('/api/customers', customerRoutes)

app.listen(port, () => {
    console.log(`Server is live on port: ${port}`);
});
