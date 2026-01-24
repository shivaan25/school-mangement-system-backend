# School Management System (SMS) Backend

A comprehensive backend API for managing schools, teachers, and students. Built with **Node.js**, **Express**, **TypeScript**, and **MongoDB**, featuring secure JWT authentication and modular architecture.

## 🚀 Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: MongoDB (via Mongoose)
- **Authentication**: JWT (JSON Web Tokens)
- **Documentation**: Swagger UI
- **Tools**: Helmet (Security), Compression, CORS

---

## 📂 Project Structure

The project follows a modular, scalable architecture:

```
src/
├── common/             # Shared utilities
│   ├── auth/           # Authentication middleware & permissions
│   ├── errors/         # Custom error classes
│   ├── middleware/     # Global middlewares (Error handling, etc.)
│   └── utils/          # Helpers (Async handlers, JWT, Password hashing)
├── config/             # Configuration files (DB, Env, Swagger)
├── models/             # Mongoose Data Models (User, School, Teacher, Student)
├── modules/            # Feature-based modules
│   ├── auth/           # Authentication (Login/Register)
│   ├── schools/        # School management
│   ├── teachers/       # Teacher management
│   └── students/       # Student management
├── types/              # TypeScript type definitions
├── app.ts              # App configuration & middleware setup
├── server.ts           # Server entry point
└── routes.ts           # Main router hub
```

---

## ⚙️ How It Works (Process Flows)

### 1. Authentication Process

- **Registration**: A user registers with their details (`/api/auth/register`).
- **Login**: Validates credentials and issues a **JWT Token** (`/api/auth/login`).
- **Token Payload**: The JWT contains the user's `userId`, `role`, and `school` ID. This allows the system to identify the user's context in subsequent requests.

### 2. School Management

- **Create School**: An authenticated user (typically an Admin) creates a school.
- **Linking**: The system automatically links the created School to the Admin user who created it.
- **Context**: Once a school is created, the user must **re-login** to receive a new token that includes the new `school` ID.

### 3. Teacher Management

- **Prerequisite**: Requires an authenticated user with a linked School.
- **Creation**: The Admin creates a Teacher profile.
- **Behind the Scenes**:
  1.  Validates the `school` ID from the Admin's token.
  2.  Creates a new `User` account for the Teacher (role: "teacher").
  3.  Creates a `Teacher` profile linked to that User and School.

### 4. Student Management

- **Creation**: Creates a Student profile linked to a School and Class.
- **Current Flow**: Links the student profile to the authenticated user creating it (or the user specified in the logic).

---

## 🛠️ Setup & Installation

### 1. Prerequisites

- Node.js (v18+)
- MongoDB (Local or Atlas)

### 2. Installation

```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
npm install
```

### 3. Configuration

Create a `.env` file in the root directory:

```env
PORT=3005
MONGO_URI=mongodb://localhost:27017/sms-project
JWT_SECRET=your_super_secret_key
```

### 4. Running the Project

```bash
# Development mode (Hot reload)
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### 5. Running Tests

A custom test script is included to verify the API flows:

```bash
npx ts-node test-api.ts
```

---

## 📡 API Endpoints

**Base URL**: `/api`

| Module       | Method | Endpoint         | Description                             | Auth Required |
| :----------- | :----- | :--------------- | :-------------------------------------- | :------------ |
| **Auth**     | POST   | `/auth/register` | Register a new user                     | ❌            |
|              | POST   | `/auth/login`    | Login and get Token                     | ❌            |
| **Schools**  | POST   | `/schools`       | Create a new School                     | ✅            |
|              | GET    | `/schools`       | Get all Schools                         | ❌            |
| **Teachers** | POST   | `/teacher`       | Create a Teacher (creates User+Teacher) | ✅            |
|              | GET    | `/teacher`       | Get Teachers by School                  | ✅            |
| **Students** | POST   | `/students`      | Create a Student                        | ✅            |
|              | GET    | `/students`      | Get all Students                        | ✅            |

---

## 📚 Documentation

Interactive API documentation is available via Swagger when the server is running:

- **URL**: `http://localhost:3005/api-docs`

---

## 🛡️ Security Features

- **Helmet**: Sets secure HTTP headers.
- **Auth Middleware**: Validates JWT tokens for protected routes.
- **Password Hashing**: Uses `bcrypt` for secure password storage.
