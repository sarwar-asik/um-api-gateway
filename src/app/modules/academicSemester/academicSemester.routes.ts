import express from 'express';
import { AcademicSemesterController } from './academicSemester.controller';

const router = express.Router();


router.post('/',AcademicSemesterController.insertIntoDb)
router.get('/',AcademicSemesterController.getAllFromDb)


export const academicSemesterRoutes = router;
