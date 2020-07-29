import { Store } from '../store/store';
import { Preference } from '../entities/Preference';

export class PreferencesService {
  static getAllPreferences(): Preference[] {
    try {
      console.info('Getting all preferences');
      const _preferences = Store.get('preferences');

      if (!_preferences) {
        console.warn('Preferences not found');
        return [];
      }

      return Object.values(_preferences).map(
        (pref: any) => new Preference(pref.id, pref.displayName, pref.value, pref.requiresRestart)
      );
    } catch (error) {
      console.error('Error getting all preferences', error);
      throw error;
    }
  }

  static getPreference(key: string): Preference | undefined {
    try {
      console.info('Getting preference', key);
      const _preferences = Store.get('preferences');

      if (!_preferences || !_preferences[key]) {
        console.warn('Preference not found for key', key);
        return;
      }

      return new Preference(
        _preferences[key].id,
        _preferences[key].displayName,
        _preferences[key].value,
        _preferences[key].requiresRestart
      );
    } catch (error) {
      console.error('Error getting preference', key, error);
      throw error;
    }
  }

  static savePreference(preference: Preference): Preference[] {
    try {
      console.info('Saving preference', preference.toString());
      const _preferences = Store.get('preferences') || {};
      _preferences[preference.id] = preference;
      Store.set(`preferences`, _preferences);
      return Object.values(_preferences).map(
        (pref: any) => new Preference(pref.id, pref.displayName, pref.value, pref.requiresRestart)
      );
    } catch (error) {
      console.error('Error saving preference', preference.toString(), error);
      throw error;
    }
  }
}
