import React, { useState, cloneElement, isValidElement, Children } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MuiTabs from '@material-ui/core/Tabs';
import MuiTab from '@material-ui/core/Tab';
import IconButton from '@material-ui/core/IconButton';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import { Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  tabs: {
    width: '20%'
  },
  tabPanelBox: {
    height: '100%',
    width: '100%',
    boxSizing: 'border-box',
    overflow: 'auto',
    borderLeft: `1px solid ${theme.palette.divider}`
  },
  iconRoot: {
    borderRadius: 0
  }
}));

export const Tabs = MuiTabs;

export const Tab = MuiTab;

interface PanelsProps {
  children: React.ReactElement | React.ReactElement[];
}

export const Panels: React.FC<PanelsProps> = ({ children }) => <div>{children}</div>;

interface PanelProps {
  children: React.ReactNode | undefined;
  isActive?: boolean;
  index?: number;
}

export const Panel: React.FC<PanelProps> = ({ children, isActive, index }) => {
  const classes = useStyles();
  return (
    <div
      hidden={isActive}
      key={index}
      style={{ display: 'contents' }}
      role="tabpanel"
      id={`vertical-tabpanel-${index}`}
    >
      {isActive && (
        <Box key={index} className={classes.tabPanelBox}>
          {children}
        </Box>
      )}
    </div>
  );
};

interface TabPanelProps {
  children: [React.ReactElement, React.ReactElement];
  onTabCreated?: () => void;
}

export const TabPanel: React.FC<TabPanelProps> = ({ children, onTabCreated }) => {
  const classes = useStyles();
  const [activeTab, setActiveTab] = useState(0);
  const [tabs, panels] = children;

  const handleNewTabClick = () => {
    setActiveTab(panels.props.children?.length);
    onTabCreated && onTabCreated();
  };

  return (
    <>
      <Tabs
        value={activeTab}
        onChange={(_, newValue) => setActiveTab(newValue)}
        orientation="vertical"
        variant="scrollable"
        className={classes.tabs}
      >
        {tabs.props.children}
        {onTabCreated && (
          <IconButton
            className={classes.iconRoot}
            data-testid="tabpanel-newtab"
            onClick={handleNewTabClick}
            color="secondary"
          >
            <AddBoxOutlinedIcon />
          </IconButton>
        )}
      </Tabs>
      {Children.toArray(panels.props.children).map((panel: React.ReactNode, idx: number) => {
        return cloneElement(panel as React.ReactElement, {
          isActive: activeTab === idx,
          index: idx
        });
      })}
    </>
  );
};
