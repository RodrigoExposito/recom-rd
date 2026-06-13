import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { WorkoutExercise, SetInput, SetLog } from '@/types';
import { SetRow } from './SetRow';

interface Props {
  exercise: WorkoutExercise;
  sets: SetInput[];
  previousSets: SetLog[];
  onSetChange: (setIndex: number, updates: Partial<SetInput>) => void;
}

export function ExerciseCard({ exercise, sets, previousSets, onSetChange }: Props) {
  const [expanded, setExpanded] = useState(true);
  const completedCount = sets.filter((s) => s.completed).length;

  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.header} onPress={() => setExpanded((v) => !v)} activeOpacity={0.7}>
        <View style={styles.headerLeft}>
          <Text style={styles.name}>{exercise.name}</Text>
          <Text style={styles.meta}>
            {exercise.setsTarget} series · {exercise.repsTarget} reps · {Math.round(exercise.restSeconds / 60)} min descanso
          </Text>
        </View>
        <View style={styles.headerRight}>
          <Text style={styles.progress}>
            {completedCount}/{exercise.setsTarget}
          </Text>
          <MaterialCommunityIcons
            name={expanded ? 'chevron-up' : 'chevron-down'}
            size={20}
            color="#888"
          />
        </View>
      </TouchableOpacity>

      {expanded && (
        <View style={styles.setsContainer}>
          {exercise.notes && <Text style={styles.notes}>{exercise.notes}</Text>}
          <View style={styles.labels}>
            <Text style={styles.label}>Set</Text>
            <Text style={styles.label}>Peso</Text>
            <Text style={styles.label}>Reps</Text>
            <Text style={styles.label}>RPE</Text>
            <Text style={styles.label}>✓</Text>
          </View>
          {sets.map((setInput, i) => (
            <SetRow
              key={`${exercise.id}_${i}`}
              setInput={setInput}
              previousSet={previousSets.find((p) => p.setNumber === setInput.setNumber)}
              onChange={(updates) => onSetChange(i, updates)}
            />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
  },
  headerLeft: { flex: 1 },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  name: { color: '#fff', fontSize: 15, fontWeight: '700' },
  meta: { color: '#888', fontSize: 12, marginTop: 2 },
  progress: { color: '#4CAF50', fontSize: 14, fontWeight: '700' },
  setsContainer: { paddingHorizontal: 12, paddingBottom: 12 },
  notes: { color: '#FFC107', fontSize: 12, marginBottom: 6, fontStyle: 'italic' },
  labels: {
    flexDirection: 'row',
    gap: 6,
    paddingHorizontal: 8,
    marginBottom: 4,
  },
  label: { color: '#555', fontSize: 11, width: 58, textAlign: 'center' },
});
