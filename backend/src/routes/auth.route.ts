import express from 'express'
import { signin, signout, signup , getMe } from '../controllers/auth.controller'
import { protectRoute } from '../middlewares/authMiddleware';

const router = express.Router()


router.post('/signup', signup as express.RequestHandler);
router.post('/signin' , signin as express.RequestHandler);
router.get('/signout' , signout as express.RequestHandler);
router.get('/me' , protectRoute as express.RequestHandler , getMe as express.RequestHandler)

export default router;