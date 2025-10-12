<template>
  <footer class="bg-gray-900 text-white py-10">
    <div class="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
      <!-- Sezione Info -->
      <div>
        <h2 class="text-2xl font-bold mb-4">益民工会</h2>
        <p class="mb-2">Via Fabio Filzi 39 L, 59100 Prato (PO)</p>
        <p class="mb-2">
          <a href="tel:0574606077" class="hover:text-gray-300 transition">
            0574 606077
          </a>
        </p>
        <p class="mb-4">P.IVA 02354210979</p>

        <p class="text-sm text-gray-400">
          &copy; {{ new Date().getFullYear() }} 益民工会. Tutti i diritti riservati | powered by <a href="https://steven-hu.netlify.app/">surefire</a>.
        </p>
      </div>

      <!-- Sezione Google Maps -->
      <div class="w-full h-64 md:h-52 rounded-lg overflow-hidden shadow-lg">
        <iframe
          class="w-full h-full"
          style="border:0;"
          loading="lazy"
          allowfullscreen
          referrerpolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2881.1429526117755!2d11.099275315500962!3d43.87609797911488!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132a58662c8e5f43%3A0x4e4f5f66c8aa9bc!2sVia%20Fabio%20Filzi%2C%2039L%2C%2059100%20Prato%20PO!5e0!3m2!1sit!2sit!4v1694019200000!5m2!1sit!2sit">
        </iframe>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// Non serve logica particolare per questo footer
</script>
