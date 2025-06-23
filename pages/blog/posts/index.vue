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
        <NuxtLink
          to="/blog/posts/create"
          class="bg-gradient-to-r from-[#ff0000] to-[#d4af37] text-black font-semibold py-3 px-6 rounded-full shadow-lg hover:from-[#e60000] hover:to-[#c39f2e] hover:scale-105 transition-all duration-300 ease-out"
        >
          Новий пост
        </NuxtLink>
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
              row: 'hover:bg-[#ff0000]/5 transition-all duration-200 ease-in-out cursor-pointer'
            }"
            class="min-w-full text-white"
            @select="handleRowClick"
          >
            <template #id-data="{ row }">
              <span class="text-[#d4af37] font-medium">{{ row.id }}</span>
            </template>

            <template #title-data="{ row }">
              <span class="text-white font-medium break-words">{{ row.title }}</span>
            </template>

            <template #user.name-data="{ row }">
              <span class="text-gray-300">{{ row.user?.name ?? '—' }}</span>
            </template>

            <template #category.title-data="{ row }">
              <span class="text-gray-300">{{ row.category?.title ?? '—' }}</span>
            </template>

            <template #is_published-data="{ row }">
              <UBadge
                :color="row.is_published ? 'green' : 'gray'"
                variant="soft"
                class="text-xs"
              >
                {{ row.is_published ? 'Опубліковано' : 'Чернетка' }}
              </UBadge>
            </template>

            <template #published_at-data="{ row }">
              <span class="text-[#ff0000]/80">{{ formatDate(row.published_at) }}</span>
            </template>

            <template #actions-data="{ row }">
              <div class="relative" @click.stop>
                <UDropdown
                  :items="getDropdownActions(row)"
                  :ui="{
                    item: {
                      base: 'group flex items-center gap-2 w-full',
                      padding: 'px-3 py-2',
                      size: 'text-sm',
                      active: 'bg-[#ff0000]/10 text-[#d4af37]',
                      inactive: 'text-gray-300 hover:bg-[#ff0000]/5 hover:text-[#d4af37]',
                      disabled: 'text-gray-500 cursor-not-allowed',
                      icon: {
                        base: 'flex-shrink-0 h-4 w-4',
                        active: 'text-[#d4af37]',
                        inactive: 'text-gray-400 group-hover:text-[#d4af37]'
                      }
                    },
                    container: 'z-50 group',
                    trigger: 'inline-flex w-full',
                    width: 'w-48',
                    background: 'bg-[#1a1a1a]/95 backdrop-blur-lg',
                    shadow: 'shadow-xl',
                    rounded: 'rounded-lg',
                    ring: 'ring-1 ring-[#ff0000]/20',
                    divide: 'divide-y divide-[#ff0000]/10'
                  }"
                  :popper="{
                    placement: 'bottom-start',
                    strategy: 'absolute',
                    offsetDistance: 8
                  }"
                >
                  <button class="text-[#d4af37] hover:text-[#ff0000] hover:bg-[#ff0000]/10 rounded-full w-8 h-8 flex items-center justify-center transition-all duration-200">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                    </svg>
                  </button>
                </UDropdown>
              </div>
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

<script setup>
const config = useRuntimeConfig()
const router = useRouter()
const toast = useToast()
const page = ref(1)
const pageSize = ref(10)

const { data: postsData, pending: loading, error, refresh } = await useFetch(`${config.public.apiBase}/blog/posts`, {
  server: false
})

const posts = computed(() => {
  const allPosts = postsData.value || []
  return allPosts.sort((a, b) => b.id - a.id)
})

const paginatedPosts = computed(() => {
  const start = (page.value - 1) * pageSize.value
  return posts.value.slice(start, start + pageSize.value)
})

const columns = [
  { key: 'id', label: '#', class: 'w-16 text-[#d4af37]' },
  { key: 'user.name', label: 'Автор' },
  { key: 'category.title', label: 'Категорія' },
  { key: 'title', label: 'Заголовок' },
  { key: 'is_published', label: 'Статус', class: 'w-32' },
  { key: 'published_at', label: 'Дата', class: 'w-36' },
  { key: 'actions', label: 'Дії', class: 'w-20 text-center' }
]

const handleRowClick = (row) => {
  router.push(`/blog/posts/${row.id}`)
}

function getDropdownActions(post) {
  return [
    [{
      label: 'Переглянути',
      icon: 'i-heroicons-eye-20-solid',
      click: () => {
        router.push(`/blog/posts/${post.id}`)
      }
    }, {
      label: 'Редагувати',
      icon: 'i-heroicons-pencil-20-solid',
      click: () => {
        router.push(`/blog/posts/${post.id}/edit`)
      }
    }],
    [{
      label: 'Видалити',
      icon: 'i-heroicons-trash-20-solid',
      click: () => handleDelete(post.id, post.title)
    }]
  ]
}

const handleDelete = async (id, title) => {
  if (!confirm(`Ви впевнені, що хочете видалити "${title}"?`)) {
    return
  }

  try {
    await $fetch(`${config.public.apiBase}/blog/posts/${id}`, {
      method: 'DELETE'
    })

    toast.add({
      title: 'Успіх',
      description: 'Пост успішно видалено',
      color: 'green'
    })

    await refresh()
  } catch (err) {
    toast.add({
      title: 'Помилка',
      description: 'Не вдалося видалити пост',
      color: 'red'
    })
  }
}

const formatDate = (dateString) => {
  if (!dateString) return '—'
  return new Date(dateString).toLocaleDateString('uk-UA', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

useHead({
  title: 'Блог Пости'
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

.break-words {
  word-break: break-word;
  white-space: normal;
}
</style>
