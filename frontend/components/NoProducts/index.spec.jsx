import React from 'react';
import { render, screen } from '@testing-library/react';
import NoProducts from './index';

describe('NoProducts', () => {
  it('should render the empty product list message', () => {
    render(<NoProducts />);

    expect(screen.getByText('recently_viewed_products.empty_product_list')).toBeInTheDocument();
  });
});
