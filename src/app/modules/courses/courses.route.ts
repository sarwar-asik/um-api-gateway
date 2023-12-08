/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';

import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { CoursesController } from './courses.controller';
import { CoursesValidation } from './courses.validation';
const router = Router();
router.post(
  '/',
  auth(ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.FACULTY,ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(CoursesValidation.createCourses),
  CoursesController.insertDB
  );
  
  router.get('/',CoursesController.getAllDb);
router.get('/:id',CoursesController.getSingleDataById)

router.patch('/:id',CoursesController.updateIntoDb)
router.delete('/:id',CoursesController.deleteFromDb)

router.post("/:id/assign-faculties",
validateRequest(CoursesValidation.assignOrRemoveFaculties),
auth(ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.FACULTY,ENUM_USER_ROLE.SUPER_ADMIN),
CoursesController.assignFaculties)

router.delete("/:id/remove-faculties",
validateRequest(CoursesValidation.assignOrRemoveFaculties),
auth(ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.FACULTY,ENUM_USER_ROLE.SUPER_ADMIN),
CoursesController.removeFaculties)

export const coursesRoutes = router;
