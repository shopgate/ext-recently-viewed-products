import React from 'react';
import { render, screen } from '@testing-library/react';
import EmptyCart from './index';

describe('EmptyCart', () => {
  it('should render the empty cart icon and title', () => {
    const { container } = render(<EmptyCart />);

    expect(screen.getByText('cart.empty')).toBeInTheDocument();
    expect(container.querySelector('svg')).toBeInTheDocument();
  });
});
