# The `cors` Package

## What it is

`cors` is an npm package that adds the correct CORS headers to your Express responses automatically — instead of writing the header-setting middleware by hand.

## Installation

```bash
npm install cors
```

## Basic usage — allow all origins

```javascript
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors()); // allows every origin — good for public APIs / quick dev setups

app.get("/api/users", (req, res) => {
  res.json({ message: "CORS enabled for all origins" });
});

app.listen(8000, () => console.log("Server started on port 8000"));
```

## Allow a specific origin only

```javascript
app.use(
  cors({
    origin: "http://localhost:5173", // only this frontend can access the API
  }),
);
```

## Allow multiple specific origins

```javascript
const allowedOrigins = ["http://localhost:5173", "https://myapp.com"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  }),
);
```

## Allow cookies / credentials

By default, cross-origin requests can't send cookies. To allow it:

```javascript
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // allows cookies to be sent
  }),
);
```

On the frontend (axios), you must also opt in:

```javascript
axios.get("http://localhost:8000/api/users", { withCredentials: true });
```

> Note: `credentials: true` cannot be combined with `origin: "*"` — you must specify an exact origin when allowing credentials.

## Restrict allowed methods and headers

```javascript
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
```

## Apply CORS to only one route

```javascript
app.get("/api/public-data", cors(), (req, res) => {
  res.json({ message: "This route allows all origins" });
});

app.get("/api/private-data", (req, res) => {
  res.json({ message: "This route uses the global CORS config only" });
});
```

## Key options summary

| Option           | Purpose                                               |
| ---------------- | ----------------------------------------------------- |
| `origin`         | Which origin(s) are allowed to access the API         |
| `credentials`    | Whether cookies/auth headers can be sent cross-origin |
| `methods`        | Which HTTP methods are allowed                        |
| `allowedHeaders` | Which request headers are allowed                     |

## Why use the package instead of writing CORS headers manually

- Handles preflight `OPTIONS` requests automatically — no need to write that check yourself.
- Less boilerplate, fewer chances to misconfigure a header.
- Well-tested, widely used in production Express apps.
