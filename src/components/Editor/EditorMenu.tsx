import React, { useState, useRef, ReactHTML } from 'react';
import {
  makeStyles,
  Card,
  TextField,
  Typography,
  Button,
  IconButton,
  ClickAwayListener
} from '@material-ui/core';

/** Icons */
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  controls: {
    zIndex: 1000,
    transition: '0.4s',
    opacity: '0.8',
    position: 'absolute',
    boxShadow: '0px 0px 8px 1px rgba(0,0,0,0.75)',
    width: '80%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxSizing: 'border-box',
    padding: theme.spacing(1),
    left: '50%',
    marginLeft: '-40%',
    margin: theme.spacing(2, 0, 0, 0),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.common.white,
    color: theme.palette.getContrastText(theme.palette.common.white),
    '&:hover': {
      transition: '0.4s',
      opacity: 1,
      boxShadow: '0px 0px 12px 1px rgba(0,0,0,0.75)'
    }
  },
  title: {
    margin: theme.spacing(2, 0, 1, 0),
    fontWeight: 600
  },
  titleEdit: {
    display: 'flex',
    flexGrow: 1,
    '& input, & label': {
      color: theme.palette.getContrastText(theme.palette.common.white)
    },
    '& input:valid + label': {
      fontSize: 0
    }
  },
  column: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    margin: theme.spacing(0, 0, 0, 2)
  },
  danger: {
    color: theme.palette.error.main
  }
}));

interface EditorMenuProps {
  title: string;
  subtitle?: string;
  onTitleChange?: (newName: string) => void;
  onDelete: () => void;
}

export const EditorMenu: React.FC<EditorMenuProps> = ({
  title,
  subtitle,
  onTitleChange,
  onDelete
}) => {
  const classes = useStyles();
  const [editMode, setEditMode] = useState(false);
  const [confirmDeletion, setConfirmDeletion] = useState(false);
  const titleInput = useRef<HTMLInputElement | null>(null);

  const handleTitleChange = (newName: string) => {
    onTitleChange && onTitleChange(newName);
    changeEditMode(false);
  };

  const handleInputKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      titleInput?.current?.blur();
    }
  };

  const handleInputBlur = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
    handleTitleChange(event.target.value);

  const changeEditMode = (state: boolean) => {
    handleTitleChange && setEditMode(state);
  };

  return (
    <Card data-testid="editor-menu" className={classes.controls}>
      <div className={classes.column}>
        {subtitle && <Typography variant="caption">{subtitle}</Typography>}
        {editMode ? (
          <TextField
            defaultValue={title}
            inputRef={titleInput}
            margin="dense"
            variant="outlined"
            label="Title"
            autoFocus={true}
            className={classes.titleEdit}
            onKeyPress={handleInputKeyPress}
            onBlur={handleInputBlur}
          />
        ) : (
          <Typography className={classes.title} onClick={() => changeEditMode(true)}>
            {title}
          </Typography>
        )}
      </div>
      <>
        {confirmDeletion ? (
          <ClickAwayListener onClickAway={() => setConfirmDeletion(false)}>
            <Button
              data-testid="editor-menu-delete-confirm"
              onClick={onDelete}
              variant="outlined"
              className={classes.danger}
              size="small"
            >
              Confirm
            </Button>
          </ClickAwayListener>
        ) : (
          <IconButton
            data-testid="editor-menu-delete"
            onClick={() => setConfirmDeletion(true)}
            className={classes.danger}
          >
            <DeleteIcon />
          </IconButton>
        )}
      </>
    </Card>
  );
};
