// import jsonwebtoken from 'jsonwebtoken';
// import bcrypt from 'bcrypt';

// import Utils from '../utils';

// describe('UNIT TEST FOR UTILITY FUNCTION', () => {
//   let json: any, status: any, statusCode: any, response: any, error: any; // eslint-disable-line

//   beforeEach(() => {
//     json = jest.fn();
//     status = jest.fn(() => ({ json }));
//     response = { status };
//     statusCode = 404;
//     error = 'Error';
//   });

  // it('Returns correct error message', () => {
  //   expect.assertions(2);
  //   Utils.errorHandler(error, statusCode, response);
  //   expect(json).toHaveBeenCalledTimes(1);
  //   expect(json).toHaveBeenCalledWith({ success: false, error });
  // });

//   // it('Returns the correct status code', () => {
//   //   expect.assertions(2);
//   //   Utils.errorHandler(error, statusCode, response);
//   //   expect(status).toHaveBeenCalledTimes(1);
//   //   expect(status).toHaveBeenCalledWith(404);
//   // });

//   it('Generates auth a token', async () => {
//     const data = 'mockreturntokendata';
//     const token = { sub: 'test', admin: true };

//     jest
//       .spyOn(jsonwebtoken, 'sign')
//       .mockImplementation(() => Promise.resolve(data) as any);

//     const mocks: string = await Utils.generateToken(token);

//     expect(mocks).toEqual(data);
//   });

//   it('Decodes a token', async () => {
//     const data = 'mockreturntokendata';

//     jest
//       .spyOn(jsonwebtoken, 'verify')
//       .mockImplementation(() => Promise.resolve(data) as any);

//     const mocks: any = await Utils.decodeToken('token');

//     expect(mocks).toEqual(data);
//   });

//   it('Encrypts a string', async () => {
//     const data = 'mockreturntokendata';

//     jest
//       .spyOn(bcrypt, 'hash')
//       .mockImplementation(() => Promise.resolve(data) as any);

//     const mocks: any = await Utils.hashPassword('password');

//     expect(mocks).toEqual(data);
//   });

//   it('Compares two strings', async () => {
//     jest
//       .spyOn(bcrypt, 'compareSync')
//       .mockImplementation(() => Promise.resolve(true) as any);

//     const mocks: any = await Utils.comparePassword(
//       'encryptedPassword',
//       'normalPasswordString',
//     );

//     expect(mocks).toEqual(true);
//   });
// });
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";

import Utils from "../utils";
import { validationErrorDetails } from "./__mocks__/utils.mocks";

describe("AUTH UTILS TEST SUITE", () => {
	it("Should generate an auth token", (done) => {
		expect(true).toBe(true);
		const data = "mockreturntokendata";
		jest.spyOn(jsonwebtoken, "sign").mockImplementation(() => data as string);
		const response = Utils.generateAuthToken({ token: "token" });
		expect(response).toEqual(data);
		done();
	});

	it("Should decode a token", (done) => {
		const data = "mockreturntokendata";
		jest.spyOn(jsonwebtoken, "verify").mockImplementation(() => data as string);
		const response = Utils.decodeToken("token");
		expect(response).toEqual(data);
		done();
	});

	it("Should encrypt a password", async (done) => {
		const data = "hashedpassword";
		jest.spyOn(bcrypt, "genSalt").mockImplementation(() => Promise.resolve("salt"));
		jest.spyOn(bcrypt, "hashSync").mockImplementation(() => data as string);
		const response = await Utils.hashPassword("password");
		expect(response).toEqual(data);
		done();
	});

	it("Should decrypt a password", (done) => {
		jest.spyOn(bcrypt, "compareSync").mockImplementation(() => true);
		const response = Utils.passwordsMatch("password", "hashedpassword");
		expect(response).toBe(true);
		done();
	});

	it("Should correctly parse validation errors", (done) => {
		const parseValidation = Utils.parseValidationErrors(validationErrorDetails);
		expect(parseValidation.email.toString()).toBe(
			["email must be a valid email", "email must not be empty"].toString()
		);
		expect(parseValidation).toHaveProperty('email');
		done();
	});
});
