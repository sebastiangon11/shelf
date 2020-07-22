import React, { createContext } from 'react';

declare global {
  interface Window {
    electronSettings: any;
  }
}

const { electronSettings } = window;

const storeContext = {
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

export const StoreContext = createContext(storeContext);

interface contextProps {
  children: JSX.Element;
}

const Provider = ({ children }: contextProps) => {
  return <StoreContext.Provider value={storeContext}>{children}</StoreContext.Provider>;
};

export default { Provider, Consumer: StoreContext.Consumer };
