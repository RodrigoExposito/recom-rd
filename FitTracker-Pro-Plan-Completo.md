# FitTracker Pro — Plan Completo de Ejecución

> **Para:** Rodri | **Fecha:** Junio 2026 | **Herramienta:** Claude Code CLI
>
> App nativa de iPhone para tracking del programa Lueth PPL (6 workouts, 6 semanas)
> con recordatorios de suplementos, comidas y progresión de fuerza.

---

## PARTE 0: SETUP PREVIO (hacer antes de tocar código)

### Paso 1 — Instalar Xcode (30-60 min, mayormente esperar descarga)

```bash
# Abrir App Store en tu Mac y buscar "Xcode"
# Instalar (es gratis, pesa ~12GB)
# Una vez instalado, abrir Xcode una vez para aceptar la licencia

# Después, instalar Command Line Tools desde Terminal:
xcode-select --install

# Verificar que funciona:
xcode-select -p
# Debe mostrar: /Applications/Xcode.app/Contents/Developer
```

### Paso 2 — Verificar Node.js

```bash
node -v
# Necesitás v18 o superior
# Si no lo tenés: https://nodejs.org (bajar LTS)
```

### Paso 3 — Instalar EAS CLI (para compilar la app)

```bash
npm install -g eas-cli
```

### Paso 4 — Crear cuenta en Expo (gratis)

```bash
# Ir a https://expo.dev y crear cuenta
# Después loguearte desde terminal:
npx eas login
```

### Paso 5 — Crear la carpeta del proyecto

```bash
# Elegí donde querés tu proyecto. Ejemplo:
cd ~/Projects
mkdir fittracker-pro
cd fittracker-pro
```

### Paso 6 — Iniciar Git limpio

```bash
git init
```

> **IMPORTANTE:** No vincules esto con ningún repo existente.
> Este es un proyecto nuevo, desde cero, solo para vos.

---

## PARTE 1: CLAUDE.md (copiar este archivo al root del proyecto)

Crear el archivo `CLAUDE.md` en la raíz del proyecto. Este es el archivo de memoria
que Claude Code leerá automáticamente en cada sesión.

```markdown
# FITTRACKER PRO

## Project Overview
App nativa de iPhone para uso personal de Rodri.
Tracking del programa Lueth PPL (6 workouts × 6 semanas) con:
- Logging de ejercicios (peso/reps/RPE por serie)
- Recordatorios locales de suplementos (4 momentos/día)
- Checklist de comidas (7 momentos/día)
- Dashboard de progresión de fuerza

NO es para publicar en App Store. Se instala vía EAS Build Ad Hoc.
NO tiene backend, NO tiene autenticación, NO tiene nube.

## Tech Stack
- Framework: React Native + Expo SDK 52
- Navegación: Expo Router (file-based routing)
- UI: React Native Paper (dark theme)
- Base de datos: expo-sqlite (SQLite local, todo offline)
- Notificaciones: expo-notifications (locales, sin servidor)
- Gráficos: react-native-chart-kit
- Lenguaje: TypeScript estricto
- Build: EAS Build (Ad Hoc profile para iPhone personal)

## Architecture Rules
- Expo Router: todas las pantallas en /app
- Componentes reutilizables en /components
- Base de datos y queries en /lib/db.ts
- Datos del programa Lueth en /data/lueth-program.ts
- Datos de suplementos/comidas en /data/nutrition-protocol.ts
- Tipos TypeScript en /types/index.ts
- Hooks personalizados en /hooks/
- NO usar any. TypeScript estricto siempre.
- NO instalar dependencias que no se necesiten.

## Code Style
- TypeScript estricto (strict: true)
- Componentes funcionales con hooks
- async/await para todo lo asíncrono
- Manejo de errores explícito (try/catch)
- Archivos < 200 líneas. Si crece más, dividir.
- Nombres en inglés para código, textos de UI en español.
- Colores: dark theme con acento fitness (verde o azul eléctrico)

## Database Schema (expo-sqlite)
- exercises: id, workout_id, name, sets_target, reps_target, rest_seconds, order_index, notes
- workouts: id, name, day_of_week, muscle_groups, week_number
- workout_logs: id, workout_id, date, completed, duration_minutes
- set_logs: id, workout_log_id, exercise_id, set_number, weight_kg, reps_done, rpe, created_at
- supplement_logs: id, supplement_name, scheduled_time, taken_at, date, taken (boolean)
- meal_logs: id, meal_name, scheduled_time, date, completed (boolean), protein_g, carbs_g, fats_g
- body_metrics: id, date, weight_kg, notes

## Lueth PPL Program Structure
- 6 workouts: Push1, Pull1, Legs1, Push2, Pull2, Legs2
- Each workout: 7 exercises + movement prep
- Cycle: 6 weeks, then repeat with heavier weights
- Schedule: Mon-Sat (Dom descanso)
- Sets: 3-4 per exercise
- Reps: 6-15 range
- Rest: 1-3 min depending on exercise

## Supplement Schedule (notifications)
- 07:30 — Omega-3 2000mg (con desayuno)
- 19:00 — Colágeno ENA Sport (pre-entreno)
- 22:00 — Whey X-Pro 1.5 scoops (post-entreno)
- 00:30 — Magnesio L-Treonato 1000mg (pre-sueño)

## Meal Schedule (checklist notifications)
- 07:30 — Desayuno (15g prot | 80g carb | 10g fat)
- 10:30 — Colación 1 (25g prot | 30g carb | 5g fat)
- 12:30 — Almuerzo (50g prot | 90g carb | 15g fat)
- 17:00 — Snack pre-entreno (8g prot | 30g carb | 10g fat)
- 22:00 — Post-entreno (24g prot | 30g carb | 2g fat)
- 00:00 — Pre-sueño (30g prot | 20g carb | 5g fat)

## Current Phase
Phase A: Project Setup — IN PROGRESS

## Completed Phases
(none yet)

## Known Issues
(none yet)
```

