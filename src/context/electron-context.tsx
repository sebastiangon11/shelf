import React, { createContext } from 'react';

declare global {
  interface Window {
    electron: any;
    electronSettings: any;
  }
}

const { electron } = window;
const { remote, clipboard, nativeImage } = electron;

const electronContext = {
  quit: () => remote.getCurrentWindow().close(),
  clipboard,
  nativeImage
};

export const ElectronContext = createContext(electronContext);

interface contextProps {
  children: JSX.Element;
}

const Provider = ({ children }: contextProps) => {
  return <ElectronContext.Provider value={electronContext}>{children}</ElectronContext.Provider>;
};

export default { Provider, Consumer: ElectronContext.Consumer };
