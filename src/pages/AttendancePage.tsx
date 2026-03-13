import React, { useState } from 'react';
import { AttBadge } from '../components/ui/Badge';
import { StatCard } from '../components/ui/StatCard';
import { Modal, FormGroup, ModalActions } from '../components/ui/Modal';
import { mockAttendance, mockCourses, mockStudents } from '../data/mockData';
import type { AttendanceRecord, AttendanceStatus } from '../types';

export function AttendancePage() {
  const [records, setRecords]   = useState<AttendanceRecord[]>(mockAttendance);
  const [dateFilter, setDate]   = useState('2025-03-19');
  const [courseFilter, setCourse] = useState('');
  const [showModal, setModal]   = useState(false);

  // Form state
  const [form, setForm] = useState({
    student: mockStudents[0].name,
    course: mockCourses[0].name,
    date: '2025-03-19',
    status: 'PRESENT' as AttendanceStatus,
    note: '',
  });

  const cnt = (s: AttendanceStatus) => records.filter((r) => r.status === s).length;

  const filtered = records.filter(
    (r) =>
      (!dateFilter  || r.date === dateFilter) &&
      (!courseFilter || r.course === courseFilter),
  );

  const handleAdd = () => {
    const existing = records.findIndex(
      (r) => r.student === form.student && r.course === form.course && r.date === form.date,
    );
    if (existing >= 0) {
      setRecords((prev) =>
        prev.map((r, i) => (i === existing ? { ...r, status: form.status } : r)),
      );
    } else {
      setRecords((prev) => [
        { student: form.student, course: form.course, date: form.date, status: form.status },
        ...prev,
      ]);
    }
    setModal(false);
  };

  return (
    <>
      {/* Stats */}
      <div className="stat-grid">
        <StatCard label="출석" value={cnt('PRESENT')} icon="✅" accentColor="#2ec4b6" />
        <StatCard label="결석" value={cnt('ABSENT')}  icon="❌" accentColor="#e63946" />
        <StatCard label="지각" value={cnt('LATE')}    icon="⏰" accentColor="#ff9f1c" />
        <StatCard label="공결" value={cnt('EXCUSED')} icon="📋" accentColor="#4361ee" />
      </div>

      {/* Filters + action */}
      <div className="flex-between mb-4">
        <div className="flex-row gap-3">
          <input
            type="date"
            className="select"
            value={dateFilter}
            onChange={(e) => setDate(e.target.value)}
          />
          <select
            className="select"
            value={courseFilter}
            onChange={(e) => setCourse(e.target.value)}
          >
            <option value="">전체 강좌</option>
            {mockCourses.map((c) => (
              <option key={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
        <button className="btn btn-primary" onClick={() => setModal(true)}>
          + 출결 기록
        </button>
      </div>

      {/* Table */}
      <div className="card">
        <table>
          <thead>
            <tr>
              <th>학생</th>
              <th>강좌</th>
              <th>날짜</th>
              <th>출결상태</th>
              <th>비고</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r, i) => (
              <tr key={i}>
                <td className="td-name">{r.student}</td>
                <td className="td-muted">{r.course}</td>
                <td className="td-muted">{r.date}</td>
                <td><AttBadge status={r.status} /></td>
                <td className="td-muted">-</td>
                <td><button className="btn btn-sm btn-ghost">수정</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <Modal title="출결 기록" onClose={() => setModal(false)}>
          <FormGroup label="강좌 선택">
            <select className="modal-input" value={form.course} onChange={(e) => setForm({ ...form, course: e.target.value })}>
              {mockCourses.map((c) => <option key={c.id}>{c.name}</option>)}
            </select>
          </FormGroup>
          <FormGroup label="날짜">
            <input className="modal-input" type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
          </FormGroup>
          <FormGroup label="학생">
            <select className="modal-input" value={form.student} onChange={(e) => setForm({ ...form, student: e.target.value })}>
              {mockStudents.map((s) => <option key={s.id}>{s.name}</option>)}
            </select>
          </FormGroup>
          <FormGroup label="출결 상태">
            <select className="modal-input" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as AttendanceStatus })}>
              <option value="PRESENT">출석</option>
              <option value="ABSENT">결석</option>
              <option value="LATE">지각</option>
              <option value="EXCUSED">공결</option>
            </select>
          </FormGroup>
          <FormGroup label="비고">
            <input className="modal-input" placeholder="특이사항 입력 (선택)" value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} />
          </FormGroup>
          <ModalActions onClose={() => setModal(false)} onSubmit={handleAdd} submitLabel="기록하기" />
        </Modal>
      )}
    </>
  );
}
