## CORS (Cross Origin Resource Sharing)

- Why CORS exists

- CORS is a **browser security feature**, not a server feature.
- A server can't blindly trust every website — it decides which origins are allowed to access it via the `Access-Control-Allow-Origin` header.

- Cookies and credentials

- Cookies are **not sent** on cross-origin requests by default.
- To send cookies cross-origin, the frontend must set `credentials: "include"` (fetch) or `withCredentials: true` (axios) — and the server must respond with a **specific origin**, not `*`.

- The '\*' wildcard

- `Access-Control-Allow-Origin: *` → allows **any** origin to access the API.
- Used for public APIs that don't need cookies/auth tied to a specific frontend.
- Can't be used together with credentials — if cookies/auth headers are involved, the server must specify an **exact origin**, not `*`.

- GET/POST VS PUT/PATCH/DELETE

- Simple requests (`GET`, basic `POST`) go straight to the server — the browser checks the CORS headers _after_ the response comes back.
- "Non-simple" requests (`PUT`, `PATCH`, `DELETE`, or `POST` with custom headers/JSON) trigger a **preflight request** first:
  - Browser sends an `OPTIONS` request asking "is this origin allowed to do this?"
  - Only if the server responds with the right `Access-Control-Allow-*` headers does the browser send the actual request.

- Why POSTMAN never shows CORS error

- CORS is enforced by the **browser**, not the server.
- Postman is a server-to-server tool — there's no browser involved, so there's nothing to enforce the policy.
- This is also why cookies are a browser concept — Postman has no cookie jar tied to browser security rules the way a real frontend does.

## Centralized Error-Handling Middleware

- Why we need it

- Without it, every route needs its own `try/catch` + repeated error-response logic.
- Centralizing error handling keeps routes clean and ensures **consistent error responses** across the whole API.

- What it solves

- No more repeating `res.status(500).json(...)` in every route.
- One place to log errors, format responses, or send alerts.
- Prevents leaking raw stack traces / sensitive details to the client in production:

- Key rule to remember

- Order matters — the error-handling middleware only catches errors from routes/middleware defined **above** it.
