import path from 'path';
import { PreferencesService } from './Preferences-service';
import { Preference } from '../entities/Preference';

const electronSettings = require('electron-settings');

electronSettings.configure({
  dir: path.resolve('./src/shared/store'),
  fileName: 'store-mock.json'
});

console.warn('Using mock settings file', electronSettings.file());

describe('Preferences service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should return parsed elements from store', () => {
    const preferences = PreferencesService.getAllPreferences();
    expect(Array.isArray(preferences)).toBeTruthy();
    expect(preferences.length).toBeGreaterThan(0);
    expect(preferences[0]).toBeInstanceOf(Preference);
  });

  test('should save, retrieve and modify a preference ', () => {
    const id = 'TEST_PREF';
    const displayName = 'some test preference';
    const initialValue = false;

    const preferenceT0 = new Preference(id, displayName, initialValue, false);

    // Save it
    PreferencesService.savePreference(preferenceT0);

    // Retrieve it
    const preferenceT1 = PreferencesService.getPreference(id) as Preference;
    expect(preferenceT1?.value).toBe(initialValue);
    expect(preferenceT1?.displayName).toBe(displayName);

    // Modify it
    preferenceT1.value = !initialValue;
    PreferencesService.savePreference(preferenceT1);

    // Check de modification
    const preferenceT2 = PreferencesService.getPreference(id) as Preference;
    expect(preferenceT2?.value).toBe(!initialValue);
  });
});
