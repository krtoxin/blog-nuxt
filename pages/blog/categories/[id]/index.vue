<template>
  <div class="relative w-full min-h-screen bg-gradient-to-br from-[#050505] via-[#0a0000] to-[#1a0000] px-8 py-16 overflow-hidden">
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-[#ff0000]/20 rounded-full filter blur-[180px] animate-pulse"></div>
      <div class="absolute bottom-[-120px] right-[-120px] w-[500px] h-[500px] bg-[#d4af37]/20 rounded-full filter blur-[200px] animate-pulse delay-1000"></div>
    </div>

    <div class="max-w-4xl mx-auto relative z-10">
      <div class="flex items-center gap-4 mb-16">
        <NuxtLink
          to="/blog/categories"
          class="text-[#d4af37] hover:text-[#ff0000] flex items-center gap-2 transition-colors duration-200"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
          Назад до категорій
        </NuxtLink>
        <div class="flex items-center gap-4">
          <h1 class="text-4xl font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-[#ff0000] drop-shadow-lg">
            Перегляд категорії
          </h1>
          <NuxtLink
            v-if="category"
            :to="`/blog/categories/${category.id}/edit`"
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
        <div class="text-red-400 text-lg">Помилка завантаження категорії</div>
      </div>

      <div v-else-if="category" class="bg-[#1a1a1a]/80 backdrop-blur-lg border border-[#ff0000]/10 rounded-2xl shadow-xl overflow-hidden">
        <div class="p-8">
          <div class="mb-8">
            <h1 class="text-4xl font-bold text-white mb-4">{{ category.title }}</h1>
            <div class="flex flex-wrap gap-4 text-sm text-gray-400">
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <span>ID: <span class="text-[#d4af37] font-medium">{{ category.id }}</span></span>
              </div>
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z"/>
                </svg>
                <span>Псевдонім: <span class="text-[#ff0000]/80 font-medium">{{ category.slug || '—' }}</span></span>
              </div>
              <div v-if="category.parent_category" class="flex items-center gap-2">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M10 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2h-8l-2-2z"/>
                </svg>
                <span>Батьківська: <span class="text-[#d4af37] font-medium">{{ category.parent_category.title }}</span></span>
              </div>
            </div>
          </div>

          <div v-if="category.description" class="mb-8">
            <h3 class="text-lg font-semibold text-[#d4af37] mb-3">Опис</h3>
            <p class="text-gray-300 text-lg leading-relaxed">{{ category.description }}</p>
          </div>

          <div class="border-t border-[#ff0000]/20 pt-6">
            <div class="flex justify-between items-center">
              <div class="text-sm text-gray-400">
                <span>Створено: {{ formatDate(category.created_at) }}</span>
                <span v-if="category.updated_at && category.updated_at !== category.created_at" class="ml-4">
                  Оновлено: {{ formatDate(category.updated_at) }}
                </span>
              </div>
              <div class="flex gap-3">
                <NuxtLink
                  :to="`/blog/categories/${category.id}/edit`"
                  class="bg-[#d4af37]/20 text-[#d4af37] hover:bg-[#d4af37]/30 px-4 py-2 rounded-lg transition-colors duration-200 text-sm font-medium"
                >
                  Редагувати категорію
                </NuxtLink>
                <button
                  @click="handleDelete"
                  class="bg-red-500/20 text-red-400 hover:bg-red-500/30 px-4 py-2 rounded-lg transition-colors duration-200 text-sm font-medium"
                >
                  Видалити категорію
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="text-center">
        <div class="text-red-400 text-lg">Категорію не знайдено</div>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const router = useRouter()
const toast = useToast()
const config = useRuntimeConfig()

const { data: category, pending, error } = await useFetch(`${config.public.apiBase}/blog/categories/${route.params.id}`, {
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
  if (!category.value) return

  if (!confirm(`Ви впевнені, що хочете видалити "${category.value.title}"?`)) {
    return
  }

  try {
    await $fetch(`${config.public.apiBase}/blog/categories/${category.value.id}`, {
      method: 'DELETE'
    })

    toast.add({
      title: 'Успіх',
      description: 'Категорію успішно видалено',
      color: 'green'
    })

    await router.push('/blog/categories')
  } catch (err) {
    toast.add({
      title: 'Помилка',
      description: 'Не вдалося видалити категорію',
      color: 'red'
    })
  }
}

useHead({
  title: category.value ? `${category.value.title} - Перегляд категорії` : 'Перегляд категорії'
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
