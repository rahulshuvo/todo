# Todo App Frontend

A modern, responsive todo application built with React, TypeScript, and Vite. Features real-time data management, pagination, and both private and public todo modes.

## 🚀 Features

- **Dual Mode Support**: Private todos (with email) or public shared todos
- **Real-time Updates**: Auto-refresh every 10 seconds with smart caching
- **Pagination**: Server-side pagination with customizable items per page
- **Task Management**: Create, update, delete, and filter todos
- **Deadline Tracking**: Set deadlines and track overdue tasks
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Smart Filtering**: Filter by status (All, Completed, Overdue)
- **Form Validation**: Client-side validation for better UX

## 🛠️ Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **TanStack Query** - Data fetching and caching
- **Axios** - HTTP client
- **SCSS** - Styling
- **React Icons** - Icon library

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd todo/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the frontend root:
   ```env
   VITE_API_BASE_URL=http://localhost:3000/api
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🏗️ Project Structure

```
src/
├── app/                     # App configuration
│   ├── App.tsx             # Main app component
│   └── main.tsx            # Entry point with providers
├── features/
│   └── todos/              # Todo feature module
│       ├── components/     # Todo-specific components
│       │   ├── TodoForm.tsx      # Add new todo form
│       │   ├── TodoTable.tsx     # Todo list display
│       │   ├── TodoTabs.tsx      # Filter tabs
│       │   └── TodoStats.tsx     # Statistics display
│       ├── hooks/          # Custom hooks
│       │   ├── useTodos.ts       # Fetch todos with pagination
│       │   └── useTodoMutations.ts # CRUD operations
│       ├── styles/         # Component styles
│       ├── todoApi.ts      # API functions
│       ├── types.ts        # TypeScript interfaces
│       └── TodoPage.tsx    # Main todo page
├── shared/                 # Shared components and utilities
│   ├── components/         # Reusable components
│   │   ├── EmailSetup.tsx        # Email configuration
│   │   ├── Pagination.tsx        # Pagination component
│   │   └── UserStatus.tsx        # User status display
│   ├── styles/             # Global styles
│   └── utils/
│       └── axios.ts        # Axios configuration
└── types/                  # Global types
    └── task.ts
```

## 🎨 Key Components

### TodoPage
Main container component that manages:
- User email state and local storage
- Pagination state
- Data fetching with React Query
- CRUD operations through mutations

### TodoForm
Form component for creating new todos:
- Input validation (minimum 11 characters)
- Optional deadline selection
- Loading states and error handling

### TodoTable
Displays todos in a responsive table:
- Checkbox for completion status
- Deadline display with overdue highlighting
- Delete functionality

### TodoTabs
Filter tabs showing:
- All todos count
- Completed todos count
- Overdue todos count

### Pagination
Server-side pagination component:
- Configurable items per page (5, 10, 20, 50)
- Smart page navigation
- Ellipsis for large page counts

## 🔧 State Management

### React Query Configuration
- **Stale Time**: 5 seconds for fresh data
- **Cache Time**: 2 minutes for garbage collection
- **Auto Refetch**: Every 10 seconds when tab is active
- **Smart Caching**: Unique cache keys per email/page/limit combination

### Local Storage
- User email preference
- Persists between sessions

## 🌐 API Integration

### Endpoints Used
- `GET /todos` - Fetch paginated todos
- `POST /todo` - Create new todo
- `PUT /todo/:id/done` - Mark as complete
- `PUT /todo/:id/undone` - Mark as incomplete
- `DELETE /todo/:id` - Delete todo

### Query Parameters
- `email` - Filter todos by email (optional)
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)

## 🎯 Features in Detail

### Dual Mode System
**Private Mode**: 
- Requires email setup
- Personal todo list
- Data tied to email address

**Public Mode**:
- No email required
- Shared todo list
- Anonymous usage

### Smart Pagination
- Server-side pagination for performance
- Maintains state across tab switches
- Auto-adjusts when total pages change
- Customizable items per page

### Real-time Updates
- Auto-refresh every 10 seconds
- Smart caching prevents unnecessary requests
- Background updates when tab is active
- Offline-friendly with reconnection handling

### Task Management
- **Create**: Minimum 11 character title requirement
- **Update**: Toggle completion status
- **Delete**: Instant removal with optimistic updates
- **Filter**: By completion status and overdue state

## 🔍 Type Safety

Comprehensive TypeScript interfaces:

```typescript
interface Todo {
  id: string;
  title: string;
  done: boolean;
  deadline?: string;
  email?: string | null;
  createdAt: string;
}
```

## 🎨 Styling

- **SCSS** for maintainable styles
- **Component-scoped** styles
- **CSS Grid/Flexbox** for layouts
- **Custom properties** for theming

## 🚦 Error Handling

- **Form Validation**: Client-side validation with user feedback
- **API Errors**: Graceful error handling with retry logic
- **Network Issues**: Automatic retry with exponential backoff
- **Loading States**: Clear loading indicators


## 🔄 Development Workflow

1. **Feature Development**: Component-based architecture
2. **Type Safety**: TypeScript for compile-time checks
3. **Code Quality**: ESLint for consistent code style
4. **Hot Reload**: Vite for fast development experience
5. **Building**: Optimized production builds

## 🌟 Best Practices

- **Separation of Concerns**: Features organized in modules
- **Custom Hooks**: Reusable logic extraction
- **Error Boundaries**: Graceful error handling
- **Performance**: Optimized re-renders and caching
- **Accessibility**: Semantic HTML and proper labeling

## 🔧 Configuration

### Environment Variables
```env
VITE_API_BASE_URL=http://localhost:3000/api
```

### Vite Configuration
- React plugin for JSX support
- TypeScript support out of the box
- SCSS preprocessing
- Hot module replacement

## 🚀 Production Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Preview locally**
   ```bash
   npm run preview
   ```

3. **Deploy** the `dist` folder to your hosting service

## 🤝 Contributing

1. Follow the existing code structure
2. Use TypeScript for type safety
3. Write component-scoped SCSS
4. Add proper error handling
5. Test responsive design

## 📄 License

This project is part of a todo application demonstrating modern React development practices.
