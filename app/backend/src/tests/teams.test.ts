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

describe('1. Testa a rota /teams;', () => {
  // describe('1.1. Error na requisição;', () => {
  //   it('GET /teams', async () => {
  //     const httpRes = await chai.request(app).get('/teams');
  //   });

  // });

  describe('1.1. Sucesso na requisição.', () => {
    it('GET /teams', async () => {

      sinon.stub(Model, 'findAll').resolves(allTeams as Teams[])

      const httpRes = await chai.request(app).get('/teams');

      expect(httpRes.status).to.be.equal(200);
      expect(httpRes.body).to.be.deep.equal(allTeams);
    });
    it('GET /teams:id', async () => {

      sinon.stub(Model, 'findByPk').resolves(allTeams[15] as Teams)

      const httpRes = await chai.request(app).get('/teams/16');

      expect(httpRes.status).to.be.equal(200);
      expect(httpRes.body).to.be.deep.equal(saoPaulo);
    });
  });

});
