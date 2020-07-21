import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import { ClipboardHistory } from './ClipboardHistory';

describe('ClipboardHistory component', () => {
  test('should render header element', () => {
    render(<ClipboardHistory />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });
});
