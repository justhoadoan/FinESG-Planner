import { Link } from 'react-router-dom';
import type { ReadinessRow as Row } from '@/api/types';
import { OBJECT_STATUS } from '@/i18n/labels';
import { StatusBadge } from './StatusBadge';
import './ReadinessRow.css';

/**
 * CMP-04 — Readiness row.
 *
 * Năm vùng ổn định: đối tượng, người phụ trách, trạng thái, lỗi chặn, hành động
 * kế tiếp. Hành động là link có accessible name đầy đủ. Lỗi chặn KHÔNG chỉ dựa
 * vào màu — có nhãn text và icon.
 */
export function ReadinessRow({ row }: { row: Row }) {
  return (
    <li className="readiness-row" data-blocked={row.blocker ? 'true' : 'false'}>
      <div className="readiness-row__object">
        <span className="readiness-row__name">{row.object}</span>
        <span className="readiness-row__owner">{row.owner}</span>
      </div>

      <div className="readiness-row__status">
        <StatusBadge status={OBJECT_STATUS[row.status]} />
      </div>

      <div className="readiness-row__blocker">
        {row.blocker ? (
          <span className="readiness-row__blocker-text">
            <span aria-hidden="true">⚠ </span>
            {row.blocker}
          </span>
        ) : (
          <span className="readiness-row__ok">Không có mục chặn</span>
        )}
      </div>

      <div className="readiness-row__action">
        <Link
          to={row.nextActionTarget}
          className="readiness-row__link"
          aria-label={`${row.nextActionLabel} — ${row.object}`}
        >
          {row.nextActionLabel} →
        </Link>
      </div>
    </li>
  );
}
