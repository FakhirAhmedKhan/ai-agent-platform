import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Settings, SettingsDocument } from './schemas/settings.schema';

@Injectable()
export class SettingsService {
  private readonly logger = new Logger(SettingsService.name);

  constructor(
    @InjectModel(Settings.name)
    private readonly settingsModel: Model<SettingsDocument>,
  ) {}

  async getSettings(tenantId: string): Promise<any> {
    const raw = await this.getRawSettings(tenantId);
    // Deep clone so masking doesn't corrupt the cached Mongoose doc
    const result = JSON.parse(JSON.stringify(raw));

    // Mask sensitive geminiKey before returning to frontend
    if (result.api?.geminiKey && result.api.geminiKey.length > 8) {
      result.api.geminiKey = result.api.geminiKey.substring(0, 4) + '...' + result.api.geminiKey.slice(-4);
    }

    return result;
  }

  async getRawSettings(tenantId: string): Promise<any> {
    let settings = await this.settingsModel.findOne({ tenantId }).exec();
    if (!settings) {
      // Create default settings for new tenant
      settings = new this.settingsModel({ tenantId });
      await settings.save();
    }
    return settings.toObject();
  }

  async updateSettings(payload: any, tenantId: string): Promise<any> {
    let settings = await this.settingsModel.findOne({ tenantId }).exec();
    if (!settings) {
      settings = new this.settingsModel({ ...payload, tenantId });
    } else {
      // Merge API updates
      if (payload.api) {
        const apiUpdate = { ...payload.api };

        // Skip masked keys (they come from the frontend displaying the saved masked value)
        if (apiUpdate.geminiKey && apiUpdate.geminiKey.includes('...')) {
          delete apiUpdate.geminiKey;
        }

        // Skip empty keys so we don't overwrite a previously saved real key
        if (apiUpdate.geminiKey === '' || apiUpdate.geminiKey === undefined) {
          delete apiUpdate.geminiKey;
        }

        this.logger.log(`Updating API settings: provider=${apiUpdate.provider ?? settings.api?.provider}, keyProvided=${!!apiUpdate.geminiKey}`);

        settings.api = { ...settings.toObject().api, ...apiUpdate };
        settings.markModified('api');
      }
      if (payload.notifications) {
        settings.notifications = { ...settings.toObject().notifications, ...payload.notifications };
        settings.markModified('notifications');
      }
      if (payload.appearance) {
        settings.appearance = { ...settings.toObject().appearance, ...payload.appearance };
        settings.markModified('appearance');
      }
    }

    await settings.save();
    return this.getSettings(tenantId);
  }
}
