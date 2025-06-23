<template>
  <div class="relative w-full min-h-screen bg-gradient-to-br from-[#050505] via-[#0a0000] to-[#1a0000] px-8 py-16 overflow-hidden">
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-[#ff0000]/20 rounded-full filter blur-[180px] animate-pulse"></div>
      <div class="absolute bottom-[-120px] right-[-120px] w-[500px] h-[500px] bg-[#d4af37]/20 rounded-full filter blur-[200px] animate-pulse delay-1000"></div>
    </div>

    <div class="max-w-4xl mx-auto relative z-10">
      <div class="text-center mb-16">
        <h1 class="text-6xl font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-[#ff0000] drop-shadow-lg mb-4">
          Панель управління
        </h1>
        <p class="text-xl text-gray-300">Виберіть розділ для роботи</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="bg-[#1a1a1a]/80 backdrop-blur-lg border border-[#ff0000]/10 rounded-2xl shadow-xl p-8">
          <div class="flex items-center gap-4 mb-6">
            <div class="w-12 h-12 bg-gradient-to-r from-[#ff0000] to-[#d4af37] rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
              </svg>
            </div>
            <h2 class="text-2xl font-bold text-[#d4af37]">Блог</h2>
          </div>

          <p class="text-gray-300 mb-6">Управління контентом блогу</p>

          <div class="space-y-3">
            <NuxtLink
              to="/blog/posts"
              class="block w-full px-6 py-3 bg-gradient-to-r from-[#ff0000]/20 to-[#d4af37]/20 text-white rounded-lg hover:from-[#ff0000]/30 hover:to-[#d4af37]/30 transition-all duration-300 text-center font-medium border border-[#ff0000]/20 hover:border-[#ff0000]/40"
            >
              <div class="flex items-center justify-center gap-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                </svg>
                Пости блогу
              </div>
            </NuxtLink>

            <NuxtLink
              to="/blog/categories"
              class="block w-full px-6 py-3 bg-gradient-to-r from-[#d4af37]/20 to-[#ff0000]/20 text-white rounded-lg hover:from-[#d4af37]/30 hover:to-[#ff0000]/30 transition-all duration-300 text-center font-medium border border-[#d4af37]/20 hover:border-[#d4af37]/40"
            >
              <div class="flex items-center justify-center gap-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 00-2-2v-6a2 2 0 002-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
                </svg>
                Категорії
              </div>
            </NuxtLink>
          </div>
        </div>

        <div class="bg-[#1a1a1a]/80 backdrop-blur-lg border border-[#ff0000]/10 rounded-2xl shadow-xl p-8">
          <div class="flex items-center gap-4 mb-6">
            <div class="w-12 h-12 bg-gradient-to-r from-[#d4af37] to-[#ff0000] rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <h2 class="text-2xl font-bold text-[#d4af37]">Лаба 15</h2>
          </div>

          <p class="text-gray-300 mb-6">Попередні завдання та експерименти</p>

          <div class="space-y-3">
            <NuxtLink
              to="/BlogPosts"
              class="block w-full px-6 py-3 bg-gradient-to-r from-blue-600/20 to-blue-500/20 text-white rounded-lg hover:from-blue-600/30 hover:to-blue-500/30 transition-all duration-300 text-center font-medium border border-blue-500/20 hover:border-blue-500/40"
            >
              <div class="flex items-center justify-center gap-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M3 6h18m-9 8h9"/>
                </svg>
                Таблиця без Nuxt UI
              </div>
            </NuxtLink>

            <NuxtLink
              to="/BlogPostsUi"
              class="block w-full px-6 py-3 bg-gradient-to-r from-green-600/20 to-green-500/20 text-white rounded-lg hover:from-green-600/30 hover:to-green-500/30 transition-all duration-300 text-center font-medium border border-green-500/20 hover:border-green-500/40"
            >
              <div class="flex items-center justify-center gap-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"/>
                </svg>
                Таблиця з Nuxt UI
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>

      <div class="mt-12 text-center">
        <p class="text-gray-400 text-sm">
          Система управління контентом • Версія 2.0
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useHead } from '#app';

useHead({
  title: 'Панель управління'
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
