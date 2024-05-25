export global {
  interface FontSettingsFormData {
    minWidth: number;
    maxWidth: number;
    fontScaleFactor: number;
    lineHeightScaleFactor: number;
    mobileFirst: 'true' | 'false';
  }
  
  interface SpaceSettingsFormData {
    minWidth: number;
    maxWidth: number;
    scaleFactor: number;
    mobileFirst: 'true' | 'false';
  }
}
