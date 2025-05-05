[✅] Crear UI filtros
[✅] Generar filtros, pero que solo sean aplicados una vez se apreta el boton de "Aplicar filtros"
[✅] Hacer que los filtros esten en URL para poder guardarlos al renderizar
[✅] Hacer Navbar Mobile
[✅] Hacer navBar deskyop
[✅] Hacer sidebar desktop
[] Solucionar el problema del primer render que no carga la lista (probablente se arregle en produccion)
[✅] Hacer empty state para cuando filtras y no hay nada
[] Hacer que los filtros de "Diario", "Semanal" y "Mensual" tambien afecten la lista de transactions (en la app de uala no filtra por dias, seman, mes la lista)
[✅] Agregar Eslint y prettier
[✅] Corregir proyecto, ver que cosas estan repetidas y ponerlo en condiciones de entregar
[✅] Se rompiero varias cosas, hay que arreglarlas:
    [✅] filtro de "Diario", "semanal", "mensual"
    [✅] al hacer click en "aplicar cambios" te coloca el filtro de rango de precios si o si
[✅] Generarle el docstring a todos los hooks y funciones
[✅] Repasar el estado del pryecto para saber si esta entregable
[✅] la carpeta de "helpers no se hicieron bien los test"
[] Hacer test
[] Modificar estilos para desktop
[] Hacer README

#Nice to have

[] cerealizar los filtros en base 64
[] Hacer factory de botones
[] Agregar hasky

# Web Developer Challenge – Ualá

Una aplicación web para visualizar, filtrar y exportar transacciones, implementada con Next.js 15 y TypeScript.

---

## 🔧 Instalación y ejecución

1. **Clona el repositorio**

   ```bash
   git clone <tu-repositorio>.git
   cd <tu-repositorio>
   ```

2. **Instala dependencias**

   - Con pnpm (recomendado):

     ```bash
     pnpm install
     ```

   - Con npm (opción alternativa):

     ```bash
     npm install
     ```

3. **Levanta el servidor en modo desarrollo**

   - Con pnpm:

     ```bash
     pnpm dev
     ```

   - Con npm:

     ```bash
     npm run dev
     ```

4. **Construcción para producción**

   ```bash
   pnpm build   # o npm run build
   pnpm start   # o npm start
   ```

---

## 🗂️ Arquitectura de carpetas

```bash
└── 📁src
    └── 📁app
        └── 📁api
            └── 📁transactions
                └── 📁filter
                    └── route.ts
        └── favicon.ico
        └── globals.css
        └── layout.tsx
        └── page.tsx
    └── 📁common
        └── avatar.tsx
        └── button.tsx
        └── calendar.tsx
        └── input.tsx
        └── 📁NavBar
            └── DesktopNavBar.tsx
            └── MobileNavBar.tsx
            └── NavItem.tsx
            └── RoutesSideBar.tsx
        └── popover.tsx
        └── sheet.tsx
        └── skeleton.tsx
        └── slider.tsx
        └── switch.tsx
        └── Toaster.tsx
        └── toggle.tsx
    └── 📁constants
        └── 📁home
            └── 📁filters-sidebar
                └── filters.ts
            └── home.ts
    └── 📁features
        └── 📁actions
            └── 📁filterTransactions
                └── filterByAmountRange.ts
                └── filterByCards.ts
                └── filterByDateRange.ts
                └── filterByInstallments.ts
                └── filterByPaymentMethods.ts
                └── index.ts
        └── 📁helpers
            └── disabledCalendarDays.ts
            └── filterTransactionsByParams.ts
            └── getDateRange.ts
            └── getPaymentMethod.ts
            └── sumTotalAmount.ts
        └── 📁services
            └── 📁api
                └── api.ts
            └── 📁endpoints
                └── transactions.ts
        └── 📁utils
            └── formatAmount.ts
            └── 📁style
                └── cn.ts
    └── 📁hooks
        └── useDateFilter.ts
        └── useFilteredTransactions.ts
        └── useFilterSelection.ts
    └── 📁lib
    └── 📁providers
        └── Providers.tsx
        └── QueryProvider.tsx
    └── 📁store
        └── rangeStore.ts
        └── transactionStore.ts
    └── 📁types
        └── 📁sections
            └── 📁home
                └── filterSidebar.ts
        └── transactions.ts
    └── 📁UI
        └── 📁components
            └── 📁home
                └── DateRangePicker.tsx
                └── 📁filter-sidebar
                    └── AmountFilter.tsx
                    └── CardFilter.tsx
                    └── DateFilter.tsx
                    └── InstallmentsFilter.tsx
                    └── PaymentMethodFilter.tsx
                └── FilterSidebar.tsx
                └── 📁skeletons
                    └── collection.tsx
                └── temporality-collections.tsx
        └── 📁sections
            └── 📁home
                └── collections.tsx
                └── transaction-history.tsx
```

---

## ⚙️ Decisiones técnicas tomadas

- Uso de Next.js 15
- Gestión de estado con Zustand
- Patrón Draft + Commit para filtros
- Organización modular de componentes (carpeta `common`, `UI`, `features`, etc.)
- Rutas API en `app/api/transactions/filter/route.ts`
- Tipado estricto con TypeScript
- Configuración de ESLint y Prettier
- Compatibilidad pnpm / npm
- Integración de React Query (`QueryProvider`)
- Uso de shadcn/ui y componentes personalizados

_(Descripción de cada punto por completar…)_

---

## 🚀 Posibles mejoras a futuro

- Implementar autenticación y gestión de usuarios
- Caché y revalidación de datos avanzada
- Tests end-to-end con Cypress o Playwright
- Documentación de componentes con Storybook
- Internacionalización (i18n)
- Mejora de accesibilidad (a11y)
- Optimización de rendimiento (lazy loading y code splitting)

_(Detalles y prioridades por completar…)_

---
