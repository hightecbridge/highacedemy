export type PageId =
  | 'dashboard'
  | 'courses'
  | 'students'
  | 'attendance'
  | 'grades'
  | 'payments'

export type ModalId =
  | 'addCourse'
  | 'addStudent'
  | 'addAttendance'
  | 'addExam'
  | 'addResult'
  | 'addPayment'

export interface Stats {
  totalStudents:    number
  totalTeachers:    number
  activeCourses:    number
  activeEnrollments:number
  monthlyRevenue:   number
  todayPresent:     number
  todayAbsent:      number
  pendingPayments:  number
}

export interface Course {
  id:       number
  name:     string
  subject:  string
  level:    string
  teacher:  string
  room:     string
  fee:      number
  enrolled: number
  max:      number
  active:   boolean
  schedule: string
}

export interface Student {
  id:      number
  name:    string
  email:   string
  phone:   string
  grade:   string
  courses: number
  unpaid:  number
  active:  boolean
}

export type AttendanceStatus = 'PRESENT' | 'ABSENT' | 'LATE' | 'EXCUSED'

export interface AttendanceRecord {
  student: string
  course:  string
  date:    string
  status:  AttendanceStatus
}

export type ExamType = 'QUIZ' | 'MIDTERM' | 'FINAL' | 'HOMEWORK'

export interface Exam {
  id:     number
  course: string
  title:  string
  type:   ExamType
  date:   string
  max:    number
}

export interface ExamResult {
  exam:     string
  course:   string
  student:  string
  score:    number
  max:      number
  feedback: string
}

export type PaymentStatus = 'PENDING' | 'COMPLETED' | 'REFUNDED'
export type PaymentMethod = 'CARD' | 'CASH' | 'TRANSFER' | ''

export interface Payment {
  id:     number
  student:string
  course: string
  amount: number
  status: PaymentStatus
  due:    string
  paid:   string
  method: PaymentMethod
}

export type NavItem =
  | { type: 'section'; label: string }
  | { type: 'link'; id: PageId; label: string; icon: string; badge?: number }
