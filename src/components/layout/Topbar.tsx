import React from 'react';
import { PAGE_TITLES } from '../../data/mockData';
import type { PageId } from '../../types';

interface TopbarProps {
  currentPage: PageId;
}

export function Topbar({ currentPage }: TopbarProps) {
  return (
    <header className="topbar">
      <span className="page-title">{PAGE_TITLES[currentPage]}</span>
      <div className="topbar-right">
        <button className="topbar-btn" title="검색">🔍</button>
        <button className="topbar-btn" title="알림">
          🔔
          <span className="notification-dot" />
        </button>
        <div className="avatar" style={{ width: 34, height: 34, fontSize: 13 }}>관</div>
      </div>
    </header>
  );
}
