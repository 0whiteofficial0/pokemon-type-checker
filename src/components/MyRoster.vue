<script setup>
// ============================================
// MyRoster 컴포넌트
// ============================================
// 내가 등록한 포켓몬 팀(로스터)을 보여주는 컴포넌트
// - 최대 6마리까지 등록 가능
// - 각 포켓몬의 이미지, 이름, 타입 표시
// - 제거 버튼으로 로스터에서 삭제 가능

// 스토어
import { useRosterStore } from '@/stores/roster'

// 데이터
import { typeColors, typeKorean, typeIcons } from '@/data/typeData.js'

const rosterStore = useRosterStore()
</script>

<template>
  <div class="roster">

    <!-- 로스터 제목 (현재 등록 수/최대) -->
    <p class="roster-title">내 로스터 ({{ rosterStore.myRoster.length }}/6)</p>

    <!-- 등록된 포켓몬 목록 -->
    <div class="roster-list">
      <div v-for="pokemon in rosterStore.myRoster" :key="pokemon.name" class="roster-card">

        <!-- 포켓몬 이미지 -->
        <img :src="pokemon.sprites.front_default" width="60" />

        <!-- 포켓몬 이름 -->
        <p class="roster-name">{{ pokemon.koreanName || pokemon.name }}</p>

        <!-- 타입 배지 -->
        <div class="type-list">
          <span v-for="t in pokemon.types" :key="t.type.name"
            :style="{ backgroundColor: typeColors[t.type.name] }"
            class="type-badge">
            <img :src="typeIcons[t.type.name]" class="type-icon" />
            {{ typeKorean[t.type.name] }}
          </span>
        </div>

        <!-- 제거 버튼 -->
        <button class="remove-btn" @click="rosterStore.removePokemon(pokemon.name)">제거</button>
      </div>
    </div>

    <!-- 로스터가 비어있을 때 메시지 -->
    <p v-if="rosterStore.myRoster.length === 0" style="color:#aaa">등록된 포켓몬이 없어요</p>
  </div>
</template>

<style scoped>
/* 로스터 컨테이너 */
.roster {
  width: 100%;
}

/* 로스터 제목 */
.roster-title {
  color: #aaa;
  font-size: 0.85rem;
  margin-bottom: 12px;
}

/* 포켓몬 목록 */
.roster-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

/* 포켓몬 카드 */
.roster-card {
  background-color: #16213e;
  border-radius: 12px;
  padding: 8px 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

/* 포켓몬 이름 */
.roster-name {
  color: white;
  font-size: 0.85rem;
  font-weight: bold;
  text-transform: capitalize;
  min-width: 60px;
}

/* 타입 배지 목록 */
.type-list {
  display: flex;
  gap: 4px;
  flex: 1;
}

/* 타입 배지 */
.type-badge {
  padding: 2px 6px;
  border-radius: 8px;
  color: white;
  font-size: 0.65rem;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.9);
}

/* 타입 아이콘 */
.type-icon {
  width: 12px;
  height: 12px;
  vertical-align: middle;
  margin-right: 2px;
}

/* 제거 버튼 */
.remove-btn {
  padding: 4px 8px;
  border-radius: 8px;
  border: none;
  background-color: #e63946;
  color: white;
  font-size: 0.75rem;
  cursor: pointer;
}
</style>