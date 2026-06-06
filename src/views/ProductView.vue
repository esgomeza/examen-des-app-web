<script setup>
import { ref, onMounted, computed, inject } from 'vue'
import ApiService from '../services/ApiService'

const categoria = inject('categoria', ref('todos'))

// =========================
// ALERTAS
// =========================
const alerta = ref({ mensaje: '', tipo: '' })

function mostrarAlerta(mensaje, tipo) {
  alerta.value = { mensaje, tipo }
  setTimeout(() => {
    alerta.value = { mensaje: '', tipo: '' }
  }, 3000)
}

// =========================
// PRODUCTOS (MockAPI)
// =========================
const productos = ref([])

const cargarProductos = async () => {
  try {
    const res = await ApiService.getProductos()
    productos.value = res.data
  } catch (error) {
    mostrarAlerta('Error al cargar productos desde la API', 'danger')
  }
}

onMounted(() => {
  cargarProductos()
})

const productosFiltrados = computed(() => {
  if (categoria.value === 'todos') {
    return productos.value
  }
  return productos.value.filter(
    p => p.categoria?.toLowerCase() === categoria.value
  )
})

function formatPrecio(precio) {
  return Number(precio).toLocaleString('es-CO')
}

// =========================
// CARRITO
// =========================
const carritoAbierto = ref(false)
const carrito = ref([])

const totalItems = computed(() =>
  carrito.value.reduce((acc, item) => acc + item.cantidad, 0)
)

const totalPrecio = computed(() =>
  carrito.value.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  )
)

function agregarAlCarrito(producto) {
  const existente = carrito.value.find(item => item.id === producto.id)
  if (existente) {
    existente.cantidad++
  } else {
    carrito.value.push({ ...producto, cantidad: 1 })
  }
  carritoAbierto.value = true
}

function quitarUno(id) {
  const item = carrito.value.find(i => i.id === id)
  if (!item) return
  if (item.cantidad > 1) {
    item.cantidad--
  } else {
    carrito.value = carrito.value.filter(i => i.id !== id)
  }
}

function eliminarDelCarrito(id) {
  carrito.value = carrito.value.filter(i => i.id !== id)
}

function vaciarCarrito() {
  carrito.value = []
}

function finalizarCompra() {
  alert(`Compra finalizada\nTotal: $${formatPrecio(totalPrecio.value)}`)
  carrito.value = []
  carritoAbierto.value = false
}

// =========================
// CRUD
// =========================
const mostrarModal = ref(false)
const mostrarModalEliminar = ref(false)
const editando = ref(false)
const errores = ref({})
const productoEliminar = ref({})

const formVacio = () => ({
  id: null,
  nombre: '',
  precio: '',
  categoria: '',
  descripcion: '',
  imagen: ''
})

const form = ref(formVacio())

function validar() {
  errores.value = {}
  if (!form.value.nombre.trim()) errores.value.nombre = 'Nombre requerido'
  if (!form.value.precio || form.value.precio <= 0) errores.value.precio = 'Precio inválido'
  if (!form.value.categoria) errores.value.categoria = 'Seleccione categoría'
  return Object.keys(errores.value).length === 0
}

function abrirCrear() {
  editando.value = false
  form.value = formVacio()
  errores.value = {}
  mostrarModal.value = true
}

function abrirEditar(producto) {
  editando.value = true
  form.value = { ...producto }
  errores.value = {}
  mostrarModal.value = true
}

async function guardar() {
  if (!validar()) return

  try {
    if (editando.value) {
      await ApiService.editarProducto(form.value.id, form.value)
      mostrarAlerta('Producto actualizado correctamente', 'success')
    } else {
      await ApiService.crearProducto(form.value)
      mostrarAlerta('Producto creado correctamente', 'success')
    }
    mostrarModal.value = false
    cargarProductos()
  } catch (error) {
    mostrarAlerta('Error al guardar el producto', 'danger')
  }
}

