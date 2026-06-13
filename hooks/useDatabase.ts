import {
  getWorkoutLogForDate,
  createWorkoutLog,
  completeWorkoutLog,
  insertSetLog,
  getSetLogsForWorkoutLog,
  getPreviousSetLogs,
  getWorkoutLogsForWeek,
  getSupplementLogsForDate,
  upsertSupplementLog,
  toggleSupplementTaken,
  getMealLogsForDate,
  upsertMealLog,
  toggleMealCompleted,
  getProgressForExercise,
  getSetting,
  setSetting,
  getTodayString,
} from '@/lib/db';

// Re-export all DB operations as a single hook for component convenience.
// Components can also import from lib/db directly when preferred.
export function useDatabase() {
  return {
    getTodayString,
    getWorkoutLogForDate,
    createWorkoutLog,
    completeWorkoutLog,
    insertSetLog,
    getSetLogsForWorkoutLog,
    getPreviousSetLogs,
    getWorkoutLogsForWeek,
    getSupplementLogsForDate,
    upsertSupplementLog,
    toggleSupplementTaken,
    getMealLogsForDate,
    upsertMealLog,
    toggleMealCompleted,
    getProgressForExercise,
    getSetting,
    setSetting,
  };
}
