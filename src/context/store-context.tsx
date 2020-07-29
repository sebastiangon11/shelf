import React, { createContext } from 'react';
import { Store } from '../shared/store/store';

declare global {
  interface Window {
    electronSettings: any;
  }
}

export const StoreContext = createContext(Store);

interface contextProps {
  children: JSX.Element;
}

const Provider = ({ children }: contextProps) => {
  return <StoreContext.Provider value={Store}>{children}</StoreContext.Provider>;
};

export default { Provider, Consumer: StoreContext.Consumer };
