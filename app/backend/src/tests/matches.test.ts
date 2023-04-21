import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import * as jwt from 'jsonwebtoken';
import { app } from '../app';
import { Model } from 'sequelize';
import { inProgressFalseMock, inProgressTrueMock, matchUpdateObj, matchesMock, newMatchObj, newMatchObjNotFound, newMatchObjReturn, newMatchObjSameId } from './mocks/matches.mock';
import { IMatch, NewMatchObj } from '../interfaces/matches.interfaces';
import Matches from '../database/models/matches.model';
import { tokenValidation } from '../utils/tokenRelated';
import Users from '../database/models/users.model';
import { log } from 'console';
chai.use(chaiHttp);

const { expect } = chai;

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

describe('Testes em /matches:', () => {
    afterEach(sinon.restore);
    describe('1. Testa a rota /matches:', () => {
        it('1.1. Testa GET na rota /matches e verifica se retornar todos os matches com status 200:', async () => {
            sinon.stub(Model, 'findAll').resolves(matchesMock as Matches[]);
            const httpRes = await chai.request(app).get('/matches');
            expect(httpRes.status).to.be.equal(200);
            expect(httpRes.body).to.be.deep.equal(matchesMock);
        })
        it('1.2. Testa POST na rota /matches e verifica se retornar status 201 e cria nova matche:', async () => {
            //mock login
            sinon.stub(Model, 'findOne').resolves(user as Users);
            const httpResLogin = await chai.request(app).post('/login').send(loginObj);

            // mock newMatche
            sinon.stub(Model, 'create').resolves(newMatchObjReturn as Matches);

            const httpRes = await chai.request(app).post('/matches').send(newMatchObj).set('Authorization', httpResLogin.body.token);
            expect(httpRes.status).to.be.equal(201);
            expect(httpRes.body).to.be.deep.equal(newMatchObjReturn);
        })
        it('1.3. Testa POST na rota /matches e verifica se retornar status 422 de teams com mesmo id:', async () => {
            //mock login
            sinon.stub(Model, 'findOne').resolves(user as Users);
            const httpResLogin = await chai.request(app).post('/login').send(loginObj);

            const httpRes = await chai.request(app).post('/matches').send(newMatchObjSameId).set('Authorization', httpResLogin.body.token);
            expect(httpRes.status).to.be.equal(422);
            expect(httpRes.body.message).to.be.deep.equal('It is not possible to create a match with two equal teams');
        })
        it('1.4. Testa POST na rota /matches e verifica se retornar status 404 se um dos teams não tiver na db:', async () => {
            //mock login
            sinon.stub(Users, 'findOne').resolves(user as Users);
            const httpResLogin = await chai.request(app).post('/login').send(loginObj);
            // sinon.stub(jwt, 'verify').resolves({
            //     "id": 1,
            //     "username": "Admin",
            //     "role": "admin",
            //     "email": "admin@admin.com",
            //     "iat": 1680969877,
            //     "exp": 1681574677
            // });

            sinon.stub(Matches, 'findOne').resolves();

            const httpRes = await chai.request(app).post('/matches').send(newMatchObjNotFound).set('Authorization', httpResLogin.body.token);
            expect(httpRes.status).to.be.equal(404);
            expect(httpRes.body.message).to.be.deep.equal('There is no team with such id!');
        })

    })
    describe('2. Testa a rota /matches?inProgress=?:', () => {
        it('2.1. Verifica se retorna todos inProgress = true e status 200:', async () => {
            sinon.stub(Model, 'findAll').resolves(inProgressTrueMock as Matches[]);
            const httpRes = await chai.request(app).get('/matches?inProgress=true');
            expect(httpRes.status).to.be.equal(200);
            expect(httpRes.body).to.be.deep.equal(inProgressTrueMock);
        })
        it('2.2. Verifica se retorna todos inProgress = false e status 200:', async () => {
            sinon.stub(Model, 'findAll').resolves(inProgressFalseMock as Matches[]);
            const httpRes = await chai.request(app).get('/matches?inProgress=false');
            expect(httpRes.status).to.be.equal(200);
            expect(httpRes.body).to.be.deep.equal(inProgressFalseMock);
        })
    })
    describe('3. Testa a rota /matches:id :', () => {
        it('3.1. Testa se é possivel atualizar uma matche e retornar status 200:', async () => {
            //mock login
            sinon.stub(Model, 'findOne').resolves(user as Users);
            const httpResLogin = await chai.request(app).post('/login').send(loginObj);

            const affectedLines = [1];
            sinon.stub(Model, 'update').resolves(affectedLines as unknown as [number]);
            const httpRes = await chai.request(app).patch('/matches/1').send(matchUpdateObj).set('Authorization', httpResLogin.body.token);
            expect(httpRes.status).to.be.equal(200);
        })
    })
    describe('4. Testa a rota /matches/:id/finish :', () => {
        it('4.1. Testa se é possivel finalizar uma matche e retornar status 200:', async () => {
            //mock login
            sinon.stub(Model, 'findOne').resolves(user as Users);
            const httpResLogin = await chai.request(app).post('/login').send(loginObj);

            const affectedLines = [1];
            sinon.stub(Model, 'update').resolves(affectedLines as unknown as [number]);
            const httpRes = await chai.request(app).patch('/matches/1/finish').set('Authorization', httpResLogin.body.token);
            expect(httpRes.status).to.be.equal(200);
            expect(httpRes.body.message).to.be.deep.equal('Finished');
        })
    })
})