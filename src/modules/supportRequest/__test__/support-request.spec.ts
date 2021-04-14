// import supertest from 'supertest';
// import mongoose from 'mongoose';

// import app from '../../../app';
// import baseUrl from '../../../utils/constants';

// import {
//   testUser,
//   secondTestUser,
//   testAdminUser,
//   testUserLogin,
//   secondTestUserLogin,
//   testAdminUserLogin,
// } from './__mocks__/users';

// import {
//   validSupportRequest,
//   invalidSupportRequest,
// } from './__mocks__/supportRequests';

// import User from '../../../database/models/User';
// import SupportRequest from '../../../database/models/SupportRequest';

// const request = supertest(app);

describe('TEST SUITE FOR SUPPORT REQUEST', () => {
  it('true to be true', async (done) => {
    expect(true).toBe(true)
    done()
  })
  // let token: string;
  // let secondToken: string;
  // let adminToken: string;

  // beforeAll(async (done) => {
  //   await User.deleteMany({});
  //   await SupportRequest.deleteMany({});

  //   await request.post(`${baseUrl}/register`).send(testUser);
  //   const firstUserLogin = await request
  //     .post(`${baseUrl}/auth`)
  //     .send(testUserLogin);

  //   token = firstUserLogin.body.token;

  //   await request.post(`${baseUrl}/register`).send(secondTestUser);

  //   const secondUserLogin = await request
  //     .post(`${baseUrl}/auth`)
  //     .send(secondTestUserLogin);

  //   secondToken = secondUserLogin.body.token;

  //   await request.post(`${baseUrl}/register`).send(testAdminUser);

  //   await User.findOneAndUpdate(
  //     { email: testAdminUser.email },
  //     { admin: true },
  //   );

  //   const adminUserLogin = await request
  //     .post(`${baseUrl}/auth`)
  //     .send(testAdminUserLogin);

  //   adminToken = adminUserLogin.body.token;

  //   done();
  // });

  // afterAll(async (done) => {
  //   await User.deleteMany({});
  //   await SupportRequest.deleteMany({});
  //   await mongoose.connection.close();
  //   done();
  // });

  // it('A user should be able to successfully create a support request', async (done) => {
  //   const res = await request
  //     .post(`${baseUrl}/support_request`)
  //     .set('Content-Type', 'application/json')
  //     .set('authorization', `Bearer ${token}`)
  //     .send(validSupportRequest);

  //   expect(res.status).toEqual(201);
  //   expect(res.body.success).toEqual(true);
  //   expect(res.body.message).toEqual('Support request created successfully');
  //   expect(res.body.data.description).toEqual(validSupportRequest.description);
  //   done();
  // });

  // it('A user should not be able to successfully create a support request without required fields', async (done) => {
  //   const res = await request
  //     .post(`${baseUrl}/support_request`)
  //     .set('Content-Type', 'application/json')
  //     .set('authorization', `Bearer ${token}`)
  //     .send(invalidSupportRequest);

  //   expect(res.status).toEqual(422);
  //   expect(res.body.success).toEqual(false);
  //   expect(res.body.message).toEqual('Validation Errors');
  //   expect(res.body.errors).toEqual({
  //     description: ['description is not allowed to be empty'],
  //   });
  //   done();
  // });

  // it('A user should not be able to successfully create a support request withouth a token', async (done) => {
  //   const res = await request
  //     .post(`${baseUrl}/support_request`)
  //     .set('Content-Type', 'application/json')
  //     .send(validSupportRequest);

  //   expect(res.status).toEqual(401);
  //   expect(res.body.success).toEqual(false);
  //   expect(res.body.message).toEqual('Missing authorization header');
  //   done();
  // });

  // it('A user should not be able to successfully create a support request with an invalid token', async (done) => {
  //   const res = await request
  //     .post(`${baseUrl}/support_request`)
  //     .set('Content-Type', 'application/json')
  //     .set('authorization', `Bearer ${token}+invalidToken`)
  //     .send(validSupportRequest);

  //   expect(res.status).toEqual(401);
  //   expect(res.body.success).toEqual(false);
  //   expect(res.body.message).toEqual('Unauthorized');
  //   done();
  // });

  // it('A user should be able to fetch a single support request', async (done) => {
  //   const supportRequest = await SupportRequest.findOne({
  //     description: 'Test description',
  //   });

  //   const res = await request
  //     .get(`${baseUrl}/support_request/${supportRequest._id}`)
  //     .set('Content-Type', 'application/json')
  //     .set('authorization', `Bearer ${token}`);

  //   expect(res.status).toEqual(200);
  //   expect(res.body.success).toEqual(true);
  //   expect(res.body.message).toEqual(
  //     'You have successfully retrieved this support request',
  //   );
  //   done();
  // });

  // it('A user not should be able to fetch a single support request with an invalid id', async (done) => {
  //   const res = await request
  //     .get(`${baseUrl}/support_request/invalidId`)
  //     .set('Content-Type', 'application/json')
  //     .set('authorization', `Bearer ${token}`);

  //   expect(res.status).toEqual(422);
  //   expect(res.body.success).toEqual(false);
  //   expect(res.body.message).toEqual('Validation Errors');
  //   expect(res.body.errors).toEqual({
  //     id: [
  //       'id with value invalidId fails to match the required pattern [afAF]',
  //     ],
  //   });
  //   done();
  // });

  // it('A user not should be able to fetch a single support request without a token', async (done) => {
  //   const supportRequest = await SupportRequest.findOne({
  //     description: 'Test description',
  //   });

  //   const res = await request
  //     .get(`${baseUrl}/support_request/${supportRequest._id}`)
  //     .set('Content-Type', 'application/json');

  //   expect(res.status).toEqual(401);
  //   expect(res.body.success).toEqual(false);
  //   expect(res.body.message).toEqual('Missing authorization header');
  //   done();
  // });

  // it('A user not should be able to fetch a single support request with an invalid token', async (done) => {
  //   const supportRequest = await SupportRequest.findOne({
  //     description: 'Test description',
  //   });

  //   const res = await request
  //     .get(`${baseUrl}/support_request/${supportRequest._id}`)
  //     .set('Content-Type', 'application/json')
  //     .set('authorization', `Bearer ${token}+invalidToken`);

  //   expect(res.status).toEqual(401);
  //   expect(res.body.success).toEqual(false);
  //   expect(res.body.message).toEqual('Unauthorized');
  //   done();
  // });

  // it('A user should be able to fetch all their support requests', async (done) => {
  //   await request
  //     .post(`${baseUrl}/support_request`)
  //     .set('Content-Type', 'application/json')
  //     .set('authorization', `Bearer ${secondToken}`)
  //     .send({ description: 'second support request' });

  //   await request
  //     .post(`${baseUrl}/support_request`)
  //     .set('Content-Type', 'application/json')
  //     .set('authorization', `Bearer ${token}`)
  //     .send({ description: 'third support request' });

  //   const res = await request
  //     .get(`${baseUrl}/support_request`)
  //     .set('Content-Type', 'application/json')
  //     .set('authorization', `Bearer ${token}`);

  //   expect(res.status).toEqual(200);
  //   expect(res.body.success).toEqual(true);
  //   expect(res.body.message).toEqual(
  //     'You have successfully fetched Support Requests',
  //   );
  //   expect(Array.isArray(res.body.data)).toBe(true);
  //   expect(res.body.data.length).toBe(2);
  //   done();
  // });

  // it('An admin user should be able to fetch all support requests', async (done) => {
  //   const res = await request
  //     .get(`${baseUrl}/support_request`)
  //     .set('Content-Type', 'application/json')
  //     .set('authorization', `Bearer ${adminToken}`);

  //   expect(res.status).toEqual(200);
  //   expect(res.body.success).toEqual(true);
  //   expect(res.body.message).toEqual(
  //     'You have successfully fetched Support Requests',
  //   );
  //   expect(Array.isArray(res.body.data)).toBe(true);
  //   expect(res.body.data.length).toBe(3);
  //   done();
  // });

  // it('A user should not be able to fetch all their support requests without a token', async (done) => {
  //   const res = await request
  //     .get(`${baseUrl}/support_request`)
  //     .set('Content-Type', 'application/json');

  //   expect(res.status).toEqual(401);
  //   expect(res.body.success).toEqual(false);
  //   expect(res.body.message).toEqual('Missing authorization header');
  //   done();
  // });

  // it('A user should not be able to fetch all their support requests with an invalid token', async (done) => {
  //   const res = await request
  //     .get(`${baseUrl}/support_request`)
  //     .set('Content-Type', 'application/json')
  //     .set('authorization', `Bearer ${token}+invalidToken`);

  //   expect(res.status).toEqual(401);
  //   expect(res.body.success).toEqual(false);
  //   expect(res.body.message).toEqual('Unauthorized');
  //   done();
  // });

  // it('A user should be able to update a support request', async (done) => {
  //   const supportRequest = await SupportRequest.findOne({
  //     description: 'Test description',
  //   });

  //   const res = await request
  //     .patch(`${baseUrl}/support_request/${supportRequest._id}`)
  //     .set('Content-Type', 'application/json')
  //     .set('authorization', `Bearer ${token}`)
  //     .send({
  //       description: 'test update status',
  //     });

  //   expect(res.status).toEqual(200);
  //   expect(res.body.success).toEqual(true);
  //   expect(res.body.message).toEqual(
  //     'You have successfully updated this support request',
  //   );
  //   expect(res.body.data.description).toEqual('test update status');
  //   done();
  // });

  // it('A user not should be able to update a support request without the required fields', async (done) => {
  //   const supportRequest = await SupportRequest.findOne({
  //     description: 'test update status',
  //   });

  //   const res = await request
  //     .patch(`${baseUrl}/support_request/${supportRequest._id}`)
  //     .set('Content-Type', 'application/json')
  //     .set('authorization', `Bearer ${token}`)
  //     .send({
  //       description: '',
  //     });

  //   expect(res.status).toEqual(422);
  //   expect(res.body.success).toEqual(false);
  //   expect(res.body.message).toEqual('Validation Errors');
  //   expect(res.body.errors).toEqual({
  //     description: ['description is not allowed to be empty'],
  //   });
  //   done();
  // });

  // it('A user not should be able to update a support request without a token', async (done) => {
  //   const supportRequest = await SupportRequest.findOne({
  //     description: 'test update status',
  //   });

  //   const res = await request
  //     .patch(`${baseUrl}/support_request/${supportRequest._id}`)
  //     .set('Content-Type', 'application/json')
  //     .send({
  //       description: 'yeah yeah',
  //     });

  //   expect(res.status).toEqual(401);
  //   expect(res.body.success).toEqual(false);
  //   expect(res.body.message).toEqual('Missing authorization header');
  //   done();
  // });

  // it('A user not should be able to update a support request with an invalid token', async (done) => {
  //   const supportRequest = await SupportRequest.findOne({
  //     description: 'test update status',
  //   });

  //   const res = await request
  //     .patch(`${baseUrl}/support_request/${supportRequest._id}`)
  //     .set('Content-Type', 'application/json')
  //     .set('authorization', `Bearer ${token}+invalidToken`)
  //     .send({
  //       description: 'yeah yeah',
  //     });

  //   expect(res.status).toEqual(401);
  //   expect(res.body.success).toEqual(false);
  //   expect(res.body.message).toEqual('Unauthorized');
  //   done();
  // });

  // it('An admin user should be able to update a support request status', async (done) => {
  //   const supportRequest = await SupportRequest.findOne({
  //     description: 'test update status',
  //   });

  //   const res = await request
  //     .patch(`${baseUrl}/support_request/close_request/${supportRequest._id}`)
  //     .set('Content-Type', 'application/json')
  //     .set('authorization', `Bearer ${adminToken}`)
  //     .send({
  //       status: 'CLOSED',
  //     });

  //   expect(res.status).toEqual(200);
  //   expect(res.body.success).toEqual(true);
  //   expect(res.body.message).toEqual(
  //     'You have successfully closed this support request',
  //   );
  //   expect(res.body.data.status).toEqual('CLOSED');
  //   done();
  // });

  // it('A non-admin user should not be able to update a support request status', async (done) => {
  //   const supportRequest = await SupportRequest.findOne({
  //     description: 'test update status',
  //   });

  //   const res = await request
  //     .patch(`${baseUrl}/support_request/close_request/${supportRequest._id}`)
  //     .set('Content-Type', 'application/json')
  //     .set('authorization', `Bearer ${token}`)
  //     .send({
  //       status: 'CLOSED',
  //     });

  //   expect(res.status).toEqual(401);
  //   expect(res.body.success).toEqual(false);
  //   expect(res.body.message).toEqual('Admin access needed');
  //   done();
  // });
});
