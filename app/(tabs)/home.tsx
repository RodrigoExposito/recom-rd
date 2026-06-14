import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, ProgressBar, Card } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useHomeStats } from '@/hooks/useHomeStats';

const ACCENT = '#4CAF50';
const BG = '#0A0A0A';
const SECONDARY_BG = '#1A1A1A';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { weekWorkouts, completedThisWeek, totalWorkoutsThisWeek, volumeThisMonth, nextWorkout } = useHomeStats();

  const weekPct = totalWorkoutsThisWeek > 0 ? Math.round((completedThisWeek / totalWorkoutsThisWeek) * 100) : 0;
  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  return (
    <ScrollView style={styles.container} contentContainerStyle={[styles.content, { paddingTop: insets.top + 16 }]}>
      {/* Welcome */}
      <Text style={styles.greeting}>Bienvenido, Rodri</Text>
      <Text style={styles.subGreeting}>Tu progreso esta semana</Text>

      {/* Week Progress */}
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.progressRow}>
            <View>
              <Text style={styles.progressLabel}>Completados esta semana</Text>
              <Text style={styles.progressNumber}>{completedThisWeek}/{totalWorkoutsThisWeek}</Text>
              <Text style={styles.progressPct}>{weekPct}%</Text>
            </View>
            <ProgressBar progress={weekPct / 100} style={styles.progressBar} color={ACCENT} />
          </View>
        </Card.Content>
      </Card>

      {/* Week Overview */}
      <Text style={styles.sectionTitle}>Semana</Text>
      <View style={styles.weekGrid}>
        {weekWorkouts.map((w) => (
          <View key={w.workoutId} style={styles.weekDay}>
            <Text style={styles.dayLabel}>{dayNames[w.dayNum]}</Text>
            <View
              style={[styles.dayBadge, w.dayNum === 0 ? styles.dayBadgeRest : styles.dayBadgeWorkout, w.completed && styles.dayBadgeCompleted]}
            >
              <Text style={[styles.dayText, w.completed && styles.dayTextDone]}>
                {w.dayNum === 0 ? 'Desc' : w.shortName.split(' ')[1]}
              </Text>
            </View>
            {w.completed && <Text style={styles.checkmark}>✓</Text>}
          </View>
        ))}
      </View>

      {/* Volume This Month */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.volumeLabel}>Volumen total este mes</Text>
          <Text style={styles.volumeNumber}>{volumeThisMonth.toLocaleString()}</Text>
          <Text style={styles.volumeUnit}>kg × reps</Text>
        </Card.Content>
      </Card>

      {/* Next Workout */}
      {nextWorkout && (
        <Card style={[styles.card, styles.nextCard]}>
          <Card.Content>
            <Text style={styles.nextLabel}>Próximo entrenamiento</Text>
            <Text style={styles.nextWorkout}>{nextWorkout.shortName}</Text>
            <Text style={styles.nextDate}>{new Date(nextWorkout.date).toLocaleDateString('es-AR')}</Text>
          </Card.Content>
        </Card>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BG },
  content: { padding: 20, paddingBottom: 100, paddingTop: 0 },
  greeting: { color: '#fff', fontSize: 28, fontWeight: '800', marginBottom: 4 },
  subGreeting: { color: '#888', fontSize: 15, marginBottom: 20 },
  card: { backgroundColor: SECONDARY_BG, borderRadius: 12, marginBottom: 20, borderColor: '#2A2A2A', borderWidth: 1 },
  sectionTitle: { color: '#ccc', fontSize: 16, fontWeight: '700', marginBottom: 12, marginTop: 8 },
  progressRow: { gap: 12 },
  progressLabel: { color: '#888', fontSize: 13 },
  progressNumber: { color: '#fff', fontSize: 32, fontWeight: '800', marginTop: 4 },
  progressPct: { color: ACCENT, fontSize: 14, fontWeight: '600', marginTop: 2 },
  progressBar: { marginTop: 16, height: 8, borderRadius: 4 },
  weekGrid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, gap: 8 },
  weekDay: { flex: 1, alignItems: 'center' },
  dayLabel: { color: '#666', fontSize: 11, marginBottom: 6, textTransform: 'uppercase', fontWeight: '600' },
  dayBadge: { width: '100%', paddingVertical: 8, borderRadius: 8, alignItems: 'center', borderWidth: 1.5 },
  dayBadgeRest: { backgroundColor: '#1A1A1A', borderColor: '#3A3A3A' },
  dayBadgeWorkout: { backgroundColor: 'transparent', borderColor: ACCENT },
  dayBadgeCompleted: { backgroundColor: ACCENT },
  dayText: { color: ACCENT, fontSize: 11, fontWeight: '700' },
  dayTextDone: { color: '#000' },
  checkmark: { fontSize: 20, marginTop: 4, color: ACCENT },
  volumeLabel: { color: '#888', fontSize: 13 },
  volumeNumber: { color: '#fff', fontSize: 36, fontWeight: '800', marginTop: 4 },
  volumeUnit: { color: '#666', fontSize: 12, marginTop: 2 },
  nextCard: { borderColor: ACCENT, borderWidth: 2 },
  nextLabel: { color: '#888', fontSize: 12, textTransform: 'uppercase', fontWeight: '600' },
  nextWorkout: { color: ACCENT, fontSize: 24, fontWeight: '800', marginTop: 4 },
  nextDate: { color: '#ccc', fontSize: 13, marginTop: 4 },
});
