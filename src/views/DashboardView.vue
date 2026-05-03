<script setup>
import { ref, provide } from 'vue'
import NavbarComponent from '../components/NavbarComponent.vue'
import SidebarComponent from '../components/SidebarComponent.vue'

const categoria = ref('todos')

// 👉 compartir con ProductView
provide('categoria', categoria)
</script>

<template>
  <NavbarComponent />

  <div class="d-flex">
    <!--  AQUÍ SE ESCUCHA EL EVENTO -->
    <SidebarComponent @filtrar="categoria = $event" />

    <div class="w-100 bg-light p-4">
      <router-view />
    </div>
  </div>
</template>