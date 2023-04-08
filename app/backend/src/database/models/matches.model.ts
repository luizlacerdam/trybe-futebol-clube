import { INTEGER, Model, BOOLEAN } from 'sequelize';
import db from '.';
import Teams from './teams.model';

class Matches extends Model {
  declare id: number;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare inProgress: boolean;
  declare awayTeamGoals: number;
  declare awayTeamId: number;
}
Matches.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  homeTeamId: {
    type: INTEGER,
    references: { model: 'teams', key: 'id' },
  },
  homeTeamGoals: {
    type: INTEGER,
  },
  awayTeamId: {
    type: INTEGER,
    references: { model: 'teams', key: 'id' },
  },
  inProgress: {
    type: BOOLEAN,
  },
  awayTeamGoals: {
    type: INTEGER,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
});

Matches.belongsTo(Teams, { foreignKey: 'homeTeamId', as: 'homeTeam' });
Matches.belongsTo(Teams, { foreignKey: 'awayTeamId', as: 'awayTeam' });

export default Matches;
