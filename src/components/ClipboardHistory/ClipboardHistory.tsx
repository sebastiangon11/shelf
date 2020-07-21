import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import {
  List,
  ListItem,
  ListItemText,
  Avatar,
  ListSubheader,
  Typography,
  Divider
} from '@material-ui/core';

import { useClipboard } from '../../hooks/useClipboard';
import { ClipboardItem } from '../../shared/ClipboardItem';

interface ClipboardHistoryProps {}

const useStyles = makeStyles((theme: Theme) => ({
  subRoot: {
    color: 'rgba(0, 0, 0, 0.87)',
    background: 'linear-gradient(94deg, rgba(0,212,255,1) 0%, rgba(134, 234, 255) 100%)',
    minHeight: 48,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  listRoot: {
    padding: 0
  },
  thumbnail: {
    height: 150,
    width: '70%',
    borderRadius: 0,
    margin: '0 auto'
  }
}));

export const ClipboardHistory: React.FC<ClipboardHistoryProps> = ({}) => {
  const classes = useStyles();
  const [clipboardHistory, setClipboardItem] = useClipboard();

  const renderListItem = (element: ClipboardItem) => (
    <React.Fragment key={element.id}>
      <ListItem onClick={() => setClipboardItem(element)} button dense>
        {element.isImage() ? (
          <Avatar className={classes.thumbnail} alt={element.id} src={element.value} />
        ) : (
          <ListItemText primary={<Typography variant="caption">{element.value}</Typography>} />
        )}
      </ListItem>
      <Divider />
    </React.Fragment>
  );

  return (
    <div data-testid="clipboard-history-list">
      <List classes={{ root: classes.listRoot }}>
        <ListSubheader classes={{ root: classes.subRoot }} component="div">
          <Typography variant="subtitle1">Clipboard</Typography>
        </ListSubheader>
        {clipboardHistory.map(renderListItem)}
      </List>
    </div>
  );
};