---

## PARTE 2: ARQUITECTURA DE ARCHIVOS

```
fittracker-pro/
├── CLAUDE.md                          # Memoria para Claude Code
├── app.json                           # Config Expo
├── tsconfig.json                      # TypeScript config
├── package.json                       # Dependencias
├── app/
│   ├── _layout.tsx                    # Root layout (theme provider, DB init)
│   ├── (tabs)/
│   │   ├── _layout.tsx                # Tab navigator (4 tabs)
│   │   ├── index.tsx                  # Tab 1: Workout del día
│   │   ├── calendar.tsx               # Tab 2: Calendario semanal
│   │   ├── nutrition.tsx              # Tab 3: Suplementos + Comidas
│   │   └── progress.tsx               # Tab 4: Dashboard progresión
│   └── workout/
│       └── [id].tsx                   # Pantalla de workout activo (logging)
├── components/
│   ├── ExerciseCard.tsx               # Card de ejercicio con sets
│   ├── SetRow.tsx                     # Fila de serie (peso/reps/RPE input)
│   ├── WorkoutHeader.tsx              # Header del workout (nombre, músculos)
│   ├── SupplementItem.tsx             # Item de suplemento con checkbox
│   ├── MealItem.tsx                   # Item de comida con checkbox
│   ├── WeekCalendar.tsx               # Calendario semanal horizontal
│   ├── ProgressChart.tsx              # Gráfico de progresión
│   └── RestTimer.tsx                  # Timer de descanso (opcional V1)
├── data/
│   ├── lueth-program.ts               # Todos los workouts hardcoded
│   └── nutrition-protocol.ts          # Suplementos y comidas hardcoded
├── lib/
│   ├── db.ts                          # Init DB, migrations, queries
│   └── notifications.ts              # Scheduling de notificaciones locales
├── hooks/
│   ├── useDatabase.ts                 # Hook para DB queries
│   ├── useWorkout.ts                  # Hook para workout activo
│   └── useNotifications.ts            # Hook para permisos y schedule
├── types/
│   └── index.ts                       # Todos los tipos TypeScript
└── assets/
    └── icon.png                       # Ícono de la app
```

**Total: ~20 archivos.** Dentro del rango manejable (meta: 5-25 archivos).

### Dependencias de cada archivo

