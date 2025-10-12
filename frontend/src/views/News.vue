<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import api, { getMediaUrl } from '../api'

interface BlogCard {
  id: number
  documentId: string
  title: string
  cover?: {
    url: string
    name: string
  }
}

const { locale } = useI18n()
const news = ref<any[]>([])
const router = useRouter()

async function fetchNews() {
  const res = await api.get(`/blogs?locale=${locale.value}&populate=*`)
  news.value = res.data.data.map((n: any) => ({
    id: n.id,
    documentId: n.documentId,
    title: n.title,
    content: n.content,
    cover: n.cover ? { url: n.cover.url, name: n.cover.name } : undefined
  }))
  console.log(news.value)
}

function goToDetail(n: BlogCard) {
    console.log(n,'hey')
  router.push(`/blog/${n.documentId}`)
}

onMounted(fetchNews)
watch(locale, fetchNews)
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-10">
    <h1 class="text-3xl font-bold mb-8 text-center">{{ $t('nav.blog') }}</h1>

    <div>
  <div
    v-for="(n, index) in news"
    :key="n.id"
    class="cursor-pointer hover:bg-gray-50 rounded-lg transition"
    @click="goToDetail(n)"
  >
    <div class="flex flex-col md:flex-row items-start gap-4 py-6">
      <img
        v-if="n.cover"
        :src="getMediaUrl(n.cover.url)"
        :alt="n.cover.name"
        class="w-full md:w-48 h-28 object-cover rounded-lg"
      />
      <div class="flex-1">
        <h2 class="text-2xl font-semibold mb-2 text-blue-700 hover:underline">
          {{ n.title }}
        </h2>
        <p class="text-gray-600 line-clamp-3">
          {{ n.content }}
        </p>
      </div>
    </div>

    <!-- ✅ hr solo se NON è l'ultimo -->
    <hr v-if="index !== news.length - 1" class="border-gray-200" />
  </div>
</div>

    <p v-if="news.length === 0" class="text-center text-gray-500">
      Nessun articolo disponibile
    </p>
  </div>
</template>
