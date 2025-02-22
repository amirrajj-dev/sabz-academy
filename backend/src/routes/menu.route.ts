import express from 'express'
import { protectRouteAdmin } from '../middlewares/authMiddleware';
import { createMenu , deleteMenues , getAllMenues } from '../controllers/menu.controller';

const router = express.Router()

router.post('/' , protectRouteAdmin as express.RequestHandler , createMenu as express.RequestHandler)
router.get('/' , getAllMenues as express.RequestHandler)
router.delete('/:id' , deleteMenues as express.RequestHandler)

export default router;