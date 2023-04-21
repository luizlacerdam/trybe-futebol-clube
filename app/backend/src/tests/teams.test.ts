import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import { Model } from 'sequelize';
import { allTeams, saoPaulo } from './mocks/teams.mock';
import Teams from '../database/models/teams.model';
import { ITeam } from '../interfaces/teams.interfaces';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa com a rota /teams;', () => {
  afterEach(sinon.restore)
  describe('1. Testa requisições na rota /team ;', () => {
    it('1.1. Testa GET /teams', async () => {
      sinon.stub(Model, 'findAll').resolves(allTeams as Teams[])
      const httpRes = await chai.request(app).get('/teams');
      expect(httpRes.status).to.be.equal(200);
      expect(httpRes.body).to.be.deep.equal(allTeams);
    });
  });
  describe('2. Testa requisições na rota /team:id', () => {
    it('2.1. Testa GET /teams:id com sucess', async () => {
      sinon.stub(Model, 'findByPk').resolves(allTeams[15] as Teams)
      const httpRes = await chai.request(app).get('/teams/16');
      expect(httpRes.status).to.be.equal(200);
      expect(httpRes.body).to.be.deep.equal(saoPaulo);
    });
    it('2.2. Testa GET /teams:id', async () => {
      sinon.stub(Model, 'findByPk').resolves(null)
      const httpRes = await chai.request(app).get('/teams/16');
      expect(httpRes.status).to.be.equal(404);
      expect(httpRes.body).to.be.deep.equal('Not found.');
    });
  })
});
