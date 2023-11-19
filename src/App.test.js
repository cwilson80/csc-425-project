import { render, screen } from '@testing-library/react';
import App from './App';

test('Test if App renders', () => {
  render(<App />);
  expect(screen.getByText('Task Manager')).toBeInTheDocument();
});
