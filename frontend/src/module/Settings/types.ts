export interface ApiSettings {
  geminiKey: string;
  provider: 'mock' | 'gemini';
}

export interface NotificationSettings {
  emailNotifications: boolean;
  inAppNotifications: boolean;
  taskCompletedAlerts: boolean;
  taskFailedAlerts: boolean;
}

export interface AppearanceSettings {
  theme: 'light' | 'dark';
  accentColor: string;
  demoMode: boolean;
  mockProviderMode: boolean;
}

export interface UserSettings {
  api: ApiSettings;
  notifications: NotificationSettings;
  appearance: AppearanceSettings;
}

export type SettingsUpdatePayload = Partial<UserSettings>;
