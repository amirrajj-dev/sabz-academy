import express from 'express'
import { protectRouteAdmin } from '../middlewares/authMiddleware';
import { upload } from '../../utils/fileUpload';
import { createArticle , deleteArticle , getAllArticles , saveDraft , updateArticle , getArticle , getSuggestedArticles } from '../controllers/article.controller';

const router = express.Router()
router.post('/' , protectRouteAdmin as express.RequestHandler , upload , createArticle as express.RequestHandler)
router.get('/' , getAllArticles as express.RequestHandler)
router.get('/:id' , getArticle as express.RequestHandler)
router.get('/:id/suggested' , getSuggestedArticles as express.RequestHandler)
router.post('/draft' , protectRouteAdmin as express.RequestHandler , upload ,   saveDraft as express.RequestHandler)
router.delete('/:id' , protectRouteAdmin as express.RequestHandler , deleteArticle as express.RequestHandler)
router.put('/:id' , protectRouteAdmin as express.RequestHandler , updateArticle as express.RequestHandler)

export default router;