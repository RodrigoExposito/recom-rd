import * as SQLite from 'expo-sqlite';
import { WorkoutLog, SetLog, SupplementLog, MealLog, ProgressDataPoint } from '@/types';

export const db = SQLite.openDatabaseSync('fittracker.db');

// ─── Init ─────────────────────────────────────────────────────────────────────

export function initDatabase(): void {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS workout_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      workout_id TEXT NOT NULL,
      date TEXT NOT NULL,
      completed INTEGER NOT NULL DEFAULT 0,
      duration_minutes INTEGER
    );
    CREATE TABLE IF NOT EXISTS set_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      workout_log_id INTEGER NOT NULL,
      exercise_id TEXT NOT NULL,
      set_number INTEGER NOT NULL,
      weight_kg REAL NOT NULL,
      reps_done INTEGER NOT NULL,
      rpe REAL NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
    CREATE TABLE IF NOT EXISTS supplement_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      supplement_id TEXT NOT NULL,
      supplement_name TEXT NOT NULL,
      scheduled_time TEXT NOT NULL,
      taken_at TEXT,
      date TEXT NOT NULL,
      taken INTEGER NOT NULL DEFAULT 0
    );
    CREATE TABLE IF NOT EXISTS meal_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      meal_id TEXT NOT NULL,
      meal_name TEXT NOT NULL,
      scheduled_time TEXT NOT NULL,
      date TEXT NOT NULL,
      completed INTEGER NOT NULL DEFAULT 0,
      protein_g REAL NOT NULL DEFAULT 0,
      carbs_g REAL NOT NULL DEFAULT 0,
      fats_g REAL NOT NULL DEFAULT 0
    );
    CREATE TABLE IF NOT EXISTS body_metrics (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL,
      weight_kg REAL NOT NULL,
      notes TEXT
    );
    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );
  `);
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function getTodayString(): string {
  return new Date().toISOString().split('T')[0];
}

// ─── Workout logs ─────────────────────────────────────────────────────────────

export function getWorkoutLogForDate(workoutId: string, date: string): WorkoutLog | null {
  const row = db.getFirstSync<{
    id: number; workout_id: string; date: string; completed: number; duration_minutes: number | null;
  }>('SELECT * FROM workout_logs WHERE workout_id = ? AND date = ?', [workoutId, date]);
  if (!row) return null;
  return { id: row.id, workoutId: row.workout_id, date: row.date, completed: !!row.completed, durationMinutes: row.duration_minutes };
}

export function createWorkoutLog(workoutId: string, date: string): number {
  const result = db.runSync('INSERT INTO workout_logs (workout_id, date) VALUES (?, ?)', [workoutId, date]);
  return result.lastInsertRowId;
}

export function completeWorkoutLog(id: number, durationMinutes: number): void {
  db.runSync('UPDATE workout_logs SET completed = 1, duration_minutes = ? WHERE id = ?', [durationMinutes, id]);
}

export function getWorkoutLogsForWeek(startDate: string, endDate: string): WorkoutLog[] {
  const rows = db.getAllSync<{
    id: number; workout_id: string; date: string; completed: number; duration_minutes: number | null;
  }>('SELECT * FROM workout_logs WHERE date >= ? AND date <= ?', [startDate, endDate]);
  return rows.map((r) => ({ id: r.id, workoutId: r.workout_id, date: r.date, completed: !!r.completed, durationMinutes: r.duration_minutes }));
}

// ─── Set logs ─────────────────────────────────────────────────────────────────

export function insertSetLog(workoutLogId: number, exerciseId: string, setNumber: number, weightKg: number, repsDone: number, rpe: number): void {
  db.runSync(
    'INSERT INTO set_logs (workout_log_id, exercise_id, set_number, weight_kg, reps_done, rpe) VALUES (?, ?, ?, ?, ?, ?)',
    [workoutLogId, exerciseId, setNumber, weightKg, repsDone, rpe],
  );
}

export function getSetLogsForWorkoutLog(workoutLogId: number): SetLog[] {
  return db.getAllSync<SetLog>(
    'SELECT id, workout_log_id as workoutLogId, exercise_id as exerciseId, set_number as setNumber, weight_kg as weightKg, reps_done as repsDone, rpe, created_at as createdAt FROM set_logs WHERE workout_log_id = ? ORDER BY exercise_id, set_number',
    [workoutLogId],
  );
}

export function getPreviousSetLogs(workoutId: string, exerciseId: string): SetLog[] {
  return db.getAllSync<SetLog>(
    `SELECT sl.id, sl.workout_log_id as workoutLogId, sl.exercise_id as exerciseId,
            sl.set_number as setNumber, sl.weight_kg as weightKg, sl.reps_done as repsDone,
            sl.rpe, sl.created_at as createdAt
     FROM set_logs sl
     JOIN workout_logs wl ON sl.workout_log_id = wl.id
     WHERE wl.workout_id = ? AND sl.exercise_id = ? AND wl.completed = 1
     ORDER BY wl.date DESC
     LIMIT 10`,
    [workoutId, exerciseId],
  );
}

// ─── Supplement logs ──────────────────────────────────────────────────────────

export function getSupplementLogsForDate(date: string): SupplementLog[] {
  const rows = db.getAllSync<{
    id: number; supplement_id: string; supplement_name: string; scheduled_time: string;
    taken_at: string | null; date: string; taken: number;
  }>('SELECT * FROM supplement_logs WHERE date = ? ORDER BY scheduled_time', [date]);
  return rows.map((r) => ({ id: r.id, supplementId: r.supplement_id, supplementName: r.supplement_name, scheduledTime: r.scheduled_time, takenAt: r.taken_at, date: r.date, taken: !!r.taken }));
}

export function upsertSupplementLog(supplementId: string, supplementName: string, scheduledTime: string, date: string): void {
  const existing = db.getFirstSync<{ id: number }>('SELECT id FROM supplement_logs WHERE supplement_id = ? AND date = ?', [supplementId, date]);
  if (!existing) {
    db.runSync('INSERT INTO supplement_logs (supplement_id, supplement_name, scheduled_time, date) VALUES (?, ?, ?, ?)', [supplementId, supplementName, scheduledTime, date]);
  }
}

export function toggleSupplementTaken(id: number, taken: boolean): void {
  const takenAt = taken ? new Date().toISOString() : null;
  db.runSync('UPDATE supplement_logs SET taken = ?, taken_at = ? WHERE id = ?', [taken ? 1 : 0, takenAt, id]);
}

// ─── Meal logs ────────────────────────────────────────────────────────────────

export function getMealLogsForDate(date: string): MealLog[] {
  const rows = db.getAllSync<{
    id: number; meal_id: string; meal_name: string; scheduled_time: string;
    date: string; completed: number; protein_g: number; carbs_g: number; fats_g: number;
  }>('SELECT * FROM meal_logs WHERE date = ? ORDER BY scheduled_time', [date]);
  return rows.map((r) => ({ id: r.id, mealId: r.meal_id, mealName: r.meal_name, scheduledTime: r.scheduled_time, date: r.date, completed: !!r.completed, proteinG: r.protein_g, carbsG: r.carbs_g, fatsG: r.fats_g }));
}

export function upsertMealLog(mealId: string, mealName: string, scheduledTime: string, date: string, proteinG: number, carbsG: number, fatsG: number): void {
  const existing = db.getFirstSync<{ id: number }>('SELECT id FROM meal_logs WHERE meal_id = ? AND date = ?', [mealId, date]);
  if (!existing) {
    db.runSync('INSERT INTO meal_logs (meal_id, meal_name, scheduled_time, date, protein_g, carbs_g, fats_g) VALUES (?, ?, ?, ?, ?, ?, ?)', [mealId, mealName, scheduledTime, date, proteinG, carbsG, fatsG]);
  }
}

export function toggleMealCompleted(id: number, completed: boolean): void {
  db.runSync('UPDATE meal_logs SET completed = ? WHERE id = ?', [completed ? 1 : 0, id]);
}

// ─── Progress ─────────────────────────────────────────────────────────────────

export function getProgressForExercise(exerciseId: string): ProgressDataPoint[] {
  return db.getAllSync<{ date: string; weightKg: number; repsDone: number; rpe: number }>(
    `SELECT wl.date, MAX(sl.weight_kg) as weightKg, sl.reps_done as repsDone, sl.rpe
     FROM set_logs sl
     JOIN workout_logs wl ON sl.workout_log_id = wl.id
     WHERE sl.exercise_id = ? AND wl.completed = 1
     GROUP BY wl.date
     ORDER BY wl.date ASC`,
    [exerciseId],
  );
}

// ─── Settings ─────────────────────────────────────────────────────────────────

export function getSetting(key: string): string | null {
  const row = db.getFirstSync<{ value: string }>('SELECT value FROM settings WHERE key = ?', [key]);
  return row?.value ?? null;
}

export function setSetting(key: string, value: string): void {
  db.runSync('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)', [key, value]);
}
