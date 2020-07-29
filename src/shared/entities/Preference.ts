export class Preference {
  id: string;
  displayName: string;
  value: string | boolean;
  requiresRestart?: boolean;

  constructor(id: string, displayName: string, value: string | boolean, requiresRestart = false) {
    this.id = id;
    this.displayName = displayName;
    this.value = value;
    this.requiresRestart = requiresRestart;
  }

  public toString() {
    return `Preference ${this.id} - ${this.displayName} - ${this.value}`;
  }
}
