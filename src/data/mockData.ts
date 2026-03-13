import type {
  Stats, Course, Student, AttendanceRecord,
  Exam, ExamResult, Payment, NavItem,
} from '../types';

export const mockStats: Stats = {
  totalStudents: 284,
  totalTeachers: 12,
  activeCourses: 18,
  activeEnrollments: 423,
  monthlyRevenue: 38_450_000,
  todayPresent: 187,
  todayAbsent: 14,
  pendingPayments: 23,
};

export const mockCourses: Course[] = [
  { id: 1, name: '중학수학 기초반', subject: '수학', level: '초급',  teacher: '김수학',  room: 'A101', fee: 150_000, enrolled: 24, max: 30, active: true, schedule: '월·수 14:00-16:00' },
  { id: 2, name: '고등영어 심화반', subject: '영어', level: '고급',  teacher: '이영어',  room: 'B201', fee: 200_000, enrolled: 18, max: 25, active: true, schedule: '화·목 15:00-17:00' },
  { id: 3, name: '중학과학 중급반', subject: '과학', level: '중급',  teacher: '박과학',  room: 'C101', fee: 160_000, enrolled: 20, max: 28, active: true, schedule: '금 10:00-12:00' },
  { id: 4, name: '초등수학 왕기초', subject: '수학', level: '입문',  teacher: '김수학',  room: 'A102', fee: 120_000, enrolled: 30, max: 30, active: true, schedule: '월·수·금 13:00-14:00' },
  { id: 5, name: '고등수학 수능반', subject: '수학', level: '고급',  teacher: '최강수학', room: 'A201', fee: 250_000, enrolled: 15, max: 20, active: true, schedule: '화·목·토 09:00-12:00' },
];

export const mockStudents: Student[] = [
  { id: 4, name: '박민준', email: 'park@student.com',  phone: '010-3333-4444', grade: '중2', courses: 2, unpaid: 0,       active: true },
  { id: 5, name: '최지아', email: 'choi@student.com',  phone: '010-4444-5555', grade: '고1', courses: 3, unpaid: 350_000, active: true },
  { id: 6, name: '이도윤', email: 'lee2@student.com',  phone: '010-5555-6666', grade: '중3', courses: 1, unpaid: 0,       active: true },
  { id: 7, name: '김서연', email: 'kim2@student.com',  phone: '010-6666-7777', grade: '고2', courses: 2, unpaid: 200_000, active: true },
  { id: 8, name: '정우진', email: 'jung@student.com',  phone: '010-7777-8888', grade: '초6', courses: 0, unpaid: 0,       active: false },
];

export const mockAttendance: AttendanceRecord[] = [
  { student: '박민준', course: '중학수학 기초반', date: '2025-03-19', status: 'ABSENT'  },
  { student: '최지아', course: '고등영어 심화반', date: '2025-03-19', status: 'LATE'    },
  { student: '이도윤', course: '중학과학 중급반', date: '2025-03-19', status: 'PRESENT' },
  { student: '김서연', course: '고등수학 수능반', date: '2025-03-19', status: 'PRESENT' },
  { student: '박민준', course: '중학수학 기초반', date: '2025-03-17', status: 'PRESENT' },
  { student: '최지아', course: '고등영어 심화반', date: '2025-03-17', status: 'PRESENT' },
];

export const mockExams: Exam[] = [
  { id: 1, course: '중학수학 기초반', title: '3월 월말고사', type: 'MIDTERM', date: '2025-03-28', max: 100 },
  { id: 2, course: '중학수학 기초반', title: '수시평가 1회',  type: 'QUIZ',    date: '2025-03-14', max: 50  },
  { id: 3, course: '고등영어 심화반', title: '영어 중간고사', type: 'MIDTERM', date: '2025-03-28', max: 100 },
];

export const mockExamResults: ExamResult[] = [
  { exam: '3월 월말고사', course: '중학수학', student: '박민준', score: 88, max: 100, feedback: '계산 실수 줄이기' },
  { exam: '3월 월말고사', course: '중학수학', student: '최지아', score: 75, max: 100, feedback: '기초 개념 보완' },
  { exam: '수시평가 1회',  course: '중학수학', student: '박민준', score: 44, max: 50,  feedback: '잘했어요' },
  { exam: '영어 중간고사', course: '고등영어', student: '박민준', score: 82, max: 100, feedback: '독해 속도 향상 필요' },
];

export const mockPayments: Payment[] = [
  { id: 1, student: '박민준', course: '중학수학 기초반', amount: 150_000, status: 'COMPLETED', due: '2025-03-05', paid: '2025-03-04', method: 'CARD'     },
  { id: 2, student: '최지아', course: '고등영어 심화반', amount: 200_000, status: 'PENDING',   due: '2025-03-31', paid: '',           method: ''         },
  { id: 3, student: '최지아', course: '중학수학 기초반', amount: 150_000, status: 'PENDING',   due: '2025-03-31', paid: '',           method: ''         },
  { id: 4, student: '김서연', course: '고등수학 수능반', amount: 250_000, status: 'PENDING',   due: '2025-03-31', paid: '',           method: ''         },
  { id: 5, student: '이도윤', course: '중학과학 중급반', amount: 160_000, status: 'COMPLETED', due: '2025-03-10', paid: '2025-03-09', method: 'TRANSFER' },
];

export const NAV_ITEMS: NavItem[] = [
  { type: 'section', label: '메인' },
  { type: 'link', id: 'dashboard',  label: '대시보드',  icon: '📊' },
  { type: 'section', label: '학사 관리' },
  { type: 'link', id: 'courses',    label: '강좌 관리', icon: '📚' },
  { type: 'link', id: 'students',   label: '학생 관리', icon: '👨‍🎓' },
  { type: 'link', id: 'attendance', label: '출결 관리', icon: '📋' },
  { type: 'link', id: 'grades',     label: '성적 관리', icon: '📝' },
  { type: 'section', label: '운영' },
  { type: 'link', id: 'payments',   label: '수납 관리', icon: '💳', badge: 23 },
];

export const PAGE_TITLES: Record<string, string> = {
  dashboard:  '대시보드',
  courses:    '강좌 관리',
  students:   '학생 관리',
  attendance: '출결 관리',
  grades:     '성적 관리',
  payments:   '수납 관리',
};

export const SUBJECT_BADGE: Record<string, string> = {
  수학: 'badge-blue',
  영어: 'badge-purple',
  과학: 'badge-green',
  국어: 'badge-yellow',
};

export const EXAM_TYPE_KO: Record<string, string> = {
  QUIZ:     '퀴즈',
  MIDTERM:  '중간',
  FINAL:    '기말',
  HOMEWORK: '과제',
};