| Archivo | Depende de | Se crea en |
|---|---|---|
| types/index.ts | nada | Phase A |
| data/lueth-program.ts | types | Phase A |
| data/nutrition-protocol.ts | types | Phase A |
| lib/db.ts | types, expo-sqlite | Phase B |
| lib/notifications.ts | expo-notifications | Phase E |
| app/_layout.tsx | lib/db, react-native-paper | Phase B |
| app/(tabs)/_layout.tsx | nada | Phase B |
| app/(tabs)/index.tsx | components, hooks, data | Phase C |
| app/workout/[id].tsx | components, hooks, lib/db | Phase C |
| components/ExerciseCard.tsx | types, SetRow | Phase C |
| components/SetRow.tsx | types | Phase C |
| components/WorkoutHeader.tsx | types | Phase C |
| app/(tabs)/calendar.tsx | hooks, components | Phase D |
| components/WeekCalendar.tsx | types | Phase D |
| app/(tabs)/nutrition.tsx | components, hooks | Phase E |
| components/SupplementItem.tsx | types | Phase E |
| components/MealItem.tsx | types | Phase E |
| lib/notifications.ts | expo-notifications | Phase E |
| app/(tabs)/progress.tsx | hooks, chart-kit | Phase F |
| components/ProgressChart.tsx | types, chart-kit | Phase F |

---

## PARTE 3: PLAN DE IMPLEMENTACIÓN (7 Fases)

### Phase A: Project Setup + Data Layer
**Objetivo:** Proyecto Expo funcionando en el iPhone con los datos del programa cargados.
**Archivos:** package.json, app.json, tsconfig.json, types/index.ts, data/lueth-program.ts, data/nutrition-protocol.ts
**Test:** `npx expo start` abre sin errores. Los tipos compilan. Los datos del programa se importan correctamente.

### Phase B: Database + Shell de la App
**Objetivo:** SQLite inicializado, tab navigator funcionando, pantallas vacías renderizando.
**Archivos:** lib/db.ts, app/_layout.tsx, app/(tabs)/_layout.tsx, app/(tabs)/index.tsx (placeholder), calendar.tsx (placeholder), nutrition.tsx (placeholder), progress.tsx (placeholder)
**Test:** App abre con 4 tabs. DB se crea con todas las tablas. Podés navegar entre tabs.

### Phase C: Workout del Día + Logging (CORE)
**Objetivo:** Ver el workout de hoy, registrar peso/reps/RPE por serie, guardar en DB.
**Archivos:** app/(tabs)/index.tsx (completo), app/workout/[id].tsx, components/ExerciseCard.tsx, components/SetRow.tsx, components/WorkoutHeader.tsx, hooks/useWorkout.ts, hooks/useDatabase.ts
**Test:** Abrís la app → ves "Push 1 - Lunes" → tocás → ves los 7 ejercicios → ingresás peso/reps en cada serie → guardás → la data persiste al cerrar y abrir la app.

### Phase D: Calendario Semanal
**Objetivo:** Ver la semana, qué workouts tocan, cuáles completaste, en qué semana del ciclo estás.
**Archivos:** app/(tabs)/calendar.tsx (completo), components/WeekCalendar.tsx
**Test:** Ves Lun-Sáb con los nombres de workout. Los días completados tienen checkmark. Ves "Semana 2 de 6".

### Phase E: Suplementos + Comidas + Notificaciones
**Objetivo:** Checklist de suplementos y comidas del día. Notificaciones locales en los horarios del protocolo.
**Archivos:** app/(tabs)/nutrition.tsx (completo), components/SupplementItem.tsx, components/MealItem.tsx, lib/notifications.ts, hooks/useNotifications.ts
**Test:** Ves la lista de suplementos con horarios → podés marcar como tomado. Ves comidas con macros → podés marcar como completada. Recibís notificación a las 7:30am de Omega-3 (probar cambiando hora a 1 min en el futuro).

### Phase F: Dashboard de Progresión
**Objetivo:** Gráficos que muestran peso usado en ejercicios principales semana a semana.
**Archivos:** app/(tabs)/progress.tsx (completo), components/ProgressChart.tsx
**Test:** Después de 2+ sesiones logueadas, ves un gráfico de línea con la progresión de Bench Press, Squat, Pull-ups.

### Phase G: Polish + Build para iPhone
**Objetivo:** UI pulida, colores finales, ícono, build Ad Hoc instalado en tu iPhone.
**Archivos:** app.json (ícono, splash), ajustes de theme, eas.json
**Test:** La app está instalada en tu iPhone real. Funciona offline. Las notificaciones llegan. Todo persiste.

---

## PARTE 4: PROMPTS DE EJECUCIÓN PARA CLAUDE CODE

