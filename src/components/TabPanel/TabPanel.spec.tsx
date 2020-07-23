import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import { TabPanel, Tabs, Tab, Panels, Panel } from './TabPanel';

const mockElements = [
  {
    title: 'Tab 1',
    content: <p>Content 1</p>
  },
  {
    title: 'Tab 2',
    content: 'Content 2'
  }
];

describe('TabPanel component', () => {
  test('should render only one tab', () => {
    render(
      <TabPanel>
        <Tabs>
          <Tab label={'Tab 1'} />
        </Tabs>
        <Panels>
          <Panel>Content 1</Panel>
        </Panels>
      </TabPanel>
    );
    expect(screen.getByRole('tablist')).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Tab 1' })).toBeInTheDocument();
    // expect(screen.getByRole('tabpanel')).toBeInTheDocument();
    expect(screen.getByText('Content 1')).toBeInTheDocument();
  });

  test('should render multiple tabs', () => {
    render(
      <TabPanel>
        <Tabs>
          <Tab label={'Tab 1'} />
          <Tab label={'Tab 2'} />
        </Tabs>
        <Panels>
          <Panel>Content 1</Panel>
          <Panel>Content 2</Panel>
        </Panels>
      </TabPanel>
    );
    expect(screen.getByRole('tablist')).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Tab 1' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Tab 2' })).toBeInTheDocument();
    expect(screen.getByRole('tabpanel')).toBeInTheDocument();
    expect(screen.getByText('Content 1')).toBeInTheDocument();
  });

  test('should render multiple tabs by mapping elements', () => {
    render(
      <TabPanel>
        <Tabs>
          {mockElements.map((el) => (
            <Tab label={el.title} />
          ))}
        </Tabs>
        <Panels>
          {mockElements.map((el) => (
            <Panel>{el.content}</Panel>
          ))}
        </Panels>
      </TabPanel>
    );
    expect(screen.getByRole('tablist')).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Tab 1' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Tab 2' })).toBeInTheDocument();
    expect(screen.getByRole('tabpanel')).toBeInTheDocument();
    expect(screen.getByText('Content 1')).toBeInTheDocument();
  });

  test('should display the focused tab content', () => {
    render(
      <TabPanel>
        <Tabs>
          {mockElements.map((el) => (
            <Tab label={el.title} />
          ))}
        </Tabs>
        <Panels>
          {mockElements.map((el) => (
            <Panel>{el.content}</Panel>
          ))}
        </Panels>
      </TabPanel>
    );
    expect(screen.getByRole('tablist')).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Tab 1' })).toBeInTheDocument();
    expect(screen.getByText('Content 1')).toBeInTheDocument();
    expect(screen.queryByText('Content 2')).toBeNull();
    fireEvent.click(screen.getByRole('tab', { name: 'Tab 2' }));
    expect(screen.getByRole('tabpanel')).toBeInTheDocument();
    expect(screen.getByText('Content 2')).toBeInTheDocument();
  });

  test('should display the create tab button if callback is provided', () => {
    const createTab = jest.fn();
    render(
      <TabPanel onTabCreated={createTab}>
        <Tabs>
          {mockElements.map((el) => (
            <Tab label={el.title} />
          ))}
        </Tabs>
        <Panels>
          {mockElements.map((el) => (
            <Panel>{el.content}</Panel>
          ))}
        </Panels>
      </TabPanel>
    );

    fireEvent.click(screen.getByTestId('tabpanel-newtab'));
    expect(createTab).toHaveBeenCalled();
  });
});
