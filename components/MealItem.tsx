import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Checkbox } from 'react-native-paper';
import { MealLog } from '@/types';

interface Props {
  log: MealLog;
  onToggle: (id: number, completed: boolean) => void;
}

export function MealItem({ log, onToggle }: Props) {
  return (
    <TouchableOpacity style={styles.row} onPress={() => onToggle(log.id, !log.completed)} activeOpacity={0.7}>
      <Checkbox status={log.completed ? 'checked' : 'unchecked'} onPress={() => onToggle(log.id, !log.completed)} color="#4CAF50" />
      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text style={[styles.time, log.completed && styles.done]}>{log.scheduledTime}</Text>
          <Text style={[styles.name, log.completed && styles.done]}>{log.mealName}</Text>
        </View>
        <Text style={[styles.macros, log.completed && styles.done]}>
          {log.proteinG}g P · {log.carbsG}g C · {log.fatsG}g F
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  content: { flex: 1, marginLeft: 8 },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  time: { color: '#4CAF50', fontSize: 14, fontWeight: '700', width: 48 },
  name: { color: '#fff', fontSize: 14, fontWeight: '500' },
  macros: { color: '#888', fontSize: 12, marginTop: 2 },
  done: { opacity: 0.4, textDecorationLine: 'line-through' },
});
