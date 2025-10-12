<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()
const scrollToServices = () => {
  const el = document.getElementById('services')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

function switchLanguage(lang: string) {
  locale.value = lang
}
</script>

<template>
  <!-- Hero -->
  <section class="h-96 bg flex flex-col justify-center items-center text-center px-4">
    <h1 class="text-5xl md:text-6xl font-bold mb-4" data-aos="fade-up">{{ t('hero.title') }}</h1>
    <p class="text-xl md:text-2xl mb-8" data-aos="fade-up" data-aos-delay="200">{{ t('hero.subtitle') }}</p>
    <button
      @click="scrollToServices"
      class="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition"
      data-aos="fade-up"
      data-aos-delay="400"
    >
      {{ t('hero.button') }}
    </button>
  </section>

  <!-- Sezione servizi -->
  <section id="services" class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
      <div class="bg-blue-50 p-6 rounded-xl shadow-md text-center" data-aos="fade-up">
        <h2 class="text-2xl font-bold mb-2">{{ t('services.fiscal.title') }}</h2>
        <p>{{ t('services.fiscal.desc') }}</p>
      </div>
      <div class="bg-blue-50 p-6 rounded-xl shadow-md text-center" data-aos="fade-up" data-aos-delay="100">
        <h2 class="text-2xl font-bold mb-2">{{ t('services.report.title') }}</h2>
        <p>{{ t('services.report.desc') }}</p>
      </div>
      <div class="bg-blue-50 p-6 rounded-xl shadow-md text-center" data-aos="fade-up" data-aos-delay="200">
        <h2 class="text-2xl font-bold mb-2">{{ t('services.admin.title') }}</h2>
        <p>{{ t('services.admin.desc') }}</p>
      </div>
    </div>
  </section>
</template>
<style>
.bg {
    background-image: url(https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y29udGFiaWxlfGVufDB8fDB8fHwy);
    background-size: cover;
}
</style>
