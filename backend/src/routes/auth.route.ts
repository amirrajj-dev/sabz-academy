import express from 'express'
import { signin, signout, signup } from '../controllers/auth.controller';

const router = express.Router()

router.use('/signup' , signup)
router.use('/sigin' , signin)
router.use('/signout' , signout)

export default router;