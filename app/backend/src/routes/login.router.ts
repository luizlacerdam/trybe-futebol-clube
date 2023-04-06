import { Router } from 'express';
import { loginValidation,
  emailValidation,
  passwordValidation } from '../middlewares/loginValidation';
import UsersController from '../controllers/users.controller';

const router = Router();
const userController = new UsersController();

router.post(
  '/',
  loginValidation,
  emailValidation,
  passwordValidation,
  userController.userLogin,
);
export default router;
