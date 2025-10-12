<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import api from '../api'

// Tipizzazione base della struttura del blog
interface BlogCover {
  url: string
  name: string
}

interface Blog {
  id: number
  documentId: string
  title: string
  content: string
  cover?: BlogCover
  createdAt: string
}

// Stato
const route = useRoute()
const { locale } = useI18n()
const post = ref<Blog | null>(null)

// Helper per ottenere URL completo dell'immagine
const getMediaUrl = (path: string) => `http://localhost:1337${path}`

// Fetch singolo post usando documentId + locale
const fetchPost = async () => {
  const documentId = route.params.id as string

  const res = await api.get(
    `/blogs?filters[documentId][$eq]=${documentId}&locale=${locale.value}&populate=*`
  )

  if (res.data.data.length > 0) {
    const data = res.data.data[0]
    post.value = {
      id: data.id,
      documentId: data.documentId,
      title: data.title,
      content: data.content,
      createdAt: data.createdAt,
      cover: data.cover
        ? {
            url: data.cover.url,
            name: data.cover.name
          }
        : undefined
    }
  } else {
    post.value = null
  }
}

onMounted(fetchPost)

// Ricarica l’articolo quando cambia lingua
watch(locale, fetchPost)
</script>

<template>
  <div class="max-w-4xl mx-auto py-12 px-4">
    <div v-if="post">
      <h1 class="text-4xl font-bold mb-6">{{ post.title }}</h1>

      <img
        v-if="post.cover?.url"
        :src="getMediaUrl(post.cover.url)"
        :alt="post.cover.name"
        class="w-full h-64 md:h-96 object-cover rounded-lg mb-6 shadow"
      />


      <p class="text-lg whitespace-pre-line">
        {{ post.content }}
      </p>
    </div>

    <div v-else class="text-center py-20">
      <p class="text-gray-500 text-lg">Articolo non trovato 😢</p>
    </div>
  </div>
</template>
