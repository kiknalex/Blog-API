# Blog-API

A RESTful API that provides a convenient and secure way to access and manage your blog's data.

## Features

- A simple and flexible API that makes it easy to interact with your blog's data.
- Support for CRUD (Create, Read, Update, Delete) operations for posts, comments, and other data.
- Authentication and authorization to ensure that only authorized users have access to your data.
- Robust error handling and validation to ensure that your data is accurate and secure.

## Content Management System

TODO

## Client

TODO

## Endpoints

| Endpoint                            | Method | Description                                                              |
| ----------------------------------- | ------ | ------------------------------------------------------------------------ |
| /login                              | POST   | Login                                                                    |
| /register                           | POST   | Create new account                                                       |
| /posts                              | GET    | Retrieve a list of all posts. Optional: page and limit query parameters. |
| /posts/:id                          | GET    | Retrieve post by ID                                                      |
| /posts                              | POST   | Create new post                                                          |
| /posts/:id                          | PUT    | Update post by ID                                                        |
| /posts/:id                          | DELETE | Delete post by ID                                                        |
| /posts/:id/status?published=boolean | PUT    | Edit post's publicity                                                    |
| /posts/:id/comments                 | GET    | Retrieve list of all comments. Optional: page and limit query parameters |
| /posts/:id/comments                 | POST   | Create new comment                                                       |
| /posts/:id/comments/:id             | PUT    | Update comment by ID                                                     |
| /posts/:id/comments/:id             | DELETE | Delete comment by ID                                                     |
| /admin/posts/:id                    | DELETE | Delete specific post                                                     |
| /admin/comments/:id                 | DELETE | Delete specific comment                                                  |
| /admin/users/:id/role               | PUT    | Grant Admin role to user                                                 |

## Installation

1.  Clone the repository to your local machine: `git clone https://github.com/kiknalex/Blog-API.git`
2.  Navigate to the project directory: `cd blog-api`
3.  Install the required dependencies: `npm install`
4.  Start the development server: `npm run dev`

## Usage

1.  Setup .env (`PORT=<yourPort>`, `DATABASE_URL=<DB_connection_string>`, `JWTKEY=<secret_key_for_JWT_authentication>`)
2.  Make HTTP requests to the API endpoints using your preferred tool or library (e.g., `curl`, `httpie`, `Postman`, etc.).
3.  Authenticate your requests as necessary using JSON Web Tokens.
4.  Retrieve, create, update, and delete data as desired.
