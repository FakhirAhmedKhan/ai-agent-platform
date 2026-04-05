import { Bell } from "lucide-react";
import { SectionCard, Toggle } from "./SettingsUI";

export const NotificationSettingsSection = ({ 
    notificationSettings, 
    setNotificationSettings, 
    handleSaveNotifications, 
    isUpdating 
}: any) => (
    <SectionCard 
        title="Notifications & Demo" 
        description="Control how and when you receive system updates."
        icon={Bell}
        onSave={handleSaveNotifications}
        isSaving={isUpdating}
    >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            <Toggle 
                label="Email Notifications" 
                description="Receive task reports via email"
                enabled={notificationSettings.emailNotifications}
                onChange={(val) => setNotificationSettings({...notificationSettings, emailNotifications: val})}
            />
            <Toggle 
                label="In-App Notifications" 
                description="Show toast alerts in the dashboard"
                enabled={notificationSettings.inAppNotifications}
                onChange={(val) => setNotificationSettings({...notificationSettings, inAppNotifications: val})}
            />
            <Toggle 
                label="Task Completed Alerts" 
                description="Notify when an agent finishes a task"
                enabled={notificationSettings.taskCompletedAlerts}
                onChange={(val) => setNotificationSettings({...notificationSettings, taskCompletedAlerts: val})}
            />
            <Toggle 
                label="Task Failed Alerts" 
                description="Instant alerts for execution errors"
                enabled={notificationSettings.taskFailedAlerts}
                onChange={(val) => setNotificationSettings({...notificationSettings, taskFailedAlerts: val})}
            />
        </div>
    </SectionCard>
);
