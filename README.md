# fitematch-identity-api

Identity service for the **fitematch platform**, responsible for user registration, authentication, and session management.

This service is built with a strong focus on **scalability, maintainability, and clean architecture principles**, following a layered design that separates domain logic from infrastructure concerns.

---

## 🧠 Overview

The Identity API is part of a modular backend ecosystem designed to support a job platform for fitness professionals.

It handles:

* User registration
* Authentication (JWT)
* Session management
* Access control

---

## 🏗️ Architecture

This project follows principles inspired by **Clean Architecture**, ensuring separation of concerns and high testability.

```
src/
  domain/        # Business rules and entities
  application/   # Use cases (business logic orchestration)
  adapters/      # External layers (controllers, persistence, etc.)
  shared/        # Shared utilities and abstractions
```

---

## ⚙️ Tech Stack

* **Node.js**
* **NestJS**
* **TypeScript**
* **MongoDB (Mongoose)**
* **JWT Authentication**
* **Swagger (OpenAPI)**
* **Docker & Docker Compose**
* **Jest (Unit Testing)**
* **Husky (Git Hooks)**

---

## 🔐 Authentication

Authentication is implemented using **JWT (JSON Web Tokens)**.

* Stateless authentication
* Token-based session handling
* Secure route protection via guards

---

## 📄 API Documentation

Interactive API documentation is available via Swagger:

```
http://localhost:3001/docs
```

---

## 🧪 Testing

The project includes a comprehensive testing strategy focused on business logic.

* Unit tests for all use cases
* Isolated testing of application layer
* High coverage across core logic

Run tests:

```
npm run test
```

Run coverage:

```
npm run test:cov
```

---

## 🐳 Running with Docker

Start the full environment:

```
docker-compose up --build
```

---

## ▶️ Running Locally

Install dependencies:

```
npm install
```

Start development server:

```
npm run start:dev
```

---

## 📦 Environment Variables

Create a `.env` file based on `.env.example`.

Example:

```
PORT=3000
MONGO_URI=mongodb://localhost:27017/fitematch
JWT_SECRET=your_secret
```

---

## 🧩 Responsibilities

This service is responsible for:

* Managing user accounts
* Handling authentication flows
* Issuing and validating JWT tokens
* Supporting secure communication with other services

---

## 🔗 Related Services

This API is part of the FitMatch ecosystem:
* `fitematch-site` → Frontend application
* `fitematch-dashboard` → Dashboard application
* `fitematch-job-api` → Job and application management

---

