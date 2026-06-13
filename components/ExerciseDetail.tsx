import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { Text, Card } from 'react-native-paper';
import { WorkoutExercise } from '@/types';

interface ExerciseDetailProps {
  exercise: WorkoutExercise;
}

const ACCENT = '#4CAF50';
const BG = '#0A0A0A';
const SECONDARY_BG = '#1A1A1A';

export default function ExerciseDetail({ exercise }: ExerciseDetailProps) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* GIF */}
      {exercise.gifUrl && (
        <Card style={styles.gifCard}>
          <Card.Content style={styles.gifContent}>
            <Image
              source={{ uri: exercise.gifUrl }}
              style={styles.gif}
              onError={() => (
                <Text style={styles.gifError}>No se pudo cargar el GIF</Text>
              )}
            />
          </Card.Content>
        </Card>
      )}

      {/* Title */}
      <Text style={styles.title}>{exercise.name}</Text>

      {/* Target Muscles */}
      {exercise.targetMuscles && exercise.targetMuscles.length > 0 && (
        <Card style={styles.musclesCard}>
          <Card.Content>
            <Text style={styles.sectionLabel}>Músculos trabajados</Text>
            <View style={styles.musclesTags}>
              {exercise.targetMuscles.map((muscle) => (
                <View key={muscle} style={styles.muscleTag}>
                  <Text style={styles.muscleText}>{muscle}</Text>
                </View>
              ))}
            </View>
          </Card.Content>
        </Card>
      )}

      {/* Description */}
      {exercise.description && (
        <Card style={styles.descriptionCard}>
          <Card.Content>
            <Text style={styles.sectionLabel}>Cómo hacerlo</Text>
            <Text style={styles.description}>{exercise.description}</Text>
          </Card.Content>
        </Card>
      )}

      {/* Set targets */}
      <Card style={styles.targetCard}>
        <Card.Content>
          <View style={styles.targetRow}>
            <View style={styles.targetItem}>
              <Text style={styles.targetLabel}>Series</Text>
              <Text style={styles.targetValue}>{exercise.setsTarget}</Text>
            </View>
            <View style={styles.targetItem}>
              <Text style={styles.targetLabel}>Reps</Text>
              <Text style={styles.targetValue}>{exercise.repsTarget}</Text>
            </View>
            <View style={styles.targetItem}>
              <Text style={styles.targetLabel}>Descanso</Text>
              <Text style={styles.targetValue}>{exercise.restSeconds}s</Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* Notes */}
      {exercise.notes && (
        <Card style={styles.notesCard}>
          <Card.Content>
            <Text style={styles.sectionLabel}>Notas</Text>
            <Text style={styles.notes}>{exercise.notes}</Text>
          </Card.Content>
        </Card>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BG },
  content: { padding: 16, paddingBottom: 40 },
  gifCard: { backgroundColor: SECONDARY_BG, borderRadius: 12, marginBottom: 20, overflow: 'hidden', borderColor: '#2A2A2A', borderWidth: 1 },
  gifContent: { padding: 0 },
  gif: { width: '100%', height: 200, borderRadius: 12 },
  gifError: { color: '#888', textAlign: 'center', padding: 20 },
  title: { color: '#fff', fontSize: 26, fontWeight: '800', marginBottom: 16 },
  sectionLabel: { color: '#888', fontSize: 12, textTransform: 'uppercase', fontWeight: '700', marginBottom: 8 },
  musclesCard: { backgroundColor: SECONDARY_BG, borderRadius: 12, marginBottom: 16, borderColor: '#2A2A2A', borderWidth: 1 },
  musclesTags: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  muscleTag: { backgroundColor: ACCENT, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16 },
  muscleText: { color: '#000', fontSize: 12, fontWeight: '600' },
  descriptionCard: { backgroundColor: SECONDARY_BG, borderRadius: 12, marginBottom: 16, borderColor: '#2A2A2A', borderWidth: 1 },
  description: { color: '#ccc', fontSize: 15, lineHeight: 22 },
  targetCard: { backgroundColor: SECONDARY_BG, borderRadius: 12, marginBottom: 16, borderColor: ACCENT, borderWidth: 1.5 },
  targetRow: { flexDirection: 'row', justifyContent: 'space-around' },
  targetItem: { alignItems: 'center' },
  targetLabel: { color: '#888', fontSize: 11, marginBottom: 4 },
  targetValue: { color: ACCENT, fontSize: 20, fontWeight: '800' },
  notesCard: { backgroundColor: SECONDARY_BG, borderRadius: 12, marginBottom: 20, borderColor: '#2A2A2A', borderWidth: 1 },
  notes: { color: '#ccc', fontSize: 14, lineHeight: 20, fontStyle: 'italic' },
});
