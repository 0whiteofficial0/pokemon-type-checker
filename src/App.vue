<script setup>
// ============================================
// Imports
// ============================================
import { RouterView, RouterLink } from 'vue-router'
import { useSearchStore } from '@/stores/search'

const searchStore = useSearchStore()
</script>

<template>
  <div id="app">
    <!-- 네비게이션 바 -->
    <nav>
      <!-- 로고 -->
      <div class="nav-logo">
        ⚔️ 포켓몬 챔피언스
      </div>

      <!-- 네비게이션 링크 -->
      <div class="nav-links">
        <!-- 홈 클릭 시 검색 결과 초기화 -->
        <RouterLink to="/" @click="searchStore.triggerReset()">홈</RouterLink>
        <RouterLink to="/chart">상성표</RouterLink>
      </div>
    </nav>

    <!-- 페이지 컨텐츠 -->
    <RouterView />
  </div>
</template>

<style scoped>
/* ============================================
   전체 앱 레이아웃
   ============================================ */
#app {
  min-height: 100vh;
  background-color: #0f0f1a;
  background-image: radial-gradient(ellipse at top, #1a1a3e 0%, #0f0f1a 70%);
}

/* ============================================
   네비게이션 바
   ============================================ */
nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 40px;
  background-color: rgba(22, 33, 62, 0.95);
  border-bottom: 2px solid #e63946;
  backdrop-filter: blur(10px);
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-logo {
  color: white;
  font-size: 1.1rem;
  font-weight: bold;
  letter-spacing: 1px;
}

.nav-links {
  display: flex;
  gap: 24px;
}

nav a {
  color: #aaa;
  text-decoration: none;
  font-weight: bold;
  font-size: 0.95rem;
  transition: color 0.2s;
}

nav a:hover {
  color: white;
}

/* 현재 활성화된 페이지 링크 강조 */
nav a.router-link-active {
  color: #e63946;
}
</style>