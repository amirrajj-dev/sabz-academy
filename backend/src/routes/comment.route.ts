import express from 'express'
import { protectRoute, protectRouteAdmin } from '../middlewares/authMiddleware';
import { getAllComments , acceptComment , answerComment , createComment , deleteComment , rejectComment } from '../controllers/comment.controller';

const router = express.Router()

router.get('/' , protectRouteAdmin as express.RequestHandler , getAllComments as express.RequestHandler)
router.post('/' , protectRoute as express.RequestHandler , createComment as express.RequestHandler)
router.delete('/:id' , protectRouteAdmin as express.RequestHandler , deleteComment as express.RequestHandler)
router.post('/answer/:id' , protectRouteAdmin as express.RequestHandler , answerComment as express.RequestHandler)
router.put('/accept/:id' , protectRouteAdmin as express.RequestHandler ,acceptComment as express.RequestHandler)
router.put('/reject/:id' , protectRouteAdmin as express.RequestHandler ,rejectComment as express.RequestHandler)

export default router;