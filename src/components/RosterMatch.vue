<script setup>
// ============================================
// RosterMatch 컴포넌트
// ============================================
// 상대 포켓몬의 타입 상성과 내 로스터를 비교해서
// 유리한 포켓몬과 불리한 포켓몬을 찾아 보여주는 컴포넌트
// - 유리: 내 타입이 상대 약점을 찌를 수 있는 포켓몬
// - 불리: 내 타입이 상대한테 효과가 별로인 포켓몬

// Vue 핵심
import { computed } from 'vue'

// 스토어
import { useRosterStore } from '@/stores/roster'

// 데이터
import { typeColors, typeKorean, typeIcons } from '@/data/typeData.js'

// Props: 부모에서 받는 타입 상성 데이터
const props = defineProps(['typeData'])
const rosterStore = useRosterStore()

// 내 팀에서 유리한 포켓몬 계산 (상대 약점 타입 보유)
const matchedPokemon = computed(() => {
  if (!props.typeData || rosterStore.myRoster.length === 0) return []

  // 상대 포켓몬의 약점 타입 목록
  const weakTypes = props.typeData.damage_relations.double_damage_from.map(t => t.name)

  return rosterStore.myRoster.filter(pokemon =>
    pokemon.types.some(t => weakTypes.includes(t.type.name))
  )
})

// 내 팀에서 불리한 포켓몬 계산 (상대가 내 타입에 강함)
const disadvantagedPokemon = computed(() => {
  if (!props.typeData || rosterStore.myRoster.length === 0) return []

  // 상대 포켓몬이 2배 피해를 주는 타입 목록 (내가 불리한 타입)
  const strongTypes = props.typeData.damage_relations.double_damage_to.map(t => t.name)

  return rosterStore.myRoster.filter(pokemon =>
    pokemon.types.some(t => strongTypes.includes(t.type.name))
  )
})
</script>

<template>
  <div v-if="matchedPokemon.length > 0 || disadvantagedPokemon.length > 0" class="roster-match">

    <!-- 유리한 포켓몬 섹션 -->
    <div v-if="matchedPokemon.length > 0">
      <p class="match-title advantage">✅ 유리한 포켓몬</p>
      <div v-for="pokemon in matchedPokemon" :key="pokemon.name" class="match-card">
        <img :src="pokemon.sprites.front_default" width="50" />
        <div>
          <p class="match-name">{{ pokemon.koreanName || pokemon.name }}</p>
          <div class="type-list">
            <span v-for="t in pokemon.types" :key="t.type.name"
              :style="{ backgroundColor: typeColors[t.type.name] }"
              class="type-badge">
              <img :src="typeIcons[t.type.name]" class="type-icon" />
              {{ typeKorean[t.type.name] }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- 구분선 -->
    <hr v-if="matchedPokemon.length > 0 && disadvantagedPokemon.length > 0" class="divider" />

    <!-- 불리한 포켓몬 섹션 -->
    <div v-if="disadvantagedPokemon.length > 0">
      <p class="match-title disadvantage">⚠️ 불리한 포켓몬</p>
      <div v-for="pokemon in disadvantagedPokemon" :key="pokemon.name" class="match-card">
        <img :src="pokemon.sprites.front_default" width="50" />
        <div>
          <p class="match-name">{{ pokemon.koreanName || pokemon.name }}</p>
          <div class="type-list">
            <span v-for="t in pokemon.types" :key="t.type.name"
              :style="{ backgroundColor: typeColors[t.type.name] }"
              class="type-badge">
              <img :src="typeIcons[t.type.name]" class="type-icon" />
              {{ typeKorean[t.type.name] }}
            </span>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
/* 카드 컨테이너 */
.roster-match {
  background-color: #16213e;
  border-radius: 16px;
  padding: 16px 24px;
  width: auto;
  min-width: 220px;
  max-width: 400px;
  margin-bottom: 16px;
}

/* 섹션 제목 */
.match-title {
  font-size: 0.85rem;
  margin-bottom: 12px;
  font-weight: bold;
}

.advantage {
  color: #4ade80;
}

.disadvantage {
  color: #f87171;
}

/* 구분선 */
.divider {
  border: none;
  border-top: 1px solid #333;
  margin: 12px 0;
}

/* 포켓몬 카드 */
.match-card {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

/* 포켓몬 이름 */
.match-name {
  color: white;
  font-size: 0.9rem;
  font-weight: bold;
  text-transform: capitalize;
  margin-bottom: 4px;
}

/* 타입 배지 목록 */
.type-list {
  display: flex;
  gap: 4px;
}

/* 타입 배지 */
.type-badge {
  padding: 2px 8px;
  border-radius: 8px;
  color: white;
  font-size: 0.75rem;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.9);
}

/* 타입 아이콘 */
.type-icon {
  width: 16px;
  height: 16px;
  vertical-align: middle;
  margin-right: 2px;
}
</style>