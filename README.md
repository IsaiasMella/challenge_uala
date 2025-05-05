# Web Developer Challenge – Ualá

![uala banner](https://github.com/user-attachments/assets/d3878a88-7633-4411-a73d-7cf793f72bbc)


El proyecto es una aplicación web de cobros online donde los usuarios pueden visualizar, filtrar y analizar sus transacciones. Incluye historial, filtros por fecha, monto, tarjeta y más. Se puede agregar exportación en excel. Todo esto lo podrás ver desplegado en:
https://challenge-uala.vercel.app/

---

## 🔧 Instalación y ejecución

1. **Clona el repositorio**\
Sería mejor si lo haces con la llave SSH
   ```bash
   git clone https://github.com/IsaiasMella/challenge_uala.git
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

---

## 🗂️ Arquitectura del proyecto

Este proyecto está dividido en dos grandes partes:

1. **La lógica del negocio**  
2. **La interfaz de usuario (UI)**

### Sobre la UI

Para que sea más fácil entender y mantener el código, la UI está organizada en dos niveles: **secciones** y **componentes**.

- **Secciones**  
  Representan bloques grandes de la interfaz, partes importantes de una vista. Suelen agrupar varios componentes más pequeños y reflejan la estructura visual general de la app.

- **Componentes**  
  Son piezas más pequeñas y reutilizables de la UI, como botones, inputs, tarjetas, etc. Se usan dentro de las secciones para construir secciones.

---

Con esta idea en mente, a continuación te muestro la estructura de carpetas, donde vas a ver claramente para qué se usa cada una.

```bash
└── 📁src
    └── 📁__test__ 
    └── 📁app 
        └── favicon.ico
        └── globals.css
        └── layout.tsx
        └── page.tsx
    └── 📁common (componentes comunes que se pueden utilizar en cualquier parte de la palicación)
    └── 📁constants
    └── 📁features (lógica de negocio y utilidades)
        └── 📁actions
        └── 📁helpers  (utilidades relacionadas al modelo de negocio)
        └── 📁services
            └── 📁api
            └── 📁endpoints
        └── 📁utils  (utilidades que no estan asociadas al modelo de negocio)
    └── 📁hooks
    └── 📁providers
    └── 📁store (el contexto de la aplicación)
    └── 📁types
    └── 📁UI
        └── 📁components
            └── 📁home
        └── 📁sections
            └── 📁home
```

---

## ⚙️ Decisiones técnicas tomadas

-Para realizarla el ejercicio decidí utilizar **[Next.js](https://nextjs.org/docs/pages)** y **[TypeScript](https://www.typescriptlang.org/);** también utilicé patrones de diseño tales como:

* Stateful / Stateless
* Componentización
* Context
* Hooks
* Compound Components
* Controlled Components
* Lifting State Up

### Justificacion de librerias

| Libreria | Justificación |
|--------------|--------------|
| **[Axios](https://axios-http.com/)** | Velocidad de desarrollo y mejor legibilidad |
| **[zustand](https://zustand-demo.pmnd.rs/)** | Velocidad de desarrollo, mejor legibilidad y escalabilidad |
| **[Shadcn](https://ui.shadcn.com/)** | Velocidad de desarrollo y mejor legibilidad |
| **[moment](https://momentjs.com/)** | Velocidad de desarrollo y mejor legibilidad |

---

## 🚀 Posibles mejoras a futuro

- patron Factory para botones y notificaciones
- cerealizar los filtros en base 64
- Agregar hasky
- Agregar pagina de metricas

---
