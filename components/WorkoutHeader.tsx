import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { WorkoutDay } from '@/types';

interface Props {
  workout: WorkoutDay;
  weekNumber?: number;
}

export function WorkoutHeader({ workout, weekNumber }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{workout.shortName}</Text>
      </View>
      <Text style={styles.muscles}>{workout.muscleGroups.join(' · ')}</Text>
      {weekNumber !== undefined && (
        <Text style={styles.week}>Semana {weekNumber} de 6</Text>
      )}
      <Text style={styles.detail}>{workout.exercises.length} ejercicios</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', paddingVertical: 16 },
  badge: {
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginBottom: 8,
  },
  badgeText: { color: '#000', fontSize: 22, fontWeight: '800', letterSpacing: 2 },
  muscles: { color: '#ccc', fontSize: 15, marginBottom: 4 },
  week: { color: '#4CAF50', fontSize: 13, fontWeight: '600' },
  detail: { color: '#777', fontSize: 13, marginTop: 2 },
});
