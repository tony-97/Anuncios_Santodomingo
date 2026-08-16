# 📌 Anuncios Santo Domingo — Clasificados Comunales de Huánuco

[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Prisma ORM](https://img.shields.io/badge/Prisma-7.9-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![MariaDB / MySQL](https://img.shields.io/badge/MariaDB%20/%20MySQL-003545?style=for-the-badge&logo=mariadb&logoColor=white)](https://mariadb.org/)
[![JWT](https://img.shields.io/badge/JWT-Secure_Auth-black?style=for-the-badge&logo=json-web-tokens&logoColor=white)](https://jwt.io/)

> **Plataforma web comunitaria de avisos clasificados locales** diseñada para modernizar, digitalizar y centralizar las ofertas de empleo y alquileres en el distrito de Santo Domingo de Nauyán y la provincia de Huánuco, Perú.

---

## 📖 Tabla de Contenidos

- [Descripción del Proyecto](#-descripción-del-proyecto)
- [Problema que Resuelve](#-problema-que-resuelve)
- [Características Principales](#-características-principales)
- [Stack Tecnológico](#-stack-tecnológico)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Modelo de Base de Datos](#-modelo-de-base-de-datos)
- [Endpoints de la API](#-endpoints-de-la-api)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación y Configuración](#-instalación-y-configuración)
- [Scripts Disponibles](#-scripts-disponibles)
- [Variables de Entorno](#-variables-de-entorno)
- [Licencia](#-licencia)

---

## 🌟 Descripción del Proyecto

**Anuncios Santo Domingo** es una solución digital interactiva que emula la experiencia visual y cercana de los murales o pizarras comunitarias tradicionales (volantes impresos, avisos en postes y tiendas locales), transformándola en un tablón virtual accesible, limpio y en tiempo real.

Permite a los residentes, pequeños comerciantes, propietarios y trabajadores independientes publicar y buscar oportunidades de **Empleo** y **Alquileres** de forma ágil, segura y gratuita.

---

## 🎯 Problema que Resuelve

| Problema Tradicional | Solución con Anuncios Santo Domingo |
| :--- | :--- |
| **Contaminación visual** por afiches y papeles pegados en postes y muros públicos. | **Digitalización completa** en un muro interactivo limpio y accesible 24/7. |
| **Avisos obsoletos** que permanecen pegados aunque la vacante o alquiler ya no esté disponible. | **Caducidad automática a los 15 días** y retiro instantáneo mediante código **PIN**. |
| **Dificultad de búsqueda** y falta de categorización geográfica o temática. | **Filtros dinámicos en tiempo real** por categoría (`EMPLEO`, `ALQUILER`), distrito y palabras clave. |
| **Contacto indirecto o engorroso** con intermediarios. | **Integración directa a WhatsApp** con mensaje predeterminado y marcación telefónica inmediata (`tel:`). |

---

## 🚀 Características Principales

### 1. 📋 Muro Interactivo Estilo Pizarra Digital
- Avisos con diseño tipo *flyer* / volante comunitario con colores personalizables (**Celeste**, **Amarillo**, **Verde**, **Rosado**).
- Animaciones fluidas, chinchetas decorativas y tipografía optimizada.

### 2. ⚡ Publicación Rápida & Retiro con PIN
- Formulario modal optimizado para registrar avisos en pocos pasos.
- Protección con **PIN de seguridad de 4 dígitos** (encriptado con Bcrypt) para que cualquier anunciante pueda retirar o despublicar su aviso en cualquier momento.

### 3. 🔍 Búsqueda y Filtrado en Tiempo Real
- Búsqueda instantánea por palabras clave (título, descripción, teléfono).
- Selector de categorías tabulado: **Todos**, **Empleos** (`EMPLEO`), **Alquileres** (`ALQUILER`).
- Selector de distritos locales (Santo Domingo, Huánuco, Amarilis, Pillco Marca, Santa María del Valle, etc.).

### 4. 💬 Contacto Directo 1-Click
- Botón directo de **WhatsApp** con plantilla de texto autogenerada: *"Hola, vi tu aviso '...' en Anuncios Santo Domingo"*.
- Botón de **Llamada Telefónica** directa para dispositivos móviles (`tel:XXXXXX`).

### 5. 🔐 Autenticación de Usuarios & Verificación OTP
- Registro e inicio de sesión con validación de teléfono móvil peruano (9 dígitos).
- Simulación de código **OTP (One-Time Password)** para verificación de cuenta.
- Autenticación segura mediante **JWT (JSON Web Tokens)** almacenados en cookies/localStorage.
- Panel **"Mis Anuncios"** para que los usuarios registrados gestionen todos sus avisos activos en un solo lugar.

### 6. ⏱️ Ciclo de Vida y Expiración Automática
- Configuración de vigencia de 15 días naturales por publicación.
- Endpoint CRON automatizado (`/api/cron/expire-ads`) para dar de baja anuncios vencidos periódicamente.

---

## 🛠️ Stack Tecnológico

| Capa | Tecnología | Descripción |
| :--- | :--- | :--- |
| **Frontend** | [Next.js 16 (App Router)](https://nextjs.org/) | Framework React moderno con Server & Client Components |
| **UI Library** | [React 19](https://react.dev/) | Librería de interfaces de usuario |
| **Estilos** | [Tailwind CSS v4](https://tailwindcss.com/) | Motor de utilidades CSS de alto rendimiento |
| **Lenguaje** | [TypeScript](https://www.typescriptlang.org/) | Tipado estático y robustez de código |
| **ORM** | [Prisma ORM 7](https://www.prisma.io/) | Modelado y cliente de base de datos tipo-seguro |
| **Base de Datos** | [MariaDB / MySQL](https://mariadb.org/) | Sistema de gestión de bases de datos relacional |
| **Seguridad** | [Bcryptjs](https://www.npmjs.com/package/bcryptjs) + [JWT](https://jwt.io/) | Hashing seguro de contraseñas/PINs y tokens de sesión |
| **Iconografía** | [FontAwesome](https://fontawesome.com/) | Iconografía vectorial para acciones e interfaces |

---

## 📂 Estructura del Proyecto

```text
Anuncios_SantoDomingo/
├── app/
│   ├── api/
│   │   ├── anuncios/
│   │   │   ├── [id]/
│   │   │   │   └── route.ts          # GET (detalle), DELETE (retiro con PIN/Auth)
│   │   │   ├── mis-anuncios/
│   │   │   │   └── route.ts          # GET anuncios del usuario autenticado
│   │   │   └── route.ts              # GET (listado/filtros), POST (crear aviso)
│   │   ├── auth/
│   │   │   ├── login/route.ts        # POST inicio de sesión (JWT)
│   │   │   ├── me/route.ts           # GET perfil actual desde token
│   │   │   ├── register/route.ts     # POST registro de usuario
│   │   │   └── verify-otp/route.ts   # POST verificación de código OTP
│   │   └── cron/
│   │       └── expire-ads/route.ts   # POST/GET desactivación de avisos caducados
│   ├── avisos/page.tsx               # Muro interactivo completo con filtros
│   ├── contacto/page.tsx             # Formulario y canales de contacto vecinal
│   ├── nosotros/page.tsx             # Misión, visión e historia del proyecto
│   ├── servicios/page.tsx            # Portafolio de servicios comunitarios
│   ├── globals.css                   # Configuración y estilos base Tailwind v4
│   ├── layout.tsx                    # Layout raíz (Navbar, Footer, Context Provider)
│   └── page.tsx                      # Página principal (Hero, resumen y estadísticas)
├── components/
│   ├── FlyerCard.tsx                 # Tarjeta de aviso estilo volante / post-it
│   ├── Footer.tsx                    # Pie de página institucional y enlaces
│   ├── Modals.tsx                    # Modales (Publicar, Retirar PIN, Auth, OTP, Mis Anuncios)
│   ├── Navbar.tsx                    # Barra de navegación interactiva y responsive
│   └── Toast.tsx                     # Notificaciones emergentes (éxito, alerta, error)
├── context/
│   └── AdsContext.tsx                # Estado global (anuncios, auth, filtros, modales, toasts)
├── lib/
│   ├── auth.ts                       # Helpers de autenticación, JWT y cookies
│   └── prisma.ts                     # Instancia y adaptador singleton de Prisma Client
├── prisma/
│   ├── migrations/                   # Historial de migraciones SQL
│   ├── schema.prisma                 # Definición de modelos, enums e índices
│   └── seed.ts                       # Datos iniciales de prueba (usuarios y avisos)
├── public/                           # Recursos gráficos estáticos
├── .env                              # Variables de entorno locales
├── package.json                      # Dependencias y scripts del proyecto
├── tsconfig.json                     # Configuración de TypeScript
└── README.md                         # Documentación del proyecto
```

---

## 🗄️ Modelo de Base de Datos

El esquema relacional definido en `prisma/schema.prisma` consta de 3 entidades principales:

```mermaid
erDiagram
    User ||--o{ Anuncio : "publica"
    User {
        int id PK
        string nombre
        string telefono UK
        string password
        boolean verificado
        datetime creadoEn
        datetime actualizadoEn
    }
    Anuncio {
        int id PK
        enum categoria "EMPLEO | ALQUILER"
        string distrito
        string titulo
        string descripcion
        string telefono
        enum color "CELESTE | AMARILLO | VERDE | ROSADO"
        string pin
        boolean activo
        datetime expiraEn
        datetime creadoEn
        datetime actualizadoEn
        int userId FK
    }
    OtpCode {
        int id PK
        string telefono
        string codigo
        datetime expiraEn
        boolean usado
        datetime creadoEn
    }
```

---

## 🔌 Endpoints de la API

### Anuncios (`/api/anuncios`)
- `GET /api/anuncios` — Lista anuncios activos con filtros opcionales (`?categoria=...&distrito=...&q=...`).
- `POST /api/anuncios` — Crea un nuevo anuncio clasificado con PIN de 4 dígitos.
- `GET /api/anuncios/:id` — Obtiene el detalle de un aviso específico.
- `DELETE /api/anuncios/:id` — Desactiva/elimina un aviso validando el PIN o la sesión del propietario.
- `GET /api/anuncios/mis-anuncios` — Retorna los avisos creados por el usuario con sesión activa.

### Autenticación (`/api/auth`)
- `POST /api/auth/register` — Registra un nuevo usuario y emite un código OTP.
- `POST /api/auth/verify-otp` — Valida el código OTP y activa la cuenta.
- `POST /api/auth/login` — Autentica con teléfono y contraseña; retorna token JWT.
- `GET /api/auth/me` — Valida el token actual y retorna los datos del usuario autenticado.

### Tareas Programadas (`/api/cron`)
- `GET/POST /api/cron/expire-ads` — Marca como inactivos los anuncios con fecha `expiraEn < NOW()`.

---

## 📋 Requisitos Previos

Asegúrate de contar con los siguientes elementos instalados en tu entorno de desarrollo:

- **Node.js**: Versión `18.18.0` o superior (recomendado `20.x` LTS).
- **npm**, **yarn**, **pnpm** o **bun**.
- **MariaDB** o **MySQL Server** (local mediante XAMPP, Laragon, Docker o servicio en la nube).

---

## ⚙️ Instalación y Configuración

### 1. Clonar el repositorio
```bash
git clone https://github.com/tony-97/Anuncios_Santodomingo.git
cd Anuncios_SantoDomingo
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
Crea un archivo `.env` en la raíz del proyecto con la siguiente estructura:

```env
DATABASE_URL="mysql://usuario:password@localhost:3306/anuncios_santodomingo"
JWT_SECRET="tu_clave_secreta_jwt_super_segura"
```

### 4. Ejecutar migraciones de Prisma
Genera las tablas en la base de datos:
```bash
npm run prisma:migrate
```

### 5. Poblar la base de datos (Seed data opcional)
Inserta datos iniciales de prueba (usuarios de demostración y avisos clasificados):
```bash
npm run prisma:seed
```

### 6. Iniciar el servidor de desarrollo
```bash
npm run dev
```

Abre tu navegador en [http://localhost:3000](http://localhost:3000) para ver la aplicación en ejecución.

---

## 📜 Scripts Disponibles

En el archivo `package.json` dispones de los siguientes comandos:

| Comando | Descripción |
| :--- | :--- |
| `npm run dev` | Inicia el servidor de desarrollo en modo escucha con Hot Reload (`localhost:3000`). |
| `npm run build` | Compila la aplicación optimizada para entorno de producción. |
| `npm run start` | Arranca el servidor de producción compilado. |
| `npm run lint` | Ejecuta el linter ESLint para validar buenas prácticas de código. |
| `npm run prisma:generate` | Regenera el cliente tipado de Prisma Client (`@prisma/client`). |
| `npm run prisma:migrate` | Ejecuta las migraciones de base de datos en modo desarrollo. |
| `npm run prisma:seed` | Ejecuta el script de siembra con datos de prueba (`prisma/seed.ts`). |
| `npm run prisma:studio` | Abre la interfaz visual de Prisma Studio en el navegador para explorar la BD. |

---

## 🔐 Variables de Entorno

| Variable | Descripción | Ejemplo |
| :--- | :--- | :--- |
| `DATABASE_URL` | Cadena de conexión JDBC/MySQL hacia la base de datos MariaDB/MySQL. | `mysql://root:1234@localhost:3306/anuncios_santodomingo` |
| `JWT_SECRET` | Clave secreta para la firma y verificación de tokens de sesión JWT. | `anuncios-santo-domingo-secret-key-2024` |

---

## 👥 Equipo y Créditos

Proyecto desarrollado como parte de la iniciativa de digitalización y modernización comunitaria para el distrito de **Santo Domingo de Nauyán** (Huánuco, Perú).

- **Institución**: Universidad Nacional Hermilio Valdizán (UNHEVAL) / Proyecto Comunitario Huánuco.
- **Desarrollador Principal**: Tony ([@tony-97](https://github.com/tony-97))

---

## 📄 Licencia

Este proyecto se distribuye bajo la licencia **MIT**. Consulta el archivo `LICENSE` para más información.
