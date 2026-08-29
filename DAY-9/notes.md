- Installing Third-party package bcrypt
  Storing the passwords in plain text within a database is not a good idea since they can be misused, So Passwords should be encrypted

  bcrypt package provides functions to perform operations like encryption, comparison, etc

  bcrypt.hash() uses various processes and encrypts the given password and makes it unpredictable
  bcrypt.compare() function compares the password entered by the user and hash against each other

  Installation Command

  root@123:~/myapp# npm install bcrypt --save

- Authentication Mechanisms
  To check whether the user is logged in or not we use different Authentication mechanisms

- Commonly used Authentication mechanisms:

  Token Authentication
  Session Authentication

  Token Authentication mechanism
  We use the Access Token to verify whether the user is logged in or not

- Access Token
  Access Token is a set of characters which are used to identify a user

  Example:

  It is used to verify whether a user is Valid/Invalid
  - How Token Authentication works?
    Server generates token and certifies the client
    Client uses this token on every subsequent request
    Client don’t need to provide entire details every time 3. JWT
    JSON Web Token is a standard used to create access tokens for an application
    This access token can also be called as JWT Token

  - How JWT works?
    Client: Login with username and password
    Server: Returns a JWT Token
    Client: Sends JWT Token while requesting
    Server: Sends Response to the client

  - JWT Package
    jsonwebtoken package provides jwt.sign and jwt.verify functions

  jwt.sign() function takes payload, secret key, options as arguments and generates JWTToken out of it
  jwt.verify() verifies jwtToken and if it’s valid, returns payload. Else, it throws an error

  Installation Command
  root@123root@123:.../myapp# npm install jsonwebtoken
