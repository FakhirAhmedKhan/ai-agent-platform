import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Settings extends Document {
  @Prop({ type: Object, default: { geminiKey: '', provider: 'mock' } })
  api: {
    geminiKey: string;
    provider: string;
  };

  @Prop({ type: Object, default: { emailNotifications: false, inAppNotifications: true, taskCompletedAlerts: true, taskFailedAlerts: true } })
  notifications: {
    emailNotifications: boolean;
    inAppNotifications: boolean;
    taskCompletedAlerts: boolean;
    taskFailedAlerts: boolean;
  };

  @Prop({ type: Object, default: { theme: 'light', accentColor: '#3b82f6', demoMode: false, mockProviderMode: true } })
  appearance: {
    theme: string;
    accentColor: string;
    demoMode: boolean;
    mockProviderMode: boolean;
  };

  @Prop({ required: true, index: true, unique: true })
  tenantId: string;
}

export type SettingsDocument = Settings & Document;
export const SettingsSchema = SchemaFactory.createForClass(Settings);
