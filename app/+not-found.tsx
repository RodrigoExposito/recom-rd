import { Link, Stack } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={styles.container}>
        <Text style={styles.title}>Esta pantalla no existe.</Text>
        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>Volver al inicio</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#0A0A0A', padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', color: 'white', marginBottom: 16 },
  link: { marginTop: 15, paddingVertical: 15 },
  linkText: { color: '#4CAF50', fontSize: 16 },
});
