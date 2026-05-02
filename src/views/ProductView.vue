<script setup>
import { ref, onMounted } from 'vue'
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
  productos.value.push({ ...nuevo.value, id: Date.now() })
  localStorage.setItem('productos', JSON.stringify(productos.value))
}

const eliminar = (id) => {
  productos.value = productos.value.filter(p => p.id !== id)
  localStorage.setItem('productos', JSON.stringify(productos.value))
}
</script>

<template>
  <div>
    <h2>Productos</h2>

    <input v-model="nuevo.nombre" class="form-control mb-2">
    <input v-model="nuevo.precio" class="form-control mb-2">

    <button @click="guardar" class="btn btn-success mb-3">
      Agregar
    </button>

    <table class="table">
      <tr v-for="p in productos" :key="p.id">
        <td>{{ p.nombre }}</td>
        <td>{{ p.precio }}</td>
        <td>
          <button @click="eliminar(p.id)" class="btn btn-danger btn-sm">
            Eliminar
          </button>
        </td>
      </tr>
    </table>
  </div>
</template>