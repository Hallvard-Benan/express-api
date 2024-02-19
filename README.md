# API Documentation:

This api has the following endpoints:

Replace :id with the id of the data to

## Users endpoints:

### https://my-fantastic-server.onrender.com/api/users

- GET: for a list of all users
- POST: Send "displayName", "username" and "password" in the body of the request to create a new user.

### https://my-fantastic-server.onrender.com/api/users/:id

- GET: To get one specific user by their id
- PUT: to update user details
- DELETE: To remove a specific user from the database

## Books endpoints:

### https://my-fantastic-server.onrender.com/api/books

- GET: Get all books
- POST: Post a book with the following data: {
  "title": string,
  "author": string,
  "pages": number,
  "finished": boolean
  }

### https://my-fantastic-server.onrender.com/api/books/:id

- GET: Get a specific book by id
- PUT: Edit a specific book with same data types as in POST /books
- PATCH: Edit a specific book with same data types as in POST /books
- DELETE: Remove a specific book from the database

## Auth endpoints

- These endpoints are currently only working in Postman, not in browsers.

### https://my-fantastic-server.onrender.com/api/auth/

- POST: post username and password to an existing user to receive a session cookie that lasts for one hour.

### https://my-fantastic-server.onrender.com/api/auth/status/

- GET: If a valid session is sent with the request, the api responds with the user you are logged in as. Otherwise responds with 401
