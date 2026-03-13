import React, { useState } from 'react';
import { PayBadge } from '../components/ui/Badge';
import { StatCard } from '../components/ui/StatCard';
import { Modal, FormGroup, ModalActions } from '../components/ui/Modal';
import { mockPayments, mockStudents, mockCourses } from '../data/mockData';
import type { Payment, PaymentStatus } from '../types';

const fmt = (n: number) => n.toLocaleString('ko-KR');

export function PaymentsPage() {
  const [payments, setPayments]   = useState<Payment[]>(mockPayments);
  const [statusFilter, setFilter] = useState<PaymentStatus | ''>('');
  const [showModal, setModal]     = useState(false);

  const [form, setForm] = useState({
    student: mockStudents[0].name,
    course: mockCourses[0].name,
    amount: '',
    dueDate: '',
    memo: '',
  });

  const completedTotal = payments
    .filter((p) => p.status === 'COMPLETED')
    .reduce((s, p) => s + p.amount, 0);

  const pendingTotal = payments
    .filter((p) => p.status === 'PENDING')
    .reduce((s, p) => s + p.amount, 0);

  const filtered = statusFilter
    ? payments.filter((p) => p.status === statusFilter)
    : payments;

  const completePayment = (id: number) => {
    setPayments((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, status: 'COMPLETED', paid: new Date().toISOString().slice(0, 10), method: 'CARD' }
          : p,
      ),
    );
  };

  const handleAdd = () => {
    const newPayment: Payment = {
      id: payments.length + 1,
      student: form.student,
      course: form.course,
      amount: Number(form.amount) || 0,
      status: 'PENDING',
      due: form.dueDate,
      paid: '',
      method: '',
    };
    setPayments((prev) => [...prev, newPayment]);
    setModal(false);
  };

  return (
    <>
      {/* Stats */}
      <div className="stat-grid-3">
        <StatCard
          label="이달 수납"
          value={`₩${fmt(completedTotal)}`}
          icon="💰"
          accentColor="#7b2fff"
        />
        <StatCard
          label="미납 금액"
          value={`₩${fmt(pendingTotal)}`}
          sub={`${payments.filter((p) => p.status === 'PENDING').length}건 처리 필요`}
          icon="⚠️"
          accentColor="#ff9f1c"
        />
        <StatCard
          label="완납 건수"
          value={payments.filter((p) => p.status === 'COMPLETED').length}
          icon="✅"
          accentColor="#2ec4b6"
        />
      </div>

      {/* Filters */}
      <div className="flex-between mb-4">
        <select
          className="select"
          value={statusFilter}
          onChange={(e) => setFilter(e.target.value as PaymentStatus | '')}
        >
          <option value="">전체</option>
          <option value="PENDING">미납</option>
          <option value="COMPLETED">완납</option>
        </select>
        <button className="btn btn-primary" onClick={() => setModal(true)}>
          + 청구서 발행
        </button>
      </div>

      {/* Table */}
      <div className="card">
        <table>
          <thead>
            <tr>
              <th>학생</th>
              <th>강좌</th>
              <th>청구금액</th>
              <th>납부기한</th>
              <th>납부일</th>
              <th>방법</th>
              <th>상태</th>
              <th>처리</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id}>
                <td className="td-name">{p.student}</td>
                <td className="td-muted">{p.course}</td>
                <td className="text-primary">₩{fmt(p.amount)}</td>
                <td className="td-muted">{p.due}</td>
                <td className="td-muted">{p.paid || '-'}</td>
                <td className="td-muted">{p.method || '-'}</td>
                <td><PayBadge status={p.status} /></td>
                <td>
                  {p.status === 'PENDING' ? (
                    <button
                      className="btn btn-sm btn-success"
                      onClick={() => completePayment(p.id)}
                    >
                      완납처리
                    </button>
                  ) : (
                    <span className="td-muted" style={{ fontSize: 12 }}>-</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <Modal title="청구서 발행" onClose={() => setModal(false)}>
          <FormGroup label="학생">
            <select className="modal-input" value={form.student} onChange={(e) => setForm({ ...form, student: e.target.value })}>
              {mockStudents.map((s) => <option key={s.id}>{s.name}</option>)}
            </select>
          </FormGroup>
          <FormGroup label="강좌">
            <select className="modal-input" value={form.course} onChange={(e) => setForm({ ...form, course: e.target.value })}>
              {mockCourses.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name} (₩{fmt(c.fee)})
                </option>
              ))}
            </select>
          </FormGroup>
          <div className="modal-grid-2">
            <FormGroup label="청구금액">
              <input className="modal-input" type="number" placeholder="150000" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />
            </FormGroup>
            <FormGroup label="납부기한">
              <input className="modal-input" type="date" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} />
            </FormGroup>
          </div>
          <FormGroup label="메모">
            <input className="modal-input" placeholder="특이사항 (선택)" value={form.memo} onChange={(e) => setForm({ ...form, memo: e.target.value })} />
          </FormGroup>
          <ModalActions onClose={() => setModal(false)} onSubmit={handleAdd} submitLabel="발행하기" />
        </Modal>
      )}
    </>
  );
}
