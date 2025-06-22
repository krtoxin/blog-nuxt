<template>
  <div class="flex flex-col items-center justify-center min-h-screen space-y-6 p-6">
    <h1 class="text-3xl font-bold mb-6">Виберіть розділ</h1>

    <button
      @click="goToPlainTable"
      class="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
    >
      Таблиця без Nuxt UI
    </button>

    <button
      @click="goToUiTable"
      class="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition"
    >
      Таблиця з Nuxt UI
    </button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function goToPlainTable() {
  router.push('/BlogPosts')
}

function goToUiTable() {
  router.push('/BlogPostsUi')
}
</script>
