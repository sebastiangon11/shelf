import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('Application', () => {
  test('should render without props or deps', () => {
    render(<App />);
  });
});
