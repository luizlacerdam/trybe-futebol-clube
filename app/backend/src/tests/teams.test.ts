import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import { Model } from 'sequelize';
import { allTeams } from './mocks/teams.mock';
import Teams from '../database/models/teams.model';

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
  });

  /**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });

});
