import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

import User from '../User';

import {
  mockUser,
  mockUser2,
} from '../../../modules/user/__test__/__mocks__/mockUsers';

let mongoServer: any;

beforeAll(async () => {
  mongoServer = new MongoMemoryServer();
  const mongoUri = await mongoServer.getUri();
  await mongoose.connect(
    mongoUri,
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    },
    (err) => {
      if (err) console.error(err);
    },
  );
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('TEST SUITE FOR USER MODEL', () => {
  it('Database should initially be empty', async () => {
    const userCount = await User.countDocuments();
    expect(userCount).toEqual(0);
  });

  it('Should save a user', async () => {
    const newUser = new User(mockUser);
    const createdUser = await newUser.save();
    const userCount = await User.countDocuments();

    expect(userCount).toEqual(1);
    expect(createdUser.name).toEqual('Johnny');
    expect(createdUser.email).toEqual('johnny@gmail.com');
    expect(createdUser.password).toEqual('password');
    expect(createdUser.admin).toEqual(false);
  });

  it('Should retrieve users from the database', async () => {
    const SecondUser = new User(mockUser2);
    await SecondUser.save();
    const users = await User.find();
    const userCount = await User.countDocuments();
    expect(Array.isArray(users)).toBe(true);
    expect(userCount).toEqual(2);
    expect(typeof users[0]).toBe('object');
    expect(typeof users[1]).toBe('object');
    expect(typeof users[2]).toBe('undefined');
  });

  it('Should update a user in the database', async () => {
    const getUser = await User.find();
    const userId = getUser[0].id;
    await User.updateOne({ _id: userId }, { $set: { name: 'NewJohnny' } });
    const getUpdatedUser: any = await User.findById(userId);
    expect(getUpdatedUser.name).toEqual('NewJohnny');
    expect(getUpdatedUser.email).toEqual('johnny@gmail.com');
    expect(getUpdatedUser.password).toEqual('password');
  });

  it('Should delete a user from the database', async () => {
    const getUser = await User.find();
    const userId = getUser[0].id;
    await User.deleteOne({ _id: userId });
    const userCount = await User.countDocuments();
    expect(userCount).toEqual(1);
  });
});
