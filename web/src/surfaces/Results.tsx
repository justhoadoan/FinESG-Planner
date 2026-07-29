import { Link, useParams, useSearchParams } from 'react-router-dom';
import { ALL_STRATEGY_PLANS, getCase, getRunResult } from '@/api/stub';
import type { DiagnosisView, PlanView } from '@/api/types';
import { useAsync } from '@/lib/useAsync';
import { AppShell } from '@/components/AppShell';
import { MetricGroupCard, SolverStatusBanner } from '@/components/ResultBits';
import { LoadingState, PageHeading } from '@/components/primitives';
import './Results.css';

/**
 * S15 (Phương án) + S14 (Chẩn đoán Vô nghiệm) + S16 (So sánh).
 *
 * Guardrail cốt lõi hiển thị ở đây: KHÔNG có điểm tổng hợp NPV–CO₂–rủi ro, chỉ
 * "Tối ưu đã kiểm chứng" mới là Phương án tối ưu, và Vô nghiệm dẫn tới chẩn
 * đoán + deep-link chứ không tự nới ngưỡng.
 */
export function Results() {
  const { caseId = '' } = useParams();
  const [params] = useSearchParams();
  const strategy = params.get('strategy') ?? 'BALANCED';
  const caseState = useAsync(() => getCase(caseId), [caseId]);
  const resultState = useAsync(() => getRunResult(caseId, strategy), [caseId, strategy]);

  const activeCase = caseState.status === 'ready' ? caseState.data : undefined;

  if (resultState.status !== 'ready') {
    return (
      <AppShell activeCase={activeCase}>
        <LoadingState label="Đang tải kết quả…" />
      </AppShell>
    );
  }

  if (!resultState.data) {
    return (
      <AppShell activeCase={activeCase}>
        <PageHeading title="Chưa có kết quả" lead="Chạy một Chiến lược ở bước Tối ưu để có Phương án." />
        <Link to={`/cases/${caseId}/optimize`} className="btn btn--primary">Tới bước Tối ưu →</Link>
      </AppShell>
    );
  }

  return (
    <AppShell activeCase={activeCase}>
      {resultState.data.kind === 'diagnosis' ? (
        <Diagnosis caseId={caseId} d={resultState.data.diagnosis} />
      ) : (
        <Plan caseId={caseId} plan={resultState.data.plan} />
      )}
    </AppShell>
  );
}

function Plan({ caseId, plan }: { caseId: string; plan: PlanView }) {
  return (
    <>
      <PageHeading
        title="Chi tiết Phương án"
        lead={`Chiến lược ${plan.strategyName} · lần chạy ${plan.runId}`}
        actions={<Link to={`/cases/${caseId}/evidence`} className="btn btn--primary">Xuất Gói bằng chứng →</Link>}
      />

      <SolverStatusBanner
        status={plan.solverStatus}
        detail={`Khoảng cách tối ưu ${plan.mipGap} · thời gian giải ${plan.solveSeconds}s · Bộ kiểm tra nghiệm xác nhận hợp lệ`}
      />

      <div className="metric-grid">
        {plan.metricGroups.map((g) => (
          <MetricGroupCard key={g.title} group={g} />
        ))}
      </div>
      <p className="no-composite">
        Bảy nhóm chỉ tiêu hiển thị riêng. Không có một điểm FinESG tổng hợp trộn
        NPV, CO₂ và rủi ro — mỗi đại lượng giữ đơn vị và kỳ của nó.
      </p>

      <h2 className="section-title">Lý do chọn / loại từng Dự án</h2>
      <ul className="decision-list">
        {plan.decisions.map((d) => (
          <li key={d.code} className={'decision' + (d.selected ? ' is-in' : ' is-out')}>
            <div className="decision__head">
              <span className="decision__mark" aria-hidden="true">{d.selected ? '✓' : '—'}</span>
              <span className="decision__code">{d.code}</span>
              <span className="decision__name">{d.name}</span>
              <span className="decision__tag">{d.selected ? 'Được chọn' : 'Không chọn'}</span>
            </div>
            <p className="decision__reason">{d.reason}</p>
            {d.selected && (
              <div className="decision__capital">
                <span>Vốn nội bộ: <span className="num">{d.internalCapital}</span></span>
                <span>Vốn vay: <span className="num">{d.loanCapital}</span></span>
              </div>
            )}
            {d.post12mWarning && (
              <p className="decision__warn"><span aria-hidden="true">⚠ </span>{d.post12mWarning}</p>
            )}
          </li>
        ))}
      </ul>

      <h2 className="section-title">Ràng buộc chạm ngưỡng</h2>
      <ul className="binding-list">
        {plan.bindingConstraints.map((b) => <li key={b}>{b}</li>)}
      </ul>

      <StrategyComparison activeRunId={plan.runId} />
    </>
  );
}

