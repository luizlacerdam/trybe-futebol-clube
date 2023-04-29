import { Router } from 'express';
import validateRequiredFields from '../middlewares/validateRequiredFields';
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
  validateRequiredFields('user'),
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
