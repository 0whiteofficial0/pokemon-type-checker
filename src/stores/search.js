// ============================================
// 검색 기록 스토어 (Pinia)
// ============================================
// 최근 검색한 포켓몬 이름을 저장하고 관리
// LocalStorage 연동으로 새로고침해도 유지됨
// 최대 5개까지 저장

import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSearchStore = defineStore('search', () => {

  // 최근 검색 목록 (LocalStorage에서 불러오기, 없으면 빈 배열)
  const recentSearches = ref(JSON.parse(localStorage.getItem('recentSearches') || '[]'))

  // 홈 초기화 트리거
  const shouldReset = ref(false)

  // 검색어 추가 함수
  function addSearch(name) {
    // 중복 검색어 제거
    if (!recentSearches.value.includes(name)) {
      recentSearches.value.unshift(name) // 맨 앞에 추가
    }

    // 최대 5개 유지 (초과하면 맨 뒤 삭제)
    if (recentSearches.value.length > 5) {
      recentSearches.value.pop()
    }

    // LocalStorage에 저장
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches.value))
  }

  // 홈 초기화 트리거 함수
  function triggerReset() {
    shouldReset.value = true
  }

  return { recentSearches, addSearch, shouldReset, triggerReset }
})