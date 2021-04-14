# customer-service-app

[![Build Status](https://www.travis-ci.com/dbytecoderc/support.svg?branch=main)](https://www.travis-ci.com/dbytecoderc/support) [![Coverage Status](https://coveralls.io/repos/github/dbytecoderc/support/badge.svg?branch=main)](https://coveralls.io/github/dbytecoderc/support?branch=main)

## Overview

The **customer-service-app** is an application that allows users logs complaints or request for support.

- Key Application features

1. Support Request

   - Creation of Support requests
   - Fetching support requests
   - Updating support requests
   - Closing support requests logged

2. Comment
   - Users can comment on a support request

## Technology Stack

- Nodejs
- Typescript
- Express
- Mongodb
- Jest

## Libraries used

- You can get the details of the libraries used in the package.json file in the root directory of this project

### Setting Up For Local Development and Testing

- Check that NodeJs is installed on your machine, if not installed follow this [link](https://nodejs.org/en/) to download and install nodejs:

- Clone the repo and cd into it:

  ```
  git clone https://github.com/dbytecoderc/test-app.git
  ```

- Install dependencies using the command bellow:

  ```
  yarn install
  ```

- Make a copy of the .env.sample file in the app folder and rename it to .env and update the variables accordingly, **it important that you copy the email and password details in that file just the way it is, you would need it to test admin functionalities and make sure the db urls are set to make sure the tests run**:

  ```
  PORT=3000
  MONGODB_URI="mongourl"
  MONGO_URI_TEST="test mongourl"
  SECRET_KEY="secretKey"
  ADMIN_PASSWORD="Admin0007"
  NON_ADMIN_PASSWORD="User0007"
  HASHED_ADMIN_PASSWORD='$2a$10$4IIoa9h4th7aPsMhWP7/Xu97SdwcUjImhyDHDsSK1wssiaIr0M.hm'
  HASHED_NON_ADMIN_PASSWORD='$2a$10$WSwcXM1dIaygWLaSQMxAD.cNBDZmykPNJOWOkjwpiFiPr8CrT68ha'
  ```

* Run the application with the command

```

yarn dev

```

- Data is seeded into the application as soon as you fire up the server, without needing to create a user you can login and create a json web token which is to be attached to the header in this format

```
Bearer 'sample token'
```

- Use these details to login an admin user

```
{
    "email": "admin@admin.com",
    "password": "Admin0007"
}
```

- Use these details to login an non-admin user

```
{
    "email": "nonadmin@nonadmin.com",
    "password": "User0007"
}
```

## Running tests

Make sure the test database is set for this to work

```

yarn test

```

## API Endpoints

- Use the link below in the thumbnail to download a postman collection for the endpoints
  [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/9452a28c0f505b49eea3)

- Alternatively you can use this [link](https://documenter.getpostman.com/view/6057580/T1DjkziE?version=latest#a2542775-3976-45ca-a981-4453e29e2a6e) to view the api documentation in your browser.

## Notes

- For feedback I thought the assessment specs could be better in terms of clarifying some of the instructions for ease of understanding.
- Due to time constraints I couldn't increase the test coverage, although I covered all the essential parts of the application.
