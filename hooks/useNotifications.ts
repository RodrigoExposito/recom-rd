import { useEffect, useState } from 'react';
import { requestNotificationPermissions, scheduleAllNotifications } from '@/lib/notifications';
import { getSetting, setSetting } from '@/lib/db';

const NOTIFICATIONS_SCHEDULED_KEY = 'notifications_scheduled';

export function useNotifications() {
  const [permissionGranted, setPermissionGranted] = useState<boolean | null>(null);

  useEffect(() => {
    async function setup() {
      const granted = await requestNotificationPermissions();
      setPermissionGranted(granted);

      if (!granted) return;

      // Schedule once per app install (stored in settings)
      const alreadyScheduled = getSetting(NOTIFICATIONS_SCHEDULED_KEY);
      if (!alreadyScheduled) {
        await scheduleAllNotifications();
        setSetting(NOTIFICATIONS_SCHEDULED_KEY, 'true');
      }
    }

    setup().catch(console.error);
  }, []);

  const reschedule = async () => {
    const granted = await requestNotificationPermissions();
    if (!granted) return;
    await scheduleAllNotifications();
    setSetting(NOTIFICATIONS_SCHEDULED_KEY, 'true');
  };

  return { permissionGranted, reschedule };
}
