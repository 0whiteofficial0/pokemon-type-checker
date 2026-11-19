<script setup>
// ============================================
// TypeSection 컴포넌트
// ============================================
// 포켓몬의 타입 상성 정보를 보여주는 컴포넌트
// - 약점: 2배 또는 4배 피해를 받는 공격 타입
// - 유리: 포켓몬의 타입 기술이 2배 피해를 주는 방어 타입

// 데이터
import { typeColors, typeKorean, typeIcons } from '@/data/typeData.js'

// Props: 부모에서 받는 타입 상성 데이터
defineProps(['typeData'])
</script>

<template>
  <!-- 타입 데이터가 있을 때만 표시 -->
  <div v-if="typeData" class="type-container">

    <!-- 약점 타입 섹션 -->
    <div class="type-section">
      <p>약점</p>
      <div class="badge-list">
        <span v-for="t in typeData.weaknesses"
          :key="t.name" class="type-badge"
          :style="{ backgroundColor: typeColors[t.name] }">
          <img :src="typeIcons[t.name]" class="type-icon" />
          {{ typeKorean[t.name] }} {{ t.multiplier }}배
        </span>
      </div>
    </div>

    <!-- 유리 타입 섹션 -->
    <div class="type-section">
      <p>유리</p>
      <div class="badge-list">
        <span v-for="type in typeData.strongAgainst"
          :key="type" class="type-badge"
          :style="{ backgroundColor: typeColors[type] }">
          <img :src="typeIcons[type]" class="type-icon" />
          {{ typeKorean[type] }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 약점/유리 섹션을 가로로 나란히 배치 */
.type-container {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;
}

/* 각 섹션 카드 */
.type-section {
  background-color: #16213e;
  border-radius: 16px;
  padding: 16px 24px;
  width: 280px;
  margin-bottom: 16px;
}

/* 섹션 제목 (약점/유리) */
.type-section p {
  color: #aaa;
  font-size: 0.85rem;
  margin-bottom: 8px;
}

/* 배지 목록 */
.badge-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
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
</style>