> **REGLA CRÍTICA:** Cada fase = una sesión nueva de Claude Code.
> Cuando terminás una fase, cerrá la sesión y abrí una nueva.
> Claude Code lee CLAUDE.md automáticamente al arrancar.
> Después de cada fase, actualizá CLAUDE.md (sección "Current Phase" y "Completed Phases").

---

### PROMPT 0: Crear el proyecto (pegar en Terminal, NO en Claude Code)

```bash
cd ~/Projects/fittracker-pro

npx create-expo-app@latest . --template blank-typescript

# Instalar dependencias core
npx expo install expo-sqlite expo-notifications expo-router react-native-paper react-native-safe-area-context react-native-screens react-native-chart-kit react-native-svg

# Crear estructura de carpetas
mkdir -p app/\(tabs\) app/workout components data lib hooks types assets
```

Después de correr esto, copiá el contenido de CLAUDE.md (de la PARTE 1 de este documento)
y guardalo como `CLAUDE.md` en la raíz del proyecto.

---

### PROMPT Phase A: Data Layer
Abrir Claude Code en la carpeta del proyecto:
```bash
cd ~/Projects/fittracker-pro
claude
```

Pegar este prompt:

```
Lee CLAUDE.md para entender el proyecto.

Estamos en Phase A: Project Setup + Data Layer.

Tareas:
1. Crear types/index.ts con TODOS los tipos TypeScript del proyecto:
   - Exercise, Workout, SetLog, WorkoutLog, SupplementLog, MealLog, BodyMetric
   - Incluir los tipos para el programa Lueth (WorkoutDay, ExerciseData)

2. Crear data/lueth-program.ts con los 6 workouts del programa Lueth PPL hardcoded.
   Los datos exactos son:

   PUSH 1 (Lunes): Barbell Bench Press 4×6-15, Seated DB OH Press 3×6-15,
   Machine Chest Fly 3×8-15, Machine Reverse Fly 3×8-15,
   Cable OH Triceps Extension 3×8-15, Cable Lateral Raise 3×8-15,
   Cable Triceps Pushdown 3×8-15

   PULL 1 (Martes): Pull-ups 4×6-15, Unilateral DB Row 3×6-15,
   DB Farmers Carry 3×Max Effort, Wide Grip Seated Cable Row 3×8-15,
   Barbell Reverse Curl 3×8-15, Alternating DB Curl 3×8-15,
   Cable Core Rotation 3×6-15

   LEGS 1 (Miércoles): Barbell Back Squat 4×6-15, DB RDL 3×6-15,
   DB Lunge 3×6-15, Seated Leg Curl 3×6-15,
   Smith Calf Raise (feet elevated) 4×6-15, Machine Hip Abduction 3×6-15,
   Hanging Leg Raise 3×6-15

   PUSH 2 (Jueves): DB Incline Bench Press 4×6-15,
   Lying Barbell Triceps Ext (Skull Crushers) 3×8-15,
   Cable Chest Fly High-to-Low 3×8-15, DB Lateral Raise 3×8-15,
   DB Reverse Fly 3×8-15, Cable Triceps Kickback 3×8-15,
   Cable Crunch 3×8-15

   PULL 2 (Viernes): Supinated Lat Pulldown 4×6-15,
   Barbell Bent Over Row 4×6-15, Straight Arm Cable Pulldown 4×8-15,
   Barbell Curl 4×8-15, DB Shrug 4×8-15,
   DB Concentration Curl 4×8-15, DB Side Bend 4×8-15

   LEGS 2 (Sábado): Bulgarian Split Squat 3×6-15,
   Barbell Hip Thrust 3×6-15, Leg Extension 3×8-15,
   Lying Leg Curl 4×8-15, Feet Elevated DB Calf Raise 4×8-20,
   Machine Hip Adduction 3×8-15

   Cada ejercicio tiene: rest time (2-3 min para compuestos, 1-2 min para aislamiento).
   Incluir también los Movement Prep de cada workout.

3. Crear data/nutrition-protocol.ts con:
   - 4 suplementos con horarios exactos (Omega-3 7:30, Colágeno 19:00, Whey 22:00, Magnesio 0:30)
   - 6 comidas con horarios y macros objetivo (ver CLAUDE.md para los datos)

4. Verificar que tsconfig.json tiene strict: true

5. Verificar que todo compila sin errores: npx tsc --noEmit

NO toques app/_layout.tsx ni navegación todavía. Solo types y data.
```

