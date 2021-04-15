import AuthMiddleware from '../authentication.middleware'
import logger from '../../config/logger';
import Utils from '../../utils/utils';
import UserRepository from '../../modules/user/user.repository';

describe("TOKEN AUTHENTICATOR TEST SUITE", () => {
  let json: any, status: any, res: any, req: any, next: any;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
    json = jest.fn();
    next = jest.fn();
    status = jest.fn(() => ({ json }));
    res = { status };
    req = {
      headers: {
        authorization: 'Bearer token'
      },
      user: {
        admin: true
      }
    };
    jest.spyOn(logger, 'error').mockImplementation(() => true as any);
    jest.spyOn(logger, 'info').mockImplementation(() => true as any);
  });

  afterEach(async () => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  afterAll(async () => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  it("Should decode token and set authenticated user to request header", async (done) => {
    const decodedtoken = { sub: 'decodedtoken' }
    const userDetails = { _id: 'id' }
    jest.spyOn(Utils, 'decodeToken').mockImplementation(() => decodedtoken as any);
    jest.spyOn(UserRepository, 'findByEmail').mockImplementation(() => userDetails as any);
    await AuthMiddleware.validateToken(req, res, next)
    expect(next).toHaveBeenCalledTimes(1);
    expect(req).toHaveProperty('user');
    expect(req.user._id).toBe('id');
		done();
	});

  it("Should return error message if user does not exist", async (done) => {
    const decodedtoken = { sub: 'decodedtoken' }
    jest.spyOn(Utils, 'decodeToken').mockImplementation(() => decodedtoken as any);
    jest.spyOn(UserRepository, 'findByEmail').mockImplementation(() => false as any);
    await AuthMiddleware.validateToken(req, res, next)
    expect(json).toHaveBeenCalledTimes(1);
    expect(status).toHaveBeenCalledTimes(1);
		done();
	});

  it("Should return error message if a decoded token does not exist", async (done) => {
    const decodedtoken = { sub: false }
    jest.spyOn(Utils, 'decodeToken').mockImplementation(() => decodedtoken as any);
    await AuthMiddleware.validateToken(req, res, next)
    expect(json).toHaveBeenCalledTimes(1);
    expect(status).toHaveBeenCalledTimes(1);
		done();
	});


  it("Should return an error if request headers is not set", async (done) => {
    req.headers = false
    await AuthMiddleware.validateToken(req, res, next)
    expect(json).toHaveBeenCalledTimes(1);
    expect(status).toHaveBeenCalledTimes(1);
		done();
	});

  it("Should throw and catch an errors", async (done) => {
    jest.spyOn(Utils, 'decodeToken').mockImplementation(() => {
      throw new Error("invalid auth");
    });
    await AuthMiddleware.validateToken(req, res, next);
    expect(json).toHaveBeenCalledTimes(1);
    expect(status).toHaveBeenCalledTimes(1);
		done();
	});

  it("Should allow admin access to route", async (done) => {
    await AuthMiddleware.adminAuth(req, res, next)
    expect(next).toHaveBeenCalledTimes(1);
    expect(req).toHaveProperty('user');
    expect(req.user.admin).toBe(true);
		done();
	});


  it("Should not allow admin access to route", async (done) => {
    req.user.admin = false
    await AuthMiddleware.adminAuth(req, res, next)
    expect(json).toHaveBeenCalledTimes(1);
    expect(status).toHaveBeenCalledTimes(1);
		done();
	});
})