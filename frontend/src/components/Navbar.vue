<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import router from '@/router'
import { useI18n } from 'vue-i18n'
import api from '@/api'

interface Opzione {
  id: number
  name: string
  slug: string
}

const isOpen = ref(false)
const showInsurance = ref(false) // desktop dropdown
const mobileInsuranceOpen = ref(false) // accordion mobile
const opzioni = ref<Opzione[]>([])
const { locale } = useI18n()

function switchLanguage(lang: string) {
  locale.value = lang
}

async function fetchOpzioni() {
  const res = await api.get(
    `/opzioni-assicurazionis?locale=${locale.value}&populate=assicurazioni`
  )
  opzioni.value = res.data.data.map((item: any) => ({
    id: item.id,
    name: item.name,
    slug: item.slug
  }))
}

function goToOpzione(slug: string) {
  router.push(`/assicurazione/${slug}`)
  showInsurance.value = false
  isOpen.value = false
}

onMounted(fetchOpzioni)
watch(locale, () => {
  fetchOpzioni()
})
</script>

<template>
  <nav class="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <!-- Logo / Brand -->
        <div class="flex-shrink-0 flex items-center">
          <router-link to="/" class="text-xl font-bold text-blue-600">
            益民工会
          </router-link>
        </div>

        <!-- Menu desktop -->
        <div class="hidden md:flex space-x-8 items-center relative">
          <router-link to="/" class="text-gray-700 hover:text-blue-600 transition">
            {{ $t('nav.home') }}
          </router-link>
          <router-link to="/news" class="text-gray-700 hover:text-blue-600 transition">
            {{ $t('nav.blog') }}
          </router-link>

          <!-- Dropdown assicurazioni -->
          <div class="relative">
            <button
              @click="showInsurance = !showInsurance"
              class="text-gray-700 hover:text-blue-600 transition flex items-center"
            >
              {{ $t('nav.insurance') }}
              <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <!-- Dropdown menu -->
            <div
              v-if="showInsurance"
              class="absolute left-0 mt-2 w-56 bg-white shadow-lg rounded-lg border z-50"
            >
              <ul>
                <li
                  v-for="o in opzioni"
                  :key="o.id"
                  @click="goToOpzione(o.slug)"
                  class="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {{ o.name }}
                </li>
              </ul>
            </div>
          </div>

          <!-- Cambio lingua -->
          <div class="flex space-x-2">
            <button
              @click="switchLanguage('it')"
              :class="locale === 'it' ? 'font-bold text-blue-600' : 'text-gray-600'"
              class="hover:text-blue-600"
            >
              IT
            </button>
            <span class="text-gray-400">|</span>
            <button
              @click="switchLanguage('zh')"
              :class="locale === 'zh' ? 'font-bold text-blue-600' : 'text-gray-600'"
              class="hover:text-blue-600"
            >
              中文
            </button>
          </div>
        </div>

        <!-- Bottone mobile -->
        <div class="md:hidden flex items-center">
          <button
            @click="isOpen = !isOpen"
            class="text-gray-700 hover:text-blue-600 focus:outline-none"
          >
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                v-if="!isOpen"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
              <path
                v-else
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Menu mobile -->
    <div v-if="isOpen" class="md:hidden bg-white shadow-md">
      <router-link to="/" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">
        {{ $t('nav.home') }}
      </router-link>
      <router-link to="/news" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">
        {{ $t('nav.blog') }}
      </router-link>

      <!-- Accordion assicurazioni -->
      <div>
        <button
          @click="mobileInsuranceOpen = !mobileInsuranceOpen"
          class="w-full flex justify-between items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
        >
          <span>{{ $t('nav.insurance') }}</span>
          <svg
            class="w-4 h-4 transform transition-transform"
            :class="{ 'rotate-180': mobileInsuranceOpen }"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <div v-if="mobileInsuranceOpen" class="bg-gray-50">
          <ul>
            <li
              v-for="o in opzioni"
              :key="o.id"
              @click="goToOpzione(o.slug)"
              class="px-6 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              {{ o.name }}
            </li>
          </ul>
        </div>
      </div>

      <!-- Cambio lingua mobile -->
      <div class="flex px-4 py-2 space-x-2">
        <button @click="switchLanguage('it')" class="hover:text-blue-600">IT</button>
        <button @click="switchLanguage('zh')" class="hover:text-blue-600">中文</button>
      </div>
    </div>
  </nav>
</template>
