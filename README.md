# 🌐 Wiska Web — The React Client

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat&logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind%20CSS-4-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![React Router](https://img.shields.io/badge/React%20Router-7-CA4245?style=flat&logo=reactrouter&logoColor=white)
![Deployed on Vercel](https://img.shields.io/badge/Deployed-Vercel-000000?style=flat&logo=vercel&logoColor=white)

This is the frontend repository for the **Wiska Messaging Protocol**. It's the client-side UI for Wiska, a dual-identity real-time messaging app — built to talk to the Django/Channels backend over both standard REST endpoints and a persistent WebSocket stream.

For the Django ASGI server, see the **[Wiska Backend](https://github.com/sumitexists/wiska-backend)** repo. Live app: **[wiska.vercel.app](https://wiska.vercel.app)**.

## 🛠️ Tech stack

| Layer | Choice |
|---|---|
| Framework | React 19 |
| Build tool | Vite 8 (Rolldown-powered) |
| Styling | Tailwind CSS v4, via the `@tailwindcss/vite` plugin |
| Routing | React Router DOM v7 |
| Network client | Axios |
| Real-time engine | `react-use-websocket`, wrapped in a custom `useChat` hook |
| Deployment | Vercel — SPA rewrites configured in `vercel.json` |

## 💬 Core client-side engineering

- **`useChat` hook** — wraps `react-use-websocket` to manage the connection lifecycle, reconnection strategy, and real-time state sync behind one clean, reusable hook, so components never touch the raw socket directly.
- **Axios interceptors** — centralize JWT token management so authentication headers are automatically attached to outgoing HTTP requests, keeping UI components auth-agnostic.
- **URL-driven identity switching** — React Router manages complex application state (like switching between the Verified and Anonymous identities) directly through the URL, so switching identities is just a navigation and deep-links work as expected.

## 🚀 Local development setup

### Prerequisites

- **Node.js 20.19+ or 22.12+** — required by Vite 8
- The [Wiska backend](https://github.com/sumitexists/wiska-backend) running locally on port `8000`

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/sumitexists/wiska-frontend.git
cd wiska-frontend
```

**2. Install dependencies**
```bash
npm install
```

**3. Start the dev server**
```bash
npm run dev
```

The app runs at `http://localhost:5173` by default, matching the `FRONTEND_URL` the backend expects for CORS.

### Available scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite dev server with HMR |
| `npm run build` | Production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

## ☁️ Deployment

The repo ships with a `vercel.json` that rewrites all routes to `index.html` for client-side routing on Vercel. The current build is live at [wiska.vercel.app](https://wiska.vercel.app).

## 🔗 Related

- API: [wiska-backend](https://github.com/sumitexists/wiska-backend)
