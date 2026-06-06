¡Para que quede brutal! Aquí tienes un README con diseño de nivel "Senior", usando badges (escudos) de tecnologías, emojis, centrado y una estructura visual que impacta a cualquier profesor o reclutador. 

Solo copia y pega esto en tu archivo **`README.md`**:

```markdown
<div align="center">

# 🏆 SportMax

### *Plataforma E-Commerce & Gestión Deportiva*

[![Vue.js](https://img.shields.io/badge/Vue.js-3-42b883?style=for-the-badge&logo=vuedotjs&logoColor=white)](https://vuejs.org/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![MockAPI](https://img.shields.io/badge/MockAPI-REST-FFA500?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSJ3aGl0ZSIgZD0iTTEyIDJMNiA3djEwaDEyVjdsLTYtNXptMCAyLjQzTDE2LjUgOUgxMmwtNC0xLjU3TDcgOHY4aDEwVjlsLTUtNC41N3oiLz48L3N2Zz4=)](https://mockapi.io/)
[![Axios](https://img.shields.io/badge/Axios-HTTP-5A29E4?style=for-the-badge&logo=axios&logoColor=white)](https://axios-http.com/)

---

Repositorio del **Examen Final** de Desarrollo de Aplicaciones Web. 🚀

Desarrollado por **Erik Santiago Gómez Arias (0192614)** y **Adrian Navarro (0192603)**.

Implementa una SPA con Vue.js 3, Bootstrap 5, Axios y MockAPI, incluyendo login, rutas protegidas y gestión CRUD de usuarios y productos.

</div>

---

## ✨ Funcionalidades Principales

| Módulo | Descripción | Estado |
| :--- | :--- | :---: |
| 🔐 **Login & Auth** | Autenticación consultando MockAPI en tiempo real. Uso de `localStorage` para sesión. | ✅ |
| 🛡️ **Rutas Protegidas** | *Navigation Guards* de Vue Router. Redirección a `/login` si no hay sesión. | ✅ |
| 📦 **CRUD Productos** | Crear, Editar y Eliminar con modales de Bootstrap conectados a MockAPI. | ✅ |
| 👥 **CRUD Usuarios** | Gestión completa de usuarios con modales y alertas visuales. | ✅ |
| 🛒 **Carrito Compras** | Añadir, quitar, vaciar y calcular totales en tiempo real. | ✅ |
| 🎨 **UI/UX Premium** | Efecto *Glassmorphism*, animaciones, badges y diseño responsivo. | ✅ |
| 🔔 **Alertas & Modales** | Modales de confirmación para eliminar. Alertas de éxito/error/warning. | ✅ |

---

## 📂 Estructura del Proyecto

```text
examen-des-app-web/
├── 📂 public/                 
├── 📂 src/
│   ├── 📂 assets/             # Recursos estáticos
│   ├── 📂 components/         # Componentes reutilizables (Navbar, Sidebar)
│   ├── 📂 router/             # Configuración de rutas y guardias
│   ├── 📂 services/           # Conexión API MockAPI (ApiService.js)
│   ├── 📂 views/              # Vistas (Login, Productos, Usuarios)
│   ├── 📄 App.vue             # Componente raíz
│   └── 📄 main.js             # Punto de entrada
├── 📄 index.html
├── 📄 package.json
└── 📄 vite.config.js
```

---

## 🚀 Instalación y Ejecución

Sigue estos pasos para correr el proyecto localmente:

```bash
# 1. Clonar el repositorio
git clone https://github.com/esgomeza/examen-des-app-web.git

# 2. Entrar al directorio del proyecto
cd examen-des-app-web

# 3. Instalar las dependencias
npm install

# 4. Iniciar el servidor de desarrollo
npm run dev
```

💡 **Nota:** El proyecto se ejecutará por defecto en `http://localhost:5173`

---

## 🛠️ Arquitectura y Consumo API

La aplicación está construida bajo una arquitectura modular. El servicio `ApiService.js` centraliza todas las peticiones HTTP (GET, POST, PUT, DELETE) hacia [MockAPI](https://mockapi.io/), simulando un entorno real de desarrollo Backend-Frontend.

---

<div align="center">

### 👨‍💻 Desarrolladores

**Erik Santiago Gómez Arias** - `0192614` 🎯  
**Adrian Navarro** - `0192603` 🎯  

---

*⭐ Proyecto desarrollado con fines académicos para el curso de Desarrollo de Aplicaciones Web ⭐*

</div>
