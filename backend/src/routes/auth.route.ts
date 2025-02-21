import express from 'express'
import { signin, signout, signup } from '../controllers/auth.controller'

const router = express.Router()


router.post('/signup', signup as express.RequestHandler);
router.post('/sigin' , signin)
router.get('/signout' , signout)

export default router;