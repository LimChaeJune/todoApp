# To-Do Application

## 🛠️ 기술 스택

- **프레임워크:** React, Vite
- **언어:** TypeScript
- **UI:** shadcn/ui, Tailwind CSS
- **상태 관리:** React Query (TanStack Query)
- **폼 처리:** React Hook Form
- **스키마 검증:** Zod
- **데이터 테이블:** TanStack Table

## 시작하기

1.  **의존성 설치:**
    ```bash
    pnpm install
    ```

2.  **개발 서버 실행:**
    ```bash
    pnpm dev
    ```

---

## 🏗️ 아키텍처 및 설계 철학 (Architecture & Design Philosophy)

아키텍처 설계에서 중점적으로 둔 부분은 기능 중심의 관심사가 모여있는 구조로
개발 시 컨텍스트 전환 비용을 최소화하고 코드의 응집성을 높이는 것이였습니다.

폴더 구조는 다음과 같은 기준으로 만들었습니다.

```
├── src/
│ ├── app/ 앱에 대한 기능 (서버 통신, 비즈니스 로직, 앱 내에서 사용하는 컴포넌트)
│ │ └── todo/ 
│ │     ├── api/ # 1. 데이터 레이어: 서버와의 통신
│ │     │ ├── endpoints/ # - 순수 데이터 fetching 함수 (axios, fetch)
│ │     │ └── mutations/ # - 데이터 '변경' 관련 훅 (useCreateTodo)
│ │     │ └── quries/ # - 데이터 '조회' 관련 훅 (useTodoList)
│ │     ├── components/ # 2. 표현 레이어: Todo 기능에만 사용되는 UI 컴포넌트들
│ │     │ ├── dialog/ # - 수정/삭제 등 기능별 다이얼로그
│ │     │ ├── todoDataGrid/# - 데이터 테이블 관련 컴포넌트 집합
│ │     │ └── todoForm/ # - Todo 입력 폼
│ │     ├── hooks/ # 3. 상태 및 로직 레이어
│ │     │ └── useTodoForm.tsx # - 여러 상태와 비즈니스 로직을 캡슐화한 커스텀 훅
│ │     ├── types/ # 4. 타입 정의
│ │     │ └── schema # - form에 사용되는 type과 zod로 만든 schema
│ │     │ └── model # - 화면에 사용되는 모델 타입
│ │     └── constants/ # 5. 상수
│ │       └── table.tsx # - 데이터 테이블의 컬럼 정의
│ │
│ ├── components/ # 🌐 프로젝트 전역에서 사용되는 범용 컴포넌트
│ │ ├── ui/ # - Button, Dialog 등 원자적 UI (shadcn/ui 기반)
│ │ └── form/ # - DatePicker 등 조합 UI
│ │
│ ├── lib/ # ⚙️ 유틸리티와 라이브러리 Provider 설정
│ │ └── reactQuery - # QueryProvider 설정
│ │ └── utils.ts
│ │
└──
```

---
다음과 같은 사항들을 중점으로 앱을 개발하였습니다.


### 1. 명확한 관심사 분리 (Separation of Concerns)

API 통신(api/), 상태 및 비즈니스 로직(hooks/), UI 컴포넌트(components/)의 책임이 명확히 분리되어,
책임을 명확히 분리하여 코드의 복잡성을 낮추려했습니다.


### 2. 실수하기 어렵고, 변화에 용이한 코드

타입 시스템과 추상화를 통해 실수가 발생할 여지를 줄였습니다.

### 3. 웹 문서 구조 & 시맨틱 태그

- **시맨틱 HTML**: asChild prop을 적극적으로 활용하여 <button> 안에 <button>이 중첩되는 비표준 구조를 피하고, 의미적으로 올바른 DOM 구조를 유지합니다.
- **명시적인 접근성**: aria-label을 통해 시각적 레이블이 없는 입력 필드에 명확한 설명을 제공하고, type="button"을 명시하여 폼 내부에서의 의도치 않은 제출 동작을 방지하는 등, 스크린 리더 사용자를 포함한 모든 사용자를 고려합니다.
