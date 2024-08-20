import express from "express";
import { getNewCustomersOverTime } from "../controllers/customer.controller.js"

const router = express.Router()

router.get('/new-customers-over-time', getNewCustomersOverTime);

export default router