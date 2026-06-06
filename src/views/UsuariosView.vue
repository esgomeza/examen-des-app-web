<script setup>
import { ref, onMounted } from 'vue'
import ApiService from '../services/ApiService'

const usuarios = ref([])
const alerta = ref({ mensaje: '', tipo: '' })

const mostrarModal = ref(false)
const mostrarModalEliminar = ref(false)
const editando = ref(false)

const form = ref({ usuario: '', contrasena: '' })
const usuarioEliminar = ref({})

const cargarUsuarios = async () => {
  try {
    const res = await ApiService.getUsuarios()
    usuarios.value = res.data
  } catch (error) {
    mostrarAlerta('Error al cargar usuarios', 'danger')
  }
}

const mostrarAlerta = (mensaje, tipo) => {
  alerta.value = { mensaje, tipo }
  setTimeout(() => {
    alerta.value = { mensaje: '', tipo: '' }
  }, 3000)
}

const abrirCrear = () => {
  editando.value = false
  form.value = { usuario: '', contrasena: '' }
  mostrarModal.value = true
}

const abrirEditar = (user) => {
  editando.value = true
  form.value = { ...user }
  mostrarModal.value = true
}

const guardar = async () => {
  try {
    if (editando.value) {
      await ApiService.editarUsuario(form.value.id, form.value)
      mostrarAlerta('Usuario actualizado correctamente', 'success')
    } else {
      await ApiService.crearUsuario(form.value)
      mostrarAlerta('Usuario creado correctamente', 'success')
    }
    mostrarModal.value = false
    cargarUsuarios()
  } catch (error) {
    mostrarAlerta('Error al guardar usuario', 'danger')
  }
}

const confirmarEliminar = (user) => {
  usuarioEliminar.value = user
  mostrarModalEliminar.value = true
}

const eliminar = async () => {
  try {
    await ApiService.eliminarUsuario(usuarioEliminar.value.id)
    mostrarAlerta('Usuario eliminado correctamente', 'warning')
    mostrarModalEliminar.value = false
    cargarUsuarios()
  } catch (error) {
    mostrarAlerta('Error al eliminar usuario', 'danger')
  }
}

onMounted(() => {
  cargarUsuarios()
})
</script>

<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h3 class="fw-bold mb-1"><i class="bi bi-people-fill me-2"></i>Usuarios</h3>
        <small class="text-muted">{{ usuarios.length }} usuarios registrados</small>
      </div>
      <button class="btn btn-danger" @click="abrirCrear">
        <i class="bi bi-plus-circle me-1"></i> Nuevo Usuario
      </button>
    </div>

    <div v-if="alerta.mensaje" :class="['alert', `alert-${alerta.tipo}`, 'mt-2']">
      {{ alerta.mensaje }}
    </div>

    <div class="table-responsive">
      <table class="table table-hover align-middle shadow-sm">
        <thead class="table-dark">
          <tr>
            <th>#</th>
            <th>Usuario</th>
            <th>Contraseña</th>
            <th class="text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(u, i) in usuarios" :key="u.id">
            <td>{{ i + 1 }}</td>
            <td class="fw-bold">{{ u.usuario }}</td>
            <td>{{ u.contrasena }}</td>
            <td class="text-center">
              <button class="btn btn-warning btn-sm me-1" @click="abrirEditar(u)">
                <i class="bi bi-pencil-fill"></i>
              </button>
              <button class="btn btn-danger btn-sm" @click="confirmarEliminar(u)">
                <i class="bi bi-trash-fill"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- MODAL CREAR / EDITAR -->
    <div v-if="mostrarModal" class="modal d-block" style="background: rgba(0,0,0,0.5);">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title">{{ editando ? 'Editar Usuario' : 'Nuevo Usuario' }}</h5>
            <button class="btn-close btn-close-white" @click="mostrarModal = false"></button>
          </div>
          <div class="modal-body">
            <input v-model="form.usuario" class="form-control mb-2" placeholder="Nombre de usuario">
            <input v-model="form.contrasena" type="password" class="form-control mb-2" placeholder="Contraseña">
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" @click="mostrarModal = false">Cancelar</button>
            <button class="btn btn-danger" @click="guardar">Guardar</button>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL ELIMINAR -->
    <div v-if="mostrarModalEliminar" class="modal d-block" style="background: rgba(0,0,0,0.5);">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title">Confirmar Eliminación</h5>
            <button class="btn-close btn-close-white" @click="mostrarModalEliminar = false"></button>
          </div>
          <div class="modal-body">
            ¿Estás seguro de eliminar al usuario <strong>{{ usuarioEliminar.usuario }}</strong>?
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" @click="mostrarModalEliminar = false">Cancelar</button>
            <button class="btn btn-danger" @click="eliminar">Eliminar</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>