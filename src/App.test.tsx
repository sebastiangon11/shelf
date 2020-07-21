import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('Application', () => {
  test('should render without props or deps', () => {
    render(<App />);
  });
  test('should render the clipboard history by default', () => {
    render(<App />);
    expect(screen.getByTestId('clipboard-history-list')).toBeInTheDocument();
  });
});
