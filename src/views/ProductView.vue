<script setup>
import { ref, onMounted, computed, inject } from 'vue'
import productsData from '../data/products.json'

const categoria = inject('categoria', ref('todos'))

// --- productos ---
const productos = ref([])

onMounted(() => {
  const guardado = localStorage.getItem('productos')
  if (guardado) {
    productos.value = JSON.parse(guardado)
  } else {
    productos.value = productsData
    guardarStorage()
  }
})

function guardarStorage() {
  localStorage.setItem('productos', JSON.stringify(productos.value))
}

const productosFiltrados = computed(() => {
  if (categoria.value === 'todos') return productos.value
  return productos.value.filter(
    p => p.categoria?.toLowerCase() === categoria.value
  )
})

function formatPrecio(precio) {
  return Number(precio).toLocaleString('es-CO')
}

// --- carrito ---
const carritoAbierto = ref(false)
const carrito        = ref([])

const totalItems = computed(() =>
  carrito.value.reduce((acc, item) => acc + item.cantidad, 0)
)

const totalPrecio = computed(() =>
  carrito.value.reduce((acc, item) => acc + item.precio * item.cantidad, 0)
)

function agregarAlCarrito(producto) {
  const existente = carrito.value.find(i => i.id === producto.id)
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
  if (confirm('¿Vaciar el carrito?')) carrito.value = []
}

function finalizarCompra() {
  alert(`✅ Compra finalizada\nTotal: $${formatPrecio(totalPrecio.value)}`)
  carrito.value = []
  carritoAbierto.value = false
}

// --- CRUD ---
const mostrarModal        = ref(false)
const mostrarModalDetalle = ref(false)
const editando            = ref(false)
const productoDetalle     = ref(null)
const errores             = ref({})

const formVacio = () => ({
  id: null, nombre: '', precio: '', categoria: '', descripcion: '', imagen: ''
})
const form = ref(formVacio())

function validar() {
  errores.value = {}
  if (!form.value.nombre.trim())                    errores.value.nombre    = 'El nombre es requerido.'
  if (!form.value.precio || form.value.precio <= 0) errores.value.precio    = 'Precio inválido.'
  if (!form.value.categoria)                        errores.value.categoria = 'Selecciona una categoría.'
  return Object.keys(errores.value).length === 0
}

function abrirCrear() {
  editando.value     = false
  form.value         = formVacio()
  errores.value      = {}
  mostrarModal.value = true
}

function abrirEditar(producto) {
  editando.value     = true
  form.value         = { ...producto }
  errores.value      = {}
  mostrarModal.value = true
}

function verDetalle(producto) {
  productoDetalle.value     = producto
  mostrarModalDetalle.value = true
}

function guardar() {
  if (!validar()) return
  if (editando.value) {
    const idx = productos.value.findIndex(p => p.id === form.value.id)
    if (idx !== -1) productos.value[idx] = { ...form.value }
  } else {
    productos.value.push({ ...form.value, id: Date.now() })
  }
  guardarStorage()
  mostrarModal.value = false
}

function eliminar(id) {
  if (confirm('¿Eliminar este producto?')) {
    productos.value = productos.value.filter(p => p.id !== id)
    guardarStorage()
  }
}
</script>

