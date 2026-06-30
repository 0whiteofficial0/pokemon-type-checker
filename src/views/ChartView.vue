<script setup>
// ============================================
// ChartView 페이지
// ============================================
// 18x18 타입 상성표를 보여주는 페이지
// - 가로: 공격하는 타입
// - 세로: 방어하는 타입
// - ◎ 2배 피해 (빨강)
// - ○ 보통 피해 (회색)
// - △ 절반 피해 (파랑)
// - ✕ 무효 (검정)

// 데이터
import { types, typeChart } from '@/data/typeChart.js'

// 배율에 따른 배경색 반환
function getColor(value) {
  if (value === 2) return '#e63946'   // 2배 → 빨강
  if (value === 0.5) return '#4361ee' // 절반 → 파랑
  if (value === 0) return '#333'      // 무효 → 검정
  return '#555'                        // 보통 → 회색
}

// 배율에 따른 기호 반환
function getLabel(value) {
  if (value === 2) return '◎'   // 2배
  if (value === 0.5) return '△' // 절반
  if (value === 0) return '✕'   // 무효
  return '○'                     // 보통
}
</script>

<template>
  <div class="chart">
    <h1>타입 상성표</h1>

    <table>
      <!-- 헤더: 방어 타입 아이콘 -->
      <thead>
        <tr>
          <th></th>
          <th v-for="t in types" :key="t">
            <img
              :src="`https://raw.githubusercontent.com/partywhale/pokemon-type-icons/main/icons/${t}.svg`"
              :alt="t" width="20" height="20" />
          </th>
        </tr>
      </thead>

      <!-- 바디: 공격 타입별 상성 -->
      <tbody>
        <tr v-for="attacker in types" :key="attacker">

          <!-- 공격 타입 아이콘 -->
          <td>
            <img
              :src="`https://raw.githubusercontent.com/partywhale/pokemon-type-icons/main/icons/${attacker}.svg`"
              :alt="attacker" width="20" height="20" />
          </td>

          <!-- 상성 배율 셀 -->
          <td v-for="defender in types" :key="defender"
            :style="{ backgroundColor: getColor(typeChart[attacker][types.indexOf(defender)]) }">
            {{ getLabel(typeChart[attacker][types.indexOf(defender)]) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
/* 페이지 레이아웃 */
.chart {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
}

/* 제목 */
h1 {
  color: white;
  font-size: 2rem;
  margin-bottom: 30px;
}

/* 상성표 테이블 */
table {
  border-collapse: collapse;
  font-size: 0.75rem;
}

/* 셀 공통 스타일 */
th, td {
  width: 36px;
  height: 36px;
  text-align: center;
  border: 1px solid #333;
  color: white;
}

/* 헤더 셀 */
th {
  background-color: #16213e;
  font-size: 0.65rem;
}
</style>