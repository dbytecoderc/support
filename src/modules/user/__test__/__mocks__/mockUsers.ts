// import dotenv from 'dotenv';

// dotenv.config();

// const { ADMIN_password, NON_ADMIN_password } = process.env;


export const testUser = {
  name: 'Johnny Signup',
  email: 'johnnysignup@gmail.com',
  password: 'Password1',
};

export const testUser2 = {
  name: 'Johnny2',
  email: 'johnny2@gmail.com',
  password: 'Password1',
};

export const loginMock = {
  email: 'johnnysignup@gmail.com',
  password: 'Password1',
};

export const invalidLoginMock = {
  email: 'johnnyisinvalid@gmail.com',
  password: 'Password1',
};

export const emptySignupNameField = {
  name: '',
  email: 'johnnysignup@gmail.com',
  password: 'Password1',
};

export const invalidSignupEmailInput = {
  name: 'johnnyisinvalid@gmail.com',
  email: '',
  password: 'Password1',
};

export const invalidSignupPasswordInput = {
  name: 'johnnyisinvalid',
  email: 'johnnysignup@gmail.com',
  password: '',
};

export const allSignupFieldsEmpty = {
  name: '',
  email: '',
  password: '',
};

export const invalidLoginEmailInput = {
  email: '',
  password: 'Password1',
};

export const invalidLoginPasswordInput = {
  email: 'johnnysignup@gmail.com',
  password: '',
};

export const allLoginFieldsEmpty = {
  email: '',
  password: '',
};

export const testAdminUser = {
  name: 'Test admin user',
  email: 'testadmin@admin.com',
  password: 'Password1',
};

export const secondTestAdminUser = {
  name: 'Test2 admin user',
  email: 'testadmin2@admin.com',
  password: 'password',
};

export const loginTestAdminUser = {
  email: 'testadmin@admin.com',
  password: 'password',
};

export const nonAdminUser = {
  name: 'Test normal user',
  email: 'testnormal@normal.com',
  password: 'password',
};

export const loginNonAdminUser = {
  email: 'testnormal@normal.com',
  password: 'password',
};
