import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import TodoPage from '../../../features/todos/TodoPage';
import * as todoApi from '../../../features/todos/todoApi';

// Mock the API calls
jest.mock('../../../features/todos/todoApi', () => ({
  getTodos: jest.fn(),
  addTodo: jest.fn(),
  updateTodo: jest.fn(),
  deleteTodo: jest.fn(),
}));

// Mock sonner for toast notifications
jest.mock('sonner', () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));

const mockGetTodos = todoApi.getTodos as jest.MockedFunction<typeof todoApi.getTodos>;

const createTestQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
      mutations: {
        retry: false,
      },
    },
  });
};

const renderWithQueryClient = (ui: React.ReactElement) => {
  const queryClient = createTestQueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      {ui}
    </QueryClientProvider>
  );
};

describe('TodoPage Component', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('renders email setup when no email is stored', () => {
    renderWithQueryClient(<TodoPage />);
    
    // Should show email input when no email is set
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('shows todo interface when email is set', async () => {
    // Set email in localStorage
    localStorage.setItem('email', 'test@example.com');
    
    // Mock the API response
    mockGetTodos.mockResolvedValue({
      todos: [
        {
          id: '1',
          title: 'Test todo item that is longer than 10 characters',
          done: false,
          email: 'test@example.com',
          deadline: undefined,
          createdAt: new Date().toISOString(),
        },
      ],
      pagination: {
        page: 1,
        limit: 10,
        total: 1,
        totalPages: 1,
      },
    });

    renderWithQueryClient(<TodoPage />);
    
    // Should show todo interface elements
    await waitFor(() => {
      expect(screen.getAllByText(/test todo item/i)).toHaveLength(2); // Appears in both table and cards
    });
  });

  it('handles basic rendering without errors', () => {
    renderWithQueryClient(<TodoPage />);
    
    // Should render without crashing
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});