<template>
  <div class="container mx-auto px-4 py-6">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">Пости</h1>
      <a href="/admin/blog/posts/create" target="_self" class="...">
        Додати пост
      </a>
    </div>

    <div class="overflow-x-auto rounded shadow">
      <table class="min-w-full table-auto border-collapse border border-gray-300">
        <thead class="bg-gray-100 text-gray-800 font-semibold">
          <tr>
            <th class="p-3 border">#</th>
            <th class="p-3 border">Автор</th>
            <th class="p-3 border">Категорія</th>
            <th class="p-3 border">Заголовок</th>
            <th class="p-3 border">Дата публікації</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="post in posts" :key="post.id" class="hover:bg-gray-50">
            <td class="p-3 border text-center">{{ post.id }}</td>
            <td class="p-3 border">{{ post.user?.name || '—' }}</td>
            <td class="p-3 border">{{ post.category?.title || '—' }}</td>
            <td class="p-3 border">
              <a :href="`/blog/posts/${post.id}`" class="text-blue-600 hover:underline">
                {{ post.title }}
              </a>
            </td>
            <td class="p-3 border">{{ post.published_at }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Post {
  id: number
  title: string
  published_at: string
  user?: { name: string }
  category?: { title: string }
}

const posts = ref<Post[]>([])

const config = useRuntimeConfig()
const apiUrl = `${config.public.apiBase}/blog/posts`

const getPosts = async () => {
  try {
    const response = await $fetch<Post[]>(apiUrl)
    posts.value = response
  } catch (error) {
    console.error('Помилка при завантаженні постів:', error)
  }
}

onMounted(getPosts)
</script>
