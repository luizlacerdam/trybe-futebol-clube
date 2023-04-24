import { Router } from 'express';
import UsersValidations from '../validations/usersValidations';
import { loginValidation,
  emailValidation,
  passwordValidation } from '../middlewares/loginValidation';
import UsersController from '../controllers/users.controller';
import tokenValidation from '../middlewares/tokenValidation';
import UsersService from '../services/users.service';
import UsersModel from '../database/models/users.model';

const router = Router();
const usersValidations = new UsersValidations();
const usersService = new UsersService(UsersModel, usersValidations);
const usersController = new UsersController(usersService);

router.post(
  '/',
  loginValidation,
  emailValidation,
  passwordValidation,
  usersController.userLogin.bind(usersController),
);
router.get(
  '/role',
  tokenValidation,
  usersController.userRole.bind(usersController),
);

export default router;
