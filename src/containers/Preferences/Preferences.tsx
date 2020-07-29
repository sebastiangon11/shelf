import React, { useState, useEffect, useContext } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import {
  Typography,
  Divider,
  Checkbox,
  TextField,
  InputAdornment,
  Button
} from '@material-ui/core';
import { PreferencesService } from '../../shared/services/Preferences-service';
import { Preference } from '../../shared/entities/Preference';
import { ElectronContext } from '../../context/electron-context';

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    position: 'absolute',
    boxSizing: 'border-box',
    width: '60vw',
    height: '70vh',
    outline: 0,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[10],
    padding: theme.spacing(2, 4, 3),
    borderRadius: theme.shape.borderRadius,
    // Screen center
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`
  },
  header: {
    position: 'fixed',
    width: 'calc(100% - 32px - 32px)'
  },
  body: {
    marginTop: theme.spacing(6),
    maxHeight: 'calc(100% - 32px)',
    overflow: 'auto'
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing(1, 0),
    margin: theme.spacing(1, 0)
  },
  col: {
    width: '50%'
  },
  title: {
    marginTop: theme.spacing(1)
  }
}));

interface PreferencesProps {
  onSave: () => void;
}

export const Preferences: React.FC<PreferencesProps> = ({ onSave }) => {
  const { paper, header, body, title, row, col } = useStyles();
  const { remote } = useContext(ElectronContext);
  const [restart, setRestart] = useState(false);
  const [preferences, setPreferences] = useState<Preference[]>([]);
  const isMac = remote.process.platform === 'darwin';

  useEffect(() => {
    const preferences = PreferencesService.getAllPreferences();
    setPreferences(preferences);
  }, []);

  const onChecked = (preference: Preference) => (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    preference.value = checked;
    const newPreferences = PreferencesService.savePreference(preference);
    setPreferences(newPreferences);
    if (preference.requiresRestart) setRestart(true);
  };

  const onValueChanged = (preference: Preference) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    preference.value = event.target.value;
    const newPreferences = PreferencesService.savePreference(preference);
    setPreferences(newPreferences);
    if (preference.requiresRestart) setRestart(true);
  };

  const shortcuts = preferences.filter((p) => p.id.startsWith('SHORTCUT'));
  const general = preferences.filter((p) => !p.id.startsWith('SHORTCUT'));

  const renderPreferenceInput = (prefix: string) => (pref: Preference) => (
    <div key={pref.id} className={row}>
      <Typography className={col} variant="body2">
        {pref.displayName}
      </Typography>
      {typeof pref.value === 'boolean' ? (
        <Checkbox onChange={onChecked(pref)} checked={pref.value} />
      ) : (
        <TextField
          InputProps={{
            startAdornment: <InputAdornment position="start">{prefix}</InputAdornment>
          }}
          onChange={onValueChanged(pref)}
          value={pref.value}
        />
      )}
    </div>
  );

  return (
    <div className={paper}>
      <div className={header}>
        <Typography variant="h4">Preferences</Typography>
        <Divider />
      </div>
      <div className={body}>
        <div>
          <Typography className={title} variant="h5">
            General
          </Typography>
          {general.map(renderPreferenceInput(''))}
          <Divider />
          <Typography className={title} variant="h5">
            Shortcuts
          </Typography>
          <Typography variant="caption">{`All shortcuts must begin with ${
            isMac ? 'Cmd' : 'Ctrl'
          } + Shift`}</Typography>
          {shortcuts.map(renderPreferenceInput(isMac ? 'Cmd + Shift + ' : 'Ctrl + Shift + '))}
        </div>
        {restart && (
          <Typography color="secondary" variant="caption">
            Some changes require to restart the application
          </Typography>
        )}
      </div>
      <Button
        style={{ position: 'absolute', right: 50, bottom: 50 }}
        color="primary"
        variant="contained"
        size="medium"
        onClick={onSave}
      >
        Save
      </Button>
    </div>
  );
};
