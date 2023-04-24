import { Router } from 'express';
import LeadboardService from '../services/leaderboard.service';
import LeadboardController from '../controllers/leaderboard.controller';
import MatchesModel from '../database/models/matches.model';
import TeamsModel from '../database/models/teams.model';

const router = Router();

const leaderboardService = new LeadboardService(MatchesModel, TeamsModel);
const leaderboardController = new LeadboardController(leaderboardService);

router.get('/', leaderboardController.getTeamsPerfomanceGeral.bind(leaderboardController));
router.get('/home', leaderboardController.getTeamsPerfomanceHome.bind(leaderboardController));
router.get('/away', leaderboardController.getTeamsPerfomanceAway.bind(leaderboardController));

export default router;
