import express from 'express'
import {getAllCourses,
    createCourse,
    deleteCourse,
    updateCourse,
    getSingleCourse,
    createSession,
    getRelatedCourses,
    getSingleCourseSessions,
    deleteSession} from '../controllers/course.controller'
import { upload } from '../../utils/fileUpload'
import { protectRouteAdmin } from '../middlewares/authMiddleware'
const router = express.Router()

router.get('/' , getAllCourses as express.RequestHandler)
router.post('/' , protectRouteAdmin as express.RequestHandler ,  upload ,  createCourse as express.RequestHandler)
router.delete('/:id' , protectRouteAdmin as express.RequestHandler , deleteCourse as express.RequestHandler)
router.put('/:id' , protectRouteAdmin as express.RequestHandler ,  upload  , updateCourse as express.RequestHandler)
router.get('/:id' , getSingleCourse as express.RequestHandler)
router.post('/:id/sessions' , protectRouteAdmin as express.RequestHandler , upload , createSession as express.RequestHandler)
router.get('/:id/sessions' , getSingleCourseSessions as express.RequestHandler)
router.delete('/sessions/:sessionID' , protectRouteAdmin as express.RequestHandler , deleteSession as express.RequestHandler)
router.get('/:id/related' , getRelatedCourses as express.RequestHandler)

export default router;