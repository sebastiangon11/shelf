import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import { TextImageList } from './TextImageList';

const baseProps = {
  onElementClick: jest.fn(),
  elements: [
    {
      id: 1,
      value: 'Element 1'
    },
    {
      id: 2,
      value: 'Element 2'
    }
  ]
};

describe('TextImageList component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render empty message if no elements are provided', () => {
    render(<TextImageList />);
    expect(screen.getByText(/no elements/i));
  });

  test('should render text elements', () => {
    render(<TextImageList {...baseProps} />);
    expect(screen.getByText(baseProps.elements[0].value)).toBeInTheDocument();
  });

  test('should render image elements if isImage function returns true', () => {
    const props = {
      ...baseProps,
      isImage: (el: any) => el.image,
      elements: [
        ...baseProps.elements,
        {
          id: 3,
          value: 'imagedata',
          image: true
        }
      ]
    };
    render(<TextImageList {...props} />);
    expect(screen.getByRole('img')).toHaveAttribute('src', 'imagedata');
  });

  test('should execute onElementClick when an element is clicked', () => {
    render(<TextImageList {...baseProps} />);
    fireEvent.click(screen.getByText(baseProps.elements[0].value));
    expect(baseProps.onElementClick).toHaveBeenCalledWith(baseProps.elements[0]);
  });

  test('should display elements with the adapter interface', () => {
    const props = {
      ...baseProps,
      elements: [
        {
          name: 3,
          description: 'imagedata'
        }
      ],
      adapter: {
        id: 'name',
        value: 'description'
      }
    };
    render(<TextImageList {...props} />);
    expect(screen.getByText(props.elements[0].description)).toBeInTheDocument();
  });
});
