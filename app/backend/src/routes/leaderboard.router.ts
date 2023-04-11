import { Router } from 'express';
import LeadboardController from '../controllers/leaderboard.controller';

const router = Router();
const leaderboardController = new LeadboardController();

router.get('/home', leaderboardController.getTeamsPerfomance);

export default router;
