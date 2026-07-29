import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCase, getProjects } from '@/api/stub';
import type { ProjectView } from '@/api/types';
import { OBJECT_STATUS } from '@/i18n/labels';
import { useAsync } from '@/lib/useAsync';
import { AppShell } from '@/components/AppShell';
import { StatusBadge } from '@/components/StatusBadge';
import { Button, LoadingState, PageHeading } from '@/components/primitives';
import './Projects.css';

/**
 * S08 + S10 + S11 — Danh mục Dự án, bằng chứng CO₂ và rủi ro.
 *
 * Mỗi Dự án tách ba trạng thái độc lập: tài chính, CO₂, rủi ro (CMP-11). Chồng
 * lấn CO₂ được cảnh báo. Rubric 5 chiều (CMP-14) và Phiếu bằng chứng (CMP-13)
 * mở trong panel chi tiết. Cờ đỏ loại Dự án khỏi đề xuất tự động.
 */
export function Projects() {
  const { caseId = '' } = useParams();
  const caseState = useAsync(() => getCase(caseId), [caseId]);
  const projState = useAsync(() => getProjects(caseId), [caseId]);
  const [openCode, setOpenCode] = useState<string | null>(null);

  const activeCase = caseState.status === 'ready' ? caseState.data : undefined;

  if (projState.status !== 'ready') {
    return (
      <AppShell activeCase={activeCase}>
        <LoadingState label="Đang tải Dự án…" />
      </AppShell>
    );
  }

  const projects = projState.data;
  const overlapGroups = new Map<string, string[]>();
  for (const p of projects) {
    const g = p.emissions?.overlapGroup;
    if (g) overlapGroups.set(g, [...(overlapGroups.get(g) ?? []), p.code]);
  }
  const overlaps = [...overlapGroups.entries()].filter(([, codes]) => codes.length > 1);

  return (
    <AppShell activeCase={activeCase}>
      <PageHeading
        title="Danh mục Dự án"
        lead={`${projects.length}/10 Dự án. Tài chính, CO₂ và rủi ro là ba trạng thái độc lập; chỉ CO₂ đã xác nhận mới vào mục tiêu chính.`}
        actions={<Button variant="secondary" aria-disabled={projects.length >= 10}>+ Thêm Dự án</Button>}
      />

      {overlaps.map(([group, codes]) => (
        <div key={group} className="overlap-banner" role="note">
          <strong>Chồng lấn vùng phát thải.</strong> {codes.join(', ')} dùng chung
          đường cơ sở <code>{group}</code>. Phải đặt quan hệ loại trừ hoặc gộp thành
          một Dự án kết hợp trước khi tối ưu — hệ thống không cộng trùng CO₂.
        </div>
      ))}

      <ul className="project-list">
        {projects.map((p) => (
          <li key={p.code}>
            <ProjectRow
              project={p}
              open={openCode === p.code}
              onToggle={() => setOpenCode((c) => (c === p.code ? null : p.code))}
            />
          </li>
        ))}
      </ul>
    </AppShell>
  );
}

