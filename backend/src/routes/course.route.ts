import express from 'express'
import {getAllCourses,
    createCourse,
    deleteCourse,
    updateCourse,
    getSingleCourse,
    createSession,
    getAllSessions} from '../controllers/course.controller'
import { upload } from '../../utils/fileUpload'
import { protectRouteAdmin } from '../middlewares/authMiddleware'
const router = express.Router()

router.get('/' , getAllCourses as express.RequestHandler)
router.post('/' , protectRouteAdmin as express.RequestHandler ,  upload ,  createCourse as express.RequestHandler)
router.delete('/:id' , protectRouteAdmin as express.RequestHandler , deleteCourse as express.RequestHandler)
router.put('/:id' , updateCourse)
router.get('/:id' , getSingleCourse)
router.post('/:id/sessions' , createSession)
router.get('/:id/sessions' , getAllSessions)

export default router;