# API Documentation

Base URL: `https://my-fantastic-server.onrender.com`

\* Auth endpoints currently not working from browsers. Only from Postman

## Users Endpoints

### List all users

- **GET** `/api/users`
  - Returns a list of all users.

### Create a new user

- **POST** `/api/users`
  - Request Body:
    - `displayName` (string): Display name of the user.
    - `username` (string): Username of the user.
    - `password` (string): Password of the user.
  - Creates a new user with the provided details.

### Get user by ID

- **GET** `/api/users/:id`
  - Returns the user with the specified ID.

### Update user

- **PUT** `/api/users/:id`
  - Request Body:
    - `displayName` (string): Updated display name of the user.
    - `username` (string): Updated username of the user.
    - `password` (string): Updated password of the user.
  - Updates the details of the user with the specified ID.

### Delete user

- **DELETE** `/api/users/:id`
  - Removes the user with the specified ID from the database.

## Books Endpoints

### List all books

- **GET** `/api/books`
  - Returns a list of all books.

### Add a new book

- **POST** `/api/books`
  - Request Body:
    - `title` (string): Title of the book.
    - `author` (string): Author of the book.
    - `pages` (number): Number of pages in the book.
    - `finished` (boolean): Indicates whether the book is finished.
  - Adds a new book with the provided details.

### Get book by ID

- **GET** `/api/books/:id`
  - Returns the book with the specified ID.

### Update book

- **PUT** `/api/books/:id`
  - Request Body: Same as POST `/books`.
  - Updates the details of the book with the specified ID.

### Partially update book

- **PATCH** `/api/books/:id`
  - Request Body: Same as POST `/books`.
  - Partially updates the details of the book with the specified ID.

### Delete book

- **DELETE** `/api/books/:id`
  - Removes the book with the specified ID from the database.

## Authentication Endpoints \*

### User Login

- **POST** `/api/auth/`
  - Request Body:
    - `username` (string): Username of the existing user.
    - `password` (string): Password of the existing user.
  - Logs in the user and returns a session cookie that lasts for one hour.

### Check Authentication Status

- **GET** `/api/auth/status/`
  - If a valid session is sent with the request, the API responds with the user you are logged in as. Otherwise, responds with status code 401.
