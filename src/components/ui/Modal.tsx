import React, { type ReactNode } from 'react';

// ── Modal shell ────────────────────────────────
interface ModalProps {
  title: string;
  onClose: () => void;
  children: ReactNode;
}

export function Modal({ title, onClose, children }: ModalProps) {
  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-title">{title}</div>
        {children}
      </div>
    </div>
  );
}

// ── Form Group ─────────────────────────────────
interface FieldProps {
  label: string;
  children: ReactNode;
}

export function FormGroup({ label, children }: FieldProps) {
  return (
    <div className="modal-form-group">
      <label className="modal-label">{label}</label>
      {children}
    </div>
  );
}

// ── Modal Actions ──────────────────────────────
interface ActionsProps {
  onClose: () => void;
  onSubmit: () => void;
  submitLabel?: string;
}

export function ModalActions({ onClose, onSubmit, submitLabel = '저장하기' }: ActionsProps) {
  return (
    <div className="modal-actions">
      <button className="btn btn-ghost" onClick={onClose}>취소</button>
      <button className="btn btn-primary" onClick={onSubmit}>{submitLabel}</button>
    </div>
  );
}
