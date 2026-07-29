import type { MetricGroup as MetricGroupT } from '@/api/types';
import { SOLVER_STATUS, type SolverStatusKey } from '@/i18n/labels';
import './ResultBits.css';

/**
 * CMP-19 — Solver status banner.
 *
 * Công bố trạng thái bộ giải / Bộ kiểm tra nghiệm TRƯỚC mọi KPI. Chỉ "Tối ưu
 * đã kiểm chứng" được trình bày như Phương án tối ưu.
 */
export function SolverStatusBanner({
  status,
  detail,
}: {
  status: SolverStatusKey;
  detail?: string;
}) {
  const s = SOLVER_STATUS[status];
  return (
    <div className="solver-banner" data-tone={s.tone} role={status === 'VERIFIED_OPTIMAL' ? undefined : 'note'}>
      <span className="solver-banner__glyph" aria-hidden="true">{s.glyph}</span>
      <div>
        <div className="solver-banner__title">{s.label}</div>
        {detail && <div className="solver-banner__detail">{detail}</div>}
      </div>
    </div>
  );
}

/**
 * CMP-21 — Result metric group.
 *
 * Tách vòng đời / 12 tháng / vốn-nợ / phát thải / rủi ro thành các nhóm RIÊNG.
 * Mọi số có đơn vị và kỳ. KHÔNG có điểm tổng hợp NPV–CO₂–rủi ro (guardrail cốt lõi).
 */
export function MetricGroupCard({ group }: { group: MetricGroupT }) {
  return (
    <section className="metric-group" aria-label={group.title}>
      <h3 className="metric-group__title">{group.title}</h3>
      <div className="metric-group__grid">
        {group.metrics.map((mtr) => (
          <div key={mtr.label} className="metric" data-tone={mtr.tone ?? 'neutral'}>
            <div className="metric__label">{mtr.label}</div>
            <div className="metric__value num">{mtr.value}</div>
            <div className="metric__meta">
              {[mtr.unit, mtr.period].filter(Boolean).join(' · ')}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
