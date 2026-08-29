- Axios

- What it is:

- Axios is a **promise-based HTTP client** for the browser and Node.js.
- It's not built into JavaScript — it's an npm package (`npm install axios`) that wraps HTTP requests in a simpler API than the native `fetch`.

- Why axios over fetch:
  - **JSON parsing** — Axios auto-parses the response (`res.data`); `fetch` needs a manual `res.json()` call every time.
  - **Error handling** — Axios rejects automatically on any non-2xx status; `fetch` only rejects on a network failure — a 404 or 500 still "succeeds" and must be checked manually via `res.ok`.
  - **Request body** — Axios accepts a plain object directly; `fetch` requires manually calling `JSON.stringify()`.
  - **Headers** — Axios sets `Content-Type` automatically for JSON; `fetch` requires setting headers manually.
  - **Timeouts** — Axios has built-in support via a `timeout` config; `fetch` needs a manual `AbortController` setup.
  - **Interceptors** — Axios supports interceptors for globally attaching tokens, logging, etc.; `fetch` has no equivalent.
  - **Browser support** — `fetch` is native, no install needed; Axios requires installing the package (`npm install axios`).

- Key Takeaway:

- `fetch` is native and lightweight — fine for simple one-off requests.
- Axios reduces boilerplate and handles errors/JSON more predictably — the reason most real-world frontend + Express projects reach for it once the app has several API calls (like this project's CRUD operations).
