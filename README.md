# fitematch-identity-api

Identity service for the **fitematch**, responsible for user registration, authentication and session management.

---

## Overview

The Identity API is part of a modular backend ecosystem designed to support a job platform for fitness professionals.

It handles:

- User registration.
- Authentication (JWT).
- Session management.
- Access Control List.

---

## Architecture

This project follows principles inspired by **Clean Architecture**, ensuring separation of concerns and high testability.

```
src/
  domain/        # Business rules and entities.
  application/   # Use cases (business logic orchestration).
  adapters/      # External layers (controllers, persistence, etc.).
  shared/        # Shared utilities and abstractions.
```

---

## Tech Stack

- **Node.js**
- **NestJS**
- **TypeScript**
- **MongoDB (Mongoose)**
- **JWT Authentication**
- **Swagger (OpenAPI)**
- **Docker**
- **Jest (Unit Testing)**
- **Husky (Git Hooks)**

---

## Branch Strategy

- `main`: production
- `develop`: integration
- `feature/*`: new features

Flow:

- `feature/*` -> `develop` via Pull Request
- `develop` -> `main` via Pull Request

---

## CI

The project uses a single GitHub Actions workflow at `.github/workflows/ci.yml`.

It runs on:

- push to `feature/*`
- pull requests targeting `develop`
- pull requests targeting `main`

The workflow executes:

- `npm ci`
- `npm run lint:check`
- `npm run test`
- `npm run build`

---

## Authentication

Authentication is implemented using **JWT (JSON Web Tokens)**.

- Stateless authentication.
- Token-based session handling.
- Secure route protection via guards.

---

## API Documentation

Interactive API documentation is available via Swagger:

```
http://localhost:3001/docs
```

---

## Testing

The project includes a comprehensive testing strategy focused on business logic.

- Unit tests for all use cases.
- High coverage across core logic

Run tests:

```
npm run test
```

Run coverage:

```
npm run test:cov
```

---

## Running with Docker

Start the full environment:

```
docker-compose up -d --build
```

---

## Environment Variables

Create a `.env` file based on `.env.example`.

Example:

```
# Application host URL:
IDENTITY_API_URL=http://localhost:3001
# Host port bound to the API container:
APPLICATION_BIND_PORT=3001
# API container port:
APPLICATION_PORT=3000
# MongoDB database URI:
DATABASE_URI=mongodb://database:27017/identity-api
# MongoDB database schema:
DATABASE_NAME=identity-api
# MongoDB host bind port:
DATABASE_BIND_PORT=27018
# MongoDB container port:
DATABASE_PORT=27017
```

---

## Responsibilities

This service is responsible for:

- Managing user accounts.
- Handling authentication flows.
- Issuing and validating JWT tokens.
- Supporting secure communication with other services.

---

## Related Services

This API is part of the FitMatch ecosystem:

- `fitematch-site` → Frontend application
- `fitematch-dashboard` → Dashboard application
- `fitematch-job-api` → Job and application management

---
