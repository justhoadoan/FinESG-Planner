import { NavLink } from 'react-router-dom';
import type { ReactNode } from 'react';
import type { CaseSummary } from '@/api/types';
import { READINESS_LEVEL, SECTORS } from '@/i18n/labels';
import { StatusBadge } from './StatusBadge';
import './AppShell.css';

/** Thứ tự công việc trong Hồ sơ — IA của EXPERIENCE.md, không ép wizard. */
interface CaseNavItem {
  to: string;
  label: string;
  end?: boolean;
}
const CASE_NAV: readonly CaseNavItem[] = [
  { to: '', label: 'Tổng quan', end: true },
  { to: 'bctc', label: 'BCTC' },
  { to: 'scenario', label: 'Kịch bản & tài trợ' },
  { to: 'projects', label: 'Dự án' },
  { to: 'optimize', label: 'Tối ưu' },
  { to: 'results', label: 'Kết quả' },
  { to: 'evidence', label: 'Bằng chứng & lịch sử' },
];

interface AppShellProps {
  /** Có mặt khi đang trong một Hồ sơ; vắng ở cấp Danh sách (S01). */
  activeCase?: CaseSummary;
  children: ReactNode;
}

/**
 * CMP-01 — App shell.
 *
 * Một `main` có tên, một `h1` cấp trang do surface cung cấp, skip link, và thanh
 * Hồ sơ luôn hiển thị phiên bản/readiness/stale. Không lộ dữ liệu nhạy cảm trong
 * title/URL (đã dùng mã Hồ sơ, không dùng tên đầy đủ trong route).
 */
export function AppShell({ activeCase, children }: AppShellProps) {
  return (
    <div className="app-shell">
      <a className="skip-link" href="#main">
        Bỏ qua tới nội dung chính
      </a>

      <aside className="app-shell__sidebar" aria-label="Điều hướng Hồ sơ phân tích">
        <div className="app-shell__brand">
          <span className="app-shell__brand-mark" aria-hidden="true">
            FE
          </span>
          <div>
            <div className="app-shell__brand-name">FinESG Planner</div>
            <div className="app-shell__brand-sub">Sàng lọc CapEx xanh</div>
          </div>
        </div>

        {activeCase ? (
          <nav aria-label="Các bước trong Hồ sơ">
            <ul className="app-shell__nav">
              {CASE_NAV.map((item) => (
                <li key={item.to || 'overview'}>
                  <NavLink
                    to={`/cases/${activeCase.id}/${item.to}`}
                    end={item.end}
                    className={({ isActive }) =>
                      'app-shell__nav-link' + (isActive ? ' is-active' : '')
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        ) : (
          <nav aria-label="Điều hướng chính">
            <ul className="app-shell__nav">
              <li>
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    'app-shell__nav-link' + (isActive ? ' is-active' : '')
                  }
                >
                  Danh sách Hồ sơ
                </NavLink>
              </li>
            </ul>
          </nav>
        )}
      </aside>

      <div className="app-shell__body">
        {activeCase && (
          <div className="case-bar" aria-label="Trạng thái Hồ sơ đang mở">
            <div className="case-bar__id">
              <span className="case-bar__code">{activeCase.code}</span>
              <span className="case-bar__sector">{SECTORS[activeCase.sector]}</span>
            </div>
            <div className="case-bar__meta">
              <span className="case-bar__version">
                Phiên bản đầu vào <span className="num">v{activeCase.version}</span>
              </span>
              <StatusBadge status={READINESS_LEVEL[activeCase.readiness]} />
              {activeCase.stale && (
                <StatusBadge status={READINESS_LEVEL.NEEDS_RERUN} />
              )}
            </div>
          </div>
        )}

        <main id="main" className="app-shell__main" tabIndex={-1}>
          {children}
        </main>
      </div>
    </div>
  );
}
