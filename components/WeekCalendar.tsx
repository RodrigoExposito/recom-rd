import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { WorkoutLog } from '@/types';
import { LUETH_PROGRAM } from '@/data/lueth-program';

const DAY_LABELS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

interface Props {
  weekLogs: WorkoutLog[];
  weekStartDate: string; // YYYY-MM-DD (Monday)
  weekNumber: number;
}

export function WeekCalendar({ weekLogs, weekStartDate, weekNumber }: Props) {
  const todayDow = new Date().getDay(); // 0=Sun..6=Sat

  // Build Mon-Sat columns (dayOfWeek 1..6)
  const days = [1, 2, 3, 4, 5, 6];

  return (
    <View style={styles.container}>
      <Text style={styles.weekLabel}>Semana {weekNumber} de 6</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {days.map((dow) => {
          const workout = LUETH_PROGRAM.find((w) => w.dayOfWeek === dow);
          const isToday = dow === todayDow;
          const log = weekLogs.find((l) => workout && l.workoutId === workout.id);
          const completed = !!log?.completed;

          return (
            <View key={dow} style={[styles.dayCard, isToday && styles.today]}>
              <Text style={[styles.dayLabel, isToday && styles.todayText]}>{DAY_LABELS[dow]}</Text>
              {workout ? (
                <>
                  <Text style={[styles.workoutName, isToday && styles.todayText]} numberOfLines={2}>
                    {workout.shortName}
                  </Text>
                  {completed ? (
                    <MaterialCommunityIcons name="check-circle" size={22} color="#4CAF50" />
                  ) : (
                    <View style={styles.circle} />
                  )}
                </>
              ) : (
                <Text style={styles.rest}>Descanso</Text>
              )}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 16 },
  weekLabel: { color: '#4CAF50', fontSize: 14, fontWeight: '700', textAlign: 'center', marginBottom: 12 },
  scroll: { gap: 8, paddingHorizontal: 4 },
  dayCard: {
    width: 70,
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
    gap: 6,
    minHeight: 100,
  },
  today: { backgroundColor: '#1E3320', borderWidth: 1.5, borderColor: '#4CAF50' },
  dayLabel: { color: '#888', fontSize: 13, fontWeight: '600' },
  todayText: { color: '#4CAF50' },
  workoutName: { color: '#ccc', fontSize: 11, textAlign: 'center' },
  circle: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: '#444' },
  rest: { color: '#555', fontSize: 11 },
});
