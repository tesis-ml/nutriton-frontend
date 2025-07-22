# Frontend de Validación y Formateo de Datos Nutricionales

## Descripción del Proyecto

Esta aplicación web constituye el frontend especializado para la validación y formateo colaborativo de datos nutricionales, desarrollada con React 18, TypeScript y un stack moderno de componentes UI. El sistema proporciona una interfaz intuitiva para que equipos de trabajo puedan revisar, completar y enriquecer información nutricional de alimentos de manera eficiente.

La aplicación implementa un workflow de asignación automática donde los usuarios reciben alimentos para procesar, proporcionando herramientas visuales para la clasificación dietética, selección de imágenes y definición de rangos de precios, con capacidades responsivas y sistemas de validación en tiempo real.

## Arquitectura del Sistema

### Stack Tecnológico Principal
- **Framework**: React 18.3.1 con TypeScript 5.5.3
- **Build Tool**: Vite 5.4.1 con SWC para compilación rápida
- **UI Framework**: Radix UI + ShadCN/UI + TailwindCSS
- **Estado Global**: Zustand 5.0.0 con persistencia
- **Networking**: TanStack Query 5.59.16 + Axios 1.8.3
- **Formularios**: React Hook Form 7.53.0 + Zod 3.23.8
- **Routing**: React Router DOM 6.26.1

### Arquitectura de UI
- **Sistema de Design**: Atomic Design Pattern
- **Componentes**: ShadCN/UI con Radix UI primitives
- **Styling**: TailwindCSS con utilidades personalizadas
- **Responsividad**: Mobile-first con breakpoints adaptativos
- **Iconografía**: Lucide React + Radix Icons

## Estructura del Proyecto

```
src/
├── components/              # Componentes reutilizables
│   ├── atoms/              # Elementos básicos
│   │   ├── AppHeader/      # Header de aplicación
│   │   ├── BouncyLoader/   # Loader animado
│   │   ├── CustomInput/    # Input personalizado
│   │   ├── Icon/           # Componente de iconos
│   │   └── Text/           # Componente de texto
│   ├── molecules/          # Componentes compuestos
│   │   ├── EmptyState/     # Estados vacíos
│   │   ├── Logo/           # Logo de aplicación
│   │   ├── NavItem/        # Items de navegación
│   │   ├── SectionHeader/  # Headers de sección
│   │   └── UserMenu/       # Menú de usuario
│   ├── organisms/          # Componentes complejos
│   │   ├── AllFoodsTable/  # Tabla de todos los alimentos
│   │   ├── CreateImageForm/ # Formulario de imágenes
│   │   ├── FoodScrollArea/ # Área de scroll de alimentos
│   │   ├── Header/         # Header principal
│   │   ├── RegisterForm/   # Formulario de registro
│   │   ├── Sidebar/        # Barra lateral
│   │   └── UpdateFoodForm/ # Formulario de actualización
│   ├── guards/             # Guards de protección
│   │   ├── AuthGuard.tsx   # Guard de autenticación
│   │   └── RoleGuard.tsx   # Guard de roles
│   └── ui/                 # Componentes UI base (ShadCN)
│       ├── button.tsx      # Componente botón
│       ├── form.tsx        # Componentes de formulario
│       ├── input.tsx       # Input base
│       ├── table.tsx       # Tabla base
│       └── ...             # Otros componentes UI
├── config/                # Configuraciones
│   ├── axios.config.ts   # Configuración HTTP
│   ├── nav.ts           # Configuración de navegación
│   ├── router.tsx       # Configuración de rutas
│   ├── tanstack.ts      # Configuración TanStack Query
│   └── toaster.ts       # Configuración de notificaciones
├── hooks/                 # Custom hooks
│   ├── query/            # Hooks de TanStack Query
│   │   ├── useAllFood.ts   # Consulta todos los alimentos
│   │   ├── useAssignFood.ts # Asignación de alimentos
│   │   ├── useUpdateFood.ts # Actualización de alimentos
│   │   └── ...             # Otros hooks de consulta
│   ├── useAuthCheck.ts   # Verificación de auth
│   ├── useDebounce.ts    # Hook debounce
│   ├── useLogout.ts      # Hook de logout
│   └── useMediaQuery.ts  # Hook responsive
├── schemas/               # Esquemas de validación Zod
├── services/              # Servicios de API
├── stores/                # Estados globales
├── types/                 # Definiciones TypeScript
└── views/                 # Páginas y layouts
    ├── layouts/          # Layouts de aplicación
    └── pages/            # Páginas individuales
```

