import { render, screen } from '@testing-library/react';
import RoutesManager from './Routes';

test('renders learn react link', () => {
  render(<RoutesManager />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
