# 🔴 포켓몬 챔피언스 타입 체커

포켓몬 챔피언스 배틀 픽 화면에서, 상대 포켓몬의 타입 상성을 빠르게 확인할 수 있는 보조 도구입니다.

[타입 체커 바로 사용하기](https://0whiteofficial0.github.io/pokemon-type-checker/) · [18×18 타입 상성표](https://0whiteofficial0.github.io/pokemon-type-checker/#/chart)

## 📌 프로젝트 소개

포켓몬 챔피언스는 배틀 시작 전 상대 팀을 보고 내 팀에서 출전할 포켓몬을 골라야 합니다. 초보자 입장에서 타입 상성을 빠르게 판단하기 어려워서, 상대 포켓몬을 검색하면 바로 약점과 유리한 타입을 확인할 수 있는 도구를 직접 만들었습니다.

## ✨ 주요 기능

- **포켓몬 검색** — 한글/영어 이름 모두 검색 가능
- **타입 상성 확인** — 검색한 포켓몬의 약점과 피해 배율(2배·4배), 공격에 유리한 타입을 표시
- **메가진화 검색** — PokéAPI에서 제공하는 메가진화 형태를 검색 가능
- **내 로스터 관리** — 최대 6마리까지 내 팀 등록/제거
- **유리·불리 포켓몬 자동 매칭** — 검색한 상대와 내 로스터를 비교해 유리한/불리한 포켓몬 표시
- **최근 검색 기록** — 최근 검색한 포켓몬 5개 저장, 클릭으로 재검색
- **타입 상성표** — 18×18 전체 타입 상성표 페이지
- **모바일 대응** — 반응형 레이아웃

복합 타입의 약점은 공격 타입마다 두 방어 타입의 피해 배율을 곱해 계산합니다. 예를 들어 기본 리자몽(불꽃/비행)은 바위 4배, 물·전기 2배에 약합니다. 땅은 면역이고 얼음은 1배 피해를 받습니다. 내 팀과 상대의 타입을 비교할 때도 같은 배율을 적용합니다.

## 🛠 기술 스택

| 분류 | 기술 |
|------|------|
| Framework | Vue 3 (Composition API) |
| 라우팅 | Vue Router |
| 상태관리 | Pinia |
| 데이터 | 포켓몬 정보는 PokéAPI, 타입 배율은 내장 18×18 상성표 |
| 저장소 | 브라우저 localStorage에 최근 검색과 내 로스터 저장 |
| 스타일 | CSS (반응형 미디어 쿼리) |

## 📂 프로젝트 구조

```
src/
├── assets/
│   └── home.css              # 메인 페이지 스타일
├── components/
│   ├── SearchBar.vue         # 검색창
│   ├── PokemonCard.vue       # 포켓몬 정보 카드
│   ├── TypeSection.vue       # 약점/유리 타입 표시
│   ├── MyRoster.vue          # 내 로스터 목록
│   └── RosterMatch.vue       # 유리/불리 포켓몬 매칭
├── data/
│   ├── pokemonNames.js       # 한글↔영어 이름 매핑
│   ├── typeData.js           # 타입 색상/아이콘/한글명
│   ├── typeChart.js          # 18×18 타입 상성표와 배율 계산
│   ├── megaEvolutions.js     # 메가진화 참고 목록
│   └── customMega.js         # 미연동 메가진화 참고 데이터
├── stores/
│   ├── search.js             # 최근 검색 기록 (Pinia)
│   └── roster.js             # 내 로스터 (Pinia)
├── views/
│   ├── HomeView.vue          # 메인 검색 페이지
│   └── ChartView.vue         # 타입 상성표 페이지
├── router/
│   └── index.js
├── App.vue
└── main.js
```

## 🧩 컴포넌트 분리 기준

기능별로 컴포넌트를 분리해 각 컴포넌트가 하나의 역할만 담당하도록 설계했습니다.

- `SearchBar` → 검색 입력/이벤트만 담당
- `PokemonCard` → 검색된 포켓몬 정보 표시만 담당
- `TypeSection` → 약점/유리 타입 표시만 담당
- `MyRoster` → 내 로스터 목록 표시/제거만 담당
- `RosterMatch` → 내 로스터와 상대 포켓몬 비교만 담당

여러 컴포넌트가 공유해야 하는 데이터(최근 검색, 내 로스터)는 Pinia 스토어로 분리해 관리했습니다.

## 🚧 어려웠던 점

- 포켓몬 챔피언스 전용 공식 API가 없어 한글 포켓몬 이름 데이터를 직접 구축
- 복합 타입에서 약점, 반감, 면역이 겹치는 경우의 배율 처리
- 일부 신규 메가진화의 타입 데이터를 별도로 정리

## 💡 아쉬웠던 점 / 개선 계획

- 공식 API 미제공으로 실시간 메타/통계 데이터 반영 불가
- 한글 포켓몬 이름 데이터 추가 보완 필요
- PokéAPI에서 조회되지 않는 신규 메가진화는 별도 데이터 연동 필요
- 내 팀 전체 타입 분포 분석 기능 미구현
- TypeScript 미도입

## 🤖 개발 과정

이 프로젝트는 Claude AI의 도움을 받아 개발했습니다. Vue 3, Pinia, Vue Router를 처음 접하는 입장에서, AI와 대화하며 각 기능을 직접 작성하고 동작 원리를 이해하는 과정으로 진행했습니다.

## 🚀 실행 방법

Node.js 24를 권장합니다. PokéAPI는 공개 API라 별도 API 키나 환경 변수 설정이 필요 없습니다.

```bash
npm ci
npm run dev
```

## 🌐 GitHub Pages 배포

- 저장소의 **Settings → Pages → Build and deployment → Source**를 **GitHub Actions**로 설정합니다.
- `main` 브랜치에 코드를 푸시하면 `.github/workflows/deploy.yml`에서 빌드와 배포를 자동으로 실행합니다.
- 최초 설정 후에는 **Actions → Deploy to GitHub Pages → Run workflow**로 수동 배포할 수도 있습니다.
- **Actions**에서 배포 작업의 성공 여부를 확인할 수 있습니다.

GitHub Pages의 저장소 경로에 맞춰 Vite의 `base`를 설정했습니다. 라우터는 해시 방식을 사용하므로 상성표 주소(`/pokemon-type-checker/#/chart`)를 직접 열거나 새로고침해도 정상적으로 표시됩니다.

로컬에서 배포 결과를 확인하려면 Node.js 24에서 다음 명령을 실행합니다.

```bash
npm ci
npm run build
npm run preview
```
