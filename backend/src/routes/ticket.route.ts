import express from 'express'
import { createTicket, deleteTicket, getAllTickets, replyTicket } from '../controllers/ticket.controller';
import { protectRoute, protectRouteAdmin} from '../middlewares/authMiddleware';

const router = express.Router()

router.get('/' , getAllTickets)
router.post('/' , protectRoute as express.RequestHandler  , createTicket as express.RequestHandler)
router.post('/:id' , protectRoute as express.RequestHandler ,  replyTicket as express.RequestHandler)
router.delete('/:id' , protectRoute as express.RequestHandler , deleteTicket as express.RequestHandler)

export default router;