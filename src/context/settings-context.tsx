import React, { createContext } from 'react';

declare global {
  interface Window {
    electron: any;
    electronSettings: any;
  }
}

const { electronSettings } = window;

const settingContext = {
  set: (key: string, value: object) => {
    try {
      electronSettings.setSync(key, JSON.stringify(value));
    } catch (error) {
      electronSettings.setSync(key, value);
    }
  },
  get: (key: string) => {
    let value;
    try {
      value = electronSettings.getSync(key);
      return JSON.parse(value);
    } catch (error) {
      return value;
    }
  }
};

export const SettingsContext = createContext(settingContext);

interface contextProps {
  children: JSX.Element;
}

const Provider = ({ children }: contextProps) => {
  return <SettingsContext.Provider value={settingContext}>{children}</SettingsContext.Provider>;
};

export default { Provider, Consumer: SettingsContext.Consumer };
