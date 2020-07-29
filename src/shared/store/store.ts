declare global {
  interface Window {
    electronSettings: any;
  }
}

const electronSettings =
  typeof window !== 'undefined' &&
  window.electronSettings &&
  Object.keys(window.electronSettings).length
    ? window.electronSettings
    : require('electron-settings');

export class Store {
  static set(key: string, value: object) {
    try {
      electronSettings.setSync(key, JSON.stringify(value));
    } catch (error) {
      console.error(
        `Error saving setting ${key} with value ${value} to the store - Error: ${error}`
      );
      throw error;
    }
  }

  static get(key: string) {
    let value;
    try {
      if (electronSettings.hasSync(key)) {
        value = electronSettings.getSync(key);
      }
      if (!value) return;
      return JSON.parse(value);
    } catch (error) {
      console.error(`Error parsing value from ${key} - ${error} - Returning unparsed value.`);
      return value;
    }
  }

  static has(key: string): boolean {
    return electronSettings.hasSync(key);
  }
}
