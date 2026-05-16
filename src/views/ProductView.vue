<script setup>
import { ref, onMounted, computed, inject } from 'vue'
import productsData from '../data/products.json'

const categoria = inject('categoria', ref('todos'))

// =========================
// PRODUCTOS
// =========================

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
  const existente = carrito.value.find(
    item => item.id === producto.id
  )

  if (existente) {
    existente.cantidad++
  } else {
    carrito.value.push({
      ...producto,
      cantidad: 1
    })
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
  if (confirm('¿Vaciar el carrito?')) {
    carrito.value = []
  }
}

function finalizarCompra() {
  alert(
    `✅ Compra finalizada\nTotal: $${formatPrecio(totalPrecio.value)}`
  )

  carrito.value = []
  carritoAbierto.value = false
}

// =========================
// CRUD
// =========================

const mostrarModal = ref(false)
const mostrarModalDetalle = ref(false)

const editando = ref(false)

const productoDetalle = ref(null)

const errores = ref({})

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

  if (!form.value.nombre.trim()) {
    errores.value.nombre = 'El nombre es requerido.'
  }

  if (!form.value.precio || form.value.precio <= 0) {
    errores.value.precio = 'Precio inválido.'
  }

  if (!form.value.categoria) {
    errores.value.categoria = 'Selecciona una categoría.'
  }

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

function verDetalle(producto) {
  productoDetalle.value = producto
  mostrarModalDetalle.value = true
}

function guardar() {
  if (!validar()) return

  if (editando.value) {
    const idx = productos.value.findIndex(
      p => p.id === form.value.id
    )

    if (idx !== -1) {
      productos.value[idx] = { ...form.value }
    }
  } else {
    productos.value.push({
      ...form.value,
      id: Date.now()
    })
  }

  guardarStorage()

  mostrarModal.value = false
}

function eliminar(id) {
  if (confirm('¿Eliminar este producto?')) {
    productos.value = productos.value.filter(
      p => p.id !== id
    )

    guardarStorage()
  }
}
</script>

