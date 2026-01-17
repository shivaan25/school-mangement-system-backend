## School Management System (SMS Backend)

A production-ready backend API for managing schools, students, and authentication,
built with Node.js, TypeScript, Express, MongoDB, and JWT.

## Tech Stack

- Node.js
- TypeScript
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Swagger (OpenAPI)

## Features

- JWT-based authentication
- Role-ready authorization structure
- School management APIs
- Student management APIs
- Secure protected routes
- Swagger API documentation

### Architecture Highlights

- Clean app/server separation
- Environment-based configuration
- Scalable folder structure
- Production-inspired setup

## Getting Started

### Install dependencies

npm install

### Environment variables

Create a `.env` file:
PORT=3002
MONGO_URI="your URI"
JWT_SECRET=your_secret

### Run the server

npm run dev

## API Documentation

Swagger UI available at:
http://localhost:3002/api-docs

## API Testing

APIs tested using:

- Postman
- curl
- Swagger UI

Includes positive and negative test cases.

## Future Improvements

- Role-based access control (Admin / Student)
- Input validation (Zod)
- Centralized error handling
- Automated tests (Jest)
- Docker support
