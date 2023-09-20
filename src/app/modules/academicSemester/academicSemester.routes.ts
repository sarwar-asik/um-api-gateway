import express from 'express';
import { AcademicSemesterController } from './academicSemester.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterValidation } from './academicSemesterValidatio';

const router = express.Router();

router.post('/',validateRequest(AcademicSemesterValidation.create), AcademicSemesterController.insertIntoDb);
router.get('/', AcademicSemesterController.getAllFromDb);

router.get('/:id', AcademicSemesterController.getSingleFromDb);

router.patch('/:id',validateRequest(AcademicSemesterValidation.update), AcademicSemesterController.updateOneDb);
router.delete('/:id', AcademicSemesterController.deleteFromDb);

export const academicSemesterRoutes = router;
