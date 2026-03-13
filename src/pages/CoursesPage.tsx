import React, { useState } from 'react';
import { SubjectBadge } from '../components/ui/Badge';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Modal, FormGroup, ModalActions } from '../components/ui/Modal';
import { mockCourses } from '../data/mockData';
import type { Course } from '../types';

const fmt = (n: number) => n.toLocaleString('ko-KR');

interface AddCourseForm {
  name: string;
  subject: string;
  level: string;
  teacher: string;
  room: string;
  fee: string;
  max: string;
}

const DEFAULT_FORM: AddCourseForm = {
  name: '', subject: '수학', level: '초급',
  teacher: '김수학', room: '', fee: '', max: '30',
};

export function CoursesPage() {
  const [courses, setCourses]   = useState<Course[]>(mockCourses);
  const [search, setSearch]     = useState('');
  const [showModal, setModal]   = useState(false);
  const [form, setForm]         = useState<AddCourseForm>(DEFAULT_FORM);

  const filtered = courses.filter(
    (c) =>
      !search ||
      c.name.includes(search) ||
      c.subject.includes(search) ||
      c.teacher.includes(search),
  );

  const handleAdd = () => {
    const newCourse: Course = {
      id: courses.length + 1,
      name: form.name,
      subject: form.subject,
      level: form.level,
      teacher: form.teacher,
      room: form.room,
      fee: Number(form.fee) || 0,
      enrolled: 0,
      max: Number(form.max) || 30,
      active: true,
      schedule: '미정',
    };
    setCourses((prev) => [...prev, newCourse]);
    setModal(false);
    setForm(DEFAULT_FORM);
  };

  return (
    <>
      <div className="flex-between mb-4">
        <input
          className="search-input"
          placeholder="강좌명·과목·강사 검색..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn btn-primary" onClick={() => setModal(true)}>
          + 강좌 개설
        </button>
      </div>

      <div className="card">
        <table>
          <thead>
            <tr>
              <th>강좌명</th>
              <th>과목</th>
              <th>레벨</th>
              <th>담당</th>
              <th>강의실</th>
              <th>수강료</th>
              <th>수강인원</th>
              <th>일정</th>
              <th>상태</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c.id}>
                <td className="td-name">{c.name}</td>
                <td><SubjectBadge subject={c.subject} /></td>
                <td className="td-muted">{c.level}</td>
                <td>{c.teacher}</td>
                <td className="td-muted">{c.room}</td>
                <td className="text-primary">₩{fmt(c.fee)}</td>
                <td style={{ minWidth: 160 }}>
                  <ProgressBar value={c.enrolled} max={c.max} />
                </td>
                <td className="td-muted" style={{ fontSize: 12 }}>{c.schedule}</td>
                <td>
                  <span className={`badge ${c.active ? 'badge-green' : 'badge-gray'}`}>
                    {c.active ? '운영중' : '종료'}
                  </span>
                </td>
                <td>
                  <button className="btn btn-sm btn-ghost">수정</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <Modal title="강좌 개설" onClose={() => setModal(false)}>
          <div className="modal-grid-2">
            <div style={{ gridColumn: '1 / -1' }}>
              <FormGroup label="강좌명">
                <input
                  className="modal-input"
                  placeholder="예) 중학수학 기초반"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </FormGroup>
            </div>
            <FormGroup label="과목">
              <select className="modal-input" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}>
                {['수학', '영어', '과학', '국어'].map((s) => <option key={s}>{s}</option>)}
              </select>
            </FormGroup>
            <FormGroup label="레벨">
              <select className="modal-input" value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })}>
                {['입문', '초급', '중급', '고급'].map((l) => <option key={l}>{l}</option>)}
              </select>
            </FormGroup>
            <FormGroup label="담당 강사">
              <select className="modal-input" value={form.teacher} onChange={(e) => setForm({ ...form, teacher: e.target.value })}>
                {['김수학', '이영어', '박과학'].map((t) => <option key={t}>{t}</option>)}
              </select>
            </FormGroup>
            <FormGroup label="강의실">
              <input
                className="modal-input"
                placeholder="예) A101"
                value={form.room}
                onChange={(e) => setForm({ ...form, room: e.target.value })}
              />
            </FormGroup>
            <FormGroup label="수강료 (월)">
              <input
                className="modal-input"
                type="number"
                placeholder="150000"
                value={form.fee}
                onChange={(e) => setForm({ ...form, fee: e.target.value })}
              />
            </FormGroup>
            <FormGroup label="최대 수강인원">
              <input
                className="modal-input"
                type="number"
                placeholder="30"
                value={form.max}
                onChange={(e) => setForm({ ...form, max: e.target.value })}
              />
            </FormGroup>
          </div>
          <ModalActions onClose={() => setModal(false)} onSubmit={handleAdd} submitLabel="개설하기" />
        </Modal>
      )}
    </>
  );
}
