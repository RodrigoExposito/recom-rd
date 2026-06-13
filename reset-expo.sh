#!/usr/bin/env bash
set -euo pipefail

# 0 - Asegúrate de detener cualquier servidor de expo antes de ejecutar este script.

# 1 - Limpieza completa
rm -rf node_modules
rm -f pnpm-lock.yaml package-lock.json
rm -rf .expo
if command -v watchman >/dev/null 2>&1; then
  watchman watch-del-all || true
fi

# 2 - Instalar dependencias nativas que expo-router necesita
pnpm add react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated
pnpm add expo-router expo-status-bar @babel/runtime

# 3 - Asegurar versiones compatibles (opcional)
pnpm add react@18.2.0 react-dom@18.2.0 react-native@0.76.5 expo@56.0.11

# 4 - Reinstalar todo
pnpm install

# 5 - Si trabajas con iOS en Bare workflow, instala pods (descomenta si aplica)
# (cd ios && pod install && cd ..)

# 6 - Limpiar cache de Metro y arrancar Expo en modo túnel
npx expo start --tunnel -c

