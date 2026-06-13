import { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button, IconButton } from 'react-native-paper';
import { router } from 'expo-router';
import { useWorkoutForDate } from '@/hooks/useWorkout';

export default function HomeScreen() {
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const { workout, workoutLog } = useWorkoutForDate(selectedDate);

  const goToPrevDay = () => {
    const prev = new Date(selectedDate);
    prev.setDate(prev.getDate() - 1);
    setSelectedDate(prev);
  };

  const goToNextDay = () => {
    const next = new Date(selectedDate);
    next.setDate(next.getDate() + 1);
    setSelectedDate(next);
  };

  const goToToday = () => {
    setSelectedDate(new Date());
  };

  const isToday = selectedDate.toDateString() === new Date().toDateString();
  const dateStr = selectedDate.toLocaleDateString('es-AR', { weekday: 'long', month: 'short', day: 'numeric' });

  if (!workout) {
    return (
      <View style={styles.container}>
        <View style={styles.dateNav}>
          <IconButton icon="chevron-left" onPress={goToPrevDay} size={28} />
          <Text style={styles.dateText}>{dateStr}</Text>
          <IconButton icon="chevron-right" onPress={goToNextDay} size={28} />
        </View>
        <View style={styles.center}>
          <Text style={styles.emoji}>🏖️</Text>
          <Text style={styles.restTitle}>Día de descanso</Text>
          <Text style={styles.restSub}>Recuperate y comé bien.</Text>
          {!isToday && (
            <Button onPress={goToToday} style={styles.todayBtn}>
              Volver a hoy
            </Button>
          )}
        </View>
      </View>
    );
  }

  if (workoutLog?.completed) {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.dateNav}>
          <IconButton icon="chevron-left" onPress={goToPrevDay} size={28} />
          <Text style={styles.dateText}>{dateStr}</Text>
          <IconButton icon="chevron-right" onPress={goToNextDay} size={28} />
        </View>
        <Text style={styles.emoji}>✅</Text>
        <Text style={styles.completedTitle}>Workout completado</Text>
        <Text style={styles.completedSub}>{workout.name}</Text>
        <Text style={styles.duration}>
          {workoutLog.durationMinutes ? `Duración: ${workoutLog.durationMinutes} min` : ''}
        </Text>
        <Button
          mode="outlined"
          onPress={() => router.push(`/workout/${workout.id}`)}
          style={styles.secondaryBtn}
          textColor="#4CAF50"
        >
          Ver registro
        </Button>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.dateNav}>
        <IconButton icon="chevron-left" onPress={goToPrevDay} size={28} />
        <Text style={styles.dateText}>{dateStr}</Text>
        <IconButton icon="chevron-right" onPress={goToNextDay} size={28} />
      </View>
      {isToday && <Text style={styles.greeting}>Hoy entrenás</Text>}
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{workout.shortName}</Text>
      </View>
      <Text style={styles.muscles}>{workout.muscleGroups.join(' · ')}</Text>
      <Text style={styles.detail}>{workout.exercises.length} ejercicios</Text>

      <View style={styles.exercises}>
        {workout.exercises.map((ex, i) => (
          <Text key={ex.id} style={styles.exerciseItem}>
            {i + 1}. {ex.name} — {ex.setsTarget}×{ex.repsTarget}
          </Text>
        ))}
      </View>

      {isToday && (
        <Button
          mode="contained"
          onPress={() => router.push(`/workout/${workout.id}`)}
          style={styles.startBtn}
          contentStyle={styles.startBtnContent}
          labelStyle={styles.startBtnLabel}
        >
          Empezar Workout
        </Button>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0A0A' },
  content: { padding: 24, paddingBottom: 40 },
  dateNav: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 20, marginTop: 8 },
  dateText: { color: '#ccc', fontSize: 16, fontWeight: '600', minWidth: 150, textAlign: 'center' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#0A0A0A', padding: 24 },
  emoji: { fontSize: 56, marginBottom: 16, textAlign: 'center' },
  restTitle: { color: '#fff', fontSize: 24, fontWeight: '700', marginBottom: 8 },
  restSub: { color: '#888', fontSize: 15, textAlign: 'center', marginBottom: 16 },
  todayBtn: { marginTop: 24 },
  greeting: { color: '#888', fontSize: 15, marginBottom: 12, marginTop: 8 },
  badge: { backgroundColor: '#4CAF50', borderRadius: 16, paddingHorizontal: 28, paddingVertical: 10, marginBottom: 10, alignSelf: 'center' },
  badgeText: { color: '#000', fontSize: 26, fontWeight: '800', letterSpacing: 2 },
  muscles: { color: '#ccc', fontSize: 15, marginBottom: 4, textAlign: 'center' },
  detail: { color: '#666', fontSize: 13, marginBottom: 24, textAlign: 'center' },
  exercises: { width: '100%', backgroundColor: '#1A1A1A', borderRadius: 12, padding: 16, gap: 8, marginBottom: 32 },
  exerciseItem: { color: '#ccc', fontSize: 13 },
  startBtn: { width: '100%', borderRadius: 14, backgroundColor: '#4CAF50' },
  startBtnContent: { paddingVertical: 8 },
  startBtnLabel: { fontSize: 17, fontWeight: '700', color: '#000' },
  completedTitle: { color: '#4CAF50', fontSize: 24, fontWeight: '800', marginBottom: 4, textAlign: 'center' },
  completedSub: { color: '#ccc', fontSize: 16, marginBottom: 4, textAlign: 'center' },
  duration: { color: '#888', fontSize: 13, marginBottom: 24, textAlign: 'center' },
  secondaryBtn: { marginTop: 8 },
});
