import express from 'express'
import { cancelCampaigan, createCampaigan, createDiscount, DeleteDiscount, getAllDiscounts } from '../controllers/discount.controller';
import { protectRouteAdmin } from '../middlewares/authMiddleware';

const router = express.Router()
router.get('/' , getAllDiscounts as express.RequestHandler)
router.post('/' , protectRouteAdmin as express.RequestHandler , createDiscount as express.RequestHandler)
router.delete('/:id' , protectRouteAdmin as express.RequestHandler , DeleteDiscount as express.RequestHandler)
router.post('/apply-camp' , protectRouteAdmin as express.RequestHandler , createCampaigan as express.RequestHandler)
router.post('/cancel-camp' ,  protectRouteAdmin as express.RequestHandler , cancelCampaigan as express.RequestHandler)

export default router;