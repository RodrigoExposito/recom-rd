import { useEffect, useState } from 'react';
import { getWorkoutLogsForWeek, getTodayString, db } from '@/lib/db';
import { getDayOfWeekForDate, LUETH_PROGRAM } from '@/data/lueth-program';

interface HomeStats {
  weekWorkouts: { dayNum: number; workoutId: string; completed: boolean; name: string; shortName: string }[];
  completedThisWeek: number;
  totalWorkoutsThisWeek: number;
  volumeThisMonth: number;
  nextWorkout: { name: string; shortName: string; date: string } | null;
}

export function useHomeStats(): HomeStats {
  const [stats, setStats] = useState<HomeStats>({
    weekWorkouts: [],
    completedThisWeek: 0,
    totalWorkoutsThisWeek: 0,
    volumeThisMonth: 0,
    nextWorkout: null,
  });

  useEffect(() => {
    const today = new Date();
    const dayOfWeek = today.getDay();

    // Calculate week dates (Mon-Sun)
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - dayOfWeek + 1);
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    const startStr = startOfWeek.toISOString().split('T')[0];
    const endStr = endOfWeek.toISOString().split('T')[0];

    // Get week's workouts
    const weekLogs = getWorkoutLogsForWeek(startStr, endStr);
    const weekWorkouts = LUETH_PROGRAM.map((w) => {
      const log = weekLogs.find((l) => l.workoutId === w.id);
      return {
        dayNum: w.dayOfWeek,
        workoutId: w.id,
        completed: log?.completed ?? false,
        name: w.name,
        shortName: w.shortName,
      };
    });

    const completed = weekWorkouts.filter((w) => w.completed).length;
    const total = weekWorkouts.filter((w) => w.dayNum !== 0).length; // Exclude rest day

    // Calculate total volume this month
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const monthStartStr = startOfMonth.toISOString().split('T')[0];
    const todayStr = getTodayString();

    const setLogs = db.getAllSync<{ weight_kg: number; reps_done: number }>(
      'SELECT weight_kg, reps_done FROM set_logs sl JOIN workout_logs wl ON sl.workout_log_id = wl.id WHERE wl.date >= ? AND wl.date <= ? AND wl.completed = 1',
      [monthStartStr, todayStr],
    );

    const volume = setLogs.reduce((sum, log) => sum + (log.weight_kg * log.reps_done || 0), 0);

    // Find next workout
    let nextWorkout: HomeStats['nextWorkout'] = null;
    for (let i = 1; i <= 7; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(today.getDate() + i);
      const dow = checkDate.getDay();
      const workout = LUETH_PROGRAM.find((w) => w.dayOfWeek === dow);
      if (workout) {
        nextWorkout = {
          name: workout.name,
          shortName: workout.shortName,
          date: checkDate.toISOString().split('T')[0],
        };
        break;
      }
    }

    setStats({
      weekWorkouts,
      completedThisWeek: completed,
      totalWorkoutsThisWeek: total,
      volumeThisMonth: Math.round(volume),
      nextWorkout,
    });
  }, []);

  return stats;
}
