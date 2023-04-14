import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Model } from 'sequelize';
import { inProgressFalseMock, inProgressTrueMock, matchesMock } from './mocks/matches.mock';
import { IMatch } from '../services/interfaces/matches.interfaces';
import Matches from '../database/models/matches.model';
chai.use(chaiHttp);

const { expect } = chai;

describe('Testes em /matches:', () => {
    describe('1. Testa a rota /matches:', () => {
        afterEach(sinon.restore)
        it('1.1. Verifica se retornar todos os matches com status 200.', async () => {
            sinon.stub(Model, 'findAll').resolves(matchesMock as Matches[])
            const httpRes = await chai.request(app).get('/matches')
            expect(httpRes.status).to.be.equal(200);
            expect(httpRes.body).to.be.deep.equal(matchesMock);
        })
    })
    describe('2. Testa a rota /matches?inProgress=?:', () => {
        afterEach(sinon.restore)
        it('2.1. Verifica se retorna todos inProgress = true e status 200:', async () => {
            sinon.stub(Model, 'findAll').resolves(inProgressTrueMock as Matches[])
            const httpRes = await chai.request(app).get('/matches?inProgress=true')
            expect(httpRes.status).to.be.equal(200);
            expect(httpRes.body).to.be.deep.equal(inProgressTrueMock);
        })
        it('2.2. Verifica se retorna todos inProgress = false e status 200:', async () => {
            sinon.stub(Model, 'findAll').resolves(inProgressFalseMock as Matches[])
            const httpRes = await chai.request(app).get('/matches?inProgress=false')
            expect(httpRes.status).to.be.equal(200);
            expect(httpRes.body).to.be.deep.equal(inProgressFalseMock);
        })
    })
})