import express from 'express'
import { createDiscount, DeleteDiscount } from '../controllers/discount.controller';
import { protectRouteAdmin } from '../middlewares/authMiddleware';

const router = express.Router()

router.post('/' , protectRouteAdmin as express.RequestHandler , createDiscount)
router.delete('/:id' , protectRouteAdmin as express.RequestHandler , DeleteDiscount)

export default router;