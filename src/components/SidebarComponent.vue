<template>
  <div class="bg-light p-3" style="width: 220px; min-height: 100vh;">
    
    <h5>Menú</h5>

    <ul class="nav flex-column">

      <li class="nav-item">
        <router-link class="nav-link" to="/dashboard/productos">
          📦 Productos
        </router-link>
      </li>

      <!-- Puedes agregar más -->
      <li class="nav-item">
        <router-link class="nav-link" to="#">
          👥 Clientes
        </router-link>
      </li>

    </ul>
  </div>
</template>