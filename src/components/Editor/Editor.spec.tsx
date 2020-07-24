import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import { Editor } from './Editor';
import { EditorMenu } from './EditorMenu';

describe('Editor component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render editor container with its id attribute for the editor to work', () => {
    const props = {
      id: 'my-note-id'
    };
    render(<Editor {...props} />);
    expect(screen.getByTestId('editor-root')).toHaveAttribute('id', props.id);
  });

  test('should render the prodived menu as children', () => {
    const editorProps = {
      id: 'my-note-id'
    };
    const menuProps = {
      title: 'my-note-title',
      subtitle: 'my-note-details',
      onDelete: jest.fn()
    };

    render(
      <Editor {...editorProps}>
        <EditorMenu {...menuProps} />
      </Editor>
    );
    expect(screen.getByTestId('editor-menu')).toBeInTheDocument();
    expect(screen.getByText(menuProps.title)).toBeInTheDocument();
    expect(screen.getByText(menuProps.subtitle)).toBeInTheDocument();

    // Title should not be displayed in textbox by default
    expect(screen.queryByRole('textbox')).toBeNull();
  });

  test('should render the title in a textbox if clicked', () => {
    const editorProps = {
      id: 'my-note-id'
    };
    const menuProps = {
      title: 'my-note-title',
      subtitle: 'my-note-details',
      onDelete: jest.fn()
    };

    render(
      <Editor {...editorProps}>
        <EditorMenu {...menuProps} />
      </Editor>
    );
    expect(screen.getByTestId('editor-menu')).toBeInTheDocument();
    expect(screen.getByText(menuProps.title)).toBeInTheDocument();
    expect(screen.getByText(menuProps.subtitle)).toBeInTheDocument();

    fireEvent.click(screen.getByText(menuProps.title));

    expect(screen.getByRole('textbox')).toHaveAttribute('value', menuProps.title);
  });

  test('should call delete callback when deletion is confirmed only', () => {
    const editorProps = {
      id: 'my-note-id'
    };
    const menuProps = {
      title: 'my-note-title',
      subtitle: 'my-note-details',
      onDelete: jest.fn()
    };

    render(
      <Editor {...editorProps}>
        <EditorMenu {...menuProps} />
      </Editor>
    );
    expect(screen.getByTestId('editor-menu-delete')).toBeInTheDocument();
    expect(screen.queryByTestId('editor-menu-delete-confirm')).toBeNull();

    // First delete click should ask form confirmation
    fireEvent.click(screen.getByTestId('editor-menu-delete'));
    expect(menuProps.onDelete).not.toHaveBeenCalled();
    expect(screen.getByTestId('editor-menu-delete-confirm')).toBeInTheDocument();
    expect(screen.queryByTestId('editor-menu-delete')).toBeNull();

    // Second delete click sohuld fire callback
    fireEvent.click(screen.getByTestId('editor-menu-delete-confirm'));
    expect(menuProps.onDelete).toHaveBeenCalledTimes(1);
  });
});
