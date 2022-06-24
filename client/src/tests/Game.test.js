import { render, screen } from '@testing-library/react';
import Game from '../routes/Game';

test('should render the game component', () => {
  render(<Game />);
  const gameElement = screen.getByText(/Mine/i);
  expect(gameElement).toBeInTheDocument();
});