---

### PROMPT Phase B: Database + Shell

Nueva sesión de Claude Code. Actualizar CLAUDE.md primero:
- Current Phase: Phase B
- Completed Phases: Phase A

```
Lee CLAUDE.md para entender el proyecto.

Estamos en Phase B: Database + Shell de la App.

Tareas:
1. Crear lib/db.ts:
   - Función initDatabase() que crea todas las tablas (ver schema en CLAUDE.md)
   - Funciones CRUD básicas: insertSetLog, getWorkoutLogs, getSetLogsForWorkout
   - Usar expo-sqlite con la API síncrona de SQLite (useSQLiteDatabase)
   - La DB se inicializa una sola vez al abrir la app

2. Configurar Expo Router:
   - app/_layout.tsx: Root layout con PaperProvider (dark theme), DB init en useEffect
   - app/(tabs)/_layout.tsx: Tab navigator con 4 tabs:
     * index (ícono: dumbbell) — "Entreno"
     * calendar (ícono: calendar) — "Semana"
     * nutrition (ícono: pill) — "Nutrición"
     * progress (ícono: chart) — "Progreso"

3. Crear placeholders para cada tab:
   - app/(tabs)/index.tsx — mostrar texto "Workout del día — Coming soon"
   - app/(tabs)/calendar.tsx — mostrar texto "Calendario — Coming soon"
   - app/(tabs)/nutrition.tsx — mostrar texto "Nutrición — Coming soon"
   - app/(tabs)/progress.tsx — mostrar texto "Progreso — Coming soon"

4. Configurar app.json correctamente para Expo Router

5. Dark theme con acento verde (#4CAF50) o azul eléctrico (#00BCD4) — elegí uno

TEST: Correr `npx expo start` → escanear QR con Expo Go →
la app abre con 4 tabs, todas navegables, sin errores en consola.
```

---

### PROMPT Phase C: Workout + Logging (CORE)

Nueva sesión. Actualizar CLAUDE.md.

```
Lee CLAUDE.md para entender el proyecto.

Estamos en Phase C: Workout del Día + Logging. Esta es la feature MÁS IMPORTANTE.

Tareas:
1. app/(tabs)/index.tsx — Pantalla principal:
   - Detectar qué día de la semana es (lunes=Push1, martes=Pull1, etc.)
   - Si es domingo, mostrar "Día de descanso 💪"
   - Mostrar: nombre del workout, músculos, número de ejercicios
   - Botón grande "Empezar Workout" que navega a app/workout/[id].tsx
   - Si ya completó el workout de hoy, mostrar resumen

2. app/workout/[id].tsx — Pantalla de workout activo:
   - Lista scrolleable de ejercicios (ExerciseCard)
   - Cada ejercicio muestra: nombre, series×reps objetivo, descanso
   - Cada serie tiene inputs: peso (kg), reps hechas, RPE (selector 6-10)
   - Mostrar datos de la semana anterior al lado (si existen)
   - Botón "Completar Workout" al final que guarda todo en DB

3. components/ExerciseCard.tsx:
   - Nombre del ejercicio
   - Expandible: toca para ver/ocultar sets
   - Cada set es un SetRow

4. components/SetRow.tsx:
   - Inputs inline: [peso kg] [reps] [RPE dropdown]
   - Al lado: dato de semana anterior (gris, referencia)
   - Checkbox de "completado"

5. hooks/useWorkout.ts:
   - Cargar workout del día
   - Guardar sets en DB
   - Obtener histórico del mismo workout

6. hooks/useDatabase.ts:
   - Hook wrapper para queries comunes de DB

Los textos de la UI van en español. Los nombres de ejercicios en inglés
(como están en el programa de Lueth).

TEST: Abrir app → ver "Push 1 - Pecho, Hombros, Tríceps" →
tocar Empezar → ver 7 ejercicios → ingresar peso/reps en serie 1 del
Bench Press → Completar → cerrar app → abrir → los datos persisten.
```

---

### PROMPT Phase D: Calendario

Nueva sesión. Actualizar CLAUDE.md.

