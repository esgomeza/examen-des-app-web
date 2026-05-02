<script setup>
defineProps({
  producto: Object
})
</script>

<template>
  <div class="card" style="width: 18rem;">
    
    <img :src="producto.imagen" class="card-img-top" alt="producto">

    <div class="card-body">
      <h5 class="card-title">{{ producto.nombre }}</h5>
      <p class="card-text">$ {{ producto.precio }}</p>

      <button class="btn btn-primary">
        Ver detalles
      </button>
    </div>

  </div>
</template>