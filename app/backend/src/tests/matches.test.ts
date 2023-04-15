import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Model } from 'sequelize';
import { inProgressFalseMock, inProgressTrueMock, matchesMock, newMatchObj, newMatchObjReturn } from './mocks/matches.mock';
import { IMatch, NewMatchObj } from '../services/interfaces/matches.interfaces';
import Matches from '../database/models/matches.model';
import { tokenValidation } from '../utils/tokenRelated';
import Users from '../database/models/users.model';
import { log } from 'console';
chai.use(chaiHttp);

const { expect } = chai;

describe('Testes em /matches:', () => {
    afterEach(sinon.restore)
    describe('1. Testa a rota /matches:', () => {
        it('1.1. Testa GET na rota /matches e verifica se retornar todos os matches com status 200:', async () => {
            sinon.stub(Model, 'findAll').resolves(matchesMock as Matches[])
            const httpRes = await chai.request(app).get('/matches')
            expect(httpRes.status).to.be.equal(200);
            expect(httpRes.body).to.be.deep.equal(matchesMock);
        })
        it('1.2. Testa POST na rota /matches e verifica se retornar status 201:', async () => {
            const user = {
                id: 1,
                username: 'Tryber',
                email: "test@test.com",
                password: "$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW"
            };
            const loginObj = {
                "email": "test@test.com",
                "password": "secret_admin"
            }
            //mock login
            sinon.stub(Model, 'findOne').resolves(user as Users)
            const httpResLogin = await chai.request(app).post('/login').send(loginObj);
            // console.log(httpResLogin.body.token)
            // mock newMatche
            sinon.stub(Model, 'create').resolves(newMatchObjReturn as Matches)

            const httpRes = await chai.request(app).post('/matches').send(newMatchObj).set('Authorization', httpResLogin.body.token)
            expect(httpRes.status).to.be.equal(201);
            expect(httpRes.body).to.be.deep.equal(newMatchObjReturn);
        })
    })
    describe('2. Testa a rota /matches?inProgress=?:', () => {

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
    // describe('3. Testa a ')
})