<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import usersData from '../data/users.json'

const user = ref('')
const pass = ref('')
const error = ref(false)

const router = useRouter()

const login = () => {

  const usuarioEncontrado = usersData.find(
    u =>
      u.usuario === user.value &&
      u.password === pass.value
  )

  if (usuarioEncontrado) {

    localStorage.setItem('auth', true)

    router.push('/dashboard/productos')

  } else {

    error.value = true

  }

}
</script>

<template>
  <div class="d-flex justify-content-center align-items-center vh-100 bg-dark text-white">

    <div class="card p-4" style="width:300px">
      <h4 class="text-center mb-3">Login</h4>

      <input v-model="user" class="form-control mb-2" placeholder="Usuario">
      <input v-model="pass" type="password" class="form-control mb-2" placeholder="Contraseña">

      <button @click="login" class="btn btn-danger w-100">Ingresar</button>

      <div v-if="error" class="alert alert-danger mt-2">
        Credenciales incorrectas
      </div>
    </div>

  </div>
</template>