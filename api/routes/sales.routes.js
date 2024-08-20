import express from 'express';
import { getSalesOverTime, getSalesGrowthRate } from '../controllers/sales.controller.js';

const router = express.Router();

router.get('/sales-over-time', getSalesOverTime);
router.get('/sales-growth-rate', getSalesGrowthRate);

export default router;
