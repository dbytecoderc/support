# customer-service-app

[![Build Status](https://www.travis-ci.com/dbytecoderc/support.svg?branch=main)](https://www.travis-ci.com/dbytecoderc/support) [![Coverage Status](https://coveralls.io/repos/github/dbytecoderc/support/badge.svg?branch=main)](https://coveralls.io/github/dbytecoderc/support?branch=main)

## Overview

The **customer-service-app** is an application that allows users logs complaints or request for support.

- Key Application features

1. Functional requirements

   - Creation of Support requests
   - Fetching support requests
   - Updating support requests
   - Closing support requests logged
   - Download CSV file of closed support requests for the last month

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

  ``` bash
  #!/bin/bash
  git clone https://github.com/dbytecoderc/test-app.git
  ```

- Install dependencies using the command bellow:

  ``` bash
  #!/bin/bash
  yarn install
  ```

- Make a copy of the .env.sample file in the app folder and rename it to .env and update the variables accordingly, **it important that you copy the email and password details in that file just the way it is, you would need it to test admin functionalities and make sure the db urls are set to make sure the tests run**:

  ``` bash
  #!/bin/bash
  PORT=3000
  MONGODB_URI="mongodb://127.0.0.1/fliqpay"
  MONGO_URI_TEST="mongodb://127.0.0.1/fliqpay-test"
  SECRET_KEY="secretKey"
  ADMIN_PASSWORD="Admin0007"
  NON_ADMIN_PASSWORD="User0007"
  HASHED_ADMIN_PASSWORD='$2a$10$4IIoa9h4th7aPsMhWP7/Xu97SdwcUjImhyDHDsSK1wssiaIr0M.hm'
  HASHED_NON_ADMIN_PASSWORD='$2a$10$WSwcXM1dIaygWLaSQMxAD.cNBDZmykPNJOWOkjwpiFiPr8CrT68ha'
  ```

NOTE: It is important that the `MONGO_URI_TEST` is set because the integration tests depend on it to run

- Run the application with the command

``` bash
  #!/bin/bash
yarn start:dev

```

- Data is seeded into the application as soon as you fire up the server, without needing to create a user you can login and create a json web token which is to be attached to the header in this format

``` bash
  #!/bin/bash
Bearer 'sample token'
```

- Use these details to login an admin user

``` bash
  #!/bin/bash
{
    "email": "admin@admin.com",
    "password": "Admin0007"
}
```

- Use these details to login a non-admin user

``` bash
  #!/bin/bash
{
    "email": "nonadmin@nonadmin.com",
    "password": "User0007"
}
```

## Running tests

Make sure the environment variable for the test database `MONGO_URI_TEST` is set for this to work

``` bash
  #!/bin/bash
yarn test

```

NOTE: All the seed data are baked into the testing process, you won't need to run any script to seed data for tests, and as soon as the application relevant data is seeded into the application to ease manual testing

## API Endpoints

- Use the link below in the thumbnail to download a postman collection for the endpoints
  [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/880c258c0500487ff4e6?action=collection%2Fimport#?env%5BFLIQPAY%5D=W3sia2V5IjoiYmFzZS11cmwiLCJ2YWx1ZSI6IlxuaHR0cDovL2xvY2FsaG9zdDozMDAwL2FwaS92MSIsImVuYWJsZWQiOnRydWV9LHsia2V5IjoidXNlci10b2tlbiIsInZhbHVlIjoiZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SnpkV0lpT2lKcWIyaHVaRzlsUUdkdFlXbHNMbU52YlNJc0ltRmtiV2x1SWpwbVlXeHpaU3dpYVdGMElqb3hOakU0TlRFek56azVMQ0psZUhBaU9qRTJNVGt4TVRnMU9UbDkuOWl2RFhMd05CZHhuTm5EeDhmWEI3TG56a1I0TEpOSE9IQmk3ZG5PZURsdyIsImVuYWJsZWQiOnRydWV9LHsia2V5Ijoic2Vjb25kLXVzZXItdG9rZW4iLCJ2YWx1ZSI6ImV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUp6ZFdJaU9pSnFiMmh1Wkc5bE1rQm5iV0ZwYkM1amIyMGlMQ0poWkcxcGJpSTZabUZzYzJVc0ltbGhkQ0k2TVRZeE9EVXhPRGMxTkN3aVpYaHdJam94TmpFNU1USXpOVFUwZlEuaTRKd1J5R0NXUVp0OW1idTlfclBqdnVEekdEMDdKOUhPWHBlc2g5Tko1ZyIsImVuYWJsZWQiOnRydWV9LHsia2V5IjoiYWRtaW4tdXNlci10b2tlbiIsInZhbHVlIjoiZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SnpkV0lpT2lKaFpHMXBia0JuYldGcGJDNWpiMjBpTENKaFpHMXBiaUk2ZEhKMVpTd2lhV0YwSWpveE5qRTROVEUzT1RnMExDSmxlSEFpT2pFMk1Ua3hNakkzT0RSOS5yYnA3dDlVVE1HMnAxNTA5QXpnNGVialBXandfNDZJaVU3M1pKZl81d3NBIiwiZW5hYmxlZCI6dHJ1ZX1d)

- Alternatively you can use this [link](https://documenter.getpostman.com/view/6057580/TzJrBeaA) to view the api documentation in your browser.
- After visiting the link you can click on the dropdowns of each request to view preset examples of request edge-cases covered.
