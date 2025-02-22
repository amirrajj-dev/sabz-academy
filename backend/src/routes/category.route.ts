import express from 'express'
import { protectRouteAdmin } from '../middlewares/authMiddleware'
import { getAllCategories , createCategory , deleteCategory , updateCategory } from '../controllers/category.controller'

const router = express.Router()

router.get('/' , getAllCategories as express.RequestHandler)
router.post('/' , protectRouteAdmin as express.RequestHandler , createCategory as express.RequestHandler)
router.delete('/:id' , deleteCategory as express.RequestHandler)
router.put('/' , protectRouteAdmin as express.RequestHandler , updateCategory as express.RequestHandler)
export default router;