import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Add Task input', () => {
  render(<App />);
  const inputElement = screen.getByLabelText(/Add Task/i);
  expect(inputElement).toBeInTheDocument();
});