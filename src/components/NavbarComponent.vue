<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const logout = () => {
  localStorage.removeItem('auth')
  router.push('/login')
}
</script>

<template>
  <nav class="navbar navbar-dark bg-black px-3">
    <span class="navbar-brand fw-bold text-danger">
      SPORT<span class="text-white">MAX</span>
    </span>

    <button @click="logout" class="btn btn-outline-light btn-sm">
      Cerrar sesión
    </button>
  </nav>
</template>