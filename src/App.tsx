import { useState } from 'react'
import { LoginPage }     from './pages/LoginPage'
import { DashboardPage } from './pages/DashboardPage'
import { CoursesPage }   from './pages/CoursesPage'
import { StudentsPage }  from './pages/StudentsPage'
import { AttendancePage} from './pages/AttendancePage'
import { GradesPage }    from './pages/GradesPage'
import { PaymentsPage }  from './pages/PaymentsPage'
import { Sidebar }       from './components/layout/Sidebar'
import { Topbar }        from './components/layout/Topbar'
import type { PageId }   from './types'

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [page, setPage]         = useState<PageId>('dashboard')

  const navigate = (p: PageId) => setPage(p)

  if (!loggedIn) return <LoginPage onLogin={() => setLoggedIn(true)} />

  const renderPage = () => {
    switch (page) {
      case 'dashboard':  return <DashboardPage onNavigate={navigate} />
      case 'courses':    return <CoursesPage />
      case 'students':   return <StudentsPage />
      case 'attendance': return <AttendancePage />
      case 'grades':     return <GradesPage />
      case 'payments':   return <PaymentsPage />
      default:           return <DashboardPage onNavigate={navigate} />
    }
  }

  return (
    <div className="app-shell">
      <Sidebar currentPage={page} onNavigate={navigate} onLogout={() => setLoggedIn(false)} />
      <div className="main-area">
        <Topbar currentPage={page} />
        <main className="main-scroll">{renderPage()}</main>
      </div>
    </div>
  )
}
