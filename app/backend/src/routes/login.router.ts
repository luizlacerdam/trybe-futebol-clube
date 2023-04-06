import { Router } from 'express';
import UsersController from '../controllers/users.controller';

const router = Router();
const userController = new UsersController();

router.post('/', userController.userLogin);
export default router;