function confirmarEliminar(producto) {
  productoEliminar.value = producto
  mostrarModalEliminar.value = true
}

async function eliminar() {
  try {
    await ApiService.eliminarProducto(productoEliminar.value.id)
    mostrarAlerta('Producto eliminado correctamente', 'warning')
    mostrarModalEliminar.value = false
    cargarProductos()
  } catch (error) {
    mostrarAlerta('Error al eliminar el producto', 'danger')
  }
}
</script>

<template>
  <div>

    <!-- ALERTAS -->
    <div v-if="alerta.mensaje" :class="['alert', `alert-${alerta.tipo}`, 'mt-2']">
      {{ alerta.mensaje }}
    </div>

    <!-- ENCABEZADO -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h3 class="fw-bold mb-1">Productos</h3>
        <small class="text-muted">{{ productosFiltrados.length }} productos disponibles</small>
      </div>
      <div class="d-flex gap-2">
        <button class="btn btn-outline-danger position-relative" @click="carritoAbierto = !carritoAbierto">
          <i class="bi bi-cart3 me-1"></i> Carrito
          <span v-if="totalItems > 0" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {{ totalItems }}
          </span>
        </button>
        <button class="btn btn-danger" @click="abrirCrear">
          <i class="bi bi-plus-lg me-1"></i> Nuevo producto
        </button>
      </div>
    </div>

    <!-- CARDS -->
    <div class="row g-4">
      <div class="col-sm-6 col-md-4 col-lg-3" v-for="p in productosFiltrados" :key="p.id">
        <div class="card producto-card h-100 border-0 shadow-sm">
          <div class="producto-img-container">
            <img :src="p.imagen" :alt="p.nombre" class="producto-img">
          </div>
          <div class="card-body d-flex flex-column">
            <span class="badge-categoria align-self-start mb-2">{{ p.categoria }}</span>
            <h5 class="fw-bold">{{ p.nombre }}</h5>
            <p class="text-muted small flex-grow-1">{{ p.descripcion }}</p>
            <div class="mt-auto">
              <h4 class="text-danger fw-bold mb-3">${{ formatPrecio(p.precio) }}</h4>
              <button class="btn btn-danger w-100" @click="agregarAlCarrito(p)">
                <i class="bi bi-cart-plus me-1"></i> Añadir al carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- TABLA CRUD -->
    <div class="table-responsive mt-5">
      <table class="table table-hover align-middle shadow-sm">
        <thead class="table-dark">
          <tr>
            <th>#</th>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th class="text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(p, i) in productosFiltrados" :key="p.id">
            <td>{{ i + 1 }}</td>
            <td><img :src="p.imagen" width="60" height="60" style="object-fit: contain;"></td>
            <td class="fw-bold">{{ p.nombre }}</td>
            <td><span class="badge-categoria">{{ p.categoria }}</span></td>
            <td class="text-danger fw-bold">${{ formatPrecio(p.precio) }}</td>
            <td class="text-center">
              <button class="btn btn-warning btn-sm me-1" @click="abrirEditar(p)">
                <i class="bi bi-pencil-fill"></i>
              </button>
              <button class="btn btn-danger btn-sm" @click="confirmarEliminar(p)">
                <i class="bi bi-trash-fill"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- PANEL CARRITO -->
    <transition name="slide">
      <div v-if="carritoAbierto" class="carrito-panel shadow-lg d-flex flex-column">
        <div class="d-flex justify-content-between align-items-center p-3 border-bottom bg-dark text-white">
          <h6 class="mb-0 fw-bold"><i class="bi bi-cart3 me-2"></i> Mi carrito</h6>
          <button class="btn-close btn-close-white btn-sm" @click="carritoAbierto = false"></button>
        </div>
        <div class="flex-grow-1 overflow-auto p-3">
          <div v-if="carrito.length === 0" class="text-center text-muted py-5">
            <i class="bi bi-cart-x fs-1 d-block mb-2"></i> Carrito vacío
          </div>
          <div v-for="item in carrito" :key="item.id" class="d-flex align-items-center gap-2 mb-3 pb-3 border-bottom">
            <img :src="item.imagen" width="55" height="55" style="object-fit: contain;">
            <div class="flex-grow-1">
              <div class="fw-semibold">{{ item.nombre }}</div>
              <div class="text-danger fw-bold">${{ formatPrecio(item.precio) }}</div>
            </div>
            <div class="d-flex align-items-center gap-1">
              <button class="btn btn-outline-secondary btn-sm" @click="quitarUno(item.id)">-</button>
              <span>{{ item.cantidad }}</span>
              <button class="btn btn-outline-secondary btn-sm" @click="agregarAlCarrito(item)">+</button>
            </div>
            <button class="btn btn-sm text-danger" @click="eliminarDelCarrito(item.id)"><i class="bi bi-x-lg"></i></button>
          </div>
        </div>
        <div class="p-3 border-top bg-light">
          <div class="d-flex justify-content-between fw-bold mb-3">
            <span>Total</span>
            <span class="text-danger fs-5">${{ formatPrecio(totalPrecio) }}</span>
          </div>
          <button class="btn btn-danger w-100 mb-2" @click="finalizarCompra">Finalizar compra</button>
          <button class="btn btn-outline-secondary w-100" @click="vaciarCarrito">Vaciar carrito</button>
        </div>
      </div>
    </transition>

    <!-- OVERLAY CARRITO -->
    <div v-if="carritoAbierto" class="carrito-overlay" @click="carritoAbierto = false"></div>

    <!-- MODAL CREAR / EDITAR -->
    <div v-if="mostrarModal" class="modal d-block" style="background: rgba(0,0,0,0.5);">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title">{{ editando ? 'Editar producto' : 'Nuevo producto' }}</h5>
            <button class="btn-close btn-close-white" @click="mostrarModal = false"></button>
          </div>
          <div class="modal-body">
            <input v-model="form.nombre" class="form-control mb-2" placeholder="Nombre">
            <input v-model.number="form.precio" type="number" class="form-control mb-2" placeholder="Precio">
            <select v-model="form.categoria" class="form-select mb-2">
              <option value="">Seleccione categoría</option>
              <option value="calzado">Calzado</option>
              <option value="ropa">Ropa</option>
              <option value="accesorios">Accesorios</option>
              <option value="equipos">Equipos</option>
            </select>
            <textarea v-model="form.descripcion" class="form-control mb-2" placeholder="Descripción"></textarea>
            <input v-model="form.imagen" class="form-control" placeholder="URL Imagen">
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
            ¿Estás seguro de eliminar el producto <strong>{{ productoEliminar.nombre }}</strong>?
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

<style scoped>
.producto-card {
  border-radius: 18px;
  overflow: hidden;
  transition: all 0.3s ease;
  background: white;
  border: 1px solid #f0f0f0;
}

.producto-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 30px rgba(0,0,0,0.1);
  border-color: transparent;
}

.producto-img-container {
  height: 240px;
  overflow: hidden;
  background: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
}

.producto-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.4s ease;
}

.producto-card:hover .producto-img {
  transform: scale(1.08);
}

.badge-categoria {
  background-color: rgba(220, 53, 69, 0.1);
  color: #dc3545;
  font-weight: 600;
  font-size: 0.75rem;
  padding: 6px 12px;
  border-radius: 20px;
  text-transform: capitalize;
}

.table {
  border-collapse: separate;
  border-spacing: 0;
}

.table thead th {
  border-bottom: 2px solid #dc3545;
}

.table tbody tr:hover {
  background-color: rgba(220, 53, 69, 0.05);
}

.carrito-panel {
  position: fixed;
  top: 0;
  right: 0;
  width: 360px;
  height: 100vh;
  background: white;
  z-index: 1055;
}

.carrito-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  z-index: 1054;
  backdrop-filter: blur(3px);
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
</style>