## Modelos de Datos Principales

### Modelo de Alimento
```typescript
interface Food {
  id: number;
  name: string;
  foodCategoryId: number;
  
  // Macronutrientes (como strings para precision)
  calories: string;
  protein: string;
  totalFat: string;
  carbs: string;
  
  // Micronutrientes completos (25+ nutrientes)
  calcium: string;
  iron: string;
  vitaminC: string;
  // ... otros nutrientes
  
  // Flags de contenido
  hasMeat: boolean | null;
  hasEggs: boolean | null;
  hasMilk: boolean | null;
  hasHoney: boolean | null;
  hasGluten: boolean | null;
  
  // Clasificaciones dietéticas computadas
  isOvoLactoVegetarian: boolean | null;
  isLactoVegetarian: boolean | null;
  isOvoVegetarian: boolean | null;
  isVegan: boolean | null;
  isGlutenFree: boolean | null;
  canBeADish: boolean | null;
  
  // Workflow de edición
  editedById: number | null;
  isEdited: boolean;
  
  // Relaciones
  foodCategory: FoodCategory;
  editedBy: {
    firstName: string;
    lastName: string;
  } | null;
  image: Image | null;
  priceTier: number | null;
}
```

### Modelo de Usuario
```typescript
interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string; // "admin" | "editor" | "viewer"
}
```

## Funcionalidades Principales

### 1. Sistema de Asignación Automática

#### Workflow de Asignación
```typescript
const { data: currentFood, isLoading, isError } = useAssignFood();

// Hook que:
// 1. Solicita un alimento asignado al usuario actual
// 2. Si no existe, el backend asigna uno automáticamente
// 3. Retorna el alimento con toda su información nutricional
// 4. Maneja estados de carga y error
```

### 2. Formulario de Validación Nutricional

#### Interfaz de Actualización
```typescript
const UpdateFoodForm = ({ currentFood, imageFoodSelected, onFoodUpdate }) => {
  // Estados locales para clasificación
  const [priceTierId, setPriceTierId] = useState(1);
  const [dietaryFlags, setDietaryFlags] = useState({
    hasMeat: false,
    hasEggs: false,
    hasMilk: false,
    hasHoney: false,
    hasGluten: false,
    canBeADish: false
  });
  
  // Mutación TanStack Query para actualización
  const { mutateAsync } = useUpdateFood(currentFood?.id, {
    imageId: imageFoodSelected?.id || 0,
    priceTierId,
    ...dietaryFlags
  });
};
```

#### Campos de Clasificación
```typescript
const foodProperties = [
  { id: 'hasMeat', label: 'Proviene de un animal' },
  { id: 'hasEggs', label: 'Contiene huevos' },
  { id: 'hasMilk', label: 'Contiene lácteos' },
  { id: 'hasHoney', label: 'Contiene miel' },
  { id: 'hasGluten', label: 'Contiene gluten' },
  { id: 'canBeADish', label: 'Puede ser un plato' }
];

const priceLabels = new Map([
  ['Económico', '$'],
  ['Estándar', '$$'],
  ['Premium', '$$$'],
  ['Lujo', '$$$$']
]);
```

### 3. Sistema de Gestión de Imágenes

#### Búsqueda y Selección
- **Búsqueda con debounce**: Optimización de consultas en tiempo real
- **Scroll infinito**: Carga eficiente de grandes catálogos
- **Selección visual**: Interfaz intuitiva para asociar imágenes
- **Creación dinámica**: Formulario para subir nuevas imágenes

### 4. Diseño Responsivo Avanzado

#### Layout Adaptativo
```typescript
const HomePage = () => {
  const [isMobileView, setIsMobileView] = useState(false);
  const [defaultSizes, setDefaultSizes] = useState({
    leftPanel: 50,
    rightPanel: 50
  });
  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsMobileView(true);
        // Layout vertical stack para mobile
      } else if (window.innerWidth < 1024) {
        // Layout tablet 60/40
      } else {
        // Layout desktop 50/50
      }
    };
  }, []);
};
```

