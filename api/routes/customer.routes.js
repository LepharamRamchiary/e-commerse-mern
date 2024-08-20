import express from "express";
import { getNewCustomersOverTime, getRepeatCustomersOverTime } from "../controllers/customer.controller.js"

const router = express.Router()

router.get('/new-customers-over-time', getNewCustomersOverTime);
router.get('/repeat-customers-over-time', getRepeatCustomersOverTime);

export default router