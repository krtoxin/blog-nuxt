<template>
  <div class="max-w-3xl mx-auto py-10 px-4">
    <div v-if="post" class="space-y-6">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">{{ post.title }}</h1>
        <div class="text-sm text-gray-500 dark:text-gray-400 mt-2">
          <span>Автор: <span class="font-medium">{{ post.user.name }}</span></span> ·
          <span>Категорія: <span class="font-medium">{{ post.category.title }}</span></span> ·
          <span>Опубліковано: {{ formatDate(post.published_at) }}</span>
        </div>
      </div>

      <div class="prose dark:prose-invert max-w-none" v-html="post.content_raw"></div>
    </div>

    <div v-else class="text-center text-gray-500 dark:text-gray-400">
      <span class="animate-pulse">Завантаження...</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useRuntimeConfig } from '#imports'

interface Post {
  title: string
  user: {
    name: string
  }
  category: {
    title: string
  }
  published_at: string
  content_raw: string
}

const route = useRoute()
const post = ref<Post | null>(null)

const getPost = async () => {
  const config = useRuntimeConfig()
  const id = route.params.id
  const apiUrl = `${config.public.apiBase}/blog/posts/${id}`

  try {
    const data = await $fetch<Post>(apiUrl)
    post.value = data
  } catch (error) {
    console.error('Помилка завантаження поста:', error)
  }
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('uk-UA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

onMounted(() => {
  getPost()
})
</script>
