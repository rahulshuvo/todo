# Feature-Based File Structure

This project uses a feature-based architecture for better organization and scalability.

## Structure

```
src/
├── app/                    # Application-level configuration
│   ├── App.tsx            # Main app component
│   └── main.tsx           # Application entry point
├── features/              # Feature-based modules
│   └── todos/             # Todo feature module
│       ├── components/    # Todo-specific components
│       │   ├── TodoForm.tsx
│       │   ├── TodoTabs.tsx
│       │   ├── TodoTable.tsx
│       │   ├── TodoStats.tsx
│       │   └── index.ts   # Component exports
│       ├── hooks/         # Todo-specific React Query hooks
│       │   ├── useTodos.ts
│       │   ├── useTodoMutations.ts
│       │   └── index.ts   # Hook exports
│       ├── styles/        # Todo-specific styles
│       │   ├── TodoPage.scss
│       │   ├── TodoForm.scss
│       │   ├── TodoTabs.scss
│       │   ├── TodoTable.scss
│       │   └── TodoStats.scss
│       ├── todoApi.ts     # Todo API functions
│       ├── types.ts       # Todo TypeScript types
│       ├── TodoPage.tsx   # Main todo page component
│       └── index.ts       # Feature exports
└── shared/                # Shared/reusable modules
    ├── components/        # Reusable UI components
    │   ├── EmailSetup.tsx
    │   ├── UserStatus.tsx
    │   ├── Pagination.tsx
    │   └── index.ts       # Component exports
    ├── utils/             # Shared utilities
    │   └── axios.ts       # HTTP client configuration
    └── styles/            # Global styles
        ├── global.scss
        ├── EmailSetup.scss
        ├── UserStatus.scss
        └── Pagination.scss
```

## Benefits

1. **Feature Isolation**: All todo-related code is co-located
2. **Reusability**: Shared components can be used across features
3. **Scalability**: Easy to add new features (auth, dashboard, etc.)
4. **Maintainability**: Clear separation of concerns
5. **Team Collaboration**: Easy to assign feature ownership

## How to Add New Features

1. Create a new folder under `src/features/`
2. Follow the same structure as `todos/`
3. Export the feature from its `index.ts`
4. Import in `app/App.tsx`

## Import Examples

```typescript
// Import entire feature
import { TodoPage, useTodos } from '../features/todos';

// Import shared components
import { Pagination, UserStatus } from '../shared/components';

// Import utilities
import api from '../shared/utils/axios';
```