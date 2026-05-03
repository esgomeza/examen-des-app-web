<script setup>
import { ref, onMounted } from 'vue'
import ProductCardComponent from '../components/ProductCardComponent.vue'
import productsData from '../data/products.json'

const productos = ref([])
const nuevo = ref({ nombre: '', precio: '' })

onMounted(() => {
  const data = localStorage.getItem('productos')

  if (data) {
    productos.value = JSON.parse(data)
  } else {
    productos.value = productsData
    localStorage.setItem('productos', JSON.stringify(productos.value))
  }
})

const guardar = () => {
  if (!nuevo.value.nombre || !nuevo.value.precio) return

  productos.value.push({
    ...nuevo.value,
    id: Date.now()
  })

  localStorage.setItem('productos', JSON.stringify(productos.value))

  nuevo.value = { nombre: '', precio: '' }
}
</script>

<template>
  <div>

    <h2 class="mb-4">Productos</h2>

    <!-- FORMULARIO -->
    <div class="card p-3 mb-4 shadow">
      <input v-model="nuevo.nombre" class="form-control mb-2" placeholder="Nombre">
      <input v-model="nuevo.precio" class="form-control mb-2" placeholder="Precio">

      <button @click="guardar" class="btn btn-success">
        Agregar Producto
      </button>
    </div>

    <!-- TARJETAS -->
    <div class="row">
      <ProductCardComponent 
        v-for="p in productos" 
        :key="p.id" 
        :producto="p" 
      />
    </div>

  </div>
</template>