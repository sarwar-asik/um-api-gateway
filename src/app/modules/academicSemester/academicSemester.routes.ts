import express from 'express';
import { AcademicSemesterController } from './academicSemester.controller';

const router = express.Router();

router.post('/', AcademicSemesterController.insertIntoDb);
router.get('/', AcademicSemesterController.getAllFromDb);

router.get('/:id', AcademicSemesterController.getSingleFromDb);

router.patch('/:id', AcademicSemesterController.updateOneDb);
router.delete('/:id', AcademicSemesterController.deleteFromDb);

export const academicSemesterRoutes = router;
