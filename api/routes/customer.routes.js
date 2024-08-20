import express from "express";
import { getNewCustomersOverTime, getRepeatCustomersOverTime, getGeographicalDistribution, getCLVByCohorts } from "../controllers/customer.controller.js"

const router = express.Router()

router.get('/new-customers-over-time', getNewCustomersOverTime);
router.get('/repeat-customers-over-time', getRepeatCustomersOverTime);
router.get('/geographical-distribution', getGeographicalDistribution);
router.get('/clv-by-cohorts', getCLVByCohorts);

export default router