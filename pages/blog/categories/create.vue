<template>
  <div class="relative w-full min-h-screen bg-gradient-to-br from-[#050505] via-[#0a0000] to-[#1a0000] px-8 py-16 overflow-hidden">
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-[#ff0000]/20 rounded-full filter blur-[180px] animate-pulse"></div>
      <div class="absolute bottom-[-120px] right-[-120px] w-[500px] h-[500px] bg-[#d4af37]/20 rounded-full filter blur-[200px] animate-pulse delay-1000"></div>
    </div>

    <div class="max-w-7xl mx-auto relative z-10">
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
        <h1 class="text-4xl font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-[#ff0000] drop-shadow-lg">
          Створити категорію
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
                <label class="block text-sm font-medium text-[#d4af37] mb-2">Назва категорії *</label>
                <UInput
                  v-model="formData.title"
                  placeholder="Введіть назву категорії"
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
                <div v-if="errors.title" class="mt-1 text-red-400 text-sm">{{ errors.title }}</div>
              </div>

              <div>
                <label class="block text-sm font-medium text-[#d4af37] mb-2">Псевдонім</label>
                <UInput
                  v-model="formData.slug"
                  placeholder="category-slug"
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
                <p class="text-gray-400 text-sm mt-1">URL-дружній ідентифікатор (автоматично генерується з назви)</p>
                <div v-if="errors.slug" class="mt-1 text-red-400 text-sm">{{ errors.slug }}</div>
              </div>

              <div>
                <label class="block text-sm font-medium text-[#d4af37] mb-2">Батьківська категорія</label>
                <USelectMenu
                  v-model="formData.parent_id"
                  :options="parentCategoryOptions"
                  placeholder="Оберіть батьківську категорію"
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
                <div v-if="errors.parent_id" class="mt-1 text-red-400 text-sm">{{ errors.parent_id }}</div>
              </div>

              <div>
                <label class="block text-sm font-medium text-[#d4af37] mb-2">Опис</label>
                <UTextarea
                  v-model="formData.description"
                  placeholder="Введіть опис категорії"
                  :rows="6"
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
                <div v-if="errors.description" class="mt-1 text-red-400 text-sm">{{ errors.description }}</div>
              </div>
            </div>
          </UCard>
        </div>

        <div class="space-y-6">
          <UCard class="bg-[#1a1a1a]/80 backdrop-blur-lg border border-[#ff0000]/10">
            <template #header>
              <h3 class="text-lg font-semibold text-[#d4af37]">Дії</h3>
            </template>

            <div class="space-y-4">
              <UButton
                @click="createCategory"
                :loading="creating"
                :disabled="creating || !isFormValid"
                block
                class="bg-gradient-to-r from-[#ff0000] to-[#d4af37] text-black font-semibold py-3 px-6 rounded-lg shadow-lg hover:from-[#e60000] hover:to-[#c39f2e] transition-all duration-300 disabled:opacity-50"
              >
                {{ creating ? 'Створення...' : 'Створити категорію' }}
              </UButton>
            </div>
          </UCard>

          <UCard class="bg-[#1a1a1a]/80 backdrop-blur-lg border border-[#ff0000]/10">
            <template #header>
              <h3 class="text-sm font-medium text-[#d4af37]">Інформація</h3>
            </template>

            <div class="space-y-3 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-400">Тип:</span>
                <span class="text-white">Категорія блогу</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-400">Статус:</span>
                <span class="text-white">Нова категорія</span>
              </div>
            </div>
          </UCard>

          <UCard class="bg-[#1a1a1a]/80 backdrop-blur-lg border border-[#ff0000]/10">
            <template #header>
              <h3 class="text-sm font-medium text-[#d4af37]">Дії</h3>
            </template>

            <div class="space-y-3">
              <UButton
                to="/blog/categories"
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
import { categorySchema } from '~/schemas/category.js'

const config = useRuntimeConfig()
const router = useRouter()
const toast = useToast()

const creating = ref(false)
const errors = ref({})

const formData = reactive({
  title: '',
  slug: '',
  parent_id: null,
  description: ''
})

const onTitleChange = (event) => {
  const newTitle = event.target.value

  if (newTitle && (!formData.slug || formData.slug === '')) {
    formData.slug = newTitle
      .toLowerCase()
      .replace(/[^a-z0-9а-яё]/gi, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
  }

  validateField('title', newTitle)
}

const { data: categoriesData } = await useFetch(
  `${config.public.apiBase}/blog/categories`,
  { server: false }
)

const parentCategoryOptions = computed(() => {
  const categories = categoriesData.value?.data || categoriesData.value || []
  return [
    { label: 'Без батьківської категорії', value: null },
    ...categories.map((cat) => ({
      label: cat.title,
      value: cat.id
    }))
  ]
})

const selectedCategoryLabel = computed(() => {
  if (!formData.parent_id) {
    return 'Без батьківської категорії'
  }

  const selectedOption = parentCategoryOptions.value.find(option => option.value === formData.parent_id)
  return selectedOption?.label || 'Оберіть батьківську категорію'
})

const validateField = (field, value) => {
  try {
    const fieldSchema = categorySchema.shape[field]
    if (fieldSchema) {
      fieldSchema.parse(value)
      delete errors.value[field]
    }
  } catch (error) {
    if (error.errors && error.errors[0]) {
      errors.value[field] = error.errors[0].message
    }
  }
}

const validateForm = () => {
  try {
    categorySchema.parse(formData)
    errors.value = {}
    return true
  } catch (error) {
    const newErrors = {}
    if (error.errors) {
      error.errors.forEach((err) => {
        newErrors[err.path[0]] = err.message
      })
    }
    errors.value = newErrors
    return false
  }
}

const isFormValid = computed(() => {
  return formData.title.trim().length >= 3 && Object.keys(errors.value).length === 0
})

watch(() => formData.slug, (newSlug) => {
  validateField('slug', newSlug)
})

watch(() => formData.description, (newDescription) => {
  validateField('description', newDescription)
})

const createCategory = async () => {
  if (!validateForm()) {
    toast.add({
      title: 'Помилка валідації',
      description: 'Будь ласка, виправте помилки у формі',
      color: 'red'
    })
    return
  }

  creating.value = true

  try {
    const payload = {
      title: formData.title.trim(),
      slug: formData.slug.trim(),
      parent_id: formData.parent_id,
      description: formData.description.trim()
    }

    await $fetch(`${config.public.apiBase}/blog/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: payload
    })

    toast.add({
      title: 'Успіх',
      description: 'Категорію успішно створено',
      color: 'green'
    })

    await navigateTo('/blog/categories')
  } catch (err) {
    let errorMessage = 'Не вдалося створити категорію'

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

useHead({
  title: 'Створити категорію'
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
