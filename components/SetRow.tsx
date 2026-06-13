import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Checkbox } from 'react-native-paper';
import { SetInput, SetLog } from '@/types';

const ACCENT = '#4CAF50';
const SURFACE = '#1E1E1E';
const MUTED = '#888';
const RPE_OPTIONS = [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10];

interface Props {
  setInput: SetInput;
  previousSet?: SetLog;
  onChange: (updates: Partial<SetInput>) => void;
}

export function SetRow({ setInput, previousSet, onChange }: Props) {
  return (
    <View style={styles.row}>
      <Text style={styles.setNum}>{setInput.setNumber}</Text>

      {/* Weight */}
      <TextInput
        style={styles.input}
        value={setInput.weightKg > 0 ? String(setInput.weightKg) : ''}
        onChangeText={(v) => onChange({ weightKg: parseFloat(v) || 0 })}
        placeholder={previousSet ? String(previousSet.weightKg) : 'kg'}
        placeholderTextColor={MUTED}
        keyboardType="decimal-pad"
        selectTextOnFocus
      />

      {/* Reps */}
      <TextInput
        style={styles.input}
        value={setInput.repsDone > 0 ? String(setInput.repsDone) : ''}
        onChangeText={(v) => onChange({ repsDone: parseInt(v) || 0 })}
        placeholder={previousSet ? String(previousSet.repsDone) : 'reps'}
        placeholderTextColor={MUTED}
        keyboardType="number-pad"
        selectTextOnFocus
      />

      {/* RPE selector */}
      <TouchableOpacity
        style={styles.rpeButton}
        onPress={() => {
          const currentIdx = RPE_OPTIONS.indexOf(setInput.rpe);
          const nextIdx = (currentIdx + 1) % RPE_OPTIONS.length;
          onChange({ rpe: RPE_OPTIONS[nextIdx] ?? 8 });
        }}
      >
        <Text style={styles.rpeText}>RPE {setInput.rpe}</Text>
      </TouchableOpacity>

      {/* Done checkbox */}
      <Checkbox
        status={setInput.completed ? 'checked' : 'unchecked'}
        onPress={() => onChange({ completed: !setInput.completed })}
        color={ACCENT}
      />

      {/* Previous reference */}
      {previousSet && (
        <Text style={styles.prev}>
          ant: {previousSet.weightKg}×{previousSet.repsDone}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: SURFACE,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 6,
    marginBottom: 6,
    gap: 6,
  },
  setNum: { width: 20, color: MUTED, fontSize: 13, textAlign: 'center' },
  input: {
    width: 58,
    backgroundColor: '#2A2A2A',
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    borderRadius: 6,
    paddingVertical: 6,
  },
  rpeButton: {
    backgroundColor: '#2A2A2A',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  rpeText: { color: ACCENT, fontSize: 13, fontWeight: '600' },
  prev: { color: MUTED, fontSize: 11, marginLeft: 4 },
});
