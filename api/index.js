import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import orderRoutes from './routes/sales.routes.js';
import 'dotenv/config'

const app = express();
app.use(cors())
app.use(express.json())
const port = process.env.PORT || 5000;


// Correct the connection string
const mongoURI = process.env.MONGODB_URL;

mongoose.connect(mongoURI)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB: ", error);
    });


    app.use('/api', orderRoutes);

app.listen(port, () => {
    console.log(`Server is live on port: ${port}`);
});
