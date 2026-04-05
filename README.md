# AI Multi-Agent Task Management Platform

A robust, multi-tenant full-stack application for managing AI agents, executing complex tasks, and monitoring workspace analytics. This platform leverages modern web technologies to provide a seamless interface for interacting with Google's Gemini AI and managing productivity through an agent-centric workspace.

## 🚀 Project Overview

The AI Multi-Agent Platform is designed as a workspace where users can define specialized AI agents with distinct roles and system prompts. Users can then assign "Missions" (tasks) to these agents, which are executed using large language models. The platform includes full authentication, data isolation, real-time analytics, and resource management.

---

## 🛠 Tech Stack

### Frontend
- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Stat Management**: [Redux Toolkit](https://redux-toolkit.js.org/), [Zustand](https://zustand-demo.pmnd.rs/), and [TanStack Query (React Query)](https://tanstack.com/query/latest)
- **Routing**: [React Router 7](https://reactrouter.com/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **HTTP Client**: [Axios](https://axios-http.com/)

### Backend
- **Framework**: [NestJS](https://nestjs.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: [MongoDB](https://www.mongodb.com/) via [Mongoose](https://mongoosejs.com/)
- **Authentication**: [Passport.js](https://www.passportjs.org/) + [JWT](https://jwt.io/)
- **Security**: [Helmet](https://helmetjs.github.io/), [CORS](https://github.com/expressjs/cors), [Bcrypt.js](https://github.com/dcodeIO/bcrypt.js)
- **AI Integration**: [Google Generative AI (@google/generative-ai)](https://ai.google.dev/)

---

## ✨ Key Features

- **Multi-Tenant Architecture**: Strict data isolation ensuring users only access their own agents, tasks, and settings.
- **AI Agent Management**: Create, customize, and manage agents with specific roles, models (Gemini Pro, etc.), and temperature settings.
- **Task Execution (Mission Log)**: Run AI tasks with real-time status tracking (Pending, Running, Completed, Failed).
- **Workspace Analytics**: Visual dashboard for monitoring token usage, estimated costs, and agent performance.
- **Secure Authentication**: JWT-based login/register system with Refresh Token rotation.
- **Notes System**: integrated personal notes for workspace management.
- **Provider Switching**: Toggle between Google Gemini and a Mock AI Provider for testing/development.

---

## 📂 Folder Structure

```text
├───backend              # NestJS Server
│   ├───src
│   │   ├───common       # Decorators, Enums, Interceptors, Guards
│   │   ├───modules      # Modular Business Logic
│   │   │   ├───agents   # Agent Management
│   │   │   ├───auth     # Authentication & JWT Strategies
│   │   │   ├───tasks    # Task Repository & AI Runner
│   │   │   ├───usage    # Analytics & Usage Calculations
│   │   │   └───...      # settings, dashboard, user, notes
│   │   └───providers    # AI Provider Implementations (Gemini, Mock)
│   └───...
└───frontend             # React (Vite) UI
    ├───src
    │   ├───assets       # Images, animations, data assets
    │   ├───components   # Reusable UI components
    │   ├───configs      # Axios config, API endpoints, types
    │   ├───module       # Feature-based architecture
    │   │   ├───Agents   # Agents management UI
    │   │   ├───Auth     # Login/Register pages & context
    │   │   ├───Tasks    # Mission Log & execution components
    │   │   └───...      # dashboard, usage, settings, notes
    │   └───...
    └───...
```

---

## ⚙️ Environment Variables

### Backend (`/backend/.ENV`)
| Variable | Description | Default |
| :--- | :--- | :--- |
| `PORT` | Server Port | `3000` |
| `MONGODB_URI` | MongoDB Connection String | `mongodb://localhost:27017/ai-multi-agent` |
| `AI_PROVIDER` | AI Execution Choice | `mock` / `gemini` |
| `GEMINI_API_KEY` | Google AI API Key | `fake-dev-key` |
| `JWT_SECRET` | Secret for Access Token | `super-secret-key...` |
| `JWT_REFRESH_SECRET` | Secret for Refresh Token | `refresh-token-secret...` |

### Frontend (`/frontend/src/configs/app.config.ts`)
The frontend points to `http://localhost:3000` by default via the `API_URL` constant.

---

## 🛠 Installation & Setup

1. **Clone the repository**
2. **Install Dependencies**
   ```bash
   # Backend
   cd backend
   pnpm install

   # Frontend
   cd frontend
   pnpm install
   ```
3. **Database**
   - Ensure MongoDB is running locally at `mongodb://localhost:27017` or update the URI in `.ENV`.
4. **Environment Configuration**
   - In `/backend`, ensure the `.ENV` file matches your local configuration.
5. **Running the Application**
   ```bash
   # Terminal 1: Backend
   cd backend
   pnpm run dev

   # Terminal 2: Frontend
   cd frontend
   pnpm run dev
   ```

---

## 📜 Available Scripts

### Backend
- `pnpm run dev`: Starts the NestJS application in watch mode.
- `pnpm run build`: Compiles the application for production.
- `pnpm run test`: Executes unit and integration tests.

### Frontend
- `pnpm dev`: Runs the Vite development server.
- `pnpm build`: builds the project using TypeScript and Vite.
- `pnpm lint`: Runs ESLint for code quality checks.
- `pnpm preview`: Serves the production build locally.

---

## 🖇 API Endpoints

### Auth
- `POST /auth/register`: Create a new user.
- `POST /auth/login`: Authenticate and receive tokens.
- `POST /auth/refresh`: Refresh JWT tokens.
- `GET /auth/me`: Retrieve current user profile.

### Modules
- `GET /agents`: List current user's agents.
- `POST /tasks`: Create a new task.
- `POST /tasks/:id/run`: Trigger AI execution for a task.
- `GET /dashboard/summary`: Aggregate metrics for the home screen.
- `GET /usage/overview`: Fetch detailed usage data.

---

## 🛡 License
Internal Project / ISC License.
