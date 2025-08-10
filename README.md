# Todo Application Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Backend Documentation](#backend-documentation)
4. [Frontend Documentation](#frontend-documentation)
5. [API Documentation](#api-documentation)
6. [Database Schema](#database-schema)
7. [Deployment](#deployment)
8. [Development Setup](#development-setup)

## Project Overview

A full-stack Todo application built with modern technologies that allows users to create, manage, and track their todo items with optional email-based organization and deadline management.

### Key Features
- ✅ Create, read, update, and delete todos
- ✅ Email-based todo organization (optional)
- ✅ Deadline tracking with overdue detection
- ✅ Pagination for efficient data loading
- ✅ Real-time updates with optimistic UI
- ✅ Responsive design with multiple view modes
- ✅ Auto-generated API documentation
- ✅ Production deployment on Railway and Vercel

### Tech Stack
**Backend:**
- Node.js + Express.js
- TypeScript
- Prisma ORM
- PostgreSQL (Neon DB)
- Swagger for API documentation

**Frontend:**
- React 19
- TypeScript
- Vite
- TanStack Query (React Query)
- Axios
- SCSS for styling
- Sonner for notifications

## Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │    │   Database      │
│   (Vercel)      │    │   (Railway)     │    │   (Neon DB)     │
│                 │    │                 │    │                 │
│ React + Vite    │◄──►│ Express + TS    │◄──►│ PostgreSQL      │
│ TanStack Query  │    │ Prisma ORM      │    │                 │
│ SCSS + Sonner   │    │ Swagger Docs    │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## Backend Documentation

### Project Structure
```
backend/
├── src/
│   ├── index.ts          # Main application entry point
│   ├── swagger.ts        # Swagger configuration
│   ├── routes/           # API route handlers
│   │   ├── getTodos.ts   # Get todos with pagination
│   │   ├── createTodo.ts # Create new todo
│   │   ├── updateTodo.ts # Mark todo done/undone
│   │   └── deleteTodo.ts # Delete todo
│   └── schemas/          # Swagger schema definitions
│       └── todoSchemas.ts
├── prisma/
│   ├── schema.prisma     # Database schema
│   └── migrations/       # Database migrations
├── package.json
├── tsconfig.json
├── Procfile             # Railway deployment config
└── railway.json         # Railway build configuration
```

### API Endpoints

#### **GET /todos**
Retrieve paginated todos, optionally filtered by email.

**Query Parameters:**
- `email` (optional): Filter todos by email
- `page` (optional, default: 1): Page number
- `limit` (optional, default: 10): Items per page

**Response:**
```json
{
  "todos": [
    {
      "id": "uuid",
      "title": "Sample todo",
      "done": false,
      "deadline": "2025-08-15T10:00:00.000Z",
      "email": "user@example.com",
      "createdAt": "2025-08-09T10:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3
  }
}
```

#### **POST /todo**
Create a new todo item.

**Request Body:**
```json
{
  "title": "Todo title (must be > 10 characters)",
  "deadline": "2025-08-15T10:00:00.000Z", // optional
  "email": "user@example.com" // optional
}
```

#### **PUT /todo/:id/done**
Mark a todo as completed.

#### **PUT /todo/:id/undone**
Mark a todo as not completed.

#### **DELETE /todo/:id**
Delete a todo item.

### Environment Variables
```env
DATABASE_URL=postgresql://user:password@host:port/database
FRONTEND_URL=https://your-frontend-url.com
PORT=3000
```

### Validation Rules
- Todo title must be longer than 10 characters
- Email format validation (when provided)
- UUID validation for todo IDs

## Frontend Documentation

### Project Structure
```
frontend/
├── src/
│   ├── app/
│   │   ├── App.tsx       # Main app component
│   │   └── main.tsx      # App entry point with providers
│   ├── features/
│   │   └── todos/
│   │       ├── components/    # Todo-specific components
│   │       ├── hooks/         # Custom React hooks
│   │       ├── styles/        # SCSS styling
│   │       ├── TodoPage.tsx   # Main todo page
│   │       ├── todoApi.ts     # API client functions
│   │       ├── types.ts       # TypeScript interfaces
│   │       └── index.ts       # Feature exports
│   ├── shared/
│   │   ├── components/   # Reusable components
│   │   ├── styles/       # Global styles
│   │   └── utils/        # Utility functions
│   └── types/           # Global type definitions
├── package.json
├── vite.config.ts
└── tsconfig.json
```

### Key Components

#### **TodoPage.tsx**
Main component that orchestrates the entire todo functionality:
- State management for todos, pagination, and user email
- Optimistic UI updates for better user experience
- Error handling with toast notifications
- Email-based todo organization

#### **Custom Hooks**

**useTodos:**
- Fetches paginated todos using TanStack Query
- Implements smart caching and refetching strategies
- Auto-refreshes public todos every 5 seconds

**useTodoMutations:**
- Handles create, update, and delete operations
- Automatically invalidates relevant queries on success
- Provides loading and error states

#### **API Layer (todoApi.ts)**
Centralized API functions using Axios:
- `getTodos()` - Fetch paginated todos
- `addTodo()` - Create new todo
- `updateTodo()` - Toggle todo completion
- `deleteTodo()` - Remove todo

### State Management Strategy
- **React Query** for server state management
- **Local State** (useState) for UI state
- **Optimistic Updates** for immediate UI feedback
- **Error Recovery** with state rollback on failures

### Styling Architecture
- **SCSS** for enhanced CSS features
- **Component-scoped** styles with BEM methodology
- **Global styles** for consistent theming
- **Responsive design** with mobile-first approach

### Environment Configuration
```env
VITE_API_BASE_URL=https://your-backend-url.com
```

## API Documentation

The backend automatically generates interactive API documentation using Swagger UI.

**Access Swagger Documentation:**
- Local: `http://localhost:3000/api-docs`
- Production: `https://railway-init-todo-backend-production.up.railway.app/api-docs`

### Swagger Configuration
- OpenAPI 3.0 specification
- Automatic schema generation from JSDoc comments
- Interactive testing interface
- Request/response examples

## Database Schema

### Todo Model (Prisma Schema)
```prisma
model Todo {
  id        String   @id @default(uuid())
  title     String
  done      Boolean  @default(false)
  deadline  DateTime?
  email     String?  // optional: for user-specific vs. public todos
  createdAt DateTime @default(now())
}
```

### Database Features
- **UUID Primary Keys** for security and scalability
- **Optional Email Association** for todo organization
- **Flexible Deadline Management** with optional dates
- **Automatic Timestamps** for creation tracking
- **Boolean Status** for completion tracking

### Database Provider
- **PostgreSQL** hosted on Neon DB
- **Connection pooling** for performance
- **SSL required** for security

## Deployment

### Backend Deployment (Railway)
**Live URL:** `https://railway-init-todo-backend-production.up.railway.app`

**Configuration:**
- Automatic builds from Git repository
- Environment variables managed through Railway dashboard
- PostgreSQL connection to Neon DB
- Health checks and automatic restarts

**Environment Variables:**
```
DATABASE_URL=postgresql://[neon-connection-string]
FRONTEND_URL=https://todo-liart-phi.vercel.app
RAILWAY_PUBLIC_DOMAIN=railway-init-todo-backend-production.up.railway.app
```

### Frontend Deployment (Vercel)
**Live URL:** `https://todo-liart-phi.vercel.app`

**Configuration:**
- Automatic deployments from Git pushes
- Environment variables in Vercel dashboard
- Optimized build with Vite
- CDN distribution for fast loading

## Development Setup

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL database (local or Neon DB)
- Git for version control

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env  # Configure your environment variables
npx prisma migrate dev
npx prisma generate
npm run dev  # Starts on http://localhost:3000
```

### Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env  # Configure VITE_API_BASE_URL
npm run dev  # Starts on http://localhost:5173
```

### Environment Variables

**Backend (.env):**
```env
DATABASE_URL="postgresql://user:password@localhost:5432/todo_db"
FRONTEND_URL="http://localhost:5173"
PORT=3000
```

**Frontend (.env):**
```env
VITE_API_BASE_URL="http://localhost:3000"
```

### Development Commands

**Backend:**
```bash
npm run dev          # Start development server
npm run build        # Build TypeScript
npm start           # Start production server
npx prisma studio   # Open database browser
npx prisma migrate dev  # Run database migrations
```

**Frontend:**
```bash
npm run dev         # Start development server
npm run build       # Build for production
npm run preview     # Preview production build
npm run lint        # Run ESLint
```

## Testing

### Frontend Testing Setup
The frontend includes a comprehensive Jest testing setup with:

- **React Testing Library** for component testing
- **TypeScript support** with ts-jest
- **JSDOM environment** for browser simulation
- **CSS/SCSS mocking** with identity-obj-proxy
- **Mock setup** for APIs and browser features

#### Test Structure:
```
frontend/
├── jest.config.cjs          # Jest configuration for ES modules
├── src/
│   ├── setupTests.ts        # Test environment setup
│   └── __tests__/
│       ├── App.test.tsx     # App component tests
│       ├── simple.test.ts   # Basic functionality tests
│       └── features/todos/
│           └── TodoPage.test.tsx  # TodoPage component tests
```

#### Running Frontend Tests:
```bash
cd frontend
npm test              # Run all tests
npm run test:watch    # Run tests in watch mode
npm run test:coverage # Run tests with coverage report
```

### Manual Testing Checklist
- [ ] Create todo with valid title (>10 characters)
- [ ] Create todo with invalid title (≤10 characters)
- [ ] Mark todo as done/undone
- [ ] Delete todo
- [ ] Test pagination (create >10 todos)
- [ ] Test email-based filtering
- [ ] Test deadline functionality
- [ ] Test error handling (network failures)
- [ ] Test optimistic UI updates

### Responsive Testing
**Verified Platforms:**
- ✅ **Pixel 9 Pro** - Native mobile testing
- ✅ **Chrome (Windows)** - Desktop and responsive modes
- ✅ **Chrome DevTools** - All standard device breakpoints (320px-1920px+)

**Responsive Features Confirmed:**
- Mobile-optimized layouts and touch interactions
- Tablet and desktop responsive breakpoints
- Cross-device functionality and performance

### API Testing
Use the Swagger UI at `/api-docs` for interactive API testing, or use tools like:
- Postman
- curl
- HTTPie

## Performance Considerations

### Backend Optimizations
- **Database indexing** on frequently queried fields
- **Pagination** to limit response sizes
- **Connection pooling** for database efficiency
- **Caching headers** for static content

### Frontend Optimizations
- **TanStack Query caching** reduces unnecessary API calls
- **Optimistic updates** for immediate UI feedback
- **Code splitting** with Vite for faster loading
- **SCSS compilation** for optimized CSS

## Security Measures

### Backend Security
- **Environment variables** for sensitive configuration
- **CORS configuration** to restrict cross-origin requests
- **Input validation** for all API endpoints
- **SQL injection protection** via Prisma ORM
- **SSL encryption** for database connections

### Frontend Security
- **Environment variables** for API configuration
- **XSS protection** via React's built-in sanitization
- **HTTPS enforcement** in production
- **Secure API communication** with credentials

## Monitoring and Logging

### Backend Monitoring
- **Railway built-in logging** for application logs
- **Database monitoring** via Neon DB dashboard
- **Error tracking** with console.error statements
- **Health checks** via Railway platform

### Frontend Monitoring
- **Vercel analytics** for performance monitoring
- **Browser console logging** for debugging
- **React Query DevTools** for development debugging
- **Toast notifications** for user feedback

## Future Enhancements

### Planned Features
- [ ] User authentication and authorization
- [ ] Todo categories and tags
- [ ] File attachments for todos
- [ ] Collaborative todo sharing
- [ ] Push notifications for deadlines
- [ ] Mobile app (React Native)
- [ ] Dark mode theme
- [ ] Todo templates
- [ ] Advanced filtering and search
- [ ] Data export functionality

### Technical Improvements
- [ ] Unit and integration testing
- [ ] End-to-end testing with Playwright
- [ ] Performance monitoring
- [ ] Error tracking (Sentry)
- [ ] CI/CD pipeline improvements
- [ ] Database optimization
- [ ] Caching layer (Redis)
- [ ] Rate limiting
- [ ] API versioning
- [ ] GraphQL API option

---

**Documentation Last Updated:** August 9, 2025
**Version:** 1.0.0
**Maintainer:** Rahul Bhowmik Shuvo
