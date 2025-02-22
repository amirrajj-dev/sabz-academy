import express from 'express'
import { protectRoute, protectRouteAdmin } from '../middlewares/authMiddleware';
import { getAllUsers , banUser ,  changeUserRole , getUserCourses  , deleteUser , updateUser} from '../controllers/user.controller';

const router = express.Router()

router.get('/' , protectRouteAdmin as express.RequestHandler ,  getAllUsers as express.RequestHandler)
router.put('/' , protectRoute as express.RequestHandler , updateUser as express.RequestHandler)
router.delete('/:id' , protectRouteAdmin as express.RequestHandler , deleteUser as express.RequestHandler)
router.put('/ban/:id' , protectRouteAdmin as express.RequestHandler , banUser as express.RequestHandler)
router.get('/courses' , protectRoute as express.RequestHandler , getUserCourses as express.RequestHandler)
router.put('/role/:id' , protectRouteAdmin as express.RequestHandler , changeUserRole as express.RequestHandler)

export default router;