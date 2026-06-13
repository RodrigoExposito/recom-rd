// ─── Program types ────────────────────────────────────────────────────────────

export interface WorkoutExercise {
  id: string;
  name: string;
  setsTarget: number;
  repsTarget: string; // e.g. "6-15" or "Max Effort"
  restSeconds: number;
  orderIndex: number;
  notes?: string;
  description?: string;
  gifUrl?: string;
  targetMuscles?: string[];
}

export interface WorkoutDay {
  id: string;
  name: string;
  shortName: string;
  dayOfWeek: number; // 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat, 0=Sun (rest)
  muscleGroups: string[];
  exercises: WorkoutExercise[];
  movementPrep: string[];
}

// ─── Database log types ────────────────────────────────────────────────────────

export interface WorkoutLog {
  id: number;
  workoutId: string;
  date: string; // YYYY-MM-DD
  completed: boolean;
  durationMinutes: number | null;
}

export interface SetLog {
  id: number;
  workoutLogId: number;
  exerciseId: string;
  setNumber: number;
  weightKg: number;
  repsDone: number;
  rpe: number; // 6–10
  createdAt: string;
}

export interface SupplementLog {
  id: number;
  supplementId: string;
  supplementName: string;
  scheduledTime: string; // HH:MM
  takenAt: string | null;
  date: string; // YYYY-MM-DD
  taken: boolean;
}

export interface MealLog {
  id: number;
  mealId: string;
  mealName: string;
  scheduledTime: string; // HH:MM
  date: string; // YYYY-MM-DD
  completed: boolean;
  proteinG: number;
  carbsG: number;
  fatsG: number;
}

export interface BodyMetric {
  id: number;
  date: string;
  weightKg: number;
  notes: string | null;
}

// ─── UI / input types ─────────────────────────────────────────────────────────

export interface SetInput {
  exerciseId: string;
  setNumber: number;
  weightKg: number;
  repsDone: number;
  rpe: number;
  completed: boolean;
}

// ─── Nutrition protocol types ─────────────────────────────────────────────────

export interface Supplement {
  id: string;
  name: string;
  scheduledTime: string; // HH:MM
  dose: string;
  notificationBody: string;
}

export interface Meal {
  id: string;
  name: string;
  scheduledTime: string; // HH:MM
  proteinG: number;
  carbsG: number;
  fatsG: number;
}

// ─── Progress ─────────────────────────────────────────────────────────────────

export interface ProgressDataPoint {
  date: string; // YYYY-MM-DD
  weightKg: number;
  repsDone: number;
  rpe: number;
}
