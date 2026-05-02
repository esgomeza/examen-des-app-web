<template>
  <div>
    <NavbarComponent />

    <div class="d-flex">
      <SidebarComponent />
      <div class="p-4 w-100">
        <router-view />
      </div>
    </div>

    <FooterComponent />
  </div>
</template>

<script setup>
import NavbarComponent from '../components/NavbarComponent.vue'
import SidebarComponent from '../components/SidebarComponent.vue'
import FooterComponent from '../components/FooterComponent.vue'
</script>