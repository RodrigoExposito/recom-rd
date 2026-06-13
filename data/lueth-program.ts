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
      { id: 'push1_e1', name: 'Barbell Bench Press', setsTarget: 4, repsTarget: '6-15', restSeconds: 150, orderIndex: 1, description: 'Press el barbell desde el pecho hasta la extensión completa. Control el peso en el descenso.', gifUrl: 'https://media.giphy.com/media/xTiTnhzAqzxKwn5hWo/giphy.gif', targetMuscles: ['Pecho', 'Tríceps', 'Hombros'] },
      { id: 'push1_e2', name: 'Seated DB Overhead Press', setsTarget: 3, repsTarget: '6-15', restSeconds: 150, orderIndex: 2, description: 'Sentado, presiona las mancuernas sobre tu cabeza manteniendo el core contraído.', gifUrl: 'https://media.giphy.com/media/3ohhwn6Vu3GKJGqGKc/giphy.gif', targetMuscles: ['Hombros', 'Tríceps'] },
      { id: 'push1_e3', name: 'Machine Chest Fly', setsTarget: 3, repsTarget: '8-15', restSeconds: 90, orderIndex: 3, description: 'Junta las mancillas de la máquina hacia el centro con movimiento controlado.', gifUrl: 'https://media.giphy.com/media/xTiTnV0pxhUXhV7V2w/giphy.gif', targetMuscles: ['Pecho'] },
      { id: 'push1_e4', name: 'Machine Reverse Fly', setsTarget: 3, repsTarget: '8-15', restSeconds: 90, orderIndex: 4, description: 'Abre los brazos hacia los lados, contrayendo los deltoides posteriores.', gifUrl: 'https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif', targetMuscles: ['Hombros', 'Espalda'] },
      { id: 'push1_e5', name: 'Cable OH Triceps Extension', setsTarget: 3, repsTarget: '8-15', restSeconds: 90, orderIndex: 5, description: 'De pie, extiende los brazos hacia abajo completamente, manteniendo los codos fijos.', gifUrl: 'https://media.giphy.com/media/3o6Zt6KHxJTbXCnSvu/giphy.gif', targetMuscles: ['Tríceps'] },
      { id: 'push1_e6', name: 'Cable Lateral Raise', setsTarget: 3, repsTarget: '8-15', restSeconds: 90, orderIndex: 6, description: 'Levanta los brazos hacia los lados hasta la altura del hombro con control.', gifUrl: 'https://media.giphy.com/media/3o7TKxZycSAY8bWCW4/giphy.gif', targetMuscles: ['Hombros'] },
      { id: 'push1_e7', name: 'Cable Triceps Pushdown', setsTarget: 3, repsTarget: '8-15', restSeconds: 90, orderIndex: 7, description: 'Empuja la barra hacia abajo con los tríceps manteniendo los codos al lado del cuerpo.', gifUrl: 'https://media.giphy.com/media/l0CRCmMEJJnUo4sOc/giphy.gif', targetMuscles: ['Tríceps'] },
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
      { id: 'pull1_e1', name: 'Pull-ups', setsTarget: 4, repsTarget: '6-15', restSeconds: 150, orderIndex: 1, description: 'Colgándote, tira tu cuerpo hacia arriba hasta que tu barbilla supere la barra.', gifUrl: 'https://media.giphy.com/media/l3q2K5jinAlChoCLS/giphy.gif', targetMuscles: ['Espalda', 'Bíceps'] },
      { id: 'pull1_e2', name: 'Unilateral DB Row', setsTarget: 3, repsTarget: '6-15', restSeconds: 150, orderIndex: 2, description: 'Con una rodilla en el banco, rema la mancuerna hacia tu cadera.', gifUrl: 'https://media.giphy.com/media/3ohhwqZUUhpMFWItAI/giphy.gif', targetMuscles: ['Espalda', 'Bíceps'] },
      { id: 'pull1_e3', name: 'DB Farmers Carry', setsTarget: 3, repsTarget: 'Max Effort', restSeconds: 120, orderIndex: 3, notes: 'Máximo esfuerzo por distancia/tiempo', description: 'Carga mancuernas pesadas y camina manteniendo una postura erguida.', gifUrl: 'https://media.giphy.com/media/l0HlP2gYvhPE3JR2w/giphy.gif', targetMuscles: ['Trapecios', 'Antebrazos', 'Core'] },
      { id: 'pull1_e4', name: 'Wide Grip Seated Cable Row', setsTarget: 3, repsTarget: '8-15', restSeconds: 90, orderIndex: 4, description: 'Remando con agarre ancho, contrae la espalda completamente.', gifUrl: 'https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif', targetMuscles: ['Espalda', 'Lats'] },
      { id: 'pull1_e5', name: 'Barbell Reverse Curl', setsTarget: 3, repsTarget: '8-15', restSeconds: 90, orderIndex: 5, description: 'Con agarre pronado, flexiona los codos para levantar el barbell.', gifUrl: 'https://media.giphy.com/media/l3q2AjYL0FvjJQ3CU/giphy.gif', targetMuscles: ['Bíceps', 'Antebrazos'] },
      { id: 'pull1_e6', name: 'Alternating DB Curl', setsTarget: 3, repsTarget: '8-15', restSeconds: 90, orderIndex: 6, description: 'Alterna los brazos flexionando un bíceps a la vez.', gifUrl: 'https://media.giphy.com/media/xTiTnhzAqzxKwn5hWo/giphy.gif', targetMuscles: ['Bíceps'] },
      { id: 'pull1_e7', name: 'Cable Core Rotation', setsTarget: 3, repsTarget: '6-15', restSeconds: 90, orderIndex: 7, description: 'De pie, rota tu torso hacia un lado manteniendo la tensión en el cable.', gifUrl: 'https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif', targetMuscles: ['Core', 'Oblicuos'] },
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
      { id: 'legs1_e1', name: 'Barbell Back Squat', setsTarget: 4, repsTarget: '6-15', restSeconds: 150, orderIndex: 1, description: 'Desciende con el barbell en los hombros hasta que los muslos estén paralelos al piso.', gifUrl: 'https://media.giphy.com/media/l0HlMyqg12JJtIS5i/giphy.gif', targetMuscles: ['Cuádriceps', 'Glúteos', 'Espalda baja'] },
      { id: 'legs1_e2', name: 'DB Romanian Deadlift', setsTarget: 3, repsTarget: '6-15', restSeconds: 150, orderIndex: 2, description: 'Con mancuernas en las manos, inclinate hacia adelante manteniendo la espalda recta.', gifUrl: 'https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif', targetMuscles: ['Isquiotibiales', 'Glúteos', 'Espalda baja'] },
      { id: 'legs1_e3', name: 'DB Lunge', setsTarget: 3, repsTarget: '6-15', restSeconds: 120, orderIndex: 3, description: 'Da un paso hacia adelante, flexionando ambas rodillas hasta 90 grados.', gifUrl: 'https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif', targetMuscles: ['Cuádriceps', 'Glúteos', 'Isquiotibiales'] },
      { id: 'legs1_e4', name: 'Seated Leg Curl', setsTarget: 3, repsTarget: '6-15', restSeconds: 90, orderIndex: 4, description: 'Flexiona las rodillas contra la resistencia de la máquina, contraendo los isquiotibiales.', gifUrl: 'https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif', targetMuscles: ['Isquiotibiales'] },
      { id: 'legs1_e5', name: 'Smith Calf Raise (feet elevated)', setsTarget: 4, repsTarget: '6-15', restSeconds: 90, orderIndex: 5, description: 'Con los pies elevados, sube sobre los dedos contra la resistencia.', gifUrl: 'https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif', targetMuscles: ['Pantorrillas'] },
      { id: 'legs1_e6', name: 'Machine Hip Abduction', setsTarget: 3, repsTarget: '6-15', restSeconds: 90, orderIndex: 6, description: 'Abre las piernas hacia los lados contra la resistencia de la máquina.', gifUrl: 'https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif', targetMuscles: ['Glúteos', 'Abductores'] },
      { id: 'legs1_e7', name: 'Hanging Leg Raise', setsTarget: 3, repsTarget: '6-15', restSeconds: 90, orderIndex: 7, description: 'Colgándote, levanta las piernas hasta 90 grados usando el core.', gifUrl: 'https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif', targetMuscles: ['Core', 'Abdominales'] },
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
      { id: 'push2_e1', name: 'DB Incline Bench Press', setsTarget: 4, repsTarget: '6-15', restSeconds: 150, orderIndex: 1, description: 'En banco inclinado, presiona mancuernas hacia arriba enfatizando pecho superior.', gifUrl: 'https://media.giphy.com/media/xTiTnhzAqzxKwn5hWo/giphy.gif', targetMuscles: ['Pecho', 'Hombros', 'Tríceps'] },
      { id: 'push2_e2', name: 'Lying Barbell Triceps Extension (Skull Crushers)', setsTarget: 3, repsTarget: '8-15', restSeconds: 90, orderIndex: 2, description: 'En banco plano, baja el barbell hacia la frente/detrás de la cabeza flexionando los codos.', gifUrl: 'https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif', targetMuscles: ['Tríceps'] },
      { id: 'push2_e3', name: 'Cable Chest Fly High-to-Low', setsTarget: 3, repsTarget: '8-15', restSeconds: 90, orderIndex: 3, description: 'Desde posición alta, tira los cables hacia abajo y adentro contrayendo el pecho.', gifUrl: 'https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif', targetMuscles: ['Pecho'] },
      { id: 'push2_e4', name: 'DB Lateral Raise', setsTarget: 3, repsTarget: '8-15', restSeconds: 90, orderIndex: 4, description: 'Levanta mancuernas lateralmente hasta la altura del hombro con codos ligeramente flexionados.', gifUrl: 'https://media.giphy.com/media/3o7TKxZycSAY8bWCW4/giphy.gif', targetMuscles: ['Hombros'] },
      { id: 'push2_e5', name: 'DB Reverse Fly', setsTarget: 3, repsTarget: '8-15', restSeconds: 90, orderIndex: 5, description: 'Levanta mancuernas lateralmente hacia atrás enfatizando deltoides posteriores.', gifUrl: 'https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif', targetMuscles: ['Hombros', 'Espalda'] },
      { id: 'push2_e6', name: 'Cable Triceps Kickback', setsTarget: 3, repsTarget: '8-15', restSeconds: 90, orderIndex: 6, description: 'Con brazo inclinado, extiende el cable hacia atrás usando solo el tríceps.', gifUrl: 'https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif', targetMuscles: ['Tríceps'] },
      { id: 'push2_e7', name: 'Cable Crunch', setsTarget: 3, repsTarget: '8-15', restSeconds: 90, orderIndex: 7, description: 'Sentado, flexiona el torso hacia abajo contra el cable.', gifUrl: 'https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif', targetMuscles: ['Abdominales', 'Core'] },
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
      { id: 'pull2_e1', name: 'Supinated Lat Pulldown', setsTarget: 4, repsTarget: '6-15', restSeconds: 150, orderIndex: 1, description: 'Con agarre supinado (palmas hacia ti), tira la barra hacia tu pecho.', gifUrl: 'https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif', targetMuscles: ['Lats', 'Bíceps'] },
      { id: 'pull2_e2', name: 'Barbell Bent Over Row', setsTarget: 4, repsTarget: '6-15', restSeconds: 150, orderIndex: 2, description: 'Inclinado hacia adelante, tira el barbell hacia tu abdomen bajo.', gifUrl: 'https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif', targetMuscles: ['Espalda', 'Lats'] },
      { id: 'pull2_e3', name: 'Straight Arm Cable Pulldown', setsTarget: 4, repsTarget: '8-15', restSeconds: 90, orderIndex: 3, description: 'Con brazos extendidos, empuja el cable hacia abajo usando los lats.', gifUrl: 'https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif', targetMuscles: ['Lats', 'Pecho'] },
      { id: 'pull2_e4', name: 'Barbell Curl', setsTarget: 4, repsTarget: '8-15', restSeconds: 90, orderIndex: 4, description: 'De pie, flexiona el barbell hacia el pecho manteniendo los codos fijos.', gifUrl: 'https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif', targetMuscles: ['Bíceps'] },
      { id: 'pull2_e5', name: 'DB Shrug', setsTarget: 4, repsTarget: '8-15', restSeconds: 90, orderIndex: 5, description: 'Levanta los hombros hacia las orejas con mancuernas en las manos.', gifUrl: 'https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif', targetMuscles: ['Trapecios'] },
      { id: 'pull2_e6', name: 'DB Concentration Curl', setsTarget: 4, repsTarget: '8-15', restSeconds: 90, orderIndex: 6, description: 'Sentado, flexiona una mancuerna hacia el hombro enfatizando el pico del bíceps.', gifUrl: 'https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif', targetMuscles: ['Bíceps'] },
      { id: 'pull2_e7', name: 'DB Side Bend', setsTarget: 4, repsTarget: '8-15', restSeconds: 90, orderIndex: 7, description: 'De pie, inclinate hacia un lado con mancuerna en mano contrayendo los oblicuos.', gifUrl: 'https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif', targetMuscles: ['Oblicuos', 'Core'] },
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
      { id: 'legs2_e1', name: 'Bulgarian Split Squat', setsTarget: 3, repsTarget: '6-15', restSeconds: 150, orderIndex: 1, description: 'Con un pie atrás en el banco, desciende en una sentadilla enfatizando la pierna delantera.', gifUrl: 'https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif', targetMuscles: ['Cuádriceps', 'Glúteos'] },
      { id: 'legs2_e2', name: 'Barbell Hip Thrust', setsTarget: 3, repsTarget: '6-15', restSeconds: 120, orderIndex: 2, description: 'Recostado sobre el banco, empuja el barbell hacia arriba extensionando las caderas.', gifUrl: 'https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif', targetMuscles: ['Glúteos', 'Isquiotibiales'] },
      { id: 'legs2_e3', name: 'Leg Extension', setsTarget: 3, repsTarget: '8-15', restSeconds: 90, orderIndex: 3, description: 'Sentado en la máquina, extiende las piernas hacia adelante contra la resistencia.', gifUrl: 'https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif', targetMuscles: ['Cuádriceps'] },
      { id: 'legs2_e4', name: 'Lying Leg Curl', setsTarget: 4, repsTarget: '8-15', restSeconds: 90, orderIndex: 4, description: 'Acostado boca abajo, flexiona las rodillas hacia los glúteos contra la máquina.', gifUrl: 'https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif', targetMuscles: ['Isquiotibiales'] },
      { id: 'legs2_e5', name: 'Feet Elevated DB Calf Raise', setsTarget: 4, repsTarget: '8-20', restSeconds: 60, orderIndex: 5, description: 'Con pies elevados, sube sobre los dedos con mancuernas para máxima amplitud de movimiento.', gifUrl: 'https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif', targetMuscles: ['Pantorrillas'] },
      { id: 'legs2_e6', name: 'Machine Hip Adduction', setsTarget: 3, repsTarget: '8-15', restSeconds: 90, orderIndex: 6, description: 'Junta las piernas contra la resistencia de la máquina contrayendo los aductores.', gifUrl: 'https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif', targetMuscles: ['Aductores', 'Glúteos'] },
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

export function getDayOfWeekForDate(date: Date): number {
  return date.getDay();
}
