import { NextFunction, Request, Response } from 'express';

const requestRequiredFields = {
  user: ['email', 'password'],
  scoreboard: ['homeTeamGoals', 'awayTeamGoals'],
  newMatch: ['homeTeamId', 'awayTeamId', 'homeTeamGoals', 'awayTeamGoals'],
};

const validateRequiredFields = (key: keyof typeof requestRequiredFields) =>
  (req:Request, res:Response, next:NextFunction): Response | void => {
    const requiredFields = requestRequiredFields[key];
    for (let index = 0; index < requiredFields.length; index += 1) {
      if (!req.body[requiredFields[index]] && key === 'user') { // redundancia para conseguir adicionar placar com valor 0 e passar no teste do login
        return res.status(400).json({ message: 'All fields must be filled' });
      }
      if (req.body[requiredFields[index]] === undefined) {
        return res.status(400).json({ message: 'All fields must be filled' });
      }
    }
    return next();
  };

export default validateRequiredFields;
