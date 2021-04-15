import supertest from 'supertest';
import mongoose from 'mongoose';

import server from '../../../';
import baseUrl from '../../../utils/constants';

import {
  testUser,
  secondTestUser,
  testAdminUser,
  testUserLogin,
  secondTestUserLogin,
  testAdminUserLogin,
} from './__mocks__/users';

import {
  validSupportRequest,
  invalidSupportRequest,
} from './__mocks__/supportRequests';

import User from '../../../database/models/User';
import SupportRequest from '../../../database/models/SupportRequest';
import logger from '../../../config/logger';

const request = supertest(server);

describe('TEST SUITE FOR SUPPORT REQUEST', () => {
  let token: string;
  let secondToken: string;
  let adminToken: string;

  beforeAll(async (done) => {
    await User.deleteMany({});
    await SupportRequest.deleteMany({});

    await request.post(`${baseUrl}/register`).send(testUser);
    const firstUserLogin = await request
      .post(`${baseUrl}/auth`)
      .send(testUserLogin);

    token = firstUserLogin.body.token;

    await request.post(`${baseUrl}/register`).send(secondTestUser);

    const secondUserLogin = await request
      .post(`${baseUrl}/auth`)
      .send(secondTestUserLogin);

    secondToken = secondUserLogin.body.token;

    await request.post(`${baseUrl}/register`).send(testAdminUser);

    await User.findOneAndUpdate(
      { email: testAdminUser.email },
      { admin: true },
    );

    const adminUserLogin = await request
      .post(`${baseUrl}/auth`)
      .send(testAdminUserLogin);

    adminToken = adminUserLogin.body.token;

    done();
  });

  afterAll(async (done) => {
    await User.deleteMany({});
    await SupportRequest.deleteMany({});
    await mongoose.connection.close();
    server.close();
    done();
  });

  it('A user should be able to successfully create a support request', async (done) => {
    const response = await request
      .post(`${baseUrl}/support_request`)
      .set('Content-Type', 'application/json')
      .set('authorization', `Bearer ${token}`)
      .send(validSupportRequest);

    expect(response.status).toEqual(201);
    expect(response.body.success).toEqual(true);
    expect(response.body.message).toEqual('Support request created successfully');
    expect(response.body.data.description).toEqual(validSupportRequest.description);
    done();
  });

  it('A user should not be able to successfully create a support request without required fields', async (done) => {
    const response = await request
      .post(`${baseUrl}/support_request`)
      .set('Content-Type', 'application/json')
      .set('authorization', `Bearer ${token}`)
      .send(invalidSupportRequest);

    expect(response.status).toEqual(422);
    expect(response.body.success).toEqual(false);
    expect(response.body.message).toEqual('Validation Errors');
    expect(response.body.errors).toEqual({
      description: ['description is not allowed to be empty'],
    });
    done();
  });

  it('A user should not be able to successfully create a support request withouth a token', async (done) => {
    const response = await request
      .post(`${baseUrl}/support_request`)
      .set('Content-Type', 'application/json')
      .send(validSupportRequest);

    expect(response.status).toEqual(400);
    expect(response.body.success).toEqual(false);
    expect(response.body.error).toEqual('Missing authorization header');
    done();
  });

  it('A user should not be able to successfully create a support request with an invalid token', async (done) => {
    const response = await request
      .post(`${baseUrl}/support_request`)
      .set('Content-Type', 'application/json')
      .set('authorization', `Bearer ${token}+invalidToken`)
      .send(validSupportRequest);

    expect(response.status).toEqual(500);
    expect(response.body.success).toEqual(false);
    expect(response.body.error).toEqual('Server error');
    done();
  });

  it('A user should be able to fetch a single support request', async (done) => {
    const supportRequest = await SupportRequest.findOne({
      description: 'Test description',
    });

    const response = await request
      .get(`${baseUrl}/support_request/${supportRequest._id}`)
      .set('Content-Type', 'application/json')
      .set('authorization', `Bearer ${token}`);

    expect(response.status).toEqual(200);
    expect(response.body.success).toEqual(true);
    expect(response.body.message).toEqual(
      'You have successfully retrieved this support request',
    );
    done();
  });

  it('A user not should be able to fetch a non-existent support request', async (done) => {

    const response = await request
      .get(`${baseUrl}/support_request/607767fe1341087782da1be1`)
      .set('Content-Type', 'application/json')
      .set('authorization', `Bearer ${token}`);

    expect(response.status).toEqual(400);
    expect(response.body.success).toEqual(false);
    expect(response.body.error).toEqual('Support request not found');
    done();
  });

  it('A user not should be able to fetch a single support request with an invalid id', async (done) => {
    const response = await request
      .get(`${baseUrl}/support_request/invalidId`)
      .set('Content-Type', 'application/json')
      .set('authorization', `Bearer ${token}`);

    expect(response.status).toEqual(422);
    expect(response.body.success).toEqual(false);
    expect(response.body.message).toEqual('Validation Errors');
    expect(response.body.errors).toEqual({
      id: [
        'id with value invalidId fails to match the required pattern [afAF09]24',
      ],
    });
    done();
  });

  it('A user not should be able to fetch a single support request without a token', async (done) => {
    const supportRequest = await SupportRequest.findOne({
      description: 'Test description',
    });

    const response = await request
      .get(`${baseUrl}/support_request/${supportRequest._id}`)
      .set('Content-Type', 'application/json');

    expect(response.status).toEqual(400);
    expect(response.body.success).toEqual(false);
    expect(response.body.error).toEqual('Missing authorization header');
    done();
  });

  it('A user not should be able to fetch a single support request with an invalid token', async (done) => {
    const supportRequest = await SupportRequest.findOne({
      description: 'Test description',
    });

    const response = await request
      .get(`${baseUrl}/support_request/${supportRequest._id}`)
      .set('Content-Type', 'application/json')
      .set('authorization', `Bearer ${token}+invalidToken`);

    expect(response.status).toEqual(500);
    expect(response.body.success).toEqual(false);
    expect(response.body.error).toEqual('Server error');
    done();
  });

  it('A user should be able to fetch all their support requests', async (done) => {
    await request
      .post(`${baseUrl}/support_request`)
      .set('Content-Type', 'application/json')
      .set('authorization', `Bearer ${secondToken}`)
      .send({ description: 'second support request' });

    await request
      .post(`${baseUrl}/support_request`)
      .set('Content-Type', 'application/json')
      .set('authorization', `Bearer ${token}`)
      .send({ description: 'third support request' });

    const response = await request
      .get(`${baseUrl}/support_request`)
      .set('Content-Type', 'application/json')
      .set('authorization', `Bearer ${token}`);

    expect(response.status).toEqual(200);
    expect(response.body.success).toEqual(true);
    expect(response.body.message).toEqual(
      'You have successfully fetched Support Requests',
    );
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.data.length).toBe(2);
    done();
  });

  it('An admin user should be able to fetch all support requests', async (done) => {
    const response = await request
      .get(`${baseUrl}/support_request`)
      .set('Content-Type', 'application/json')
      .set('authorization', `Bearer ${adminToken}`);

    expect(response.status).toEqual(200);
    expect(response.body.success).toEqual(true);
    expect(response.body.message).toEqual(
      'You have successfully fetched Support Requests',
    );
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.data.length).toBe(3);
    done();
  });

  it('A user should not be able to fetch all their support requests without a token', async (done) => {
    const response = await request
      .get(`${baseUrl}/support_request`)
      .set('Content-Type', 'application/json');

    expect(response.status).toEqual(400);
    expect(response.body.success).toEqual(false);
    expect(response.body.error).toEqual('Missing authorization header');
    done();
  });

  it('A user should not be able to fetch all their support requests with an invalid token', async (done) => {
    const response = await request
      .get(`${baseUrl}/support_request`)
      .set('Content-Type', 'application/json')
      .set('authorization', `Bearer ${token}+invalidToken`);

    expect(response.status).toEqual(500);
    expect(response.body.success).toEqual(false);
    expect(response.body.error).toEqual('Server error');
    done();
  });

  it('A user should be able to update a support request', async (done) => {
    const supportRequest = await SupportRequest.findOne({
      description: 'Test description',
    });

    const response = await request
      .patch(`${baseUrl}/support_request/${supportRequest._id}`)
      .set('Content-Type', 'application/json')
      .set('authorization', `Bearer ${token}`)
      .send({
        description: 'test update status',
      });

    expect(response.status).toEqual(200);
    expect(response.body.success).toEqual(true);
    expect(response.body.message).toEqual(
      'You have successfully updated this support request',
    );
    expect(response.body.data.description).toEqual('test update status');
    done();
  });

  it('A user not should be able to update a non-existent support request', async (done) => {

    const response = await request
      .patch(`${baseUrl}/support_request/607767fe1341087782da1be1`)
      .set('Content-Type', 'application/json')
      .set('authorization', `Bearer ${token}`)
      .send({
        description: 'test update status',
      });

    expect(response.status).toEqual(400);
    expect(response.body.success).toEqual(false);
    expect(response.body.error).toEqual('Support request not found');
    done();
  });

  
  it('A user not should be able to update a support request they did not create', async (done) => {
    const supportRequest = await SupportRequest.findOne({
      description: 'test update status',
    });

    const response = await request
      .patch(`${baseUrl}/support_request/${supportRequest._id}`)
      .set('Content-Type', 'application/json')
      .set('authorization', `Bearer ${secondToken}`)
      .send({
        description: 'test update status',
      });

    expect(response.status).toEqual(400);
    expect(response.body.success).toEqual(false);
    expect(response.body.error).toEqual('Not allowed');
    done();
  });

  it('A user not should be able to update a support request without the required fields', async (done) => {
    const supportRequest = await SupportRequest.findOne({
      description: 'test update status',
    });

    const response = await request
      .patch(`${baseUrl}/support_request/${supportRequest._id}`)
      .set('Content-Type', 'application/json')
      .set('authorization', `Bearer ${token}`)
      .send({
        description: '',
      });

    expect(response.status).toEqual(422);
    expect(response.body.success).toEqual(false);
    expect(response.body.message).toEqual('Validation Errors');
    expect(response.body.errors).toEqual({
      description: ['description is not allowed to be empty'],
    });
    done();
  });

  it('A user not should be able to update a support request without a token', async (done) => {
    const supportRequest = await SupportRequest.findOne({
      description: 'test update status',
    });

    const response = await request
      .patch(`${baseUrl}/support_request/${supportRequest._id}`)
      .set('Content-Type', 'application/json')
      .send({
        description: 'yeah yeah',
      });

    expect(response.status).toEqual(400);
    expect(response.body.success).toEqual(false);
    expect(response.body.error).toEqual('Missing authorization header');
    done();
  });

  it('A user not should be able to update a support request with an invalid token', async (done) => {
    const supportRequest = await SupportRequest.findOne({
      description: 'test update status',
    });

    const response = await request
      .patch(`${baseUrl}/support_request/${supportRequest._id}`)
      .set('Content-Type', 'application/json')
      .set('authorization', `Bearer ${token}+invalidToken`)
      .send({
        description: 'yeah yeah',
      });

    expect(response.status).toEqual(500);
    expect(response.body.success).toEqual(false);
    expect(response.body.error).toEqual('Server error');
    done();
  });

  it('An admin user should be able to update a support request status', async (done) => {
    const supportRequest = await SupportRequest.findOne({
      description: 'test update status',
    });

    const response = await request
      .patch(`${baseUrl}/support_request/close_request/${supportRequest._id}`)
      .set('Content-Type', 'application/json')
      .set('authorization', `Bearer ${adminToken}`)
      .send({
        status: 'CLOSED',
      });

    expect(response.status).toEqual(200);
    expect(response.body.success).toEqual(true);
    expect(response.body.message).toEqual(
      'You have successfully closed this support request',
    );
    expect(response.body.data.status).toEqual('CLOSED');
    done();
  });

  it('A user not should be able to update a non-existent support request status', async (done) => {

    const response = await request
      .patch(`${baseUrl}/support_request/close_request/607767fe1341087782da1be1`)
      .set('Content-Type', 'application/json')
      .set('authorization', `Bearer ${adminToken}`)
      .send({
        status: 'CLOSED',
      });

    expect(response.status).toEqual(400);
    expect(response.body.success).toEqual(false);
    expect(response.body.error).toEqual('Support request not found');
    done();
  });


  it('A non-admin user should not be able to update a support request status', async (done) => {
    const supportRequest = await SupportRequest.findOne({
      description: 'test update status',
    });

    const response = await request
      .patch(`${baseUrl}/support_request/close_request/${supportRequest._id}`)
      .set('Content-Type', 'application/json')
      .set('authorization', `Bearer ${token}`)
      .send({
        status: 'CLOSED',
      });

    expect(response.status).toEqual(400);
    expect(response.body.success).toEqual(false);
    expect(response.body.error).toEqual('Unathorized access');
    done();
  });
});

