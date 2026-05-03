<script setup>
import { ref, onMounted, computed, inject } from 'vue'
import ProductCardComponent from '../components/ProductCardComponent.vue'
import productsData from '../data/products.json'

// 👇 recibir categoría desde Dashboard
const categoria = inject('categoria', ref('todos'))

const productos = ref([])

onMounted(() => {
  const data = localStorage.getItem('productos')

  if (data) {
    productos.value = JSON.parse(data)
  } else {
    productos.value = productsData
    localStorage.setItem('productos', JSON.stringify(productos.value))
  }
})

// 🔥 FILTRO CORREGIDO
const productosFiltrados = computed(() => {
  if (categoria.value === 'todos') return productos.value

  return productos.value.filter(p =>
    p.categoria?.toLowerCase() === categoria.value
  )
})
</script>

<template>
  <div>

    <!-- HERO -->
    <div class="card text-white mb-4">
      <img src="https://i.pinimg.com/1200x/5e/81/19/5e8119b146135cdb9c68f93ee31e3146.jpg"
           class="card-img"
           style="height:300px; object-fit:cover;">

      <div class="card-img-overlay d-flex flex-column justify-content-center align-items-center">
        <h2 class="fw-bold">🔥 SportMax</h2>
        <p>Rendimiento, estilo y calidad deportiva</p>
      </div>
    </div>

    <h5 class="mb-3">PRODUCTOS DEPORTIVOS</h5>

    <!-- 👇 LISTA -->
    <div class="row">
      <ProductCardComponent
        v-for="p in productosFiltrados"
        :key="p.id"
        :producto="p"
      />
    </div>

  </div>
</template>