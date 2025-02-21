import express from 'express'
import { signin, signout, signup } from '../controllers/auth.controller'

const router = express.Router()


router.post('/signup', signup as express.RequestHandler);
router.post('/signin' , signin as express.RequestHandler);
router.get('/signout' , signout as express.RequestHandler);

export default router;