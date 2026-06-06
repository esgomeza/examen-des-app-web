<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import ApiService from '../services/ApiService'

const user = ref('')
const pass = ref('')
const error = ref(false)

const router = useRouter()

const login = async () => {
  error.value = false
  try {
    const response = await ApiService.getUsuarios()
    const usuarios = response.data
    const usuarioEncontrado = usuarios.find(
      u => u.usuario === user.value && u.contrasena === pass.value
    )

    if (usuarioEncontrado) {
      localStorage.setItem('auth', true)
      router.push('/dashboard/productos')
    } else {
      error.value = true
    }
  } catch (err) {
    error.value = true
  }
}
</script>

<template>
  <div class="login-fondo d-flex justify-content-center align-items-center">
    <div class="capa-oscura"></div>

    <div class="tarjeta-login p-4 shadow-lg">
      <h3 class="text-center mb-4 fw-bold text-white">
        <i class="bi bi-trophy-fill text-warning me-2"></i> SportMax
      </h3>
      
      <input v-model="user" class="form-control mb-3 custom-input" placeholder="Usuario">
      <input v-model="pass" type="password" class="form-control mb-4 custom-input" placeholder="Contraseña">
      
      <button @click="login" class="btn btn-danger w-100 fw-bold py-2">
        Ingresar
      </button>
      
      <div v-if="error" class="alert alert-danger mt-3 text-center">
        Credenciales incorrectas
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-fondo {
  background: url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop') center/cover no-repeat;
  height: 100vh;
  position: relative;
}

.capa-oscura {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.7);
}

.tarjeta-login {
  position: relative;
  z-index: 1;
  width: 350px;
  background: rgba(33, 37, 41, 0.85) !important;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
}

.custom-input {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  padding: 12px;
}

.custom-input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.custom-input:focus {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  box-shadow: none;
  border: 1px solid #dc3545;
}
</style>