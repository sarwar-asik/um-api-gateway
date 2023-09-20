import express from 'express';
import { AcademicSemesterController } from './academicSemester.controller';

const router = express.Router();


router.post('/',AcademicSemesterController.insertIntoDb)

export const academicSemesterRoutes = router;
