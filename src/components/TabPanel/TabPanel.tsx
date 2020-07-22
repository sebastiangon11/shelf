import React, { useState, cloneElement, isValidElement } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MuiTabs from '@material-ui/core/Tabs';
import MuiTab from '@material-ui/core/Tab';
import IconButton from '@material-ui/core/IconButton';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';

const useStyles = makeStyles((theme) => ({
  root: {
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      display: 'flex',
      height: '100%',
      borderRight: `1px solid ${theme.palette.divider}`
    }
  },
  tabs: {
    width: '20%'
  },
  tabPanelBox: {
    height: '100%',
    width: '100%',
    boxSizing: 'border-box',
    overflow: 'auto',
    padding: theme.spacing(2),
    borderLeft: `1px solid ${theme.palette.divider}`
  }
}));

type TabPanelChildren = [React.ReactElement, (activeTab: number) => React.ReactNode];

interface TabPanelProps {
  children: any; //TabPanelChildren;
  onTabCreated: (index: number) => void;
}

export const Tabs = MuiTabs;
export const Tab = MuiTab;

export const TabPanel: React.FC<TabPanelProps> = ({ children, onTabCreated }) => {
  const classes = useStyles();
  const [activeTab, setActiveTab] = useState(0);

  const [tabs, ...panels] = children;

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
        <IconButton onClick={() => onTabCreated(panels[0].length)} color="secondary">
          <AddBoxOutlinedIcon />
        </IconButton>
      </Tabs>
      {panels.flat().map((panel: any, idx: number) => {
        return (
          <div
            key={idx}
            style={{ display: 'contents' }}
            role="tabpanel"
            hidden={activeTab !== idx}
            id={`vertical-tabpanel-${idx}`}
          >
            {activeTab === idx ? panel : null}
          </div>
        );
      })}
    </>
  );
};
