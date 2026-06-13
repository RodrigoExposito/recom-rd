import { Supplement, Meal } from '@/types';

export const SUPPLEMENTS: Supplement[] = [
  {
    id: 'omega3',
    name: 'Omega-3',
    scheduledTime: '07:30',
    dose: '2000mg',
    notificationBody: 'Tomá tu Omega-3 2000mg con el desayuno',
  },
  {
    id: 'colageno',
    name: 'Colágeno ENA Sport',
    scheduledTime: '19:00',
    dose: '1 sobre',
    notificationBody: 'Colágeno ENA Sport — pre-entreno',
  },
  {
    id: 'whey',
    name: 'Whey X-Pro',
    scheduledTime: '22:00',
    dose: '1.5 scoops',
    notificationBody: 'Batido de Whey X-Pro post-entreno (1.5 scoops)',
  },
  {
    id: 'magnesio',
    name: 'Magnesio L-Treonato',
    scheduledTime: '00:30',
    dose: '1000mg',
    notificationBody: 'Magnesio L-Treonato 1000mg — pre-sueño',
  },
];

export const MEALS: Meal[] = [
  {
    id: 'desayuno',
    name: 'Desayuno',
    scheduledTime: '07:30',
    proteinG: 15,
    carbsG: 80,
    fatsG: 10,
  },
  {
    id: 'colacion1',
    name: 'Colación 1',
    scheduledTime: '10:30',
    proteinG: 25,
    carbsG: 30,
    fatsG: 5,
  },
  {
    id: 'almuerzo',
    name: 'Almuerzo',
    scheduledTime: '12:30',
    proteinG: 50,
    carbsG: 90,
    fatsG: 15,
  },
  {
    id: 'snack_preentreeno',
    name: 'Snack pre-entreno',
    scheduledTime: '17:00',
    proteinG: 8,
    carbsG: 30,
    fatsG: 10,
  },
  {
    id: 'post_entreno',
    name: 'Post-entreno',
    scheduledTime: '22:00',
    proteinG: 24,
    carbsG: 30,
    fatsG: 2,
  },
  {
    id: 'pre_sueno',
    name: 'Pre-sueño',
    scheduledTime: '00:00',
    proteinG: 30,
    carbsG: 20,
    fatsG: 5,
  },
];

export const DAILY_TOTALS = {
  proteinG: MEALS.reduce((sum, m) => sum + m.proteinG, 0),
  carbsG: MEALS.reduce((sum, m) => sum + m.carbsG, 0),
  fatsG: MEALS.reduce((sum, m) => sum + m.fatsG, 0),
};
