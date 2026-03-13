import React, { useState } from 'react';
import { ActiveBadge } from '../components/ui/Badge';
import { Modal, FormGroup, ModalActions } from '../components/ui/Modal';
import { mockStudents } from '../data/mockData';
import type { Student } from '../types';

const fmt = (n: number) => n.toLocaleString('ko-KR');

interface AddStudentForm {
  name: string;
  grade: string;
  email: string;
  phone: string;
  parentPhone: string;
}

const DEFAULT_FORM: AddStudentForm = {
  name: '', grade: '', email: '', phone: '', parentPhone: '',
};

export function StudentsPage() {
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [search, setSearch]     = useState('');
  const [showModal, setModal]   = useState(false);
  const [form, setForm]         = useState<AddStudentForm>(DEFAULT_FORM);

  const filtered = students.filter(
    (s) => !search || s.name.includes(search) || s.email.includes(search),
  );

  const handleAdd = () => {
    const next: Student = {
      id: students.length + 10,
      name: form.name,
      email: form.email,
      phone: form.phone,
      grade: form.grade,
      courses: 0,
      unpaid: 0,
      active: true,
    };
    setStudents((prev) => [...prev, next]);
    setModal(false);
    setForm(DEFAULT_FORM);
  };

  return (
    <>
      <div className="flex-between mb-4">
        <input
          className="search-input"
          placeholder="이름·이메일 검색..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn btn-primary" onClick={() => setModal(true)}>
          + 학생 등록
        </button>
      </div>

      <div className="card">
        <table>
          <thead>
            <tr>
              <th>이름</th>
              <th>이메일</th>
              <th>연락처</th>
              <th>학년</th>
              <th>수강과목</th>
              <th>미납금</th>
              <th>상태</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((s) => (
              <tr key={s.id}>
                <td className="td-name">{s.name}</td>
                <td className="td-muted">{s.email}</td>
                <td className="td-muted">{s.phone}</td>
                <td>{s.grade}</td>
                <td>{s.courses}개</td>
                <td className={s.unpaid > 0 ? 'text-danger' : 'text-success'}>
                  {s.unpaid > 0 ? `₩${fmt(s.unpaid)}` : '없음'}
                </td>
                <td><ActiveBadge active={s.active} /></td>
                <td>
                  <div className="flex-row gap-2">
                    <button className="btn btn-sm btn-outline">상세</button>
                    <button className="btn btn-sm btn-ghost">수정</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <Modal title="학생 등록" onClose={() => setModal(false)}>
          <div className="modal-grid-2">
            <FormGroup label="이름">
              <input className="modal-input" placeholder="이름" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </FormGroup>
            <FormGroup label="학년">
              <input className="modal-input" placeholder="예) 중2" value={form.grade} onChange={(e) => setForm({ ...form, grade: e.target.value })} />
            </FormGroup>
            <div style={{ gridColumn: '1 / -1' }}>
              <FormGroup label="이메일">
                <input className="modal-input" type="email" placeholder="student@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </FormGroup>
            </div>
            <FormGroup label="연락처">
              <input className="modal-input" placeholder="010-0000-0000" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </FormGroup>
            <FormGroup label="학부모 연락처">
              <input className="modal-input" placeholder="010-0000-0000" value={form.parentPhone} onChange={(e) => setForm({ ...form, parentPhone: e.target.value })} />
            </FormGroup>
          </div>
          <ModalActions onClose={() => setModal(false)} onSubmit={handleAdd} submitLabel="등록하기" />
        </Modal>
      )}
    </>
  );
}
