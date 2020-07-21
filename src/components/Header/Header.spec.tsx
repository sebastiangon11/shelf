import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import { Header } from './Header';

describe('Header component', () => {
  test('should render header element', () => {
    render(<Header />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  test('should show the menu options when menu button is clicked', () => {
    render(<Header />);
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('menu')).toBeInTheDocument();
  });

  test('should display provided title', () => {
    render(<Header title="Test Title" />);
    expect(screen.getByRole('heading', { name: 'Test Title' })).toBeInTheDocument();
  });

  test('display the SearchBox', () => {
    render(<Header />);
    expect(screen.getByTestId('header-searchbox')).toBeInTheDocument();
  });
});
