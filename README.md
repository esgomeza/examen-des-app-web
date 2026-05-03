# 🛒 SportMax - Aplicación Web con Vue 3

Aplicación web desarrollada con Vue.js 3 y Bootstrap que simula una tienda deportiva con gestión de productos, autenticación básica y filtrado por categorías.

---

## 🎯 Objetivo

Desarrollar una aplicación modularizada que implemente componentes reutilizables, navegación dinámica y operaciones CRUD simuladas, aplicando buenas prácticas de desarrollo frontend.

---

## 🧠 Tecnologías utilizadas

- Vue.js 3
- Vue Router
- Bootstrap 5
- LocalStorage
- JSON (simulación de base de datos)

---

## 👥 Integrantes

- Santiago Gómez  
- (Agrega tu compañero aquí)

---

## 🧱 Estructura del proyecto
src/
│
├── components/
│ ├── NavbarComponent.vue
│ ├── SidebarComponent.vue
│ ├── FooterComponent.vue
│ └── ProductCardComponent.vue
│
├── views/
│ ├── LoginView.vue
│ ├── DashboardView.vue
│ └── ProductView.vue
│
├── router/
│ └── index.js
│
├── data/
│ ├── products.json
│ └── users.json
│
├── App.vue
└── main.js

---

## 🔐 Login (Simulado)

La aplicación cuenta con un sistema de autenticación básico usando datos locales.

**Credenciales:**
- Usuario: `admin`
- Contraseña: `1234`

⚠️ Este sistema es solo educativo y no representa seguridad real.

---

## 🧭 Navegación

Rutas principales:

- `/login` → Inicio de sesión
- `/dashboard/productos` → Vista principal con productos

El acceso al dashboard está protegido mediante validación en `localStorage`.

---

## 🛍️ Funcionalidades principales

### ✔ Gestión de productos (CRUD simulado)

- Listado de productos desde JSON
- Persistencia en LocalStorage
- Eliminación de productos
- Filtrado por categorías

---

### ✔ Filtrado por categorías

El sidebar permite filtrar productos dinámicamente:

- Todos
- Calzado
- Ropa
- Accesorios
- Equipos

Se implementa mediante eventos y propiedades reactivas.

---

### ✔ Componentes reutilizables

- Navbar (encabezado)
- Sidebar (menú lateral)
- ProductCard (tarjetas de productos)
- Footer

Comunicación mediante props y eventos.

---

### ✔ Diseño responsivo

- Uso de Bootstrap 5
- Layout tipo dashboard
- Tarjetas de productos
- Sidebar interactivo
- Hero visual principal

---

## 💾 Uso de LocalStorage

Los productos se almacenan en el navegador para simular persistencia de datos.

```js
localStorage.setItem('productos', JSON.stringify(productos))