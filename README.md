# Backend Assignment

## Overview
This backend application is built using Node.js, Express.js, PostgreSQL, Sequelize ORM, and is deployed on Render. It provides authentication functionality, including user signup, login, and access to a protected endpoint. Additionally, the application implements rate limiting to prevent abuse and enhance security.

### NOTE: The first API request maybe slow as it is hosted on render's free plan but after the first request it will work normally.

## Local Setup
Follow these steps to set up the backend locally:

### Prerequisites
1. Node.js installed (https://nodejs.org/)
2. PostgreSQL installed and running
3. Postman for testing API endpoints

### Steps
1. Clone the repository:
<pre>
  git clone <repository-url>
</pre>
2. Install dependencies:
<pre>
  npm install
</pre>
3. Create a .env file in the root directory and add the following environment variables:
<pre>
  secretKey: can put random extring or using package to generate more secure secret key for jwt token.
  DB_URL: postgresql://(username):(password)@(hostName):(port_number)/(Database_name)
</pre>
4. Set up the PostgreSQL database and configure the DB_URL in the .env file if needed.
5. Run the application:
<pre>
  npm run dev
</pre>

The server will start at http://localhost:8080.

## Live URL
The live URL for the backend code is https://backend-assignment-okx7.onrender.com

## Rate Limiting Strategy
The rate limiting strategy is implemented using the express-rate-limit middleware. Requests are limited to 10 per minute for each IP address, and if this limit is exceeded, a 429 status code (Too Many Requests) is returned. This is done to test the api easily and number of request/min can be increased depending on the resources and user experience.

## API Endpoints

### 1. User Signup
 1. Endpoint: /api/users/signup
 2. Method: POST
 3. Description: Allows users to sign up.
 4. Request Body:
<pre>
  {
    "userName": "your-username",
    "email": "your-email@example.com",
    "password": "your-password"
  }
</pre>
 5. Response:
    1. success: status code: 201
    <pre>
      {
        "user": {
                  "id": "user-id",
                  "userName": "your-username",
                  "email": "your-email@example.com",
                  "createdAt": "timestamp",
                  "updatedAt": "timestamp"
                },
          "token": "generated-jwt-token"
      }
    </pre>
    2. Failure: status code: 409
    <pre>
      {
        "message": "Email/userName already exists"
      }
    </pre>
### 2. User Login
 1. Endpoint: /api/users/login
 2. Method: POST
 3. Description: Allows users to log in.
 4. Request Body:
<pre>
  {
    "email": "your-email@example.com",
    "password": "your-password"
  }
</pre>
 5. Response:
    1. success: status code: 201
    <pre>
      {
        "user": {
                  "id": "user-id",
                  "userName": "your-username",
                  "email": "your-email@example.com",
                  "createdAt": "timestamp",
                  "updatedAt": "timestamp"
                },
        "token": "generated-jwt-token"
      }
    </pre>
    2. Failure: status code: 401
    <pre>
      {
        "message": "User not found" or "Wrong Password"
      }
    </pre>
### 3. Protected Endpoint
This endpoint is an examole endpoint to demonstrate a authenticated api endpoint using jwt toekn and the implementation of rate-limiter.

### Rate-limiter middleware:
<pre>
  const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // limit each IP to 5 requests per windowMs
  message: "Too many requests. Exceeded rate limit.",
  statusCode: 429, // Status code for rate limit exceeded
  });
</pre>

### NOTE: To access the protected route, you need to include a bearer token in the Authorization header of your HTTP request. This token is obtained by either signing up a new user or logging in an existing user from the above signin or login api endpoints.


 1. Endpoint: /api/protected/secureEndpoint
 2. Method: GET
 3. Authorization Header: Bearer Token
 4. Description: Returns a message if the request is authenticated and within the rate limit.
 5. Response:
    1. Success: status code: 200
    <pre>
      {
        "message": "You have access to this endpoint. This API route is protected and rate-limited."
      }
    </pre>
    2. Failure: status code: 500
    <pre>
      {
        "message": "Unauthorized Request" or "Invalid Token" or "Too many requests. Exceeded rate limit."
      }
    </pre>

## API Endpoint Testing with Postman

### Postman Collection
All API endpoints have been thoroughly tested using Postman. You can find the Postman collection for this backend application https://blue-rocket-715287.postman.co/workspace/My-Workspace~4112fc4d-8f41-4852-8c28-34d8d6c911b5/collection/23181387-10eff6ef-ae4a-4e63-a4a9-87f102c50b29?action=share&source=copy-link&creator=23181387

### Testing Instructions
1. Import the provided Postman collection into your Postman workspace.

2. Open the imported collection and explore the available requests.

3. For each request, ensure that you have the necessary request body parameters.

4. Execute the requests and observe the responses. Verify that the responses match the expected format as outlined in the README.

## Deployment on Render
This backend application is deployed on Render. Ensure that you have configured the necessary environment variables in the Render dashboard.

### Deploying on Render
1. Create a new web service on Render.
2. Set the GitHub repository as the source.
3. Add the environment variables in the Render dashboard based on the ones in your local .env file.
4. Deploy the service.

## Conclusion
This backend application provides a secure authentication system with rate limiting to enhance security. Follow the provided instructions for local setup, explore the live URL, and test the API endpoints using Postman. If you encounter any issues, refer to the provided codebase or contact the project maintainers.
