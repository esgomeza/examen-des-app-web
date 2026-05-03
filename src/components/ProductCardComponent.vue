<script setup>
defineProps({
  producto: Object
})
</script>

<template>
  <div class="col-md-4 mb-4">
    <div class="card shadow h-100">

      <img 
        :src="producto.imagen || 'https://via.placeholder.com/300'" 
        class="card-img-top"
      >

      <div class="card-body">
        <h5 class="card-title">{{ producto.nombre }}</h5>
        <p class="text-success fw-bold">$ {{ producto.precio }}</p>

        <button class="btn btn-outline-primary btn-sm">
          Ver más
        </button>
      </div>

    </div>
  </div>
</template>