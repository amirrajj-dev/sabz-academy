import express from 'express'
import {getAllCourses,
    createCourse,
    deleteCourse,
    updateCourse,
    getSingleCourse,
    createSession,
    getAllSessions} from '../controllers/course.controller'
const router = express.Router()

router.get('/' , getAllCourses)
router.post('/' , createCourse)
router.delete('/:id' , deleteCourse)
router.put('/:id' , updateCourse)
router.get('/:id' , getSingleCourse)
router.post('/:id/sessions' , createSession)
router.get('/:id/sessions' , getAllSessions)

export default router;