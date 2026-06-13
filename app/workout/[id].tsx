import { useCallback } from 'react';
import { View, StyleSheet, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useLocalSearchParams, router } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { ExerciseCard } from '@/components/ExerciseCard';
import { WorkoutHeader } from '@/components/WorkoutHeader';
import { useActiveWorkout } from '@/hooks/useWorkout';
import { getPreviousSetLogs } from '@/lib/db';
import { SetInput } from '@/types';

export default function WorkoutScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { workout, sets, updateSet, completeWorkout, isCompleted } = useActiveWorkout(id);

  const handleSetChange = useCallback(
    (exerciseId: string, setIndex: number, updates: Partial<SetInput>) => {
      updateSet(exerciseId, setIndex, updates);
      if (updates.completed) {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
      }
    },
    [updateSet],
  );

  const handleComplete = () => {
    Alert.alert('Completar workout', '¿Guardás este entrenamiento?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Guardar',
        onPress: () => {
          completeWorkout();
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
          router.back();
        },
      },
    ]);
  };

  if (!workout) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Workout no encontrado.</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <WorkoutHeader workout={workout} />

        {isCompleted && (
          <View style={styles.completedBanner}>
            <Text style={styles.completedText}>✅ Workout completado — solo lectura</Text>
          </View>
        )}

        {workout.exercises.map((exercise) => {
          const exerciseSets = sets.get(exercise.id) ?? [];
          const previousSets = getPreviousSetLogs(workout.id, exercise.id);
          return (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              sets={exerciseSets}
              previousSets={previousSets}
              onSetChange={(setIndex, updates) => handleSetChange(exercise.id, setIndex, updates)}
            />
          );
        })}

        {!isCompleted && (
          <Button
            mode="contained"
            onPress={handleComplete}
            style={styles.completeBtn}
            contentStyle={styles.completeBtnContent}
            labelStyle={styles.completeBtnLabel}
          >
            Completar Workout
          </Button>
        )}
        <View style={styles.spacer} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: { flex: 1, backgroundColor: '#0A0A0A' },
  content: { padding: 16, paddingBottom: 40 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#0A0A0A' },
  error: { color: '#888', fontSize: 16 },
  completedBanner: { backgroundColor: '#1E3320', borderRadius: 10, padding: 12, marginBottom: 16, alignItems: 'center' },
  completedText: { color: '#4CAF50', fontSize: 14, fontWeight: '600' },
  completeBtn: { marginTop: 24, borderRadius: 14, backgroundColor: '#4CAF50' },
  completeBtnContent: { paddingVertical: 8 },
  completeBtnLabel: { fontSize: 17, fontWeight: '800', color: '#000' },
  spacer: { height: 24 },
});