function ProjectRow({ project: p, open, onToggle }: { project: ProjectView; open: boolean; onToggle: () => void }) {
  return (
    <div className={'project-row' + (p.redFlag ? ' has-red-flag' : '')}>
      <div className="project-row__main">
        <div className="project-row__id">
          <span className="project-row__code">{p.code}</span>
          <h2 className="project-row__name">{p.name}</h2>
        </div>

        <div className="project-row__eligibility">
          <Eligibility label="Tài chính" status={p.financeStatus} />
          <Eligibility label="CO₂" status={p.co2Status} />
          <RiskChip total={p.riskTotal} band={p.riskBand} redFlag={p.redFlag} />
        </div>

        <button type="button" className="project-row__toggle" aria-expanded={open} onClick={onToggle}>
          {open ? 'Thu gọn' : 'Chi tiết'} {open ? '▾' : '▸'}
        </button>
      </div>

      <dl className="project-row__figures">
        <div><dt>CapEx vòng đời</dt><dd className="num">{p.capexLifetime}</dd></div>
        <div><dt>CapEx 12 tháng</dt><dd className="num">{p.capex12m}</dd></div>
        <div><dt>NPV trước tài trợ</dt><dd className="num finance">{p.npvBeforeFinancing}</dd></div>
      </dl>

      {p.capexPost12m && (
        <div className="project-row__post12" role="note">
          <span aria-hidden="true">⚠ </span>
          Còn <span className="num">{p.capexPost12m}</span> CapEx sau tháng 12 — khả
          thi tài chính chỉ được kiểm tra trong 12 tháng, phần tài trợ tương lai
          chưa được mô hình kiểm chứng.
        </div>
      )}

      {open && (
        <div className="project-detail">
          <section className="project-detail__block">
            <h3>Phiếu bằng chứng phát thải</h3>
            {p.emissions ? (
              <dl className="evidence-fields">
                <div><dt>Đường cơ sở</dt><dd>{p.emissions.baseline}</dd></div>
                <div><dt>Scope</dt><dd>{p.emissions.scope === 'SCOPE_1' ? 'Scope 1' : 'Scope 2'}</dd></div>
                <div><dt>Lượng giảm</dt><dd className="num carbon">{p.emissions.annualReduction}</dd></div>
                <div><dt>Nguồn hệ số</dt><dd>{p.emissions.factorSource || <span className="missing">Thiếu — cần nguồn & phiên bản</span>}</dd></div>
                <div><dt>Phương pháp</dt><dd>{p.emissions.method}</dd></div>
                <div><dt>Loại dữ liệu</dt><dd>{p.emissions.dataType === 'REAL' ? 'Thật' : 'Mô phỏng'}</dd></div>
                <div><dt>Trạng thái CO₂</dt><dd><StatusBadge status={OBJECT_STATUS[p.emissions.status]} /></dd></div>
              </dl>
            ) : (
              <p className="missing">Chưa có Phiếu bằng chứng phát thải. CO₂ chưa xác nhận sẽ bị loại khỏi mục tiêu chính.</p>
            )}
          </section>

          <section className="project-detail__block">
            <h3>Điểm rủi ro — 5 chiều, mỗi chiều 0–2</h3>
            <table className="risk-table">
              <caption className="visually-hidden">Rubric rủi ro năm chiều của Dự án {p.code}</caption>
              <thead>
                <tr><th scope="col">Chiều</th><th scope="col">Điểm</th><th scope="col">Lý do</th></tr>
              </thead>
              <tbody>
                {p.risk.map((d) => (
                  <tr key={d.name} className={d.score === 2 ? 'is-high' : ''}>
                    <th scope="row">{d.name}</th>
                    <td className="num">{d.score}</td>
                    <td>{d.reason}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr><th scope="row">Tổng</th><td className="num">{p.riskTotal}</td><td>{p.riskBand}{p.redFlag ? ' · có cờ đỏ trọng yếu' : ''}</td></tr>
              </tfoot>
            </table>
          </section>
        </div>
      )}
    </div>
  );
}

function Eligibility({ label, status }: { label: string; status: ProjectView['financeStatus'] }) {
  return (
    <div className="eligibility">
      <span className="eligibility__label">{label}</span>
      <StatusBadge status={OBJECT_STATUS[status]} />
    </div>
  );
}

function RiskChip({ total, band, redFlag }: { total: number; band: string; redFlag: boolean }) {
  return (
    <div className="eligibility">
      <span className="eligibility__label">Rủi ro</span>
      <span className={'risk-chip' + (redFlag ? ' is-red' : '')}>
        <span aria-hidden="true">{redFlag ? '⚑ ' : ''}</span>
        <span className="num">{total}/10</span> · {band}
      </span>
    </div>
  );
}
