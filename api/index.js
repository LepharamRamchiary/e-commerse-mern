import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import orderRoutes from './routes/sales.routes.js';

const app = express();
app.use(cors())
app.use(express.json())
const port = 5000;


// Correct the connection string
const mongoURI = "mongodb+srv://db_user_read:LdmrVA5EDEv4z3Wr@cluster0.n10ox.mongodb.net/RQ_Analytics?retryWrites=true&w=majority&appName=Cluster0";

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
