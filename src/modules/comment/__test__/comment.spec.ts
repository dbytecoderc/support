import supertest from 'supertest';
import mongoose from 'mongoose';

import server from '../../../';
import baseUrl from '../../../utils/constants';

import {
  testUser,
  testUser2,
  testAdminUser,
} from '../../user/__test__/__mocks__/mockUsers';

import { validSupportRequest } from '../../support-request/__test__/__mocks__/supportRequests';

import User from '../../../database/models/User';
import SupportRequest from '../../../database/models/SupportRequest';
import Comment from '../../../database/models/Comment';
import logger from '../../../config/logger';

const request = supertest(server);

describe('TEST SUITE FOR COMMENTS', () => {
  let token: string;
  let secondToken: string;
  let adminToken: string;
  let supportRequestId: string;

  beforeAll(async (done) => {
    await User.deleteMany({});
    await SupportRequest.deleteMany({});
    await Comment.deleteMany({});

    const firstUser = await request.post(`${baseUrl}/register`).send(testUser);

    token = firstUser.body.token;

    const secondUser = await request.post(`${baseUrl}/register`).send(testUser2);

    secondToken = secondUser.body.token;

    const admin = await request.post(`${baseUrl}/register`).send(testAdminUser);

    await User.findOneAndUpdate(
      { email: testAdminUser.email },
      { admin: true },
    );

    adminToken = admin.body.token;

    const supportRequest = await request
      .post(`${baseUrl}/support_request`)
      .set('Content-Type', 'application/json')
      .set('authorization', `Bearer ${token}`)
      .send(validSupportRequest);

    supportRequestId = supportRequest.body.data._id;

    done();
  });

  afterAll(async (done) => {
    await User.deleteMany({});
    await SupportRequest.deleteMany({});
    await mongoose.connection.close();
    server.close();
    done();
  });

  it('An non-admin user should not be able to successfully respond to a support request if an admin user has not responded', async (done) => {
    const response = await request
      .post(`${baseUrl}/comment/${supportRequestId}`)
      .set('Content-Type', 'application/json')
      .set('authorization', `Bearer ${token}`)
      .send({ comment: 'Test comment' });

    expect(response.status).toEqual(400);
    expect(response.body.success).toEqual(false);
    expect(response.body.error).toEqual(
      'No support agent has responded to this request',
    );
    done();
  });

  it('An admin user should be able to successfully respond to a support request', async (done) => {
    const response = await request
      .post(`${baseUrl}/comment/${supportRequestId}`)
      .set('Content-Type', 'application/json')
      .set('authorization', `Bearer ${adminToken}`)
      .send({ comment: 'Test comment' });

    expect(response.status).toEqual(201);
    expect(response.body.success).toEqual(true);
    expect(response.body.message).toEqual('Comment added successfully');
    expect(response.body.data.comment).toEqual('Test comment');
    done();
  });

  it('A user should not be able to respond to a non-existent support request', async (done) => {

    const response = await request
      .post(`${baseUrl}/comment/607767fe1341087782da1be1`)
      .set('Content-Type', 'application/json')
      .set('authorization', `Bearer ${token}`)
      .send({ comment: 'Test comment' });

    expect(response.status).toEqual(400);
    expect(response.body.success).toEqual(false);
    expect(response.body.error).toEqual('Support request not found');
    done();
  });

  it('An non-admin user should be able to successfully respond to a support request after an admin has responded', async (done) => {
    const response = await request
      .post(`${baseUrl}/comment/${supportRequestId}`)
      .set('Content-Type', 'application/json')
      .set('authorization', `Bearer ${token}`)
      .send({ comment: 'Test comment' });

    expect(response.status).toEqual(201);
    expect(response.body.success).toEqual(true);
    expect(response.body.message).toEqual('Comment added successfully');
    expect(response.body.data.comment).toEqual('Test comment');
    done();
  });

  it("An non-admin user should not be able to successfully respond to a support request they didn't create", async (done) => {
    const res = await request
      .post(`${baseUrl}/comment/${supportRequestId}`)
      .set('Content-Type', 'application/json')
      .set('authorization', `Bearer ${secondToken}`)
      .send({ comment: 'Test comment' });

    expect(res.status).toEqual(400);
    expect(res.body.success).toEqual(false);
    expect(res.body.error).toEqual(
      "Not allowed",
    );
    done();
  });
});


describe('COMMENTS CONTROLLER UNIT TESTS', () => {
  let UnmockedCommentController: any, json: any, status: any, res: any, req: any;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
    jest.unmock('../comment.controller');
    // fetch module after unmocking
    UnmockedCommentController = require('../comment.controller').default;
    // spies
    json = jest.fn();
    status = jest.fn(() => ({ json }));
    res = { status };
    req = {
      body: {
        comment: '',
      },
    };
    jest.spyOn(logger, 'error').mockImplementation(() => true as any);
    jest.spyOn(logger, 'info').mockImplementation(() => true as any);
  });

  afterAll(async () => {
    jest.clearAllMocks();
    jest.resetModules();
    server.close();
  });

  it('calls status and json methods to generate response when signing up', async (done) => {
    await UnmockedCommentController.createComment(req, res);
    expect(status).toHaveBeenCalledTimes(1);
    expect(json).toHaveBeenCalledTimes(1);
    done();
  });
});
