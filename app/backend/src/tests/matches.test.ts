import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Model } from 'sequelize';
import { matchesMock } from './mocks/matches.mock';
import { IMatch } from '../services/interfaces/matches.interfaces';
import Matches from '../database/models/matches.model';
chai.use(chaiHttp);

const { expect } = chai;

describe('Testes em /matches', () => {
    describe('1. Testa a rota /matches', () => {
        afterEach(sinon.restore)
        it('1.1. Verifica se retornar todos os matches com status 200', async () => {
            sinon.stub(Model, 'findAll').resolves(matchesMock as Matches[])
            const httpRes = await chai.request(app).get('/matches')
            expect(httpRes.status).to.be.equal(200);
            expect(httpRes.body).to.be.deep.equal(matchesMock);
        })
    })
})