<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import api from '../api'

interface WechatQRCode {
  url: string
  name: string
}

interface Assicurazione {
  id: number
  title: string
  slug: string
  description: string
  wechat_qrcode?: WechatQRCode
}

const { t, locale } = useI18n()
const route = useRoute()
const assicurazione = ref<Assicurazione | null>(null)

// Helper per URL completo da Strapi
const getMediaUrl = (path: string) =>
  path ? (path.startsWith('http') ? path : `http://localhost:1337${path}`) : ''

const fetchAssicurazione = async () => {
  const slug = route.params.slug as string

  // Popoliamo assicurazioni e il suo wechat_qrcode
  const res = await api.get(
    `/opzioni-assicurazionis?filters[slug][$eq]=${slug}&locale=${locale.value}&populate[assicurazioni][populate]=wechat_qrcode`
  )

  if (res.data.data.length > 0) {
    const opzioneData = res.data.data[0]
    const assicurazioneData = opzioneData.assicurazioni

    assicurazione.value = {
      id: assicurazioneData.id,
      title: assicurazioneData.title,
      slug: assicurazioneData.slug,
      description: assicurazioneData.description,
      wechat_qrcode: assicurazioneData.wechat_qrcode
        ? {
            url: assicurazioneData.wechat_qrcode.url,
            name: assicurazioneData.wechat_qrcode.name
          }
        : undefined
    }
  } else {
    assicurazione.value = null
  }
}

// 🔹 iniziale
onMounted(fetchAssicurazione)

// 🔹 ricarica quando cambia lingua o slug
watch(() => locale.value, fetchAssicurazione)
watch(() => route.params.slug, fetchAssicurazione)
</script>

<template>
  <div class="max-w-4xl mx-auto py-12 px-4">
    <div v-if="assicurazione">
      <h1 class="text-3xl font-bold mb-4">{{ assicurazione.title }}</h1>
      <div class="prose max-w-none" v-html="assicurazione.description"></div>

      <!-- Se QR Code presente -->
      <div v-if="assicurazione.wechat_qrcode" class="mt-10 flex flex-col items-center bg-gray-50 rounded-lg p-6">
        <h2 class="text-lg font-semibold text-gray-700 mb-3">
          {{ t('wechat.qrcode') }}
        </h2>
        <img
          :src="getMediaUrl(assicurazione.wechat_qrcode.url)"
          :alt="assicurazione.wechat_qrcode.name"
          class="w-48 h-48 object-contain border rounded-lg shadow-sm"
        />
      </div>
    </div>

    <div v-else class="text-center text-gray-500">
      {{ t('wechat.error') }}
    </div>
  </div>
</template>