/** S14 — Chẩn đoán Vô nghiệm. */
function Diagnosis({ caseId, d }: { caseId: string; d: DiagnosisView }) {
  return (
    <>
      <PageHeading title="Chẩn đoán Vô nghiệm" lead={`Chiến lược ${d.strategyName} · lần chạy ${d.runId}`} />
      <SolverStatusBanner
        status="INFEASIBLE"
        detail="Không có nghiệm với các ngưỡng hiện tại. Hệ thống chưa thay đổi bất kỳ ngưỡng nào — chỉ CFO được sửa đầu vào."
      />

      <div className="diag-wrap" role="region" aria-label="Ràng buộc gây nghẽn">
        <table className="diag-table">
          <caption>Ràng buộc có khả năng gây nghẽn, giá trị hiện tại so với ngưỡng và độ thiếu (slack). Mỗi hàng khai báo nguồn số liệu.</caption>
          <thead>
            <tr>
              <th scope="col">Mã</th><th scope="col">Ràng buộc</th>
              <th scope="col">Hiện tại</th><th scope="col">Ngưỡng</th>
              <th scope="col">Độ thiếu</th><th scope="col">Nguồn số</th>
              <th scope="col">Sửa ở đâu</th>
            </tr>
          </thead>
          <tbody>
            {d.rows.map((r) => (
              <tr key={r.code}>
                <td className="mono">{r.code}</td>
                <th scope="row">{r.label}</th>
                <td className="num">{r.actual}</td>
                <td className="num">{r.threshold}</td>
                <td className="num diag-slack">{r.slack}</td>
                <td><span className="basis-tag">{r.basis === 'LEDGER' ? 'Verifier' : 'Model slack'}</span></td>
                <td><Link to={r.deepLink} className="diag-link">{r.deepLinkLabel} →</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="diag-note">
        Gợi ý điều chỉnh chỉ là phân tích "nếu–thì" — hệ thống không tự sửa dữ liệu
        và không có nút "Tự sửa để có nghiệm". CFO quyết định thay đổi đầu vào, tạo
        phiên bản mới rồi chạy lại.
      </p>
      <Link to={`/cases/${caseId}/optimize`} className="btn btn--secondary">Quay lại cấu hình lần chạy</Link>
    </>
  );
}

/** S16 — So sánh ba Chiến lược trên cùng phiên bản. */
function StrategyComparison({ activeRunId }: { activeRunId: string }) {
  const plans = ALL_STRATEGY_PLANS;
  const pick = (p: PlanView, group: string, label: string) =>
    p.metricGroups.find((g) => g.title === group)?.metrics.find((m) => m.label === label);

  const rows: { group: string; label: string }[] = [
    { group: 'Vòng đời', label: 'NPV trước tài trợ' },
    { group: 'Phát thải', label: 'CO₂ đã xác nhận' },
    { group: 'Thanh khoản 12 tháng', label: 'Tiền cuối kỳ' },
    { group: 'Thanh khoản 12 tháng', label: 'DSCR' },
    { group: 'Vốn & nợ', label: 'Vốn vay mới' },
    { group: 'Vốn & nợ', label: 'Chi phí tài trợ' },
    { group: 'Rủi ro', label: 'Tổng Điểm rủi ro danh mục' },
  ];

  const identical = plans[0].decisions.map((d) => d.selected).join() ===
    plans[1].decisions.map((d) => d.selected).join();

  return (
    <>
      <h2 className="section-title">So sánh ba Chiến lược — cùng phiên bản dữ liệu</h2>
      {identical && (
        <p className="same-plan-note">An toàn và Cân bằng trả <strong>cùng Phương án</strong> ở phiên bản này; Audit Trail vẫn giữ riêng cho từng Chiến lược.</p>
      )}
      <div className="compare-wrap" role="region" aria-label="So sánh Chiến lược, cuộn ngang">
        <table className="compare-table">
          <caption className="visually-hidden">So sánh chỉ tiêu giữa ba Chiến lược</caption>
          <thead>
            <tr>
              <th scope="col">Chỉ tiêu</th>
              {plans.map((p) => (
                <th key={p.runId} scope="col" className={p.runId === activeRunId ? 'is-active' : ''}>
                  {p.strategyName}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.group + r.label}>
                <th scope="row">{r.label}<span className="compare-period">{pick(plans[0], r.group, r.label)?.period}</span></th>
                {plans.map((p) => {
                  const mtr = pick(p, r.group, r.label);
                  return (
                    <td key={p.runId} className={'num' + (p.runId === activeRunId ? ' is-active' : '')}>
                      {mtr ? `${mtr.value}${mtr.unit ? ' ' + mtr.unit : ''}` : '—'}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="no-composite">Mỗi hàng là một đại lượng riêng — so sánh trực tiếp, không quy về một điểm.</p>
    </>
  );
}
