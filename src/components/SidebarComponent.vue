<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router' // <-- Importamos el router

const emit = defineEmits(['filtrar'])
const activa = ref('todos')
const router = useRouter() // <-- Usamos el router

const seleccionar = (categoria) => {
  activa.value = categoria
  emit('filtrar', categoria)
  
  // 🚀 SOLUCIÓN: Si no estamos en la ruta de productos, nos envía ahí
  if (router.currentRoute.value.fullPath !== '/dashboard/productos') {
    router.push('/dashboard/productos')
  }
}
</script>

<template>
  <div class="sidebar-moderno p-4">

    <h6 class="text-uppercase text-secondary fw-bold mb-4" style="font-size: 0.8rem; letter-spacing: 2px;">
      Categorías
    </h6>

    <ul class="nav flex-column gap-2">
      <li class="nav-item">
        <button
          class="nav-link btn-categoria"
          :class="activa === 'todos' ? 'activa' : ''"
          @click="seleccionar('todos')"
        >
          🏠 Todos
        </button>
      </li>
      <li class="nav-item">
        <button
          class="nav-link btn-categoria"
          :class="activa === 'calzado' ? 'activa' : ''"
          @click="seleccionar('calzado')"
        >
          👟 Calzado
        </button>
      </li>
      <li class="nav-item">
        <button
          class="nav-link btn-categoria"
          :class="activa === 'ropa' ? 'activa' : ''"
          @click="seleccionar('ropa')"
        >
          👕 Ropa
        </button>
      </li>
      <li class="nav-item">
        <button
          class="nav-link btn-categoria"
          :class="activa === 'accesorios' ? 'activa' : ''"
          @click="seleccionar('accesorios')"
        >
          🎒 Accesorios
        </button>
      </li>
      <li class="nav-item">
        <button
          class="nav-link btn-categoria"
          :class="activa === 'equipos' ? 'activa' : ''"
          @click="seleccionar('equipos')"
        >
          🏋️ Equipos
        </button>
      </li>
    </ul>

    <hr class="border-secondary my-4">

    <h6 class="text-uppercase text-secondary fw-bold mb-3" style="font-size: 0.8rem; letter-spacing: 2px;">
      Panel
    </h6>

    <router-link to="/dashboard/productos" class="nav-link text-secondary mb-2">
      👟 Productos
    </router-link>
    <router-link to="/dashboard/usuarios" class="nav-link text-secondary">
      👥 Usuarios
    </router-link>

  </div>
</template>

<style scoped>
.sidebar-moderno {
  width: 240px;
  min-height: 100vh;
  background-color: #f8f9fa;
  border-right: 1px solid #e9ecef;
}

.btn-categoria {
  color: #495057;
  text-align: left;
  padding: 10px 15px;
  border-radius: 10px;
  transition: all 0.2s ease;
  font-weight: 500;
  border: none;
  width: 100%;
}

.btn-categoria:hover {
  background-color: #e9ecef;
  color: #dc3545;
}

.btn-categoria.activa {
  background-color: #dc3545;
  color: white;
  box-shadow: 0 4px 6px rgba(220, 53, 69, 0.2);
}
</style>