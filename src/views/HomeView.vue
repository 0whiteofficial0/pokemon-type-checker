<script setup>
// ============================================
// HomeView 페이지
// ============================================
// 포켓몬 타입 체커 메인 페이지
// - 포켓몬 이름 검색 (한글/영어 지원)
// - 타입 상성 정보 표시 (약점/유리)
// - 내 팀 등록 및 유리한 포켓몬 표시
// - 최근 검색 기록 표시

// ============================================
// Imports
// ============================================

// Vue 핵심
import { computed, ref, watch } from 'vue'

// 스토어
import { useSearchStore } from '@/stores/search'

// 데이터
import { pokemonNames } from '@/data/pokemonNames.js'
import { getTypeMatchups } from '@/data/typeChart.js'

// 컴포넌트
import SearchBar from '@/components/SearchBar.vue'
import PokemonCard from '@/components/PokemonCard.vue'
import TypeSection from '@/components/TypeSection.vue'
import MyRoster from '@/components/MyRoster.vue'
import RosterMatch from '@/components/RosterMatch.vue'

// 스타일
import '@/assets/home.css'

// ============================================
// 상태 (State)
// ============================================

const searchStore = useSearchStore()

const searchQuery = ref('')     // 검색어
const pokemonData = ref(null)   // 검색된 포켓몬 데이터
const typeData = computed(() =>
  pokemonData.value ? getTypeMatchups(pokemonData.value.types.map(({ type }) => type.name)) : null,
)
const errorMessage = ref('')    // 에러 메시지

// ============================================
// 라이프사이클
// ============================================

// 홈 버튼 클릭 시 검색 결과 초기화 (Pinia shouldReset 감지)
watch(() => searchStore.shouldReset, (val) => {
  if (val) {
    pokemonData.value = null
    searchQuery.value = ''
    errorMessage.value = ''
    searchStore.shouldReset = false
  }
})

// ============================================
// 함수 (Functions)
// ============================================

async function search() {
  errorMessage.value = ''

  try {
    // 1. 한글 검색어를 영어로 변환 (없으면 그대로 소문자 사용)
    const query = pokemonNames[searchQuery.value] || searchQuery.value.toLowerCase()

    // 2. 포켓몬 기본 데이터 가져오기
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`)
    if (!response.ok) throw new Error('포켓몬을 찾을 수 없어요')
    const data = await response.json()

    // 3. 한국어 이름 가져오기 (메가진화/성별폼은 기본 포켓몬 이름으로 조회)
    const baseName = data.name
      .split('-mega')[0]
      .replace('-male', '')
      .replace('-female', '')
    const speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${baseName}`)
    const speciesData = await speciesResponse.json()
    const koreanName = speciesData.names.find(n => n.language.name === 'ko')

    // 4. 메가진화면 이름 앞에 '메가' + X/Y 접미사 붙이기
    const isMega = data.name.includes('-mega')
    const suffix = data.name.includes('-mega-x') ? 'X' : data.name.includes('-mega-y') ? 'Y' : ''
    const finalName = isMega ? `메가${koreanName?.name}${suffix}` : koreanName?.name

    // 5. 최종 데이터 저장 및 검색 기록 추가
    pokemonData.value = { ...data, koreanName: finalName }
    searchStore.addSearch(searchQuery.value)

  } catch (error) {
    // 검색 실패 시 에러 메시지 표시 및 데이터 초기화
    errorMessage.value = '포켓몬을 찾을 수 없어요 😢'
    pokemonData.value = null
  }
}
</script>

<template>
  <div class="home">
    <h1>포켓몬 타입 체커</h1>

    <!-- 검색창 컴포넌트 -->
    <SearchBar 
      v-model:searchQuery="searchQuery"
      :errorMessage="errorMessage"
      @search="search"
    />

    <div class="content">
      <!-- 왼쪽: 검색 결과 -->
      <div class="left">

        <!-- 검색 전 안내 화면 -->
        <div v-if="!pokemonData" class="welcome">
          <svg class="pokeball" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="48" fill="none" stroke="#e63946" stroke-width="4"/>
            <path d="M2 50 Q50 50 98 50" fill="none" stroke="#e63946" stroke-width="4"/>
            <circle cx="50" cy="50" r="12" fill="#1a1a2e" stroke="#e63946" stroke-width="4"/>
            <circle cx="50" cy="50" r="6" fill="#e63946"/>
            <path d="M2 50 A48 48 0 0 1 98 50" fill="rgba(230,57,70,0.1)"/>
          </svg>
          <p class="welcome-text">배틀 전 상대 포켓몬의 타입 상성을 확인하세요</p>
          <p class="welcome-sub">포켓몬 챔피언스 전용 타입 체커</p>
        </div>

        <!-- 포켓몬 카드 + 내 팀 유리한 포켓몬 -->
        <div class="result-section">
          <PokemonCard :pokemonData="pokemonData" />
          <RosterMatch :typeData="typeData" />
        </div>

        <!-- 약점/유리 타입 -->
        <div class="result-section">
          <TypeSection :typeData="typeData" />
        </div>

      </div>

      <!-- 오른쪽: 최근 검색 + 내 로스터 -->
      <div class="right">

        <!-- 최근 검색 기록 -->
        <div v-if="searchStore.recentSearches.length > 0" class="recent">
          <p>최근 검색</p>
          <div class="recent-list">
            <span v-for="name in searchStore.recentSearches" :key="name"
              @click="searchQuery = name; search()">
              {{ name }}
            </span>
          </div>
        </div>

        <!-- 내 로스터 -->
        <MyRoster />

      </div>
    </div>
  </div>
</template>

<style>
</style>
