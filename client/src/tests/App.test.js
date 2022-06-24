import { render, screen } from '@testing-library/react';
import App from '../_app/App';

test('should render the game component', () => {
  render(<App />);
  const gameElement = screen.getByText(/Mine/i);
  expect(gameElement).toBeInTheDocument();
});
