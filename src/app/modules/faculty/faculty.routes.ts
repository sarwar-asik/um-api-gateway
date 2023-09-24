import express from 'express';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { FacultyController } from './faculty.controller';

const router = express.Router();

router.post('/:id', auth(ENUM_USER_ROLE.SUPER_ADMIN,ENUM_USER_ROLE.ADMIN), FacultyController.updateOneDb);

export const facultyRouter = router;
