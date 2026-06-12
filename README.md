# 🏆 SportMax

### Plataforma E-Commerce & Gestión Deportiva

<div align="center">

![Vue.js](https://img.shields.io/badge/Vue.js-3-42b883?style=for-the-badge\&logo=vuedotjs\&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5-7952B3?style=for-the-badge\&logo=bootstrap\&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge\&logo=vite\&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-HTTP-5A29E4?style=for-the-badge\&logo=axios\&logoColor=white)
![MockAPI](https://img.shields.io/badge/MockAPI-REST-orange?style=for-the-badge)

</div>

---

## 📖 Descripción

Repositorio correspondiente al **Examen Final de Desarrollo de Aplicaciones Web**.

La aplicación implementa una **Single Page Application (SPA)** desarrollada con **Vue.js 3**, utilizando **Bootstrap 5**, **Axios** y **MockAPI** para la gestión de usuarios, productos y autenticación.

### 👨‍💻 Integrantes

| Nombre                    | Código  |
| ------------------------- | ------- |
| Erik Santiago Gómez Arias | 0192614 |
| Adrian Navarro            | 0192603 |

---

## ✨ Características

### 🔐 Autenticación

* Inicio de sesión mediante MockAPI.
* Validación de credenciales.
* Persistencia de sesión con LocalStorage.

### 🛡️ Rutas Protegidas

* Uso de Vue Router.
* Navigation Guards.
* Redirección automática a Login.

### 📦 Gestión de Productos

* Crear productos.
* Editar productos.
* Eliminar productos.
* Consultar listado completo.

### 👥 Gestión de Usuarios

* Crear usuarios.
* Editar usuarios.
* Eliminar usuarios.
* Visualización de registros.

### 🛒 Carrito de Compras

* Agregar productos.
* Eliminar productos.
* Vaciar carrito.
* Cálculo automático del total.

### 🎨 Interfaz Moderna

* Diseño responsivo.
* Bootstrap 5.
* Modales interactivos.
* Alertas visuales.
* Componentes reutilizables.

---

## 🏗️ Estructura del Proyecto

```text
examen-des-app-web/
│
├── public/
│
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Navbar.vue
│   │   └── Sidebar.vue
│   │
│   ├── router/
│   │   └── index.js
│   │
│   ├── services/
│   │   └── ApiService.js
│   │
│   ├── views/
│   │   ├── Login.vue
│   │   ├── Productos.vue
│   │   ├── Usuarios.vue
│   │   └── Carrito.vue
│   │
│   ├── App.vue
│   └── main.js
│
├── package.json
├── vite.config.js
└── README.md
```

---

## 🚀 Instalación

### 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/esgomeza/examen-des-app-web.git
```

### 2️⃣ Ingresar al proyecto

```bash
cd examen-des-app-web
```

### 3️⃣ Instalar dependencias

```bash
npm install
```

### 4️⃣ Ejecutar en modo desarrollo

```bash
npm run dev
```

---

## 🌐 Tecnologías Utilizadas

| Tecnología  | Uso                   |
| ----------- | --------------------- |
| Vue.js 3    | Frontend              |
| Vue Router  | Navegación            |
| Bootstrap 5 | Diseño UI             |
| Axios       | Consumo de API        |
| MockAPI     | Simulación Backend    |
| Vite        | Entorno de Desarrollo |

---

## 🔄 API REST

La aplicación consume servicios REST proporcionados por MockAPI mediante Axios.

Operaciones implementadas:

* GET
* POST
* PUT
* DELETE

Toda la lógica de consumo se encuentra centralizada en:

```bash
src/services/ApiService.js
```

---

## 📸 Evidencias

Agregar aquí capturas de pantalla de:

* Login
* Dashboard
* Gestión de Usuarios
* Gestión de Productos
* Carrito de Compras

---

## 📚 Información Académica

**Asignatura:** Desarrollo de Aplicaciones Web

**Universidad:** Universidad Francisco de Paula Santander Ocaña

**Semestre:** 2026

---

<div align="center">

### ⭐ Proyecto Académico ⭐

Desarrollado como trabajo final para la asignatura de Desarrollo de Aplicaciones Web.

</div>
