import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, Avatar, Typography, Divider } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  thumbnail: {
    height: 150,
    width: '70%',
    borderRadius: 0,
    margin: '0 auto'
  },
  ellipsis: {
    display: '-webkit-box',
    fontSize: 14,
    lineHeight: 1.3,
    WebkitLineClamp: 10,
    maxHeight: 200,
    margin: '0 auto',
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    wordWrap: 'break-word'
  }
}));

interface TextImageListProps {
  elements?: any[];
  onElementClick?: (element: any) => void;
  empty?: React.ReactNode;
  isImage?: (element: any) => boolean;
  adapter?: {
    value: string;
    id: string;
  };
}

export const TextImageList: React.FC<TextImageListProps> = ({
  elements = [],
  empty = 'No elements to display',
  onElementClick = () => {},
  adapter = { value: 'value', id: 'id' },
  isImage = () => false
}) => {
  const classes = useStyles();

  return (
    <List>
      {elements.length === 0 && (
        <Typography align="center" variant="h6">
          {empty}
        </Typography>
      )}
      {elements.map((element) => (
        <React.Fragment key={element[adapter.id || 'id']}>
          <ListItem component="li" onClick={() => onElementClick(element)} button dense>
            {isImage(element) ? (
              <Avatar className={classes.thumbnail} src={element[adapter.value]} />
            ) : (
              <ListItemText
                primary={
                  <Typography classes={{ root: classes.ellipsis }} variant="caption">
                    {element[adapter.value]}
                  </Typography>
                }
              />
            )}
          </ListItem>
          <Divider />
        </React.Fragment>
      ))}
    </List>
  );
};
