# Vite Dev Server Proxy

## What it is
A proxy is a middleman that forwards requests on your behalf. In development, Vite can act as a proxy — the frontend only ever talks to itself (`localhost:5173`), and Vite silently forwards matching requests to your backend behind the scenes.

Because the browser never sees a cross-origin request, **CORS never gets triggered at all** — the proxy doesn't bypass CORS, it avoids the situation where CORS would apply in the first place.

## How to set it up

**1. Configure the proxy in `vite.config.js`:**

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
      },
    },
  },
});

- `"/api"` — any request starting with `/api` gets proxied.
- `target` — where the request actually gets forwarded to (your backend).
- `changeOrigin: true` — makes the backend see the request as if it came from its own host, avoiding some servers' origin checks.

**2. Update the frontend API calls — drop the full URL:**
// Before (direct call — needs CORS on the backend)
const API_URL = "http://localhost:8000/api/users";

// After (proxied call — no CORS needed)
const API_URL = "/api/users";

## Restart required
Vite only reads `vite.config.js` on startup — **you must restart `npm run dev`** after adding or changing the proxy config for it to take effect.

## Common error: `ECONNREFUSED`

[vite] http proxy error: /api/users
AggregateError [ECONNREFUSED]

This means Vite correctly tried to forward the request, but **nothing was listening on the target port** (e.g., `localhost:8000`).

**Fix:** make sure your backend is actually running:
    node index.js

Run this in a separate terminal, alongside `npm run dev`. Confirm it worked by visiting `http://localhost:8000/api/users` directly in the browser — you should see raw JSON.

### Proxy vs CORS

**CORS**
- Configured on the backend (Express)
- Works in production
- The backend explicitly allows the frontend's origin

**Proxy**
- Configured on the frontend dev server (Vite)
- Dev-server only — doesn't work in production; production needs a real reverse proxy (e.g., Nginx) or CORS
- Hides the cross-origin request entirely, so CORS never gets triggered

## Key takeaway
A proxy is a **development convenience** — it removes the need to configure CORS while building locally, but a real deployed app typically still needs CORS (or a production-grade reverse proxy) once the frontend and backend are served from different domains.