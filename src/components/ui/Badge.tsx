import React from 'react';
import type { AttendanceStatus, PaymentStatus } from '../../types';

// ── Attendance Badge ───────────────────────────
const ATT_MAP: Record<AttendanceStatus, [string, string]> = {
  PRESENT: ['badge-green',  '출석'],
  ABSENT:  ['badge-red',    '결석'],
  LATE:    ['badge-yellow', '지각'],
  EXCUSED: ['badge-blue',   '공결'],
};

export function AttBadge({ status }: { status: AttendanceStatus }) {
  const [cls, label] = ATT_MAP[status] ?? ['badge-gray', status];
  return <span className={`badge ${cls}`}>{label}</span>;
}

// ── Payment Badge ──────────────────────────────
const PAY_MAP: Record<PaymentStatus, [string, string]> = {
  COMPLETED: ['badge-green',  '완납'],
  PENDING:   ['badge-yellow', '미납'],
  REFUNDED:  ['badge-blue',   '환불'],
};

export function PayBadge({ status }: { status: PaymentStatus }) {
  const [cls, label] = PAY_MAP[status] ?? ['badge-gray', status];
  return <span className={`badge ${cls}`}>{label}</span>;
}

// ── Status Badge (active/inactive) ────────────
export function ActiveBadge({ active }: { active: boolean }) {
  return active
    ? <span className="badge badge-blue">재원</span>
    : <span className="badge badge-gray">퇴원</span>;
}

// ── Subject Badge ──────────────────────────────
const SUBJ_MAP: Record<string, string> = {
  수학: 'badge-blue',
  영어: 'badge-purple',
  과학: 'badge-green',
  국어: 'badge-yellow',
};

export function SubjectBadge({ subject }: { subject: string }) {
  const cls = SUBJ_MAP[subject] ?? 'badge-gray';
  return <span className={`badge ${cls}`}>{subject}</span>;
}
