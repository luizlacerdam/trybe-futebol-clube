import { Router } from 'express';
import MatchesValidations from '../validations/matchesValidations';
import MatchesModel from '../database/models/matches.model';
import MatchesService from '../services/matches.service';
import MatchesController from '../controllers/matches.controller';
import tokenValidation from '../middlewares/tokenValidation';

const router = Router();
const matchesValidations = new MatchesValidations();
const matchesService = new MatchesService(MatchesModel, matchesValidations);
const matchesController = new MatchesController(matchesService);

router.get('/', matchesController.getMatches.bind(matchesController));
router.post('/', tokenValidation, matchesController.newMatch.bind(matchesController));
router.patch('/:id/', tokenValidation, matchesController.matcheUpdate.bind(matchesController));
router.patch('/:id/finish', tokenValidation, matchesController.finishMatch.bind(matchesController));

export default router;
