import express from 'express'
import { signin, signout, signup , getMe , forgotPassword , resetPassword , changePassword } from '../controllers/auth.controller'
import { protectRoute } from '../middlewares/authMiddleware';

const router = express.Router()


router.post('/signup', signup as express.RequestHandler);
router.post('/signin' , signin as express.RequestHandler);
router.get('/signout' , signout as express.RequestHandler);
router.get('/me' , protectRoute as express.RequestHandler , getMe as express.RequestHandler as express.RequestHandler)
router.post('/change-password' , protectRoute as express.RequestHandler , changePassword as express.RequestHandler)

router.post('/forgot-password', forgotPassword as express.RequestHandler);
router.post('/reset-password/:token', resetPassword as express.RequestHandler);

export default router;