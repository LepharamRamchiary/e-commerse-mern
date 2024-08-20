import express from "express";
import { getNewCustomersOverTime, getRepeatCustomersOverTime, getGeographicalDistribution } from "../controllers/customer.controller.js"

const router = express.Router()

router.get('/new-customers-over-time', getNewCustomersOverTime);
router.get('/repeat-customers-over-time', getRepeatCustomersOverTime);
router.get('/geographical-distribution', getGeographicalDistribution);

export default router