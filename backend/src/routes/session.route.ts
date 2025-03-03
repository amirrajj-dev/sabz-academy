import express from 'express'
import { getAllSessions } from '../controllers/session.controller'
import { protectRouteAdmin } from '../middlewares/authMiddleware'

const router = express.Router()

router.get('/' , protectRouteAdmin as  express.RequestHandler , getAllSessions as express.RequestHandler)

export default router;