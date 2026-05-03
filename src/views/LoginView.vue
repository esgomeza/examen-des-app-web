<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const usuario = ref('')
const password = ref('')
const router = useRouter()

const login = () => {
  if (usuario.value === 'admin' && password.value === '1234') {
    router.push('/dashboard/productos')
  }
}
</script>

<template>
  <div class="container mt-5">
    <h2>Login</h2>

    <input v-model="usuario" class="form-control mb-2" placeholder="Usuario">
    <input v-model="password" type="password" class="form-control mb-2">

    <button @click="login" class="btn btn-primary">Ingresar</button>
  </div>
</template>