describe('AUTHENTICATION CONTROLLER UNIT TESTS', () => {
  let UnmockedSupportRequestController: any, json: any, status: any, res: any, req: any;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
    jest.unmock('../support-request.controller');
    // fetch module after unmocking
    UnmockedSupportRequestController = require('../support-request.controller').default;
    // spies
    json = jest.fn();
    status = jest.fn(() => ({ json }));
    res = { status };
    req = {
      params: {
        id: ''
      }
    };
    jest.spyOn(logger, 'error').mockImplementation(() => true as any);
    jest.spyOn(logger, 'info').mockImplementation(() => true as any);
  });

  afterAll(async () => {
    jest.clearAllMocks();
    jest.resetModules();
    server.close();
  });

  it('calls status and json methods to generate response when creating a support request', async (done) => {
    req = {
      body: {
        description: '',
      },
    };
    await UnmockedSupportRequestController.createSupportRequest(req, res);
    expect(status).toHaveBeenCalledTimes(1);
    expect(json).toHaveBeenCalledTimes(1);
    done();
  });

  it('calls status and json methods to generate response when updating a support request', async (done) => {
    await UnmockedSupportRequestController.getSupportRequest(req, res);
    expect(status).toHaveBeenCalledTimes(1);
    expect(json).toHaveBeenCalledTimes(1);
    done();
  });

  
  it('calls status and json methods to generate response when updating a support request', async (done) => {
    req = {
      body: {
        description: '',
      },
    };
    await UnmockedSupportRequestController.updateSupportRequest(req, res);
    expect(status).toHaveBeenCalledTimes(1);
    expect(json).toHaveBeenCalledTimes(1);
    done();
  });

  it('calls status and json methods to generate response when closing a support request', async (done) => {
    req = {
      body: {
        status: '',
      },
    };
    await UnmockedSupportRequestController.closeRequest(req, res);
    expect(status).toHaveBeenCalledTimes(1);
    expect(json).toHaveBeenCalledTimes(1);
    done();
  });

  it('calls status and json methods to generate response when closing a support request', async (done) => {
    req = {
      _id: ''
    };
    await UnmockedSupportRequestController.getSupportRequests(req, res);
    expect(status).toHaveBeenCalledTimes(1);
    expect(json).toHaveBeenCalledTimes(1);
    done();
  });
});

