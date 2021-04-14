import dotenv from 'dotenv';

import User from '../models/User';
import SupportRequest from '../models/SupportRequest';

dotenv.config();

const { HASHED_ADMIN_PASSWORD, HASHED_NON_ADMIN_PASSWORD } = process.env;

const seedData = async () => {
  await User.deleteMany({});
  await SupportRequest.deleteMany({});
  const user1 = new User({
    _id: '5e1863eeb0eb0406250967ba',
    name: 'Admin user',
    email: 'admin@admin.com',
    password: HASHED_ADMIN_PASSWORD,
  });

  const user2 = new User({
    _id: '5e1863eeb0eb0406250967bb',
    name: 'Non-admin User',
    email: 'nonadmin@nonadmin.com',
    password: HASHED_NON_ADMIN_PASSWORD,
  });

  // t

  await user1.save();
  await user2.save();
  await User.findOneAndUpdate({ email: 'admin@admin.com' }, { admin: true });
  const user = await User.findOne({ email: 'nonadmin@nonadmin.com' });

  const createdAt1 = new Date(2020, 4, 30);
  const endedAt1 = new Date(2020, 5, 27);
  const endedAt2 = new Date(2020, 5, 25);
  const endedAt3 = new Date(2020, 5, 22);
  const endedAt4 = new Date(2020, 5, 10);

  const supportRequest1 = new SupportRequest({
    _id: '5f14396f8cd92082e4bcb2f8',
    owner: user,
    status: 'CLOSED',
    description: 'Test description 1',
    createdAt: createdAt1,
    completedAt: endedAt1,
  });

  const supportRequest2 = new SupportRequest({
    _id: '5f14396f8cd92082e4bcb2f7',
    owner: user,
    status: 'CLOSED',
    description: 'Test description 2',
    createdAt: createdAt1,
    completedAt: endedAt2,
  });

  const supportRequest3 = new SupportRequest({
    _id: '5f14396f8cd92082e4bcb2f6',
    owner: user,
    status: 'CLOSED',
    description: 'Test description 3',
    createdAt: createdAt1,
    completedAt: endedAt3,
  });

  const supportRequest4 = new SupportRequest({
    _id: '5f14396f8cd92082e4bcb2f5',
    owner: user,
    status: 'CLOSED',
    description: 'Test description 4',
    createdAt: createdAt1,
    completedAt: endedAt4,
  });

  await supportRequest1.save();
  await supportRequest2.save();
  await supportRequest3.save();
  await supportRequest4.save();
};

export default seedData;
