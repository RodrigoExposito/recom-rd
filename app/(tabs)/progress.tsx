import { useState, useCallback, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ProgressChart } from '@/components/ProgressChart';
import { getProgressForExercise } from '@/lib/db';
import { ProgressDataPoint } from '@/types';

const TRACKED_EXERCISES = [
  { id: 'push1_e1', name: 'Bench Press' },
  { id: 'legs1_e1', name: 'Squat' },
  { id: 'pull1_e1', name: 'Pull-ups' },
  { id: 'push2_e1', name: 'Incline DB Press' },
  { id: 'pull2_e2', name: 'Barbell Row' },
  { id: 'legs2_e2', name: 'Hip Thrust' },
];

export default function ProgressScreen() {
  const insets = useSafeAreaInsets();
  const [selectedId, setSelectedId] = useState(TRACKED_EXERCISES[0]?.id ?? '');
  const [data, setData] = useState<ProgressDataPoint[]>([]);

  const loadData = useCallback((exerciseId: string) => {
    setSelectedId(exerciseId);
    setData(getProgressForExercise(exerciseId));
  }, []);

  useEffect(() => {
    if (selectedId) loadData(selectedId);
  }, [selectedId, loadData]);

  const selectedExercise = TRACKED_EXERCISES.find((e) => e.id === selectedId);

  return (
    <ScrollView style={styles.container} contentContainerStyle={[styles.content, { paddingTop: insets.top + 16 }]}>
      <Text style={styles.title}>Progresión de fuerza</Text>

      {/* Exercise selector */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipRow}>
        {TRACKED_EXERCISES.map((ex) => (
          <TouchableOpacity
            key={ex.id}
            style={[styles.chip, selectedId === ex.id && styles.chipActive]}
            onPress={() => loadData(ex.id)}
          >
            <Text style={[styles.chipText, selectedId === ex.id && styles.chipTextActive]}>
              {ex.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Chart */}
      <ProgressChart data={data} exerciseName={selectedExercise?.name ?? ''} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0A0A' },
  content: { padding: 16, paddingBottom: 40 },
  title: { color: '#fff', fontSize: 22, fontWeight: '800', marginBottom: 20, textAlign: 'center' },
  chipRow: { gap: 8, paddingBottom: 16, paddingHorizontal: 4 },
  chip: { paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20, backgroundColor: '#1A1A1A', borderWidth: 1, borderColor: '#333' },
  chipActive: { backgroundColor: '#1E3320', borderColor: '#4CAF50' },
  chipText: { color: '#888', fontSize: 13 },
  chipTextActive: { color: '#4CAF50', fontWeight: '700' },
});
