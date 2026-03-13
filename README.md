# 학원 관리 시스템 — 관리자 웹 (React TSX)

## 🚀 실행

```bash
cd admin-web-react
npm install
npm start
# → http://localhost:3000
```

**로그인:** `admin` / `pass1234`

---

## 📁 프로젝트 구조

```
src/
├── App.tsx                          ← 루트 컴포넌트 (라우팅)
├── index.tsx                        ← ReactDOM 진입점
│
├── types/
│   └── index.ts                     ← 전체 TypeScript 타입 정의
│
├── data/
│   └── mockData.ts                  ← Mock 데이터 & 상수
│
├── styles/
│   └── globals.css                  ← 전체 CSS (변수, 레이아웃, 컴포넌트)
│
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx              ← 사이드바 네비게이션
│   │   └── Topbar.tsx               ← 상단 헤더
│   └── ui/
│       ├── Badge.tsx                ← 출결/수납/과목 배지
│       ├── StatCard.tsx             ← 통계 카드
│       ├── ProgressBar.tsx          ← 수강인원 프로그레스바
│       └── Modal.tsx                ← 모달 래퍼 + FormGroup + ModalActions
│
└── pages/
    ├── LoginPage.tsx                ← 로그인
    ├── DashboardPage.tsx            ← 대시보드
    ├── CoursesPage.tsx              ← 강좌 관리
    ├── StudentsPage.tsx             ← 학생 관리
    ├── AttendancePage.tsx           ← 출결 관리
    ├── GradesPage.tsx               ← 성적 관리
    └── PaymentsPage.tsx             ← 수납 관리
```

---

## ✅ HTML → React TSX 전환 요약

| 항목 | 기존 HTML/JS | React TSX |
|------|-------------|-----------|
| 상태 관리 | 전역 `state` 객체 | `useState` Hook |
| 렌더링 | `innerHTML` 문자열 | JSX 컴포넌트 트리 |
| 이벤트 | `onclick="fn()"` 문자열 | `onClick={fn}` |
| 모달 | 전역 `state.modal` | 페이지별 `showModal` state |
| 타입 안전성 | 없음 | 전체 TypeScript 타입 |
| 코드 구조 | 단일 HTML 파일 | 컴포넌트 분리 |
| 배지 | CSS 클래스 문자열 | `<AttBadge>`, `<PayBadge>` 컴포넌트 |
| 완납 처리 | 전역 변수 직접 변경 | 불변 `setPayments` 업데이트 |

---

## 🔌 백엔드 API 연동

`src/data/mockData.ts`의 Mock 데이터를 실제 API 호출로 교체:

```typescript
// 예시: DashboardPage에서 실제 API 호출
const [stats, setStats] = useState<Stats | null>(null);

useEffect(() => {
  fetch('/api/admin/dashboard', {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((r) => r.json())
    .then(setStats);
}, []);
```
