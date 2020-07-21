import React from 'react';
import { screen, render } from '@testing-library/react';
import { SearchBox } from './SearchBox';

describe('SearchBox should', () => {
  test('render a text input with default placeholder', () => {
    render(<SearchBox />);
    expect(screen.getByRole('search')).toBeInTheDocument();
  });

  test('render a text input with the privided placeholder', () => {
    render(<SearchBox placeholder="test-ph" />);
    expect(screen.getByPlaceholderText('test-ph')).toBeInTheDocument();
  });

  test('render the search icon', () => {
    render(<SearchBox />);
    expect(screen.getByTestId('searchbox-icon')).toBeInTheDocument();
  });
});
