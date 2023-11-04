import { render, screen } from '@testing-library/react';
import Gallery from './Gallery';
// import Gallery from './Gallery';

test('renders learn react link', () => {
  render(<Gallery/>);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
