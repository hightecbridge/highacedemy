import React, { useState } from 'react';
import { Modal, FormGroup, ModalActions } from '../components/ui/Modal';
import { mockExams, mockExamResults, mockCourses, mockStudents, EXAM_TYPE_KO } from '../data/mockData';
import type { Exam, ExamResult, ExamType } from '../types';

const fmt = (n: number) => n.toLocaleString('ko-KR');

export function GradesPage() {
  const [exams, setExams]         = useState<Exam[]>(mockExams);
  const [results, setResults]     = useState<ExamResult[]>(mockExamResults);
  const [showExamModal, setExamModal]     = useState(false);
  const [showResultModal, setResultModal] = useState(false);

  const [examForm, setExamForm] = useState({
    course: mockCourses[0].name,
    title: '',
    type: 'MIDTERM' as ExamType,
    date: '',
    max: '100',
  });

  const [resultForm, setResultForm] = useState({
    exam: mockExams[0].title,
    student: mockStudents[0].name,
    score: '',
    feedback: '',
  });

  const handleAddExam = () => {
    const newExam: Exam = {
      id: exams.length + 1,
      course: examForm.course,
      title: examForm.title,
      type: examForm.type,
      date: examForm.date,
      max: Number(examForm.max) || 100,
    };
    setExams((prev) => [...prev, newExam]);
    setExamModal(false);
  };

  const handleAddResult = () => {
    const target = exams.find((e) => e.title === resultForm.exam);
    if (!target) return;
    const newResult: ExamResult = {
      exam: resultForm.exam,
      course: target.course,
      student: resultForm.student,
      score: Number(resultForm.score),
      max: target.max,
      feedback: resultForm.feedback,
    };
    setResults((prev) => [...prev, newResult]);
    setResultModal(false);
  };

  return (
    <div className="dual-panel">
      {/* Left: Exams list */}
      <div>
        <div className="card">
          <div className="card-header">
            <span className="card-title">시험 목록</span>
            <button className="btn btn-sm btn-primary" onClick={() => setExamModal(true)}>
              + 시험 등록
            </button>
          </div>
          <table>
            <thead>
              <tr>
                <th>강좌</th>
                <th>시험명</th>
                <th>유형</th>
                <th>날짜</th>
                <th>만점</th>
              </tr>
            </thead>
            <tbody>
              {exams.map((e) => (
                <tr key={e.id}>
                  <td className="td-muted" style={{ fontSize: 12 }}>{e.course}</td>
                  <td className="font-bold">{e.title}</td>
                  <td>
                    <span className="badge badge-purple">
                      {EXAM_TYPE_KO[e.type] ?? e.type}
                    </span>
                  </td>
                  <td className="td-muted" style={{ fontSize: 12 }}>{e.date}</td>
                  <td className="td-muted">{e.max}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Right: Results */}
      <div>
        <div className="card">
          <div className="card-header">
            <span className="card-title">성적 결과</span>
            <button className="btn btn-sm btn-primary" onClick={() => setResultModal(true)}>
              + 성적 입력
            </button>
          </div>
          <table>
            <thead>
              <tr>
                <th>학생</th>
                <th>시험명</th>
                <th>점수</th>
                <th>피드백</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r, i) => {
                const pct = Math.round((r.score / r.max) * 100);
                const barColor =
                  pct >= 90 ? '#2ec4b6' : pct >= 70 ? '#4361ee' : '#ff9f1c';
                return (
                  <tr key={i}>
                    <td className="td-name">{r.student}</td>
                    <td className="td-muted" style={{ fontSize: 12 }}>{r.exam}</td>
                    <td style={{ minWidth: 140 }}>
                      <div className="progress-wrap">
                        <div className="progress-bar">
                          <div
                            className="progress-fill"
                            style={{ width: `${pct}%`, background: barColor }}
                          />
                        </div>
                        <span className="font-bold" style={{ fontSize: 13, minWidth: 40, whiteSpace: 'nowrap' }}>
                          {r.score}
                          <span style={{ color: 'var(--muted)', fontWeight: 400, fontSize: 11 }}>
                            /{r.max}
                          </span>
                        </span>
                      </div>
                    </td>
                    <td className="td-muted" style={{ fontSize: 12 }}>{r.feedback}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Exam Modal */}
      {showExamModal && (
        <Modal title="시험 등록" onClose={() => setExamModal(false)}>
          <FormGroup label="강좌">
            <select className="modal-input" value={examForm.course} onChange={(e) => setExamForm({ ...examForm, course: e.target.value })}>
              {mockCourses.map((c) => <option key={c.id}>{c.name}</option>)}
            </select>
          </FormGroup>
          <FormGroup label="시험명">
            <input className="modal-input" placeholder="예) 3월 월말고사" value={examForm.title} onChange={(e) => setExamForm({ ...examForm, title: e.target.value })} />
          </FormGroup>
          <FormGroup label="유형">
            <select className="modal-input" value={examForm.type} onChange={(e) => setExamForm({ ...examForm, type: e.target.value as ExamType })}>
              <option value="QUIZ">퀴즈</option>
              <option value="MIDTERM">중간고사</option>
              <option value="FINAL">기말고사</option>
              <option value="HOMEWORK">과제</option>
            </select>
          </FormGroup>
          <div className="modal-grid-2">
            <FormGroup label="시험일">
              <input className="modal-input" type="date" value={examForm.date} onChange={(e) => setExamForm({ ...examForm, date: e.target.value })} />
            </FormGroup>
            <FormGroup label="만점">
              <input className="modal-input" type="number" value={examForm.max} onChange={(e) => setExamForm({ ...examForm, max: e.target.value })} />
            </FormGroup>
          </div>
          <ModalActions onClose={() => setExamModal(false)} onSubmit={handleAddExam} submitLabel="등록하기" />
        </Modal>
      )}

      {/* Add Result Modal */}
      {showResultModal && (
        <Modal title="성적 입력" onClose={() => setResultModal(false)}>
          <FormGroup label="시험 선택">
            <select className="modal-input" value={resultForm.exam} onChange={(e) => setResultForm({ ...resultForm, exam: e.target.value })}>
              {exams.map((e) => <option key={e.id}>{e.title}</option>)}
            </select>
          </FormGroup>
          <FormGroup label="학생">
            <select className="modal-input" value={resultForm.student} onChange={(e) => setResultForm({ ...resultForm, student: e.target.value })}>
              {mockStudents.map((s) => <option key={s.id}>{s.name}</option>)}
            </select>
          </FormGroup>
          <FormGroup label="점수">
            <input className="modal-input" type="number" placeholder="0~100" value={resultForm.score} onChange={(e) => setResultForm({ ...resultForm, score: e.target.value })} />
          </FormGroup>
          <FormGroup label="피드백">
            <input className="modal-input" placeholder="강사 코멘트 입력" value={resultForm.feedback} onChange={(e) => setResultForm({ ...resultForm, feedback: e.target.value })} />
          </FormGroup>
          <ModalActions onClose={() => setResultModal(false)} onSubmit={handleAddResult} submitLabel="저장하기" />
        </Modal>
      )}
    </div>
  );
}
