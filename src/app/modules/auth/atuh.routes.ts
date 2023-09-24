import express from 'express';
import { AuthenticationController } from './auth.controller';

const router = express.Router();
router.post('/login', AuthenticationController.loginUser);
export const authRoutes = router;
