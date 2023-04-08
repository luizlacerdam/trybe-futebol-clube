import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import { Model } from 'sequelize';
import Users from '../database/models/users.model';
import UsersService from '../services/users.service';



chai.use(chaiHttp);

const { expect } = chai;

const loginObj = {
    "email": "test@test.com",
    "password": "testet"
}

describe('Testes em users;', () => {
    describe('1. Testes na rota /login;', () => {
        afterEach(sinon.restore)
        it('1.1. Deve retornar status 400 e "All fields must be filled" se não houver email ou senha no body;', async () => {
            const httpRes = await chai.request(app).post('/login').send({});
            expect(httpRes.status).to.be.equal(400);
            expect(httpRes.body.message).to.be.equal('All fields must be filled');
        })
        it('1.2. Deve retornar status 401 e "Invalid email or password" se o email for incorreto;', async () => {
            sinon.stub(Model, 'findOne').resolves(null)
            const httpRes = await chai.request(app).post('/login').send(loginObj);
            expect(httpRes.status).to.be.equal(401);
            expect(httpRes.body.message).to.be.equal('Invalid email or password');
        })
        it('1.3. Deve retornar status 401 e "Invalid email or password" se o password for incorreto;', async () => {
            sinon.stub(Model, 'findOne').resolves(loginObj as Users)
            sinon.stub(Model, 'findOne').resolves(loginObj as Users)
            const httpRes = await chai.request(app).post('/login').send(loginObj);
            expect(httpRes.status).to.be.equal(401);
            expect(httpRes.body.message).to.be.equal('Invalid email or password');
        })
        // it('1.4. Deve retornar status 200 e token caso a requisição seja feita corretamente;', async () => {
        //     sinon.stub(Model, 'findOne').resolves(null)
        //     const httpRes = await chai.request(app).post('/login').send(loginObj);
        //     expect(httpRes.status).to.be.equal(401);
        //     expect(httpRes.body.message).to.be.equal('Invalid email or password');
        // })
    })
})