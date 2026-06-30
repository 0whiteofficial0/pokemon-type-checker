<script setup>
// ============================================
// PokemonCard 컴포넌트
// ============================================
// 검색된 포켓몬 정보를 카드 형태로 보여주는 컴포넌트
// - 포켓몬 이미지, 한국어 이름, 타입 배지 표시
// - 내 팀에 추가 버튼 포함

// 데이터
import { typeColors, typeKorean, typeIcons } from '@/data/typeData.js'

// 스토어
import { useRosterStore } from '@/stores/roster'
const rosterStore = useRosterStore()

// Props: 부모에서 받는 포켓몬 데이터
defineProps(['pokemonData'])
</script>

<template>
  <!-- 포켓몬 데이터가 있을 때만 표시 -->
  <div v-if="pokemonData" class="pokemon-card">

    <!-- 포켓몬 이미지 -->
    <img :src="pokemonData.sprites.front_default" />

    <!-- 포켓몬 한국어 이름 (없으면 영어 이름) -->
    <p class="pokemon-name">{{ pokemonData.koreanName || pokemonData.name }}</p>

    <!-- 타입 배지 목록 -->
    <div class="type-list">
      <span v-for="t in pokemonData.types" :key="t.slot" 
        :style="{ backgroundColor: typeColors[t.type.name] }" 
        class="type-badge">
        <img :src="typeIcons[t.type.name]" class="type-icon" />
        {{ typeKorean[t.type.name] }}
      </span>
    </div>

    <!-- 내 팀에 추가 버튼 -->
    <button class="add-btn" @click="rosterStore.addPokemon(pokemonData)">
      내 팀에 추가
    </button>
  </div>
</template>

<style scoped>
/* 포켓몬 카드 컨테이너 */
.pokemon-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #16213e;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;
  width: 220px;
}

/* 포켓몬 이름 */
.pokemon-name {
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  text-transform: capitalize;
  margin-bottom: 8px;
}

/* 타입 배지 목록 */
.type-list {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

/* 타입 배지 */
.type-badge {
  padding: 4px 12px;
  border-radius: 12px;
  color: white;
  font-size: 0.9rem;
  font-weight: bold;
  text-transform: capitalize;
  text-shadow: 1px 1px 3px rgba(0,0,0,0.9);
}

/* 타입 아이콘 */
.type-icon {
  width: 24px;
  height: 24px;
  vertical-align: middle;
  margin-right: 4px;
}

/* 내 팀에 추가 버튼 */
.add-btn {
  padding: 6px 16px;
  border-radius: 8px;
  border: none;
  background-color: #e63946;
  color: white;
  font-size: 0.85rem;
  font-weight: bold;
  cursor: pointer;
  margin-top: 8px;
}

.add-btn:hover {
  background-color: #c1121f;
}
</style>