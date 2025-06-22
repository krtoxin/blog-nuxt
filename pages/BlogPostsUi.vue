<template>
  <div class="relative w-full min-h-screen bg-gradient-to-br from-[#050505] via-[#0a0000] to-[#1a0000] px-8 py-16 overflow-hidden">
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-[#ff0000]/20 rounded-full filter blur-[180px] animate-pulse"></div>
        <div class="absolute bottom-[-120px] right-[-120px] w-[500px] h-[500px] bg-[#d4af37]/20 rounded-full filter blur-[200px] animate-pulse delay-1000"></div>
      </div>

    <div class="max-w-7xl mx-auto relative z-10">
      <div class="flex items-center justify-between mb-16">
        <div class="flex items-center space-x-4">
          <h1 class="text-5xl font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-[#ff0000] drop-shadow-lg">
            Блог Пости
          </h1>
        </div>
        <a
          href="/admin/blog/posts/create"
          class="bg-gradient-to-r from-[#ff0000] to-[#d4af37] text-black font-semibold py-3 px-6 rounded-full shadow-lg hover:from-[#e60000] hover:to-[#c39f2e] hover:scale-105 transition-all duration-300 ease-out"
        >
          Новий пост
        </a>
      </div>

      <div class="bg-[#1a1a1a]/80 backdrop-blur-lg border border-[#ff0000]/10 rounded-2xl shadow-xl overflow-hidden">
        <div class="overflow-x-auto">
          <UTable
            :rows="paginatedPosts"
            :columns="columns"
            :loading="loading"
            :ui="{
              divide: 'divide-[#ff0000]/10',
              wrapper: 'bg-transparent',
              header: 'bg-[#0a0a0a] text-[#d4af37] font-semibold tracking-wide',
              row: 'hover:bg-[#ff0000]/5 transition-all duration-200 ease-in-out'
            }"
            class="min-w-full text-white"
          >
            <template #title-data="{ row }">
               <a
                  :href="`blog/posts/${row.id}`"
                  class="text-[#d4af37] hover:text-[#ff0000] font-medium transition-colors duration-200 break-words"
                >
                  {{ row.title }}
                </a>
            </template>
            <template #user.name-data="{ row }">
              <span class="text-gray-300">{{ row.user?.name ?? '—' }}</span>
            </template>
            <template #category.title-data="{ row }">
              <span class="text-gray-300">{{ row.category?.title ?? '—' }}</span>
            </template>
            <template #published_at-data="{ row }">
              <span class="text-[#ff0000]/80">{{ formatDate(row.published_at) }}</span>
            </template>
          </UTable>
        </div>

        <div class="flex justify-center py-6 border-t border-[#ff0000]/10">
          <UPagination
            v-model="page"
            :page-count="pageSize"
            :total="posts.length"
            :ui="{
              wrapper: 'flex items-center gap-2',
              rounded: '!rounded-full min-w-[32px] justify-center bg-white/10 backdrop-blur-md text-white',
              default: {
                activeButton: {
                  variant: 'solid',
                  color: 'primary'
                }
              }
            }"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

const config = useRuntimeConfig()
const apiBase = config.public.apiBase

const page = ref(1)
const pageSize = ref(10)

const { data: postsData, pending: loading, error } = await useFetch<Post[]>(`${apiBase}/blog/posts`)

const posts = computed(() => postsData.value || [])

const paginatedPosts = computed(() => {
  const start = (page.value - 1) * pageSize.value
  return posts.value.slice(start, start + pageSize.value)
})

const columns = [
  { key: 'id', label: '#', class: 'w-16 text-[#d4af37]' },
  { key: 'user.name', label: 'Автор' },
  { key: 'category.title', label: 'Категорія' },
  { key: 'title', label: 'Заголовок' },
  { key: 'published_at', label: 'Дата', class: 'w-36' }
]

const formatDate = (dateString: string) => {
  if (!dateString) return '—'
  return new Date(dateString).toLocaleDateString('uk-UA', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<style>
.dark {
  color-scheme: dark;
}

::selection {
  background-color: rgba(79, 70, 229, 0.4);
}

select {
  background-image: none;
}

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

.break-words {
  word-break: break-word;
  white-space: normal;
}
</style>