```
Lee CLAUDE.md para entender el proyecto.

Estamos en Phase D: Calendario Semanal.

Tareas:
1. app/(tabs)/calendar.tsx:
   - Vista de la semana actual (Lun a Sáb)
   - Cada día muestra: nombre del workout asignado
   - Si el workout de ese día fue completado: checkmark verde
   - Si no: círculo vacío
   - Día actual resaltado
   - Arriba: "Semana X de 6" (basado en cuándo empezó el ciclo)
   - Si semana > 6: "Ciclo completado — ¡Nuevo ciclo!"

2. components/WeekCalendar.tsx:
   - Componente visual del calendario
   - Recibe: workouts de la semana + logs de completados
   - Indicador visual claro de hoy vs otros días

3. Leer datos de workout_logs de la DB para saber qué días se completaron

TEST: Abrir tab Semana → ver los 6 días con sus workouts →
el día de hoy está resaltado → si completé el workout de hoy (en Phase C),
tiene checkmark verde.
```

---

### PROMPT Phase E: Nutrición + Notificaciones

Nueva sesión. Actualizar CLAUDE.md.

```
Lee CLAUDE.md para entender el proyecto.

Estamos en Phase E: Suplementos + Comidas + Notificaciones.

Tareas:
1. app/(tabs)/nutrition.tsx:
   - Sección superior: "Suplementos" — 4 items con hora y nombre
   - Sección inferior: "Comidas" — 6 items con hora, nombre y macros
   - Cada item es un checkbox que se puede marcar como completado
   - Estado persiste en DB (supplement_logs, meal_logs con fecha de hoy)
   - Al abrir, cargar el estado del día actual
   - Si cambia de día, resetear

2. components/SupplementItem.tsx:
   - [checkbox] [hora] [nombre del suplemento] [dosis]
   - Ejemplo: ☑ 07:30 — Omega-3 — 2000mg

3. components/MealItem.tsx:
   - [checkbox] [hora] [nombre de la comida]
   - Subtexto: "15g prot | 80g carb | 10g fat"

4. lib/notifications.ts:
   - Función scheduleAllNotifications() que programa notificaciones locales
   - 4 notificaciones de suplementos (repeating daily)
   - 6 notificaciones de comidas (repeating daily)
   - Pedir permisos al usuario la primera vez
   - Usar expo-notifications con trigger type: daily

5. hooks/useNotifications.ts:
   - Hook que pide permisos y programa notificaciones
   - Se ejecuta una vez en app/_layout.tsx

IMPORTANTE sobre notificaciones en Expo:
- Usar Notifications.scheduleNotificationAsync con trigger DailyTriggerInput
- Las notificaciones locales NO necesitan servidor
- Probar cambiando la hora a 1 minuto en el futuro para verificar

TEST: Abrir tab Nutrición → ver 4 suplementos + 6 comidas con horarios →
marcar Omega-3 como tomado → cerrar app → abrir → sigue marcado →
recibir notificación de prueba.
```

---

### PROMPT Phase F: Progresión

Nueva sesión. Actualizar CLAUDE.md.

```
Lee CLAUDE.md para entender el proyecto.

Estamos en Phase F: Dashboard de Progresión.

Tareas:
1. app/(tabs)/progress.tsx:
   - Selector de ejercicio (dropdown con los ejercicios principales:
     Bench Press, Squat, Pull-ups, DB OH Press, Barbell Row, Hip Thrust)
   - Gráfico de línea: eje X = fecha/semana, eje Y = peso máximo usado
   - Debajo del gráfico: tabla simple con las últimas 6 sesiones
     (fecha, peso, reps, RPE)
   - Si no hay datos suficientes: mostrar mensaje motivacional

2. components/ProgressChart.tsx:
   - Usar react-native-chart-kit (LineChart)
   - Dark theme compatible
   - Color de línea: acento de la app
   - Labels claros

3. Query de DB: para un exercise_id dado, obtener el peso máximo por sesión,
   ordenado por fecha.

TEST: Necesitás al menos 2 sesiones de workout logueadas para ver el gráfico.
Si solo tenés 1, meter datos dummy en la DB para probar que el gráfico renderiza.
```

---

### PROMPT Phase G: Polish + Build

Nueva sesión. Actualizar CLAUDE.md.

