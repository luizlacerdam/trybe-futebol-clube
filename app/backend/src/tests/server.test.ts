// import chai, { expect } from 'chai';
// import sinon from 'sinon';
// import chaiHttp from 'chai-http';
// import App, { app } from '../../src/app';

// chai.use(chaiHttp);

// const PORT = 5555;

// describe('App', () => {
//   let server: App;
//   server = new App();

//   it('deve chamar o método listen com a porta solicitada', (done) => {
//     const appSpy = sinon.spy(server, 'listen');
//     server.listen(PORT);
//     expect(appSpy.calledWith(PORT)).to.equal(true);
//     done();
//   });

//   it('testa rota home "/"', async function() {
//     const httpResponse = await chai
//       .request(app)
//       .get('/');
//     expect(httpResponse.status).to.be.equal(200);
//   });
// });
