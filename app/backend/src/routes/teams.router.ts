import { Router } from 'express';
import TeamsController from '../controllers/teams.controller';
import TeamsService from '../services/teams.service';

const router = Router();
const teamsService = new TeamsService();
const teamsController = new TeamsController(teamsService);

router.get('/', teamsController.getAll.bind(teamsController));
router.get('/:id', teamsController.getById.bind(teamsController));
export default router;
