import { useState, useEffect, useCallback } from 'react';
import { WorkoutDay, SetInput, WorkoutLog } from '@/types';
import { getWorkoutForDay, getWorkoutById, getTodayDayOfWeek } from '@/data/lueth-program';
import {
  getWorkoutLogForDate,
  createWorkoutLog,
  completeWorkoutLog,
  insertSetLog,
  getSetLogsForWorkoutLog,
  getTodayString,
} from '@/lib/db';

// ─── Today's workout (home screen) ───────────────────────────────────────────

export function useTodayWorkout() {
  const [workout, setWorkout] = useState<WorkoutDay | null>(null);
  const [workoutLog, setWorkoutLog] = useState<WorkoutLog | null>(null);

  const refresh = useCallback(() => {
    const dayOfWeek = getTodayDayOfWeek();
    const todayWorkout = getWorkoutForDay(dayOfWeek) ?? null;
    setWorkout(todayWorkout);

    if (todayWorkout) {
      const log = getWorkoutLogForDate(todayWorkout.id, getTodayString());
      setWorkoutLog(log);
    } else {
      setWorkoutLog(null);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { workout, workoutLog, refresh };
}

// ─── Active workout (workout/[id] screen) ────────────────────────────────────

export function useActiveWorkout(workoutId: string) {
  const workout = getWorkoutById(workoutId) ?? null;
  const [sets, setSets] = useState<Map<string, SetInput[]>>(new Map());
  const [workoutLogId, setWorkoutLogId] = useState<number | null>(null);
  const [startTime] = useState<number>(Date.now());
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (!workout) return;

    const date = getTodayString();
    const existingLog = getWorkoutLogForDate(workoutId, date);
    let logId: number;

    if (existingLog) {
      logId = existingLog.id;
      setIsCompleted(existingLog.completed);
    } else {
      logId = createWorkoutLog(workoutId, date);
    }
    setWorkoutLogId(logId);

    // Load persisted sets or initialize empty
    const persisted = existingLog ? getSetLogsForWorkoutLog(logId) : [];
    const initialSets = new Map<string, SetInput[]>();

    workout.exercises.forEach((exercise) => {
      const savedSets = persisted.filter((s) => s.exerciseId === exercise.id);
      const setInputs: SetInput[] = Array.from({ length: exercise.setsTarget }, (_, i) => {
        const saved = savedSets.find((s) => s.setNumber === i + 1);
        return {
          exerciseId: exercise.id,
          setNumber: i + 1,
          weightKg: saved?.weightKg ?? 0,
          repsDone: saved?.repsDone ?? 0,
          rpe: saved?.rpe ?? 8,
          completed: !!saved,
        };
      });
      initialSets.set(exercise.id, setInputs);
    });

    setSets(initialSets);
  }, [workoutId]);

  const updateSet = useCallback((exerciseId: string, setIndex: number, updates: Partial<SetInput>) => {
    setSets((prev) => {
      const next = new Map(prev);
      const exerciseSets = [...(next.get(exerciseId) ?? [])];
      exerciseSets[setIndex] = { ...exerciseSets[setIndex], ...updates };
      next.set(exerciseId, exerciseSets);
      return next;
    });
  }, []);

  const completeWorkout = useCallback(() => {
    if (!workoutLogId) return;
    const durationMinutes = Math.round((Date.now() - startTime) / 60_000);

    sets.forEach((exerciseSets) => {
      exerciseSets
        .filter((s) => s.completed && s.weightKg > 0 && s.repsDone > 0)
        .forEach((s) => {
          insertSetLog(workoutLogId, s.exerciseId, s.setNumber, s.weightKg, s.repsDone, s.rpe);
        });
    });

    completeWorkoutLog(workoutLogId, durationMinutes);
    setIsCompleted(true);
  }, [workoutLogId, sets, startTime]);

  return { workout, sets, updateSet, completeWorkout, isCompleted };
}
