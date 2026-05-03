<script setup>
defineProps({
  producto: Object
})

const emit = defineEmits(['eliminar'])
</script>

<template>
  <div class="col-md-3 mb-4">
    <div class="card shadow h-100">

      <img :src="producto.imagen" class="card-img-top" style="height:180px; object-fit:cover;" />

      <div class="card-body d-flex flex-column">
        <h6 class="text-muted">{{ producto.categoria || 'Producto' }}</h6>
        <h5 class="card-title">{{ producto.nombre }}</h5>

        <p class="fw-bold mt-auto">$ {{ producto.precio }}</p>

        <button class="btn btn-dark btn-sm mt-2">+ Añadir</button>

        <button 
          class="btn btn-danger btn-sm mt-2"
          @click="$emit('eliminar', producto.id)"
        >
          Eliminar
        </button>
      </div>

    </div>
  </div>
</template>