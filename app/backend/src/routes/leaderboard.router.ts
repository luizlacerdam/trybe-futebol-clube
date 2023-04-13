import { Router } from 'express';
import LeadboardController from '../controllers/leaderboard.controller';

const router = Router();
const leaderboardController = new LeadboardController();

router.get('/', leaderboardController.getTeamsPerfomanceGeral);
router.get('/home', leaderboardController.getTeamsPerfomanceHome);
router.get('/away', leaderboardController.getTeamsPerfomanceAway);

export default router;
