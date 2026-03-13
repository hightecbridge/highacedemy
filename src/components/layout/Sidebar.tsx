import React from 'react';
import { NAV_ITEMS } from '../../data/mockData';
import type { PageId } from '../../types';

interface SidebarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onLogout: () => void;
}

export function Sidebar({ currentPage, onNavigate, onLogout }: SidebarProps) {
  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="logo-icon">🎓</div>
        <div>
          <div className="logo-text">Academy Pro</div>
          <div className="logo-sub">관리자 시스템</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="nav">
        {NAV_ITEMS.map((item, idx) => {
          if (item.type === 'section') {
            return (
              <div key={`section-${idx}`} className="nav-section">
                {item.label}
              </div>
            );
          }

          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              className={`nav-item${isActive ? ' active' : ''}`}
              onClick={() => onNavigate(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
              {item.badge && (
                <span className="nav-badge">{item.badge}</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* User info */}
      <div className="sidebar-user">
        <div className="sidebar-user-inner">
          <div className="avatar">관</div>
          <div>
            <div style={{ color: '#fff', fontSize: 13, fontWeight: 600, marginLeft: 10 }}>관리자</div>
            <div style={{ color: 'rgba(255,255,255,.4)', fontSize: 11, marginLeft: 10 }}>ADMIN</div>
          </div>
          <button
            onClick={onLogout}
            title="로그아웃"
            style={{
              marginLeft: 'auto', background: 'none', border: 'none',
              cursor: 'pointer', color: 'rgba(255,255,255,.3)', fontSize: 16,
            }}
          >
            ⏏
          </button>
        </div>
      </div>
    </aside>
  );
}
