<script setup>
// ============================================
// SearchBar 컴포넌트
// ============================================
// 포켓몬 이름 검색창 컴포넌트
// 한글/영어 검색 모두 지원
// 엔터키 또는 검색 버튼으로 검색 가능

// Props: 부모에서 받는 데이터
defineProps(['searchQuery', 'errorMessage'])

// Emits: 부모에게 전달하는 이벤트
defineEmits(['update:searchQuery', 'search'])
</script>

<template>
  <div>
    <!-- 검색창 -->
    <div class="search-box">
      <input 
        :value="searchQuery"
        @input="$emit('update:searchQuery', $event.target.value)"
        @keyup.enter="$emit('search')"
        type="text" 
        placeholder="포켓몬 이름을 검색하세요" />
      <button @click="$emit('search')">검색</button>
    </div>

    <!-- 에러 메시지 -->
    <p v-if="errorMessage" style="color:#e63946; margin-top:8px;">{{ errorMessage }}</p>
  </div>
</template>