import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Parser } from 'json2csv';

import Utils from "../utils";
import { validationErrorDetails } from "./__mocks__/utils.mocks";

jest.mock("json2csv");

describe("AUTH UTILS TEST SUITE", () => {
	let send: any, res: any, header: any, attachment: any;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
    send = jest.fn();
		header = jest.fn();
		attachment = jest.fn();
    res = { send, header, attachment };
  });

	afterEach(async () => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  afterAll(async () => {
    jest.clearAllMocks();
    jest.resetModules();
  });

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

	it("Should parse and send file", (done) => {
		const data = 'data'
		jest.spyOn(new Parser, "parse").mockImplementation(() => data as any);
		const csvFields = [
			'_id',
			'comments',
			'status',
			'description',
			'owner',
			'createdAt',
		];
		Utils.downloadResource(res, 'supportReport.csv', csvFields, 'data');
		expect(send).toHaveBeenCalledTimes(1);
		done();
	});
});
