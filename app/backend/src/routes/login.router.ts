import { Router } from 'express';
import { loginValidation,
  emailValidation,
  passwordValidation } from '../middlewares/loginValidation';
import UsersController from '../controllers/users.controller';
import tokenValidation from '../middlewares/tokenValidation';

const router = Router();
const userController = new UsersController();

router.post(
  '/',
  loginValidation,
  emailValidation,
  passwordValidation,
  userController.userLogin,
);
router.get(
  '/role',
  tokenValidation,
  userController.userRole,
);

export default router;
