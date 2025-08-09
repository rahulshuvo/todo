// Basic functionality tests
describe('Frontend Testing Setup', () => {
  it('should verify Jest is working', () => {
    expect(1 + 1).toBe(2);
  });

  it('should handle string operations', () => {
    const message = 'Hello, Jest!';
    expect(message).toContain('Jest');
    expect(message.length).toBeGreaterThan(5);
  });

  it('should work with arrays', () => {
    const items = ['todo1', 'todo2', 'todo3'];
    expect(items).toHaveLength(3);
    expect(items[0]).toBe('todo1');
  });

  it('should handle async operations', async () => {
    const promise = Promise.resolve('async test');
    const result = await promise;
    expect(result).toBe('async test');
  });

  it('should work with objects', () => {
    const todo = {
      id: '1',
      title: 'Test todo item',
      done: false
    };
    
    expect(todo).toHaveProperty('id');
    expect(todo.done).toBe(false);
    expect(todo.title).toMatch(/test/i);
  });
});
