import supertest from 'supertest';
import mongoose from 'mongoose';

import server from '../../../';
import baseUrl from '../../../utils/constants';
import logger from '../../../config/logger';

import {
  signUpMock,
  // loginMock,
  // invalidLoginMock,
  emptySignupNameField,
  invalidSignupEmailInput,
  invalidSignupPasswordInput,
  allSignupFieldsEmpty,
  // invalidLoginEmailInput,
  // invalidLoginPasswordInput,
  // allLoginFieldsEmpty,
} from '../../user/__test__/__mocks__/mockUsers';

import User from '../../../database/models/User';

const request = supertest(server);

describe('TEST SUITE FOR USER ONBOARDING AND AUTHENTICATION', () => {
  beforeAll(async (done) => {
    await User.deleteMany({});
    done();
  });

  afterAll(async (done) => {
    await User.deleteMany({});
    await mongoose.connection.close();
    server.close();
    done();
  });

  it('should successfully sign up a user', async (done) => {
    const response = await request.post(`${baseUrl}/register`).send(signUpMock);

    expect(response.status).toEqual(201);
    expect(response.body.success).toEqual(true);
    expect(response.body.message).toEqual('User added successfully');
    expect(response.body).toHaveProperty('token');
    expect(response.body.success).toEqual(true);
    done();
  });

  it('should not signup a user with the same email', async (done) => {
    const response = await request.post(`${baseUrl}/register`).send(signUpMock);
		expect(response.status).toEqual(403);
		expect(response.body.error).toBe("Email already in use");
		expect(response.body.success).toBe(false);
    done();
  });

  it('should validate signup name field', async (done) => {
    const response = await request
      .post(`${baseUrl}/register`)
      .send(emptySignupNameField);

    expect(response.status).toEqual(422);
    expect(response.body.success).toEqual(false);
    expect(response.body.message).toEqual('Validation Errors');
    expect(response.body.errors).toEqual({
      name: ['name is not allowed to be empty'],
    });
    done();
  });

  it('should validate signup email field', async (done) => {
    const response = await request
      .post(`${baseUrl}/register`)
      .send(invalidSignupEmailInput);

    expect(response.status).toEqual(422);
    expect(response.body.success).toEqual(false);
    expect(response.body.message).toEqual('Validation Errors');
    expect(response.body.errors).toEqual({
      email: ['email is not allowed to be empty'],
    });
    done();
  });

  it('should validate signup password field', async (done) => {
    const response = await request
      .post(`${baseUrl}/register`)
      .send(invalidSignupPasswordInput);

    expect(response.status).toEqual(422);
    expect(response.body.success).toEqual(false);
    expect(response.body.message).toEqual('Validation Errors');
    expect(response.body.errors).toEqual({
      password: ['password is not allowed to be empty'],
    });
    done();
  });

  it('should validate signup all fields concurrently', async (done) => {
    const response = await request
      .post(`${baseUrl}/register`)
      .send(allSignupFieldsEmpty);

    expect(response.status).toEqual(422);
    expect(response.body.success).toEqual(false);
    expect(response.body.message).toEqual('Validation Errors');
    expect(response.body.errors).toEqual({
      name: ['name is not allowed to be empty'],
      email: ['email is not allowed to be empty'],
      password: ['password is not allowed to be empty'],
    });
    done();
  });

  // it('should successfully sign in a user', async (done) => {
  //   const response = await request.post(`${baseUrl}/auth`).send(loginMock);

  //   expect(response.status).toEqual(200);
  //   expect(response.body.success).toEqual(true);
  //   expect(response.body.message).toEqual('You have successfully logged in');
  //   expect(response.body.user.email).toEqual(loginMock.email);
  //   done();
  // });

  // it('should not sign in a non-existing user', async (done) => {
  //   const response = await request.post(`${baseUrl}/auth`).send(invalidLoginMock);

  //   expect(response.status).toEqual(404);
  //   expect(response.body.success).toEqual(false);
  //   expect(response.body.message).toEqual('The email or password is not correct');
  //   done();
  // });

  // it('should validate login email field', async (done) => {
  //   const response = await request
  //     .post(`${baseUrl}/auth`)
  //     .send(invalidLoginEmailInput);

  //   expect(response.status).toEqual(422);
  //   expect(response.body.success).toEqual(false);
  //   expect(response.body.message).toEqual('Validation Errors');
  //   expect(response.body.errors).toEqual({
  //     email: ['email is not allowed to be empty'],
  //   });
  //   done();
  // });

  // it('should validate login password field', async (done) => {
  //   const response = await request
  //     .post(`${baseUrl}/auth`)
  //     .send(invalidLoginPasswordInput);

  //   expect(response.status).toEqual(422);
  //   expect(response.body.success).toEqual(false);
  //   expect(response.body.message).toEqual('Validation Errors');
  //   expect(response.body.errors).toEqual({
  //     password: ['password is not allowed to be empty'],
  //   });
  //   done();
  // });

  // it('should validate signup all fields concurrently', async (done) => {
  //   const response = await request.post(`${baseUrl}/auth`).send(allLoginFieldsEmpty);

  //   expect(response.status).toEqual(422);
  //   expect(response.body.success).toEqual(false);
  //   expect(response.body.message).toEqual('Validation Errors');
  //   expect(response.body.errors).toEqual({
  //     email: ['email is not allowed to be empty'],
  //     password: ['password is not allowed to be empty'],
  //   });
  //   done();
  // });
});

describe('AUTHENTICATION CONTROLLER UNIT TESTS', () => {
  let UnmockedAuthController: any, json: any, status: any, res: any, req: any;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
    jest.unmock('../authentication.controller');
    // fetch module after unmocking
    UnmockedAuthController = require('../authentication.controller').default;
    // spies
    json = jest.fn();
    status = jest.fn(() => ({ json }));
    res = { status };
    req = {
      body: {
        email: '',
        password: 'password',
      },
    };
    jest.spyOn(logger, 'error').mockImplementation(() => true as any);
    jest.spyOn(logger, 'info').mockImplementation(() => true as any);
  });

  afterAll(() => {
    jest.clearAllMocks();
    jest.resetModules();
    server.close();
  });

  it('calls status and json methods to generate response when signing up', async (done) => {
    await UnmockedAuthController.createUser(req, res);
    expect(status).toHaveBeenCalledTimes(1);
    expect(json).toHaveBeenCalledTimes(1);
    done();
  });

  // it("calls status and json methods to generate response when login in", async (done) => {
  // 	await UnmockedAuthController.loginUser(req, res);
  // 	expect(status).toHaveBeenCalledTimes(1);
  // 	expect(json).toHaveBeenCalledTimes(1);
  // 	done();
  // });
});
