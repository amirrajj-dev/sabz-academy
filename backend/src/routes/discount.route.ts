import express from 'express'
import { createDiscount, DeleteDiscount, getAllDiscounts } from '../controllers/discount.controller';
import { protectRouteAdmin } from '../middlewares/authMiddleware';

const router = express.Router()
router.get('/' , getAllDiscounts as express.RequestHandler)
router.post('/' , protectRouteAdmin as express.RequestHandler , createDiscount as express.RequestHandler)
router.delete('/:id' , protectRouteAdmin as express.RequestHandler , DeleteDiscount as express.RequestHandler)

export default router;