<template>
  <div>

    <!-- ENCABEZADO -->

    <div class="d-flex justify-content-between align-items-center mb-4">

      <div>
        <h3 class="fw-bold mb-1">Productos</h3>

        <small class="text-muted">
          {{ productosFiltrados.length }} productos disponibles
        </small>
      </div>

      <div class="d-flex gap-2">

        <!-- BOTON CARRITO -->

        <button
          class="btn btn-outline-danger position-relative"
          @click="carritoAbierto = !carritoAbierto"
        >

          <i class="bi bi-cart3 me-1"></i>

          Carrito

          <span
            v-if="totalItems > 0"
            class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
          >
            {{ totalItems }}
          </span>

        </button>

        <!-- NUEVO PRODUCTO -->


      </div>

    </div>

    <!-- PRODUCTOS -->

    <div class="row g-4">

      <div
        class="col-sm-6 col-md-4 col-lg-3"
        v-for="p in productosFiltrados"
        :key="p.id"
      >

        <div class="card producto-card h-100 border-0 shadow-sm">

          <!-- IMAGEN -->

          <div class="producto-img-container">

            <img
              :src="p.imagen"
              :alt="p.nombre"
              class="producto-img"
            >

          </div>

          <!-- CONTENIDO -->

          <div class="card-body d-flex flex-column">

            <span class="badge bg-secondary align-self-start mb-2">
              {{ p.categoria }}
            </span>

            <h5 class="fw-bold mb-2">
              {{ p.nombre }}
            </h5>

            <p class="text-muted small flex-grow-1">
              {{ p.descripcion }}
            </p>

            <div class="mt-auto">

              <h4 class="text-danger fw-bold mb-3">
                ${{ formatPrecio(p.precio) }}
              </h4>

              <!-- BOTON CARRITO -->

              <button
                class="btn btn-danger w-100 mb-2"
                @click="agregarAlCarrito(p)"
              >
                <i class="bi bi-cart-plus me-1"></i>
                Añadir al carrito
              </button>

              

            </div>

          </div>

        </div>

      </div>

      <!-- SIN PRODUCTOS -->

      <div
        v-if="productosFiltrados.length === 0"
        class="text-center py-5 text-muted"
      >

        <i class="bi bi-search fs-1 d-block mb-3"></i>

        No hay productos disponibles.

      </div>

    </div>

    <!-- CARRITO -->

    <transition name="slide">

      <div
        v-if="carritoAbierto"
        class="carrito-panel shadow-lg d-flex flex-column"
      >

        <!-- HEADER -->

        <div
          class="d-flex justify-content-between align-items-center p-3 border-bottom bg-dark text-white"
        >

          <h6 class="mb-0 fw-bold">

            <i class="bi bi-cart3 me-2"></i>

            Mi carrito

            <span class="badge bg-danger ms-1">
              {{ totalItems }}
            </span>

          </h6>

          <button
            class="btn-close btn-close-white btn-sm"
            @click="carritoAbierto = false"
          ></button>

        </div>

        <!-- ITEMS -->

        <div class="flex-grow-1 overflow-auto p-3">

          <div
            v-if="carrito.length === 0"
            class="text-center text-muted py-5"
          >

            <i class="bi bi-cart-x d-block fs-1 mb-2"></i>

            El carrito está vacío

          </div>

          <div
            v-for="item in carrito"
            :key="item.id"
            class="d-flex align-items-center gap-2 mb-3 pb-3 border-bottom"
          >

            <img
              :src="item.imagen"
              :alt="item.nombre"
              width="52"
              height="44"
              style="object-fit: cover; border-radius: 6px;"
            >

            <div class="flex-grow-1 overflow-hidden">

              <div class="fw-semibold small text-truncate">
                {{ item.nombre }}
              </div>

              <div class="text-danger small fw-bold">
                ${{ formatPrecio(item.precio) }}
              </div>

            </div>

            <!-- CANTIDAD -->

            <div class="d-flex align-items-center gap-1">

              <button
                class="btn btn-outline-secondary btn-sm px-2 py-0"
                @click="quitarUno(item.id)"
              >
                −
              </button>

              <span class="small fw-bold px-1">
                {{ item.cantidad }}
              </span>

              <button
                class="btn btn-outline-secondary btn-sm px-2 py-0"
                @click="agregarAlCarrito(item)"
              >
                +
              </button>

            </div>

            <!-- ELIMINAR -->

            <button
              class="btn btn-sm text-danger p-0 ms-1"
              @click="eliminarDelCarrito(item.id)"
            >
              <i class="bi bi-x-lg"></i>
            </button>

          </div>

        </div>

        <!-- TOTAL -->

        <div class="p-3 border-top bg-light">

          <div class="d-flex justify-content-between fw-bold mb-3">

            <span>Total</span>

            <span class="text-danger fs-5">
              ${{ formatPrecio(totalPrecio) }}
            </span>

          </div>

          <button
            class="btn btn-danger w-100 mb-2"
            :disabled="carrito.length === 0"
            @click="finalizarCompra"
          >

            <i class="bi bi-bag-check me-1"></i>

            Finalizar compra

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

    <!-- OVERLAY -->

    <div
      v-if="carritoAbierto"
      class="carrito-overlay"
      @click="carritoAbierto = false"
    ></div>

  </div>
</template>

<style scoped>

/* =========================
   CARD PRODUCTO
========================= */

.producto-card{
  border-radius: 18px; /* bordes redondeados */
  overflow: hidden; /* evita que la imagen salga de la card */
  transition: all 0.3s ease; /* animacion suave */
  background: white;
}

/* efecto hover */
.producto-card:hover{
  transform: translateY(-6px); /* levanta la card */
  box-shadow: 0 10px 25px rgba(0,0,0,0.12);
}

/* =========================
   CONTENEDOR IMAGEN
========================= */

.producto-img-container{

  /* altura fija para todas */
  height: 260px;

  /* evita desbordamiento */
  overflow: hidden;

  /* color fondo */
  background: #f5f5f5;

  /* centra imagen */
  display: flex;
  align-items: center;
  justify-content: center;

  /* padding interno */
  padding: 10px;
}

/* =========================
   IMAGEN PRODUCTO
========================= */

.producto-img{

  /* ocupa todo el espacio */
  width: 100%;
  height: 100%;

  /*
    contain:
    muestra imagen completa
    sin cortarla
  */
  object-fit: contain;

  /* centra imagen */
  object-position: center;

  /* animacion */
  transition: transform 0.3s ease;

  /* fondo blanco */
  background: white;
}

/* zoom al pasar mouse */
.producto-card:hover .producto-img{
  transform: scale(1.05);
}

/* =========================
   PANEL CARRITO
========================= */

.carrito-panel{
  position: fixed;
  top: 0;
  right: 0;

  width: 360px;
  height: 100vh;

  background: white;

  z-index: 1055;
}

/* fondo oscuro */
.carrito-overlay{
  position: fixed;
  inset: 0;

  background: rgba(0,0,0,0.3);

  z-index: 1054;
}

/* =========================
   ANIMACION CARRITO
========================= */

.slide-enter-active,
.slide-leave-active{
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to{
  transform: translateX(100%);
}

</style>

