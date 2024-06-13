import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';
import { UserControllers } from './user.controller';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(UserValidation.UserValidationSchema),
  UserControllers.signUp,
);
router.post(
  '/login',
  validateRequest(UserValidation.UserValidationSchema),
  UserControllers.login,
);

export const UserRoutes = router;
