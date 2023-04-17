import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Model } from 'sequelize';
import { allTeams } from './mocks/teams.mock';
import Teams from '../database/models/teams.model';
import { matchesMock } from './mocks/matches.mock';
import Matches from '../database/models/matches.model';
import { leaderboardAway, leaderboardGeral, leaderboardHome } from './mocks/leaderboard.mock';
import { inProgressFalseMock } from './mocks/matches.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes em /leaderboard :', () => {
    afterEach(sinon.restore);
    describe('1. Testes em /leaderboard/home :', () => {
        it('1.1. Testa se retornar todos os teams home com status 200 :', async () => {
            sinon.stub(Teams, 'findAll').resolves(allTeams as Teams[]);
            sinon.stub(Matches, 'findAll').resolves(inProgressFalseMock as Matches[]);

            const httpRes = await chai.request(app).get('/leaderboard/home');
            expect(httpRes.status).to.be.equal(200);
            expect(httpRes.body).to.be.deep.equal(leaderboardHome);
        })
    })
    describe('2. Testes em /leaderboard/away :', () => {
        it('2.1. Testa se retornar todos os teams home com status 200 :', async () => {
            sinon.stub(Teams, 'findAll').resolves(allTeams as Teams[]);
            sinon.stub(Matches, 'findAll').resolves(inProgressFalseMock as Matches[]);

            const httpRes = await chai.request(app).get('/leaderboard/away');
            expect(httpRes.status).to.be.equal(200);
            expect(httpRes.body).to.be.deep.equal(leaderboardAway);
        })
    })
    describe('3. Testes em /leaderboard :', () => {
        it('3.1. Testa se retornar todos os teams home com status 200 :', async () => {
            sinon.stub(Teams, 'findAll').resolves(allTeams as Teams[]);
            sinon.stub(Matches, 'findAll').resolves(inProgressFalseMock as Matches[]);

            const httpRes = await chai.request(app).get('/leaderboard');
            expect(httpRes.status).to.be.equal(200);
            expect(httpRes.body).to.be.deep.equal(leaderboardGeral);
        })
    })
})