```
Lee CLAUDE.md para entender el proyecto.

Estamos en Phase G: Polish + Build para iPhone.

Tareas:
1. UI Polish:
   - Verificar que todo se ve bien en dark mode
   - Verificar que los inputs de peso/reps no se tapan con el teclado
   - Agregar haptic feedback (expo-haptics) al completar serie/workout
   - Empty states con mensajes útiles (no pantallas en blanco)
   - Loading states donde haga falta

2. Ícono y Splash:
   - Crear un ícono simple (puede ser texto "FT" con fondo del color acento)
   - Configurar en app.json

3. EAS Build config:
   - Crear eas.json con perfil "development" para build local
   - Configurar para Ad Hoc (instalación directa en iPhone)

4. Optimización:
   - Verificar que no hay re-renders innecesarios
   - Verificar que la DB no se abre múltiples veces
   - Verificar que las notificaciones no se duplican

5. Checklist final:
   - [ ] Sin errores en consola
   - [ ] Todos los tabs funcionan
   - [ ] Workout logging guarda y persiste
   - [ ] Suplementos/comidas persisten por día
   - [ ] Notificaciones se programan correctamente
   - [ ] Gráfico de progresión renderiza con datos
   - [ ] La app funciona 100% offline

6. Build:
   - Correr: eas build --profile development --platform ios
   - Instalar en iPhone vía QR o link de Expo

TEST FINAL: La app está en tu iPhone. Abrila sin WiFi.
Logueá un workout completo. Marcá suplementos. Todo funciona.
```

---

### PROMPT DE RECUPERACIÓN (si algo se rompe)

```
Lee CLAUDE.md para entender el proyecto.

Algo se rompió. Antes de arreglar nada:
1. Corré `npx tsc --noEmit` y mostrá los errores de TypeScript
2. Corré `npx expo start` y mostrá los errores de consola
3. Identificá el archivo exacto que falla
4. Explicá qué cambió desde la última vez que funcionaba
5. Proponé la solución mínima (no reescribir, solo arreglar)

NO hagas cambios hasta que yo confirme el diagnóstico.
```

---

### PROMPT DE MEJORA DE DISEÑO (después de que todo funcione)

```
Lee CLAUDE.md para entender el proyecto.

La app funciona correctamente. Ahora quiero mejorar el diseño visual.

Reglas:
- NO cambies funcionalidad, solo visual
- Mantené dark theme
- Mejorá spacing, tipografía y jerarquía visual
- Agregá transiciones suaves donde tenga sentido
- Los números (peso, reps) deben ser grandes y legibles
- El botón de "Completar Workout" debe ser prominente

Mostrá screenshots o describe los cambios antes de hacerlos.
```

---

## PARTE 5: ORDEN DE EJECUCIÓN

```
DÍA 1:
├── Instalar Xcode (mientras descarga, hacer Pasos 2-6 de PARTE 0)
├── Correr PROMPT 0 (crear proyecto en Terminal)
├── Copiar CLAUDE.md al proyecto
└── Correr PROMPT Phase A (Claude Code)

DÍA 2:
├── Actualizar CLAUDE.md
├── Correr PROMPT Phase B (nueva sesión Claude Code)
└── Correr PROMPT Phase C (nueva sesión Claude Code)

DÍA 3:
├── Actualizar CLAUDE.md
├── Correr PROMPT Phase D (nueva sesión)
└── Correr PROMPT Phase E (nueva sesión)

DÍA 4:
├── Actualizar CLAUDE.md
├── Correr PROMPT Phase F (nueva sesión)
└── Correr PROMPT Phase G (nueva sesión)
```

**Timeline estimado: 3-4 días de trabajo enfocado (~2-3 horas/día)**

---

## PARTE 6: ROADMAP V2 (después de usar V1 por 2+ semanas)

Una vez que V1 está sólida y la usás todos los días:

1. **Plan TWIN** — Agregar los 10 períodos bimensuales con técnicas avanzadas
2. **Timer de descanso** — Vibración cuando termina el descanso entre series
3. **Métricas corporales** — Peso diario, circunferencias semanales, fotos
4. **Sección de movilidad** — Timer para rutinas de movilidad pre/post workout
5. **Export de datos** — Exportar historial como JSON/CSV (backup manual)
6. **Apple Watch** — Companion app con HealthKit integration
7. **Detección de ejercicio** — CoreMotion + modelo ML on-device (investigar)

---

> **Recordatorio:** Cada fase termina con un TEST.
> No avances a la siguiente fase hasta que el test pase.
> Si algo se rompe, usá el PROMPT DE RECUPERACIÓN.
> Actualizá CLAUDE.md después de CADA fase.
