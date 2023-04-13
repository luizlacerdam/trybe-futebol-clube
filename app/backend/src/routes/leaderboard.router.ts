import { Router } from 'express';
import LeadboardController from '../controllers/leaderboard.controller';

const router = Router();
const leaderboardController = new LeadboardController();

router.get('/home', leaderboardController.getTeamsPerfomanceHome);

export default router;
