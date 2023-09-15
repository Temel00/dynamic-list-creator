import { render, screen } from '@testing-library/react';
import Home from '../pages/index';

describe('Home', () => {
  it('should have FloraCare text', () => {
    render(<Home />);

    const myElem = screen.getByText('Sorry!');

    expect(myElem).toBeInTheDocument();
  });

  it('should have a login heading', () => {
    render(<Home />);

    const myElem = screen.getByRole('heading', {
      name: 'Sorry!',
    });

    expect(myElem).toBeInTheDocument();
  });
});
