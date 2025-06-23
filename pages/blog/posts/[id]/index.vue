<template>
  <div class="relative w-full min-h-screen bg-gradient-to-br from-[#050505] via-[#0a0000] to-[#1a0000] px-8 py-16 overflow-hidden">
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-[#ff0000]/20 rounded-full filter blur-[180px] animate-pulse"></div>
      <div class="absolute bottom-[-120px] right-[-120px] w-[500px] h-[500px] bg-[#d4af37]/20 rounded-full filter blur-[200px] animate-pulse delay-1000"></div>
    </div>

    <div class="max-w-4xl mx-auto relative z-10">
      <div class="flex items-center gap-4 mb-16">
        <NuxtLink
          to="/blog/posts"
          class="text-[#d4af37] hover:text-[#ff0000] flex items-center gap-2 transition-colors duration-200"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
          Назад до постів
        </NuxtLink>
        <div class="flex items-center gap-4">
          <h1 class="text-4xl font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-[#ff0000] drop-shadow-lg">
            Перегляд поста
          </h1>
          <NuxtLink
            v-if="post"
            :to="`/blog/posts/${post.id}/edit`"
            class="bg-gradient-to-r from-[#ff0000] to-[#d4af37] text-black font-semibold py-2 px-4 rounded-full shadow-lg hover:from-[#e60000] hover:to-[#c39f2e] hover:scale-105 transition-all duration-300 ease-out text-sm"
          >
            Редагувати
          </NuxtLink>
        </div>
      </div>

      <div v-if="pending" class="text-center">
        <div class="text-[#d4af37] text-lg animate-pulse">Завантаження...</div>
      </div>

      <div v-else-if="error" class="text-center">
        <div class="text-red-400 text-lg">Помилка завантаження поста</div>
      </div>

      <div v-else-if="post" class="bg-[#1a1a1a]/80 backdrop-blur-lg border border-[#ff0000]/10 rounded-2xl shadow-xl overflow-hidden">
        <div class="p-8">
          <div class="mb-8">
            <h1 class="text-4xl font-bold text-white mb-4">{{ post.title }}</h1>
            <div class="flex flex-wrap gap-4 text-sm text-gray-400">
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
                <span>Автор: <span class="text-[#d4af37] font-medium">{{ post.user?.name || 'Невідомо' }}</span></span>
              </div>
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <span>Категорія: <span class="text-[#d4af37] font-medium">{{ post.category?.title || 'Без категорії' }}</span></span>
              </div>
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                </svg>
                <span>Опубліковано: <span class="text-[#ff0000]/80 font-medium">{{ formatDate(post.published_at) }}</span></span>
              </div>
              <div class="flex items-center gap-2">
                <UBadge
                  :color="post.is_published ? 'green' : 'gray'"
                  variant="soft"
                  class="text-xs"
                >
                  {{ post.is_published ? 'Опубліковано' : 'Чернетка' }}
                </UBadge>
              </div>
            </div>
          </div>

          <div v-if="post.excerpt" class="mb-8">
            <h3 class="text-lg font-semibold text-[#d4af37] mb-3">Короткий опис</h3>
            <p class="text-gray-300 text-lg leading-relaxed">{{ post.excerpt }}</p>
          </div>

          <div class="mb-8">
            <h3 class="text-lg font-semibold text-[#d4af37] mb-4">Контент</h3>
            <div class="prose prose-lg max-w-none text-white prose-headings:text-[#d4af37] prose-links:text-[#ff0000] prose-strong:text-white prose-em:text-gray-300">
              <div class="whitespace-pre-wrap text-gray-200 leading-relaxed">{{ post.content_raw }}</div>
            </div>
          </div>

          <div class="border-t border-[#ff0000]/20 pt-6">
            <div class="flex justify-between items-center">
              <div class="text-sm text-gray-400">
                <span>Створено: {{ formatDate(post.created_at) }}</span>
                <span v-if="post.updated_at && post.updated_at !== post.created_at" class="ml-4">
                  Оновлено: {{ formatDate(post.updated_at) }}
                </span>
              </div>
              <div class="flex gap-3">
                <NuxtLink
                  :to="`/blog/posts/${post.id}/edit`"
                  class="bg-[#d4af37]/20 text-[#d4af37] hover:bg-[#d4af37]/30 px-4 py-2 rounded-lg transition-colors duration-200 text-sm font-medium"
                >
                  Редагувати пост
                </NuxtLink>
                <button
                  @click="handleDelete"
                  class="bg-red-500/20 text-red-400 hover:bg-red-500/30 px-4 py-2 rounded-lg transition-colors duration-200 text-sm font-medium"
                >
                  Видалити пост
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="text-center">
        <div class="text-red-400 text-lg">Пост не знайдено</div>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const router = useRouter()
const toast = useToast()
const config = useRuntimeConfig()

const { data: post, pending, error } = await useFetch(`${config.public.apiBase}/blog/posts/${route.params.id}`, {
  server: false
})

const formatDate = (dateString) => {
  if (!dateString) return '—'
  return new Date(dateString).toLocaleDateString('uk-UA', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const handleDelete = async () => {
  if (!post.value) return

  if (!confirm(`Ви впевнені, що хочете видалити "${post.value.title}"?`)) {
    return
  }

  try {
    await $fetch(`${config.public.apiBase}/blog/posts/${post.value.id}`, {
      method: 'DELETE'
    })

    toast.add({
      title: 'Успіх',
      description: 'Пост успішно видалено',
      color: 'green'
    })

    await router.push('/blog/posts')
  } catch (err) {
    toast.add({
      title: 'Помилка',
      description: 'Не вдалося видалити пост',
      color: 'red'
    })
  }
}

useHead({
  title: post.value ? `${post.value.title} - Перегляд поста` : 'Перегляд поста'
})
</script>

<style scoped>
.animate-pulse {
  animation: pulse 6s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.6; }
}

.delay-1000 {
  animation-delay: 1s;
}
</style>
