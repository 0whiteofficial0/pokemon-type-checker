// ============================================
// 내 로스터 스토어 (Pinia)
// ============================================
// 배틀에 사용할 내 포켓몬 팀을 저장하고 관리
// LocalStorage 연동으로 새로고침해도 유지됨
// 최대 6마리까지 등록 가능

import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useRosterStore = defineStore('roster', () => {

  // 내 로스터 (LocalStorage에서 불러오기, 없으면 빈 배열)
  const myRoster = ref(JSON.parse(localStorage.getItem('myRoster') || '[]'))

  // 포켓몬 추가 함수
  function addPokemon(pokemon) {
    // 6마리 초과 시 추가 불가
    if (myRoster.value.length >= 6) return

    // 이미 등록된 포켓몬이면 추가 불가 (중복 방지)
    if (myRoster.value.find(p => p.name === pokemon.name)) return

    myRoster.value.push(pokemon)

    // LocalStorage에 저장
    localStorage.setItem('myRoster', JSON.stringify(myRoster.value))
  }

  // 포켓몬 제거 함수
  function removePokemon(name) {
    myRoster.value = myRoster.value.filter(p => p.name !== name)

    // LocalStorage에 저장
    localStorage.setItem('myRoster', JSON.stringify(myRoster.value))
  }

  return { myRoster, addPokemon, removePokemon }
})