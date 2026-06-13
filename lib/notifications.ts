import * as Notifications from 'expo-notifications';
import { SUPPLEMENTS, MEALS } from '@/data/nutrition-protocol';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function requestNotificationPermissions(): Promise<boolean> {
  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
}

function parseTime(hhmm: string): { hour: number; minute: number } {
  const [h, m] = hhmm.split(':').map(Number);
  return { hour: h ?? 0, minute: m ?? 0 };
}

export async function scheduleAllNotifications(): Promise<void> {
  // Cancel previous to avoid duplicates
  await Notifications.cancelAllScheduledNotificationsAsync();

  // Supplement notifications
  for (const supp of SUPPLEMENTS) {
    const { hour, minute } = parseTime(supp.scheduledTime);
    await Notifications.scheduleNotificationAsync({
      content: {
        title: supp.name,
        body: supp.notificationBody,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        hour,
        minute,
      },
    });
  }

  // Meal notifications
  for (const meal of MEALS) {
    const { hour, minute } = parseTime(meal.scheduledTime);
    await Notifications.scheduleNotificationAsync({
      content: {
        title: `Hora de comer: ${meal.name}`,
        body: `${meal.proteinG}g P · ${meal.carbsG}g C · ${meal.fatsG}g F`,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        hour,
        minute,
      },
    });
  }
}
