import { useCallback, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect } from 'expo-router';
import { WeekCalendar } from '@/components/WeekCalendar';
import { getWorkoutLogsForWeek, getSetting, setSetting, getTodayString } from '@/lib/db';
import { WorkoutLog } from '@/types';

function getMonday(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  return d;
}

function toDateString(date: Date): string {
  return date.toISOString().split('T')[0];
}

function getSunday(monday: Date): Date {
  const d = new Date(monday);
  d.setDate(d.getDate() + 6);
  return d;
}

function getCurrentWeekNumber(): number {
  const today = getTodayString();
  let cycleStart = getSetting('cycle_start_date');
  if (!cycleStart) {
    // Default cycle start = Monday of current week
    cycleStart = toDateString(getMonday(new Date()));
    setSetting('cycle_start_date', cycleStart);
  }
  const start = new Date(cycleStart);
  const now = new Date(today);
  const diffMs = now.getTime() - start.getTime();
  const diffWeeks = Math.floor(diffMs / (7 * 24 * 60 * 60 * 1000));
  return Math.max(1, Math.min(6, diffWeeks + 1));
}

export default function CalendarScreen() {
  const insets = useSafeAreaInsets();
  const [weekLogs, setWeekLogs] = useState<WorkoutLog[]>([]);
  const [weekNumber, setWeekNumber] = useState(1);
  const [mondayStr, setMondayStr] = useState('');

  const load = useCallback(() => {
    const monday = getMonday(new Date());
    const sunday = getSunday(monday);
    const start = toDateString(monday);
    const end = toDateString(sunday);
    setMondayStr(start);
    setWeekLogs(getWorkoutLogsForWeek(start, end));
    setWeekNumber(getCurrentWeekNumber());
  }, []);

  useFocusEffect(useCallback(() => { load(); }, [load]));

  return (
    <ScrollView style={styles.container} contentContainerStyle={[styles.content, { paddingTop: insets.top + 16 }]}>
      <Text style={styles.title}>Esta semana</Text>
      <WeekCalendar weekLogs={weekLogs} weekStartDate={mondayStr} weekNumber={weekNumber} />

      <View style={styles.legend}>
        <Text style={styles.legendTitle}>Programa Lueth PPL — 6 semanas</Text>
        <Text style={styles.legendSub}>
          Completá las 6 semanas y repetí con más peso.{'\n'}
          Lun → Push · Mar → Pull · Mié → Legs{'\n'}
          Jue → Push · Vie → Pull · Sáb → Legs
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0A0A' },
  content: { padding: 20, paddingBottom: 40 },
  title: { color: '#fff', fontSize: 22, fontWeight: '800', marginBottom: 20, textAlign: 'center' },
  legend: { marginTop: 24, backgroundColor: '#1A1A1A', borderRadius: 12, padding: 16 },
  legendTitle: { color: '#4CAF50', fontSize: 14, fontWeight: '700', marginBottom: 8 },
  legendSub: { color: '#888', fontSize: 13, lineHeight: 20 },
});
