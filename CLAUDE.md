# FITTRACKER PRO

## Project Overview
App nativa de iPhone para uso personal de Rodri.
Tracking del programa Lueth PPL (6 workouts × 6 semanas) con:
- Logging de ejercicios (peso/reps/RPE por serie)
- Recordatorios locales de suplementos (4 momentos/día)
- Checklist de comidas (6 momentos/día)
- Dashboard de progresión de fuerza

NO es para publicar en App Store. Se instala vía EAS Build Ad Hoc.
NO tiene backend, NO tiene autenticación, NO tiene nube.

## Tech Stack
- Framework: React Native + Expo SDK 52
- Navegación: Expo Router v4 (file-based routing)
- UI: React Native Paper v5 (dark theme, acento #4CAF50)
- Base de datos: expo-sqlite v14 (SQLite local, API síncrona, todo offline)
- Notificaciones: expo-notifications (locales, sin servidor)
- Gráficos: react-native-chart-kit + react-native-svg
- Lenguaje: TypeScript estricto
- Build: EAS Build (Ad Hoc profile para iPhone personal)

## Commands

```bash
npx expo start                                          # Dev server
npx expo start --ios                                    # Simulador iOS
npx tsc --noEmit                                        # Type-check
npx expo run:ios --device                              # Build local + instalar en iPhone físico (cuenta Apple gratuita)
npx expo run:ios                                        # Build local para simulador
```

## Architecture

- Expo Router: todas las pantallas en /app
- Tabs: /app/(tabs)/ — 5 tabs: home (Inicio), index (Entreno), calendar, nutrition, progress
- Workout activo: /app/workout/[id].tsx
- Componentes reutilizables en /components
- Base de datos y queries en /lib/db.ts
- Datos del programa Lueth en /data/lueth-program.ts
- Datos de suplementos/comidas en /data/nutrition-protocol.ts
- Tipos TypeScript en /types/index.ts
- Hooks personalizados en /hooks/

## Database Schema (expo-sqlite v14, openDatabaseSync)

```
workout_logs: id, workout_id, date (YYYY-MM-DD), completed, duration_minutes
set_logs: id, workout_log_id, exercise_id, set_number, weight_kg, reps_done, rpe, created_at
supplement_logs: id, supplement_id, supplement_name, scheduled_time, taken_at, date, taken
meal_logs: id, meal_id, meal_name, scheduled_time, date, completed, protein_g, carbs_g, fats_g
body_metrics: id, date, weight_kg, notes
settings: key, value
```

## DB Query Pattern

```typescript
import { db } from '@/lib/db';
const row = db.getFirstSync<T>('SELECT ...', [params]);
const rows = db.getAllSync<T>('SELECT ...', [params]);
db.runSync('INSERT INTO ...', [params]);
```

## Code Rules
- NO usar any. TypeScript estricto siempre.
- NO instalar dependencias que no se necesiten.
- Archivos < 200 líneas. Si crece más, dividir.
- Nombres en inglés para código, textos de UI en español.
- Componentes funcionales con hooks, async/await, try/catch.

## Lueth PPL Program
- push1 (Lun), pull1 (Mar), legs1 (Mié), push2 (Jue), pull2 (Vie), legs2 (Sáb)
- 7 ejercicios + movement prep por workout
- Ciclo: 6 semanas, luego repetir con más peso
- Rest: 150s compuestos, 90s aislamiento

## Supplement Schedule
- 07:30 — Omega-3 2000mg
- 19:00 — Colágeno ENA Sport
- 22:00 — Whey X-Pro 1.5 scoops
- 00:30 — Magnesio L-Treonato 1000mg

## Meal Schedule
- 07:30 — Desayuno (15g P | 80g C | 10g F)
- 10:30 — Colación 1 (25g P | 30g C | 5g F)
- 12:30 — Almuerzo (50g P | 90g C | 15g F)
- 17:00 — Snack pre-entreno (8g P | 30g C | 10g F)
- 22:00 — Post-entreno (24g P | 30g C | 2g F)
- 00:00 — Pre-sueño (30g P | 20g C | 5g F)

## Current Phase
COMPLETED — todas las fases entregadas.

## Completed Phases
- Phase A: Project Setup + Data Layer
- Phase B: Database + Shell de la App
- Phase C: Workout del Día + Logging (CORE)
- Phase D: Calendario Semanal
- Phase E: Suplementos + Comidas + Notificaciones
- Phase F: Dashboard de Progresión
- Phase G: Polish + Build para iPhone

## Known Issues
- assets/icon.png no existe aún — necesario antes del build. Crear una imagen 1024×1024 PNG y copiarla a /assets/icon.png.
- Se agregó un 5to tab "home" (Inicio) con stats semanales — no estaba en el plan original pero es una mejora válida.
- Certificado gratuito vence cada 7 días, rebuildar con `npx expo run:ios --device --configuration Release`.
