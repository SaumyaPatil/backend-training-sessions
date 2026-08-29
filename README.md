# Node.js Backend Training Plan — 

---

## Day 1 — Node.js Foundations & Environment Setup

- What is Node.js, why backend devs use it, V8 engine basics
- Node vs browser JS — what's different (no DOM, global object, modules)
- Installing Node & npm, `node -v`, `npm -v`, using a version manager (nvm) briefly
- REPL vs running a `.js` file
- npm basics: `package.json`, `npm init`, installing packages, `dependencies` vs `devDependencies`

---

## Day 2 — Core Modules & Async Programming

- Built-in modules: `fs`, `path`, `os`, `events`
- Reading/writing files (sync vs async methods)
- CommonJS `require`/`module.exports` vs ES Modules `import/export`
- The event loop — conceptual overview (single-threaded, non-blocking I/O)

---

## Day 3 — HTTP Request & Response Fundamentals

- Anatomy of an HTTP request: method, URL, headers, body
- Anatomy of an HTTP response: status code, headers, body
- Status code families (2xx/3xx/4xx/5xx) with real examples
- Request/response cycle diagram: client → server → client

---

## Day 4 — Building a Server with Core HTTP Module + REST Basics

- `http` module — creating a basic server, handling requests/responses
- What is REST? Resource-based URL design, statelessness
- Why we use frameworks instead of raw `http` (motivation for Express)

---

## Day 5 — Express.js Basics

- nodejs server code VS expressjs server code
- Installing Express, setting up an app
- Routing (`app.get/post/put/delete`), route parameters, query params
- Handling 'Read' request using browser
- Limitations of browser in API testing (post, patch, delete request)
- Walkthrough of POSTMAN platform
  
---

## Day 6 — Building a Real REST API

- Full CRUD API design using mock data — Create, Read, Update, Delete
- Testing APIs using POSTMAN
- Middleware concept — what it is, middleware chain
- built-in middleware functions - `express.urlencoded()` & `app.use()`
  
---

## Day 7 — MongoDB Glimpse: NoSQL Fundamentals

- SQL vs NoSQL — when/why to use MongoDB
- Documents, collections, BSON/JSON structure
- MongoDB Atlas setup (cloud, free tier) + MongoDB Compass (GUI)
- CRUD operations directly in Mongo shell/Compass (`insertOne`, `find`, `updateOne`, `deleteOne`)
- Basic query operators (`$gt`, `$in`, `$or`)

---

## Day 8 — Connecting Node.js to MongoDB with Mongoose

- Installing Mongoose, connecting to Atlas from a Node app
- Schemas & Models — defining structure, data types, validation rules
- CRUD via Mongoose (`.find()`, `.create()`, `.findByIdAndUpdate()`, `.findByIdAndDelete()`)

---

## Day 9 — Authentication & Authorization

- Password hashing with `bcrypt`
- User registration & login APIs
- JWT — what it is, generating & verifying tokens (jsonwebtoken package)
  
---

## Day 10 — Authentication & Authorization (continued)

- Custom middlewares - next()
- Protecting routes with auth middleware
- MVC architecture (refactoring the code)

---

## Day 11 — Backend Concepts

- CORS: Cross-Origin-Resource-Sharing
- Centralised error handling middleware

---

## Day 12 — 
- 

---

## Documentation

- https://www.npmjs.com/
- https://nodejs.org/docs/latest/api/
- https://www.mockaroo.com/
- https://expressjs.com/
- https://www.postman.com/
