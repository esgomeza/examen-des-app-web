<script setup>
import { ref } from 'vue'
import users from '../data/users.json'
import { useRouter } from 'vue-router'

const usuario = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

const login = () => {
  const user = users.find(
    u => u.usuario === usuario.value && u.password === password.value
  )

  if (user) {
    router.push('/dashboard/productos')
  } else {
    error.value = 'Credenciales incorrectas'
  }
}
</script>

<template>
  <div class="container mt-5">
    <h2>Login</h2>

    <div v-if="error" class="alert alert-danger">{{ error }}</div>

    <input v-model="usuario" class="form-control mb-2" placeholder="Usuario">
    <input v-model="password" type="password" class="form-control mb-2">

    <button @click="login" class="btn btn-primary">Ingresar</button>
  </div>
</template>