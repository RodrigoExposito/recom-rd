import { WorkoutDay } from '@/types';

export const LUETH_PROGRAM: WorkoutDay[] = [
  {
    id: 'push1',
    name: 'Push 1',
    shortName: 'PUSH 1',
    dayOfWeek: 1,
    muscleGroups: ['Pecho', 'Hombros', 'Tríceps'],
    movementPrep: ['Arm circles x10', 'Band pull-aparts x15', 'Wall slides x10'],
    exercises: [
      { id: 'push1_e1', name: 'Barbell Bench Press', setsTarget: 4, repsTarget: '6-15', restSeconds: 150, orderIndex: 1 },
      { id: 'push1_e2', name: 'Seated DB Overhead Press', setsTarget: 3, repsTarget: '6-15', restSeconds: 150, orderIndex: 2 },
      { id: 'push1_e3', name: 'Machine Chest Fly', setsTarget: 3, repsTarget: '8-15', restSeconds: 90, orderIndex: 3 },
      { id: 'push1_e4', name: 'Machine Reverse Fly', setsTarget: 3, repsTarget: '8-15', restSeconds: 90, orderIndex: 4 },
      { id: 'push1_e5', name: 'Cable OH Triceps Extension', setsTarget: 3, repsTarget: '8-15', restSeconds: 90, orderIndex: 5 },
      { id: 'push1_e6', name: 'Cable Lateral Raise', setsTarget: 3, repsTarget: '8-15', restSeconds: 90, orderIndex: 6 },
      { id: 'push1_e7', name: 'Cable Triceps Pushdown', setsTarget: 3, repsTarget: '8-15', restSeconds: 90, orderIndex: 7 },
    ],
  },
  {
    id: 'pull1',
    name: 'Pull 1',
    shortName: 'PULL 1',
    dayOfWeek: 2,
    muscleGroups: ['Espalda', 'Bíceps', 'Core'],
    movementPrep: ['Cat-cow x10', 'Scapular retractions x15', 'Dead hangs 20s'],
    exercises: [
      { id: 'pull1_e1', name: 'Pull-ups', setsTarget: 4, repsTarget: '6-15', restSeconds: 150, orderIndex: 1 },
      { id: 'pull1_e2', name: 'Unilateral DB Row', setsTarget: 3, repsTarget: '6-15', restSeconds: 150, orderIndex: 2 },
      { id: 'pull1_e3', name: 'DB Farmers Carry', setsTarget: 3, repsTarget: 'Max Effort', restSeconds: 120, orderIndex: 3, notes: 'Máximo esfuerzo por distancia/tiempo' },
      { id: 'pull1_e4', name: 'Wide Grip Seated Cable Row', setsTarget: 3, repsTarget: '8-15', restSeconds: 90, orderIndex: 4 },
      { id: 'pull1_e5', name: 'Barbell Reverse Curl', setsTarget: 3, repsTarget: '8-15', restSeconds: 90, orderIndex: 5 },
      { id: 'pull1_e6', name: 'Alternating DB Curl', setsTarget: 3, repsTarget: '8-15', restSeconds: 90, orderIndex: 6 },
      { id: 'pull1_e7', name: 'Cable Core Rotation', setsTarget: 3, repsTarget: '6-15', restSeconds: 90, orderIndex: 7 },
    ],
  },
  {
    id: 'legs1',
    name: 'Legs 1',
    shortName: 'LEGS 1',
    dayOfWeek: 3,
    muscleGroups: ['Cuádriceps', 'Isquiotibiales', 'Glúteos', 'Core'],
    movementPrep: ['Hip circles x10', 'Bodyweight squat x15', 'Hip flexor stretch 30s c/lado'],
    exercises: [
      { id: 'legs1_e1', name: 'Barbell Back Squat', setsTarget: 4, repsTarget: '6-15', restSeconds: 150, orderIndex: 1 },
      { id: 'legs1_e2', name: 'DB Romanian Deadlift', setsTarget: 3, repsTarget: '6-15', restSeconds: 150, orderIndex: 2 },
      { id: 'legs1_e3', name: 'DB Lunge', setsTarget: 3, repsTarget: '6-15', restSeconds: 120, orderIndex: 3 },
      { id: 'legs1_e4', name: 'Seated Leg Curl', setsTarget: 3, repsTarget: '6-15', restSeconds: 90, orderIndex: 4 },
      { id: 'legs1_e5', name: 'Smith Calf Raise (feet elevated)', setsTarget: 4, repsTarget: '6-15', restSeconds: 90, orderIndex: 5 },
      { id: 'legs1_e6', name: 'Machine Hip Abduction', setsTarget: 3, repsTarget: '6-15', restSeconds: 90, orderIndex: 6 },
      { id: 'legs1_e7', name: 'Hanging Leg Raise', setsTarget: 3, repsTarget: '6-15', restSeconds: 90, orderIndex: 7 },
    ],
  },
  {
    id: 'push2',
    name: 'Push 2',
    shortName: 'PUSH 2',
    dayOfWeek: 4,
    muscleGroups: ['Pecho inclinado', 'Hombros', 'Tríceps'],
    movementPrep: ['Arm circles x10', 'Shoulder CARs x8 c/lado', 'Light band chest press x15'],
    exercises: [
      { id: 'push2_e1', name: 'DB Incline Bench Press', setsTarget: 4, repsTarget: '6-15', restSeconds: 150, orderIndex: 1 },
      { id: 'push2_e2', name: 'Lying Barbell Triceps Extension (Skull Crushers)', setsTarget: 3, repsTarget: '8-15', restSeconds: 90, orderIndex: 2 },
      { id: 'push2_e3', name: 'Cable Chest Fly High-to-Low', setsTarget: 3, repsTarget: '8-15', restSeconds: 90, orderIndex: 3 },
      { id: 'push2_e4', name: 'DB Lateral Raise', setsTarget: 3, repsTarget: '8-15', restSeconds: 90, orderIndex: 4 },
      { id: 'push2_e5', name: 'DB Reverse Fly', setsTarget: 3, repsTarget: '8-15', restSeconds: 90, orderIndex: 5 },
      { id: 'push2_e6', name: 'Cable Triceps Kickback', setsTarget: 3, repsTarget: '8-15', restSeconds: 90, orderIndex: 6 },
      { id: 'push2_e7', name: 'Cable Crunch', setsTarget: 3, repsTarget: '8-15', restSeconds: 90, orderIndex: 7 },
    ],
  },
  {
    id: 'pull2',
    name: 'Pull 2',
    shortName: 'PULL 2',
    dayOfWeek: 5,
    muscleGroups: ['Espalda', 'Bíceps', 'Trapecios'],
    movementPrep: ['Cat-cow x10', 'Band pull-aparts x15', 'Dead hangs 20s'],
    exercises: [
      { id: 'pull2_e1', name: 'Supinated Lat Pulldown', setsTarget: 4, repsTarget: '6-15', restSeconds: 150, orderIndex: 1 },
      { id: 'pull2_e2', name: 'Barbell Bent Over Row', setsTarget: 4, repsTarget: '6-15', restSeconds: 150, orderIndex: 2 },
      { id: 'pull2_e3', name: 'Straight Arm Cable Pulldown', setsTarget: 4, repsTarget: '8-15', restSeconds: 90, orderIndex: 3 },
      { id: 'pull2_e4', name: 'Barbell Curl', setsTarget: 4, repsTarget: '8-15', restSeconds: 90, orderIndex: 4 },
      { id: 'pull2_e5', name: 'DB Shrug', setsTarget: 4, repsTarget: '8-15', restSeconds: 90, orderIndex: 5 },
      { id: 'pull2_e6', name: 'DB Concentration Curl', setsTarget: 4, repsTarget: '8-15', restSeconds: 90, orderIndex: 6 },
      { id: 'pull2_e7', name: 'DB Side Bend', setsTarget: 4, repsTarget: '8-15', restSeconds: 90, orderIndex: 7 },
    ],
  },
  {
    id: 'legs2',
    name: 'Legs 2',
    shortName: 'LEGS 2',
    dayOfWeek: 6,
    muscleGroups: ['Glúteos', 'Isquiotibiales', 'Cuádriceps', 'Pantorrillas'],
    movementPrep: ['Hip circles x10', 'Glute bridges x15', 'Lateral band walks x10 c/lado'],
    exercises: [
      { id: 'legs2_e1', name: 'Bulgarian Split Squat', setsTarget: 3, repsTarget: '6-15', restSeconds: 150, orderIndex: 1 },
      { id: 'legs2_e2', name: 'Barbell Hip Thrust', setsTarget: 3, repsTarget: '6-15', restSeconds: 120, orderIndex: 2 },
      { id: 'legs2_e3', name: 'Leg Extension', setsTarget: 3, repsTarget: '8-15', restSeconds: 90, orderIndex: 3 },
      { id: 'legs2_e4', name: 'Lying Leg Curl', setsTarget: 4, repsTarget: '8-15', restSeconds: 90, orderIndex: 4 },
      { id: 'legs2_e5', name: 'Feet Elevated DB Calf Raise', setsTarget: 4, repsTarget: '8-20', restSeconds: 60, orderIndex: 5 },
      { id: 'legs2_e6', name: 'Machine Hip Adduction', setsTarget: 3, repsTarget: '8-15', restSeconds: 90, orderIndex: 6 },
    ],
  },
];

export function getWorkoutForDay(dayOfWeek: number): WorkoutDay | undefined {
  return LUETH_PROGRAM.find((w) => w.dayOfWeek === dayOfWeek);
}

export function getWorkoutById(id: string): WorkoutDay | undefined {
  return LUETH_PROGRAM.find((w) => w.id === id);
}

/** Returns JS Date's getDay() mapped to our dayOfWeek (same convention, 0=Sun). */
export function getTodayDayOfWeek(): number {
  return new Date().getDay();
}
