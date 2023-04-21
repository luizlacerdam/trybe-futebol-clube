import { Router } from 'express';
import MatchesService from '../services/matches.service';
import MatchesController from '../controllers/matches.controller';
import tokenValidation from '../middlewares/tokenValidation';

const router = Router();
const matchesService = new MatchesService();
const matchesController = new MatchesController(matchesService);

router.get('/', matchesController.getMatches);
router.post('/', tokenValidation, matchesController.newMatch.bind(matchesController));
router.patch('/:id/finish', tokenValidation, matchesController.finishMatch.bind(matchesController));
router.patch('/:id/', tokenValidation, matchesController.matcheUpdate.bind(matchesController));

export default router;
