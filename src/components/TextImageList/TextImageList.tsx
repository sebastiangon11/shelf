import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import {
  List,
  ListItem,
  ListItemText,
  Avatar,
  Typography,
  Divider,
  Card,
  CardContent,
  CardMedia,
  CardActionArea
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: theme.spacing(1)
  },
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
    <div>
      {elements.length === 0 && (
        <Typography align="center" variant="h6">
          {empty}
        </Typography>
      )}
      {elements.map((element) => (
        <div key={element[adapter.id]} className={classes.root}>
          <Card raised onClick={() => onElementClick(element)}>
            <CardActionArea>
              {isImage(element) ? (
                <CardMedia component="img" height="140" src={element[adapter.value]} />
              ) : (
                <CardContent>{element[adapter.value]}</CardContent>
              )}
            </CardActionArea>
          </Card>
        </div>
      ))}
    </div>
  );
};
