import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Checkbox } from 'react-native-paper';
import { SupplementLog } from '@/types';

interface Props {
  log: SupplementLog;
  onToggle: (id: number, taken: boolean) => void;
}

export function SupplementItem({ log, onToggle }: Props) {
  return (
    <TouchableOpacity style={styles.row} onPress={() => onToggle(log.id, !log.taken)} activeOpacity={0.7}>
      <Checkbox status={log.taken ? 'checked' : 'unchecked'} onPress={() => onToggle(log.id, !log.taken)} color="#4CAF50" />
      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text style={[styles.time, log.taken && styles.done]}>{log.scheduledTime}</Text>
          <Text style={[styles.name, log.taken && styles.done]}>{log.supplementName}</Text>
        </View>
        {log.takenAt && (
          <Text style={styles.takenAt}>
            Tomado a las {new Date(log.takenAt).toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })}
          </Text>
        )}
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
  done: { opacity: 0.4, textDecorationLine: 'line-through' },
  takenAt: { color: '#666', fontSize: 11, marginTop: 2 },
});
