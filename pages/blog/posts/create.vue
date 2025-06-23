<template>
  <div class="relative w-full min-h-screen bg-gradient-to-br from-[#050505] via-[#0a0000] to-[#1a0000] px-8 py-16 overflow-hidden">
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-[#ff0000]/20 rounded-full filter blur-[180px] animate-pulse"></div>
      <div class="absolute bottom-[-120px] right-[-120px] w-[500px] h-[500px] bg-[#d4af37]/20 rounded-full filter blur-[200px] animate-pulse delay-1000"></div>
    </div>

    <div class="max-w-7xl mx-auto relative z-10">
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
        <h1 class="text-4xl font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-[#ff0000] drop-shadow-lg">
          Створити пост
        </h1>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2">
          <UCard class="bg-[#1a1a1a]/80 backdrop-blur-lg border border-[#ff0000]/10">
            <template #header>
              <h3 class="text-lg font-semibold text-[#d4af37]">Основні дані</h3>
            </template>

            <div class="space-y-6">
              <div>
                <label class="block text-sm font-medium text-[#d4af37] mb-2">Заголовок *</label>
                <UInput
                  v-model="title"
                  placeholder="Введіть заголовок поста"
                  @input="onTitleChange"
                  :ui="{
                    base: 'relative block w-full',
                    rounded: 'rounded-lg',
                    placeholder: 'placeholder-gray-500',
                    color: {
                      white: {
                        outline: 'shadow-sm bg-[#0a0a0a]/50 text-white ring-1 ring-[#ff0000]/20 focus:ring-2 focus:ring-[#d4af37] border-0'
                      }
                    },
                    size: { md: 'text-sm px-4 py-3' }
                  }"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-[#d4af37] mb-2">Псевдонім</label>
                <UInput
                  v-model="slug"
                  placeholder="post-slug"
                  :ui="{
                    base: 'relative block w-full',
                    rounded: 'rounded-lg',
                    placeholder: 'placeholder-gray-500',
                    color: {
                      white: {
                        outline: 'shadow-sm bg-[#0a0a0a]/50 text-white ring-1 ring-[#ff0000]/20 focus:ring-2 focus:ring-[#d4af37] border-0'
                      }
                    },
                    size: { md: 'text-sm px-4 py-3' }
                  }"
                />
                <p class="text-gray-400 text-sm mt-1">URL-дружній ідентифікатор (автоматично генерується з заголовка)</p>
              </div>

              <div>
                <label class="block text-sm font-medium text-[#d4af37] mb-2">Категорія *</label>
                <USelectMenu
                  v-model="categoryId"
                  :options="categoryOptions"
                  placeholder="Оберіть категорію"
                  value-attribute="value"
                  option-attribute="label"
                  searchable
                  clear-search-on-close
                  :ui="{
                    trigger: 'bg-[#0a0a0a]/50 text-white ring-1 ring-[#ff0000]/20 focus:ring-2 focus:ring-[#d4af37] border-0 rounded-lg px-4 py-3 h-12 text-base flex items-center justify-between w-full',
                    width: 'w-full min-w-0',
                    height: 'max-h-60',
                    base: 'relative',
                    background: 'bg-[#1a1a1a]/98 backdrop-blur-xl',
                    shadow: 'shadow-2xl',
                    rounded: 'rounded-xl',
                    ring: 'ring-2 ring-[#ff0000]/30',
                    padding: 'p-2',
                    option: {
                      base: 'cursor-pointer select-none relative py-3 pl-4 pr-9 text-white rounded-lg mx-1',
                      active: 'bg-[#ff0000]/20 text-[#d4af37]',
                      inactive: 'hover:bg-[#ff0000]/10 hover:text-[#d4af37]',
                      selected: 'bg-[#d4af37]/20 text-[#d4af37] font-medium',
                      disabled: 'text-gray-500 cursor-not-allowed opacity-50',
                      size: 'text-base',
                      padding: 'py-3 px-4'
                    },
                    input: 'block w-full bg-transparent border-0 text-white placeholder-gray-400 focus:ring-0 text-base px-4 py-2',
                    empty: 'py-6 text-center text-gray-400 text-base'
                  }"
                >
                  <template #label>
                    <span class="block truncate text-white text-base">
                      {{ selectedCategoryLabel }}
                    </span>
                  </template>

                  <template #option="{ option }">
                    <span class="block truncate text-base">{{ option.label }}</span>
                  </template>
                </USelectMenu>
              </div>

              <div>
                <label class="block text-sm font-medium text-[#d4af37] mb-2">Короткий опис</label>
                <UTextarea
                  v-model="excerpt"
                  placeholder="Короткий опис поста"
                  :rows="3"
                  :ui="{
                    base: 'relative block w-full',
                    rounded: 'rounded-lg',
                    placeholder: 'placeholder-gray-500',
                    color: {
                      white: {
                        outline: 'shadow-sm bg-[#0a0a0a]/50 text-white ring-1 ring-[#ff0000]/20 focus:ring-2 focus:ring-[#d4af37] border-0'
                      }
                    },
                    size: { md: 'text-sm px-4 py-3' }
                  }"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-[#d4af37] mb-2">Контент *</label>
                <UTextarea
                  v-model="contentRaw"
                  placeholder="Введіть контент поста"
                  :rows="12"
                  :ui="{
                    base: 'relative block w-full',
                    rounded: 'rounded-lg',
                    placeholder: 'placeholder-gray-500',
                    color: {
                      white: {
                        outline: 'shadow-sm bg-[#0a0a0a]/50 text-white ring-1 ring-[#ff0000]/20 focus:ring-2 focus:ring-[#d4af37] border-0'
                      }
                    },
                    size: { md: 'text-sm px-4 py-3' }
                  }"
                />
              </div>
            </div>
          </UCard>
        </div>

        <div class="space-y-6">
          <UCard class="bg-[#1a1a1a]/80 backdrop-blur-lg border border-[#ff0000]/10">
            <template #header>
              <h3 class="text-lg font-semibold text-[#d4af37]">Публікація</h3>
            </template>

            <div class="space-y-4">
              <div class="flex items-center space-x-3">
                <input
                  type="checkbox"
                  v-model="isPublished"
                  id="is_published"
                  class="h-4 w-4 text-[#d4af37] focus:ring-[#d4af37] border-gray-300 rounded"
                />
                <label for="is_published" class="text-white text-sm font-medium">Опублікувати пост</label>
              </div>
              <div class="text-xs text-gray-400">
                Поточний стан: {{ isPublished ? 'Буде опубліковано' : 'Чернетка' }}
              </div>

              <UButton
                @click="createPost"
                :loading="creating"
                :disabled="creating || !title.trim() || !contentRaw.trim() || !categoryId"
                block
                class="bg-gradient-to-r from-[#ff0000] to-[#d4af37] text-black font-semibold py-3 px-6 rounded-lg shadow-lg hover:from-[#e60000] hover:to-[#c39f2e] transition-all duration-300 disabled:opacity-50"
              >
                {{ creating ? 'Створення...' : 'Зберегти пост' }}
              </UButton>
            </div>
          </UCard>

          <UCard class="bg-[#1a1a1a]/80 backdrop-blur-lg border border-[#ff0000]/10">
            <template #header>
              <h3 class="text-sm font-medium text-[#d4af37]">Інформація</h3>
            </template>

            <div class="space-y-3 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-400">Статус:</span>
                <span class="text-white">{{ isPublished ? 'Буде опубліковано' : 'Чернетка' }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-400">Тип:</span>
                <span class="text-white">Пост блогу</span>
              </div>
            </div>
          </UCard>

          <UCard class="bg-[#1a1a1a]/80 backdrop-blur-lg border border-[#ff0000]/10">
            <template #header>
              <h3 class="text-sm font-medium text-[#d4af37]">Дії</h3>
            </template>

            <div class="space-y-3">
              <UButton
                to="/blog/posts"
                variant="outline"
                block
                class="border-[#ff0000]/20 text-white hover:bg-[#ff0000]/10 hover:border-[#ff0000]/40"
              >
                Скасувати
              </UButton>
            </div>
          </UCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const config = useRuntimeConfig()
const router = useRouter()
const toast = useToast()

const creating = ref(false)
const title = ref('')
const slug = ref('')
const categoryId = ref(null)
const excerpt = ref('')
const contentRaw = ref('')
const isPublished = ref(false)

const onTitleChange = (event) => {
  const newTitle = event.target.value

  if (newTitle && (!slug.value || slug.value === '')) {
    slug.value = newTitle
      .toLowerCase()
      .replace(/[^a-z0-9а-яё]/gi, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
  }
}

const { data: categoriesData } = await useFetch(
  `${config.public.apiBase}/blog/categories`,
  { server: false }
)

const categoryOptions = computed(() => {
  const categories = categoriesData.value?.data || categoriesData.value || []
  return categories.map((cat) => ({
    label: cat.title,
    value: cat.id
  }))
})

const selectedCategoryLabel = computed(() => {
  if (!categoryId.value) {
    return 'Оберіть категорію'
  }

  const selectedOption = categoryOptions.value.find(option => option.value === categoryId.value)
  return selectedOption?.label || 'Оберіть категорію'
})

const createPost = async () => {
  console.log('isPublished before validation:', isPublished.value)

  if (!title.value.trim() || !contentRaw.value.trim() || !categoryId.value) {
    toast.add({
      title: 'Помилка',
      description: 'Заповніть всі обов\'язкові поля',
      color: 'red'
    })
    return
  }

  creating.value = true

  try {
    const payload = {
      title: title.value.trim(),
      slug: slug.value.trim(),
      category_id: categoryId.value,
      excerpt: excerpt.value.trim(),
      content_raw: contentRaw.value.trim(),
      is_published: isPublished.value ? 1 : 0,
      published_at: isPublished.value ? new Date().toISOString().slice(0, 19).replace('T', ' ') : null
    }

    console.log('Payload being sent:', JSON.stringify(payload, null, 2))
    console.log('API URL:', `${config.public.apiBase}/blog/posts`)

    const response = await $fetch(`${config.public.apiBase}/blog/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: payload
    })

    console.log('Response:', response)

    toast.add({
      title: 'Успіх',
      description: 'Пост успішно створено',
      color: 'green'
    })

    await navigateTo('/blog/posts')
  } catch (err) {
    console.error('Full error object:', err)
    console.error('Error data:', err.data)
    console.error('Error status:', err.status)
    console.error('Error statusText:', err.statusText)
    let errorMessage = 'Не вдалося створити пост'

    if (err.data?.message) {
      errorMessage = err.data.message
    } else if (err.data?.errors) {
      errorMessage = Object.values(err.data.errors).flat().join(', ')
    } else if (err.message) {
      errorMessage = err.message
    }

    toast.add({
      title: 'Помилка',
      description: errorMessage,
      color: 'red'
    })
  } finally {
    creating.value = false
  }
}

watch(isPublished, (newVal) => {
  console.log('isPublished changed to:', newVal)
})

useHead({
  title: 'Створити пост'
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