#### Componentes Responsivos
- **Paneles redimensionables**: `ResizablePanelGroup` para desktop/tablet
- **Stack vertical**: Layout mobile optimizado
- **Breakpoints dinámicos**: Adaptación automática por tamaño
- **Componentes adaptativos**: Cambio de grid/flex según dispositivo

### 5. Estado Global y Persistencia

#### Store de Autenticación
```typescript
interface UserStore {
  user: User | undefined;
  setUser: (user: User) => void;
  resetData: () => void;
}

const useAuthStore = create<UserStore>()()
  persist(
    (set) => ({
      user: undefined,
      setUser: (user: User) => set({ user }),
      resetData: () => set({ user: undefined }),
    }),
    {
      name: 'user-data',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
```

### 6. Sistema de Validación y Formularios

#### Validación con Zod + React Hook Form
```typescript
// Esquemas de validación
const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Mínimo 6 caracteres')
});

const registerSchema = z.object({
  firstName: z.string().min(2, 'Mínimo 2 caracteres'),
  lastName: z.string().min(2, 'Mínimo 2 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Mínimo 6 caracteres')
});
```

## Sistema de Rutas y Protección
### Configuración de Router
```typescript
export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<ErrorPage />}>
      {/* Rutas públicas */}
      <Route element={<AuthGuard inverted />}>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>
      </Route>

      {/* Rutas protegidas */}
      <Route element={<AuthGuard />}>
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/history" element={<HistoryPage />} />
        </Route>

        {/* Rutas de admin */}
        <Route element={<RoleGuard allowedRoles={["admin"]} />}>
          <Route path="/stats" element={<StatsPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Route>
      </Route>
    </Route>
  )
);
```

### Guards de Protección
#### AuthGuard
- Verifica estado de autenticación
- Redirecciona según estado del usuario
- Soporte para modo "inverted" (rutas públicas)

#### RoleGuard
- Validación de roles de usuario
- Control de acceso granular
- Manejo de permisos dinámicos

## Optimizaciones de Rendimiento

### TanStack Query
- **Caching inteligente**: Reducción de llamadas redundantes
- **Sincronización automática**: Updates en tiempo real
- **Estados de carga**: UX optimizada con skeletons
- **Manejo de errores**: Recovery automático

### Debouncing y Throttling
```typescript
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => clearTimeout(handler);
  }, [value, delay]);
  
  return debouncedValue;
};

// Uso en búsqueda
const foodQueryDebounced = useDebounce(search, 500);
```

### Code Splitting
- **Lazy loading**: Carga de componentes bajo demanda
- **Route-based splitting**: División por rutas
- **Bundle optimization**: Análisis de tamaño con Vite

## Tecnologías de UI Avanzadas

### ShadCN/UI + Radix UI
- **Componentes accesibles**: ARIA compliant
- **Personalización total**: CSS variables + TailwindCSS
- **Composición flexible**: Primitive-based architecture
- **TypeScript nativo**: Tipos completos incluidos

### Componentes Destacados
```typescript
// Ejemplo de componente resizable
<ResizablePanelGroup direction="horizontal">
  <ResizablePanel defaultSize={50} minSize={30}>
    <UpdateFoodForm />
  </ResizablePanel>
  <ResizableHandle withHandle />
  <ResizablePanel defaultSize={50} minSize={30}>
    <ImageFoodScrollArea />
  </ResizablePanel>
</ResizablePanelGroup>

// Ejemplo de tabla avanzada con TanStack Table
<AllFoodsTable
  data={foods}
  columns={foodColumns}
  pagination={true}
  sorting={true}
  filtering={true}
/>
```

## Scripts de Desarrollo

```bash
# Desarrollo
npm run dev          # Servidor de desarrollo con HMR
npm run preview      # Preview de build de producción

# Build y deployment
npm run build        # Build optimizada para producción
npm run lint         # Análisis de código con ESLint
```

## Configuración de Deployment

### Vercel (Configurado)
```json
// vercel.json
{
  "routes": [
    { "handle": "filesystem" },
    { "src": "/.*", "dest": "/index.html" }
  ]
}
```

### Variables de Entorno
```env
VITE_API_URL=*COMPLETA AQUÍ*
VITE_API_TIMEOUT=*COMPLETA AQUÍ*
VITE_APP_ENV=production
```

---

**Autor:** *COMPLETA AQUÍ*  
**Institución:** *COMPLETA AQUÍ*  
**Fecha:** *COMPLETA AQUÍ*  
**Versión:** 0.0.0

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
