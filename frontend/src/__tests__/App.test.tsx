import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from '../app/App';

// Mock the TodoPage component to avoid complex dependencies in initial test
jest.mock('../features/todos', () => ({
  TodoPage: () => <div data-testid="todo-page">Todo Page Component</div>,
}));

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

describe('App Component', () => {
  it('renders TodoPage component', () => {
    renderWithQueryClient(<App />);
    
    expect(screen.getByTestId('todo-page')).toBeInTheDocument();
    expect(screen.getByText('Todo Page Component')).toBeInTheDocument();
  });
});