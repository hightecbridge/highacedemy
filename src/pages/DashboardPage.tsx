import React from 'react';
import { StatCard } from '../components/ui/StatCard';
import { AttBadge, PayBadge } from '../components/ui/Badge';
import { mockStats, mockAttendance, mockPayments } from '../data/mockData';
import type { PageId } from '../types';

const fmt = (n: number) => n.toLocaleString('ko-KR');

interface DashboardPageProps {
  onNavigate: (page: PageId) => void;
}

export function DashboardPage({ onNavigate }: DashboardPageProps) {
  const s = mockStats;

  return (
    <>
      {/* Row 1 - 4 main stats */}
      <div className="stat-grid">
        <StatCard label="전체 학생"  value={fmt(s.totalStudents)}         sub="재원 중"       icon="👨‍🎓" accentColor="#4361ee" />
        <StatCard label="활동 강사"  value={s.totalTeachers}              sub="담임 배정 완료" icon="👩‍🏫" accentColor="#2ec4b6" />
        <StatCard label="개설 강좌"  value={s.activeCourses}              sub="운영 중"       icon="📚" accentColor="#ff9f1c" />
        <StatCard label="이달 수납"  value={`₩${fmt(s.monthlyRevenue)}`}  sub="3월 누적"      icon="💰" accentColor="#7b2fff" />
      </div>

      {/* Row 2 - 4 operational stats */}
      <div className="stat-grid">
        <StatCard label="오늘 출석"  value={s.todayPresent}         icon="✅" accentColor="#2ec4b6" />
        <StatCard label="오늘 결석"  value={s.todayAbsent}          icon="❌" accentColor="#e63946" />
        <StatCard label="수강 신청"  value={s.activeEnrollments}    icon="📝" accentColor="#4361ee" />
        <StatCard label="미납 건수"  value={s.pendingPayments} sub="처리 필요" icon="⚠️" accentColor="#ff9f1c" />
      </div>

      {/* Row 3 - tables */}
      <div className="dual-panel">
        {/* Recent attendance */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">최근 출결 현황</span>
            <button className="btn btn-sm btn-outline" onClick={() => onNavigate('attendance')}>
              전체 보기
            </button>
          </div>
          <table>
            <thead>
              <tr>
                <th>학생</th>
                <th>강좌</th>
                <th>날짜</th>
                <th>상태</th>
              </tr>
            </thead>
            <tbody>
              {mockAttendance.slice(0, 5).map((a, i) => (
                <tr key={i}>
                  <td className="td-name">{a.student}</td>
                  <td className="td-muted">{a.course}</td>
                  <td className="td-muted">{a.date}</td>
                  <td><AttBadge status={a.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pending payments */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">미납 현황</span>
            <button className="btn btn-sm btn-outline" onClick={() => onNavigate('payments')}>
              전체 보기
            </button>
          </div>
          <table>
            <thead>
              <tr>
                <th>학생</th>
                <th>금액</th>
                <th>상태</th>
              </tr>
            </thead>
            <tbody>
              {mockPayments
                .filter((p) => p.status === 'PENDING')
                .slice(0, 4)
                .map((p) => (
                  <tr key={p.id}>
                    <td className="td-name">{p.student}</td>
                    <td className="text-primary">₩{fmt(p.amount)}</td>
                    <td><PayBadge status={p.status} /></td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
