import { Router } from 'express';
import MatchesController from '../controllers/matches.controller';
import tokenValidation from '../middlewares/tokenValidation';

const router = Router();
const matchesController = new MatchesController();

router.get('/', matchesController.getMatches);
router.patch('/:id/finish', tokenValidation, matchesController.finishMatch);
router.patch('/:id/', tokenValidation, matchesController.matcheUpdate);

export default router;
