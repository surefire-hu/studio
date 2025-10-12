<script setup lang="ts">
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <Navbar />
      <main class="flex-1">
        <router-view />
      </main>
    <Footer />
  </div>
</template>

<style>
/* per evitare che la navbar fissa copra i contenuti */
body {
  padding-top: 4rem;
}
</style>
