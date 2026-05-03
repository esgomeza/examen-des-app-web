<script setup>
import { ref } from 'vue'

const emit = defineEmits(['filtrar'])

const activa = ref('todos')

const seleccionar = (categoria) => {
  activa.value = categoria
  emit('filtrar', categoria)
}
</script>

<template>
  <div class="bg-dark text-white p-3" style="width:220px; min-height:100vh;">

    <h6 class="text-uppercase text-secondary">Categorías</h6>

    <ul class="nav flex-column mt-3">

      <li class="nav-item">
        <button
          class="nav-link btn text-start"
          :class="activa === 'todos' ? 'bg-danger text-white' : 'text-white'"
          @click="seleccionar('todos')"
        >
          🏠 Todos
        </button>
      </li>

      <li class="nav-item">
        <button
          class="nav-link btn text-start"
          :class="activa === 'calzado' ? 'bg-danger text-white' : 'text-white'"
          @click="seleccionar('calzado')"
        >
          👟 Calzado
        </button>
      </li>

      <li class="nav-item">
        <button
          class="nav-link btn text-start"
          :class="activa === 'ropa' ? 'bg-danger text-white' : 'text-white'"
          @click="seleccionar('ropa')"
        >
          👕 Ropa
        </button>
      </li>

      <li class="nav-item">
        <button
          class="nav-link btn text-start"
          :class="activa === 'accesorios' ? 'bg-danger text-white' : 'text-white'"
          @click="seleccionar('accesorios')"
        >
          🎒 Accesorios
        </button>
      </li>

      <li class="nav-item">
        <button
          class="nav-link btn text-start"
          :class="activa === 'equipos' ? 'bg-danger text-white' : 'text-white'"
          @click="seleccionar('equipos')"
        >
          🏋️ Equipos
        </button>
      </li>

    </ul>

    <hr class="text-secondary">

    <h6 class="text-uppercase text-secondary">Mi cuenta</h6>

    <router-link to="/login" class="nav-link text-white">
      🔐 Iniciar sesión
    </router-link>

  </div>
</template>
<style scoped>
button.nav-link {
  transition: all 0.2s ease;
}

button.nav-link:hover {
  background-color: #dc3545;
  color: white;
}
</style>