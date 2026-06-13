import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Text } from 'react-native-paper';
import { LineChart } from 'react-native-chart-kit';
import { ProgressDataPoint } from '@/types';

const SCREEN_WIDTH = Dimensions.get('window').width;

interface Props {
  data: ProgressDataPoint[];
  exerciseName: string;
}

export function ProgressChart({ data, exerciseName }: Props) {
  if (data.length < 2) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>
          Necesitás al menos 2 sesiones de {exerciseName} para ver el gráfico.
        </Text>
        <Text style={styles.emptySubtext}>¡Seguí entrenando!</Text>
      </View>
    );
  }

  const labels = data.map((d) => {
    const date = new Date(d.date);
    return `${date.getDate()}/${date.getMonth() + 1}`;
  });

  const weights = data.map((d) => d.weightKg);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{exerciseName}</Text>
      <LineChart
        data={{ labels, datasets: [{ data: weights }] }}
        width={SCREEN_WIDTH - 32}
        height={200}
        chartConfig={{
          backgroundColor: '#111',
          backgroundGradientFrom: '#111',
          backgroundGradientTo: '#1A1A1A',
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(170, 170, 170, ${opacity})`,
          propsForDots: { r: '5', strokeWidth: '2', stroke: '#4CAF50' },
        }}
        bezier
        style={styles.chart}
      />
      <View style={styles.table}>
        {data
          .slice(-5)
          .reverse()
          .map((d, i) => (
            <View key={i} style={styles.tableRow}>
              <Text style={styles.tableDate}>{d.date}</Text>
              <Text style={styles.tableWeight}>{d.weightKg} kg</Text>
              <Text style={styles.tableReps}>{d.repsDone} reps</Text>
              <Text style={styles.tableRpe}>RPE {d.rpe}</Text>
            </View>
          ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 24 },
  title: { color: '#fff', fontSize: 16, fontWeight: '700', marginBottom: 8, textAlign: 'center' },
  chart: { borderRadius: 12 },
  empty: { alignItems: 'center', padding: 32, backgroundColor: '#1A1A1A', borderRadius: 12 },
  emptyText: { color: '#888', fontSize: 14, textAlign: 'center' },
  emptySubtext: { color: '#4CAF50', fontSize: 13, marginTop: 8 },
  table: { marginTop: 12, gap: 4 },
  tableRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: '#222' },
  tableDate: { color: '#888', fontSize: 12, flex: 1 },
  tableWeight: { color: '#fff', fontSize: 13, fontWeight: '600', flex: 1, textAlign: 'center' },
  tableReps: { color: '#ccc', fontSize: 12, flex: 1, textAlign: 'center' },
  tableRpe: { color: '#4CAF50', fontSize: 12, flex: 1, textAlign: 'right' },
});
