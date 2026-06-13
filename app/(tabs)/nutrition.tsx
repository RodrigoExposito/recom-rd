import { useCallback, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import { useFocusEffect } from 'expo-router';
import { SupplementItem } from '@/components/SupplementItem';
import { MealItem } from '@/components/MealItem';
import { SupplementLog, MealLog } from '@/types';
import { SUPPLEMENTS, MEALS } from '@/data/nutrition-protocol';
import {
  getSupplementLogsForDate,
  upsertSupplementLog,
  toggleSupplementTaken,
  getMealLogsForDate,
  upsertMealLog,
  toggleMealCompleted,
  getTodayString,
} from '@/lib/db';

function ensureLogsForToday(date: string) {
  SUPPLEMENTS.forEach((s) => upsertSupplementLog(s.id, s.name, s.scheduledTime, date));
  MEALS.forEach((m) => upsertMealLog(m.id, m.name, m.scheduledTime, date, m.proteinG, m.carbsG, m.fatsG));
}

export default function NutritionScreen() {
  const [suppLogs, setSuppLogs] = useState<SupplementLog[]>([]);
  const [mealLogs, setMealLogs] = useState<MealLog[]>([]);

  const today = getTodayString();

  const load = useCallback(() => {
    ensureLogsForToday(today);
    setSuppLogs(getSupplementLogsForDate(today));
    setMealLogs(getMealLogsForDate(today));
  }, [today]);

  useFocusEffect(useCallback(() => { load(); }, [load]));

  const handleSupplementToggle = (id: number, taken: boolean) => {
    toggleSupplementTaken(id, taken);
    setSuppLogs(getSupplementLogsForDate(today));
  };

  const handleMealToggle = (id: number, completed: boolean) => {
    toggleMealCompleted(id, completed);
    setMealLogs(getMealLogsForDate(today));
  };

  const suppDone = suppLogs.filter((s) => s.taken).length;
  const mealsDone = mealLogs.filter((m) => m.completed).length;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Nutrición de hoy</Text>

      {/* Supplements */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Suplementos</Text>
          <Text style={styles.sectionCount}>{suppDone}/{suppLogs.length}</Text>
        </View>
        {suppLogs.map((log) => (
          <SupplementItem key={log.id} log={log} onToggle={handleSupplementToggle} />
        ))}
      </View>

      {/* Meals */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Comidas</Text>
          <Text style={styles.sectionCount}>{mealsDone}/{mealLogs.length}</Text>
        </View>
        {mealLogs.map((log) => (
          <MealItem key={log.id} log={log} onToggle={handleMealToggle} />
        ))}
      </View>

      {/* Totals */}
      <View style={styles.totals}>
        <Text style={styles.totalsTitle}>Macros objetivo del día</Text>
        <View style={styles.macroRow}>
          <MacroBox label="Proteína" value={`${MEALS.reduce((s, m) => s + m.proteinG, 0)}g`} color="#4CAF50" />
          <MacroBox label="Carbos" value={`${MEALS.reduce((s, m) => s + m.carbsG, 0)}g`} color="#2196F3" />
          <MacroBox label="Grasas" value={`${MEALS.reduce((s, m) => s + m.fatsG, 0)}g`} color="#FF9800" />
        </View>
      </View>
    </ScrollView>
  );
}

function MacroBox({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <View style={[macroStyles.box, { borderColor: color }]}>
      <Text style={[macroStyles.value, { color }]}>{value}</Text>
      <Text style={macroStyles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0A0A' },
  content: { padding: 20, paddingTop: 32, paddingBottom: 40 },
  title: { color: '#fff', fontSize: 22, fontWeight: '800', marginBottom: 24, textAlign: 'center' },
  section: { marginBottom: 24 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  sectionTitle: { color: '#fff', fontSize: 16, fontWeight: '700' },
  sectionCount: { color: '#4CAF50', fontSize: 14, fontWeight: '700' },
  totals: { backgroundColor: '#1A1A1A', borderRadius: 12, padding: 16 },
  totalsTitle: { color: '#888', fontSize: 13, marginBottom: 12, textAlign: 'center' },
  macroRow: { flexDirection: 'row', justifyContent: 'space-around' },
});

const macroStyles = StyleSheet.create({
  box: { alignItems: 'center', borderWidth: 1.5, borderRadius: 10, paddingHorizontal: 16, paddingVertical: 10 },
  value: { fontSize: 20, fontWeight: '800' },
  label: { color: '#888', fontSize: 12, marginTop: 2 },
});
