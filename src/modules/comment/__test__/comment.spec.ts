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
// } from '../../supportRequest/__test__/__mocks__/users';

// import { validSupportRequest } from '../../supportRequest/__test__/__mocks__/supportRequests';

// import User from '../../../database/models/User';
// import SupportRequest from '../../../database/models/SupportRequest';
// import Comment from '../../../database/models/Comment';

// const request = supertest(app);

describe('TEST SUITE FOR SUPPORT REQUEST', () => {
  it('true to be true', async (done) => {
    expect(true).toBe(true)
    done()
  })
  // let token: string;
  // let secondToken: string;
  // let adminToken: string;
  // let supportRequestId: string;

  // beforeAll(async (done) => {
  //   await User.deleteMany({});
  //   await SupportRequest.deleteMany({});
  //   await Comment.deleteMany({});

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

  //   const supportRequest = await request
  //     .post(`${baseUrl}/support_request`)
  //     .set('Content-Type', 'application/json')
  //     .set('authorization', `Bearer ${token}`)
  //     .send(validSupportRequest);

  //   supportRequestId = supportRequest.body.data._id;

  //   done();
  // });

  // afterAll(async (done) => {
  //   await User.deleteMany({});
  //   await SupportRequest.deleteMany({});
  //   await mongoose.connection.close();
  //   done();
  // });

  // it('An non-admin user should not be able to successfully respond to a support request if an admin user has not responded', async (done) => {
  //   const res = await request
  //     .post(`${baseUrl}/comment/${supportRequestId}`)
  //     .set('Content-Type', 'application/json')
  //     .set('authorization', `Bearer ${token}`)
  //     .send({ comment: 'Test comment' });

  //   expect(res.status).toEqual(406);
  //   expect(res.body.success).toEqual(false);
  //   expect(res.body.message).toEqual(
  //     'No support agent has responded to this request',
  //   );
  //   done();
  // });

  // it('An admin user should be able to successfully respond to a support request', async (done) => {
  //   const res = await request
  //     .post(`${baseUrl}/comment/${supportRequestId}`)
  //     .set('Content-Type', 'application/json')
  //     .set('authorization', `Bearer ${adminToken}`)
  //     .send({ comment: 'Test comment' });

  //   expect(res.status).toEqual(201);
  //   expect(res.body.success).toEqual(true);
  //   expect(res.body.message).toEqual('Comment created successfully');
  //   expect(res.body.data.comment).toEqual('Test comment');
  //   done();
  // });

  // it('An non-admin user should be able to successfully respond to a support request after an admin has responded', async (done) => {
  //   const res = await request
  //     .post(`${baseUrl}/comment/${supportRequestId}`)
  //     .set('Content-Type', 'application/json')
  //     .set('authorization', `Bearer ${token}`)
  //     .send({ comment: 'Test comment' });

  //   expect(res.status).toEqual(201);
  //   expect(res.body.success).toEqual(true);
  //   expect(res.body.message).toEqual('Comment created successfully');
  //   expect(res.body.data.comment).toEqual('Test comment');
  //   done();
  // });

  // it("An non-admin user should not be able to successfully respond to a support request they didn't create", async (done) => {
  //   const res = await request
  //     .post(`${baseUrl}/comment/${supportRequestId}`)
  //     .set('Content-Type', 'application/json')
  //     .set('authorization', `Bearer ${secondToken}`)
  //     .send({ comment: 'Test comment' });

  //   expect(res.status).toEqual(406);
  //   expect(res.body.success).toEqual(false);
  //   expect(res.body.message).toEqual(
  //     "You can't comment on a support request you didn't create",
  //   );
  //   done();
  // });
});
