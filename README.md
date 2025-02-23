# Task Management App.

A minimal yet functional Task Management application built with Node.js (Express + TypeScript), PostgreSQL, and React (TypeScript). This application allows users to register, log in, and perform CRUD operations on tasks.

## Table of Contents
1. Overview
2. Features
3. Prerequisites
4. Backend Setup
   * Environment Variables
   * Database Migrations
   * Running the Backend
5. Frontend Setup
   * Environment Variables
   * Running the Frontend
6. Testing
   * Backend Testing
   * Frontend Testing
7. Salary Expectations
8. Additional Notes

## 1. Overview
This project provides a Task Management system where users can:

* Register (sign up) and Log in (sign in).
* View a list of tasks.
* Create a new task.
* Update an existing task (e.g., mark complete or edit details).
* Delete a task.

It uses JWT-based authentication, bcrypt for password hashing, and CORS for cross-origin requests between the frontend (React) and backend (Node.js).

## 2. Features

1. Authentication:
   * User registration with password hashing.
   * JWT-based login and token verification for protected routes.
2. Task Management (CRUD):
   * View tasks for the logged-in user.
   * Create, update, and delete tasks.
   * Mark tasks as complete/incomplete.
3. PostgreSQL as the primary database.
4. React + TypeScript frontend with localStorage for token storage.


## 3. Prerequisites

* Node.js (v14+ recommended)
* npm or yarn (for package management)
* PostgreSQL (v12+ recommended)
* psql (command-line tool) or a GUI client to run migrations

## 4. Backend Setup
The backend folder contains all server-side code (Node.js + TypeScript).

### 4.1 Environment Variables

Create a ``.env`` file in the ``backend`` folder with the following variables:
```bash

# .env (backend)
PORT=5000
JWT_SECRET=your_jwt_secret_here

# If using a connection string:
DATABASE_URL=postgres://<DB_USER>:<DB_PASSWORD>@localhost:5432/<DB_NAME>

# OR if using individual variables (optional approach):
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_HOST=localhost
DB_PORT=5432
DB_NAME=task_manager_db

```
* PORT: The port on which the backend server runs.
* JWT_SECRET: A secret string for signing JWT tokens.
* DATABASE_URL: The PostgreSQL connection string. If your password or username has special characters, ensure they are URL-encoded.

### 4.2 Database Migrations

1. Create the Migration File

In the ``backend/migrations`` folder, create a file named ``001_create_tables.sql:``

```sql
-- Create the users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

-- Create the tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  "isComplete" BOOLEAN DEFAULT false,
  "userId" INTEGER REFERENCES users(id)
);

```
2. Run the Migration
From your terminal, navigate to the ``backend`` folder and run:
```bash
psql -h localhost -U <DB_USER> -d <DB_NAME> -W -f migrations/001_create_tables.sql

```
Replace ``<DB_USER>`` and ``<DB_NAME>`` with your actual database credentials.

If you’re using peer authentication, you may need to update ``pg_hba.conf`` or use ``-h localhost``.

### 4.3 Running the Backend
1. Install Dependencies
From the ``backend`` folder:
```bash
npm install
```
2. Development Mode

```bash
npm run dev
```
3. Production Build
```bash
npm run build
npm start
```
This compiles TypeScript to JavaScript (in ``dist/``) and then runs ``node dist/index.js``.

When the server starts, you should see something like:
```
Server listening on port 5000

```

## 5. Frontend Setup
The frontend folder contains the React + TypeScript app.

### 5.1 Environment Variables

Create a ``.env`` file in the ``frontend`` folder with:

```bash 
# .env (frontend)
REACT_APP_API_URL=http://localhost:5000

```
### 5.2 Running the Frontend

1. Install Dependencies
From the ``frontend`` folder:
```bash 
npm install
```
2. Development Mode
```bash 
npm start
```
This launches the React development server on http://localhost:3000.

## 6. Testing
The testing is detailed in this video

Notes: there is a mild bug in the ``navigate`` call to the form the ``Login`` to the ``tasks``.


## 7. Salary Expectations
Expected Salary: At least $1,500 per month.


## 8. Additional Notes

I mostly focused on functionality for this project. 
I hope you like it. XX