<template>
  <div>

    <!-- encabezado -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h4 class="fw-bold mb-0">Productos</h4>
        <small class="text-muted">{{ productosFiltrados.length }} productos en inventario</small>
      </div>
      <div class="d-flex gap-2">

        <!-- boton carrito con badge -->
        <button class="btn btn-outline-danger position-relative" @click="carritoAbierto = !carritoAbierto">
          <i class="bi bi-cart3 me-1"></i> Carrito
          <span
            v-if="totalItems > 0"
            class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
          >
            {{ totalItems }}
          </span>
        </button>

        <button class="btn btn-danger" @click="abrirCrear">
          <i class="bi bi-plus-lg me-1"></i> Nuevo producto
        </button>

      </div>
    </div>

    <!-- tabla -->
    <div class="table-responsive">
      <table class="table table-hover align-middle border rounded shadow-sm">
        <thead class="table-dark">
          <tr>
            <th>#</th>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th class="text-center">Carrito</th>
            <th class="text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(p, i) in productosFiltrados" :key="p.id">
            <td class="text-muted small">{{ i + 1 }}</td>
            <td>
              <img
                :src="p.imagen" :alt="p.nombre"
                width="56" height="40"
                style="object-fit:cover; border-radius:6px;"
              >
            </td>
            <td class="fw-semibold">{{ p.nombre }}</td>
            <td><span class="badge bg-secondary">{{ p.categoria }}</span></td>
            <td class="text-danger fw-bold">${{ formatPrecio(p.precio) }}</td>
            <td class="text-center">
              <button class="btn btn-sm btn-danger" @click="agregarAlCarrito(p)">
                <i class="bi bi-cart-plus"></i> Añadir
              </button>
            </td>
            <td class="text-center">
              <button class="btn btn-sm btn-outline-secondary me-1" @click="verDetalle(p)">
                <i class="bi bi-eye"></i>
              </button>
              <button class="btn btn-sm btn-warning me-1" @click="abrirEditar(p)">
                <i class="bi bi-pencil"></i>
              </button>
              <button class="btn btn-sm btn-outline-danger" @click="eliminar(p.id)">
                <i class="bi bi-trash"></i>
              </button>
            </td>
          </tr>
          <tr v-if="productosFiltrados.length === 0">
            <td colspan="7" class="text-center text-muted py-5">
              <i class="bi bi-search d-block fs-2 mb-2"></i>
              No hay productos en esta categoría.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- panel carrito flotante -->
    <transition name="slide">
      <div v-if="carritoAbierto" class="carrito-panel shadow-lg d-flex flex-column">

        <div class="d-flex justify-content-between align-items-center p-3 border-bottom bg-dark text-white">
          <h6 class="mb-0 fw-bold">
            <i class="bi bi-cart3 me-2"></i>Mi carrito
            <span class="badge bg-danger ms-1">{{ totalItems }}</span>
          </h6>
          <button class="btn-close btn-close-white btn-sm" @click="carritoAbierto = false"></button>
        </div>

        <!-- items -->
        <div class="flex-grow-1 overflow-auto p-3">

          <div v-if="carrito.length === 0" class="text-center text-muted py-5">
            <i class="bi bi-cart-x d-block fs-1 mb-2"></i>
            El carrito está vacío
          </div>

          <div
            v-for="item in carrito"
            :key="item.id"
            class="d-flex align-items-center gap-2 mb-3 pb-3 border-bottom"
          >
            <img
              :src="item.imagen" :alt="item.nombre"
              width="52" height="44"
              style="object-fit:cover; border-radius:6px; flex-shrink:0;"
            >
            <div class="flex-grow-1 overflow-hidden">
              <div class="fw-semibold small text-truncate">{{ item.nombre }}</div>
              <div class="text-danger small fw-bold">${{ formatPrecio(item.precio) }}</div>
            </div>
            <!-- +/- cantidad -->
            <div class="d-flex align-items-center gap-1">
              <button class="btn btn-outline-secondary btn-sm px-2 py-0" @click="quitarUno(item.id)">−</button>
              <span class="small fw-bold px-1">{{ item.cantidad }}</span>
              <button class="btn btn-outline-secondary btn-sm px-2 py-0" @click="agregarAlCarrito(item)">+</button>
            </div>
            <button class="btn btn-sm text-danger p-0 ms-1" @click="eliminarDelCarrito(item.id)">
              <i class="bi bi-x-lg"></i>
            </button>
          </div>

        </div>

        <!-- total y acciones -->
        <div class="p-3 border-top bg-light">
          <div class="d-flex justify-content-between fw-bold mb-3">
            <span>Total</span>
            <span class="text-danger fs-5">${{ formatPrecio(totalPrecio) }}</span>
          </div>
          <button
            class="btn btn-danger w-100 mb-2"
            :disabled="carrito.length === 0"
            @click="finalizarCompra"
          >
            <i class="bi bi-bag-check me-1"></i> Finalizar compra
          </button>
          <button
            class="btn btn-outline-secondary w-100 btn-sm"
            :disabled="carrito.length === 0"
            @click="vaciarCarrito"
          >
            Vaciar carrito
          </button>
        </div>

      </div>
    </transition>

    <!-- overlay oscuro al abrir carrito -->
    <div
      v-if="carritoAbierto"
      class="carrito-overlay"
      @click="carritoAbierto = false"
    ></div>

    <!-- modal crear / editar -->
    <div v-if="mostrarModal" class="modal d-block" style="background:rgba(0,0,0,0.5); z-index:1060;">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content shadow-lg">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title fw-bold">
              <i :class="['bi me-2', editando ? 'bi-pencil-square' : 'bi-plus-circle']"></i>
              {{ editando ? 'Editar producto' : 'Nuevo producto' }}
            </h5>
            <button class="btn-close btn-close-white" @click="mostrarModal = false"></button>
          </div>
          <div class="modal-body">
            <div class="row g-3">
              <div class="col-12">
                <label class="form-label fw-semibold">Nombre *</label>
                <input v-model="form.nombre" class="form-control" placeholder="Ej: Zapatillas Pro X">
                <div v-if="errores.nombre" class="text-danger small mt-1">{{ errores.nombre }}</div>
              </div>
              <div class="col-6">
                <label class="form-label fw-semibold">Precio (COP) *</label>
                <input v-model.number="form.precio" type="number" class="form-control">
                <div v-if="errores.precio" class="text-danger small mt-1">{{ errores.precio }}</div>
              </div>
              <div class="col-6">
                <label class="form-label fw-semibold">Categoría *</label>
                <select v-model="form.categoria" class="form-select">
                  <option value="">Seleccionar...</option>
                  <option value="calzado">Calzado</option>
                  <option value="ropa">Ropa</option>
                  <option value="accesorios">Accesorios</option>
                  <option value="equipos">Equipos</option>
                </select>
                <div v-if="errores.categoria" class="text-danger small mt-1">{{ errores.categoria }}</div>
              </div>
              <div class="col-12">
                <label class="form-label fw-semibold">Descripción</label>
                <textarea v-model="form.descripcion" class="form-control" rows="2"></textarea>
              </div>
              <div class="col-12">
                <label class="form-label fw-semibold">URL Imagen</label>
                <input v-model="form.imagen" class="form-control" placeholder="https://...">
              </div>
              <div v-if="form.imagen" class="col-12">
                <img :src="form.imagen" class="img-fluid rounded" style="max-height:120px; object-fit:cover; width:100%;">
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-outline-secondary" @click="mostrarModal = false">Cancelar</button>
            <button class="btn btn-danger" @click="guardar">
              <i class="bi bi-check-lg me-1"></i>Guardar
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- modal detalle -->
    <div v-if="mostrarModalDetalle" class="modal d-block" style="background:rgba(0,0,0,0.5); z-index:1060;">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content shadow-lg">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title fw-bold">Detalle del producto</h5>
            <button class="btn-close btn-close-white" @click="mostrarModalDetalle = false"></button>
          </div>
          <div class="modal-body p-0" v-if="productoDetalle">
            <img
              :src="productoDetalle.imagen" :alt="productoDetalle.nombre"
              class="w-100" style="height:220px; object-fit:cover;"
            >
            <div class="p-4">
              <span class="badge bg-secondary mb-2">{{ productoDetalle.categoria }}</span>
              <h5 class="fw-bold">{{ productoDetalle.nombre }}</h5>
              <p class="text-muted">{{ productoDetalle.descripcion }}</p>
              <p class="fs-4 fw-bold text-danger mb-0">${{ formatPrecio(productoDetalle.precio) }}</p>
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-danger btn-sm"
              @click="agregarAlCarrito(productoDetalle); mostrarModalDetalle = false"
            >
              <i class="bi bi-cart-plus me-1"></i>Añadir al carrito
            </button>
            <button
              class="btn btn-warning btn-sm"
              @click="abrirEditar(productoDetalle); mostrarModalDetalle = false"
            >
              <i class="bi bi-pencil me-1"></i>Editar
            </button>
            <button class="btn btn-outline-secondary btn-sm" @click="mostrarModalDetalle = false">
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.carrito-panel {
  position: fixed;
  top: 0;
  right: 0;
  width: 360px;
  height: 100vh;
  background: #fff;
  z-index: 1055;
}

.carrito-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 1054;
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


