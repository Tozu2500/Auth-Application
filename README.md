# Auth Application

A fullstack user authentication app built with Spring Boot, React, and MySQL. Supports registration, login, JWT-based sessions, role management, and an admin panel.

## Tech Stack

- **Backend** — Java 25, Spring Boot 3.2, Spring Security, JPA/Hibernate, MySQL
- **Frontend** — React 18, TypeScript, Vite, React Router, Axios

## Getting Started

### Prerequisites

- Java 17+
- Maven
- Node.js 18+
- MySQL running on port `3306`

### Backend

```bash
cd backend
mvn spring-boot:run
```

Runs on `http://localhost:8080`. The database `auth_db` is created automatically on first run.

Default DB credentials are `root` / `password`. Override with environment variables:

```bash
DB_USERNAME=youruser DB_PASSWORD=yourpass mvn spring-boot:run
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs on `http://localhost:5173`.

## Test Accounts

Seeded automatically on first startup by `DataInitializer`:

| Role  | Username   | Password      | Email               |
|-------|------------|---------------|---------------------|
| User  | `testuser` | `password123` | `test@example.com`  |
| Admin | `admin`    | `admin123`    | `admin@example.com` |

## Features

- Register and log in with JWT access + refresh tokens
- Protected routes — dashboard and profile require authentication
- Admin panel — view all users, enable/disable, lock/unlock, change roles, delete
- Passwords hashed with BCrypt
- Token refresh handled automatically via Axios interceptor

