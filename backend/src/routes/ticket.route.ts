import express from 'express'
import { createTicket, getAllTickets, replyTicket } from '../controllers/ticket.controller';
import { protectRoute} from '../middlewares/authMiddleware';

const router = express.Router()

router.get('/' , getAllTickets)
router.post('/' , protectRoute as express.RequestHandler  , createTicket as express.RequestHandler)
router.post('/:id' , protectRoute as express.RequestHandler ,  replyTicket as express.RequestHandler)

export default router;