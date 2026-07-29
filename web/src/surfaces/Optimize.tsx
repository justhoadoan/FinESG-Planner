import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getCase, getRunContract } from '@/api/stub';
import type { StrategyView } from '@/api/types';
import { useAsync } from '@/lib/useAsync';
import { AppShell } from '@/components/AppShell';
import { Card, LoadingState, PageHeading } from '@/components/primitives';
import './Optimize.css';

/**
 * S12 — Cấu hình lần chạy.
 *
 * Hợp đồng lần chạy (CMP-16) công bố phiên bản, Chiến lược, Gói vay, Dự án đủ
 * điều kiện và dữ liệu bị loại TRƯỚC khi chạy. Strategy selector (CMP-15) công
 * bố thứ tự lexicographic — không có trọng số/slider.
 */
export function Optimize() {
  const { caseId = '' } = useParams();
  const caseState = useAsync(() => getCase(caseId), [caseId]);
  const contractState = useAsync(() => getRunContract(caseId), [caseId]);
  const [strategy, setStrategy] = useState<StrategyView['key']>('BALANCED');

  const activeCase = caseState.status === 'ready' ? caseState.data : undefined;

  if (contractState.status !== 'ready' || !contractState.data) {
    return (
      <AppShell activeCase={activeCase}>
        {contractState.status === 'loading' ? (
          <LoadingState label="Đang tải hợp đồng lần chạy…" />
        ) : (
          <PageHeading title="Chưa đủ điều kiện chạy" lead="Hồ sơ này chưa đạt trạng thái cho phép cấu hình lần chạy." />
        )}
      </AppShell>
    );
  }

  const c = contractState.data;

  return (
    <AppShell activeCase={activeCase}>
      <PageHeading
        title="Cấu hình lần chạy tối ưu"
        lead="Chọn một Chiến lược, xem hợp đồng lần chạy rồi chạy. Hệ thống công bố dữ liệu đủ điều kiện và dữ liệu bị loại trước khi tối ưu."
      />

      <fieldset className="strategy-selector">
        <legend className="strategy-selector__legend">Chiến lược — thứ tự ưu tiên lexicographic, không có trọng số</legend>
        <div className="strategy-selector__grid">
          {c.strategies.map((s) => (
            <label key={s.key} className={'strategy-card' + (strategy === s.key ? ' is-selected' : '')}>
              <input
                type="radio"
                name="strategy"
                checked={strategy === s.key}
                onChange={() => setStrategy(s.key)}
              />
              <span className="strategy-card__head">
                <span className="strategy-card__name">{s.name}</span>
                {strategy === s.key && <span className="strategy-card__badge">Đang chọn</span>}
              </span>
              <ol className="strategy-card__tiers">
                {s.tiers.map((t) => (
                  <li key={t.order}>{t.text}</li>
                ))}
              </ol>
            </label>
          ))}
        </div>
      </fieldset>

      <Card className="run-contract">
        <h2 className="run-contract__title">Hợp đồng lần chạy</h2>
        <div className="run-contract__grid">
          <div>
            <dt>Phiên bản đầu vào</dt>
            <dd className="num">v{c.inputVersion}</dd>
          </div>
          <div>
            <dt>Gói vay được phép</dt>
            <dd>{c.allowedLoans.join(', ')}</dd>
          </div>
          <div>
            <dt>Loại đầu ra</dt>
            <dd>{c.outputKind === 'FINANCE_12M' ? 'Phân tích tài chính 12 tháng' : 'Sàng lọc mô phỏng'}</dd>
          </div>
        </div>

        <div className="run-contract__lists">
          <div>
            <h3 className="run-contract__sub run-contract__sub--ok">Dự án đủ điều kiện</h3>
            <ul>
              {c.eligibleProjects.map((p) => <li key={p}>{p}</li>)}
            </ul>
          </div>
          <div>
            <h3 className="run-contract__sub run-contract__sub--excl">Dự án bị loại trước tối ưu</h3>
            <ul>
              {c.excludedProjects.map((p) => (
                <li key={p.code}><strong>{p.code}</strong> — {p.reason}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="run-contract__actions">
          <Link
            to={`/cases/${caseId}/results?strategy=${strategy}`}
            className="btn btn--primary"
          >
            Chạy phân tích tài chính 12 tháng →
          </Link>
          <Link
            to={`/cases/${caseId}/results?strategy=INFEASIBLE`}
            className="btn btn--secondary"
          >
            Xem ví dụ Vô nghiệm (ngưỡng CO₂ = 32.000)
          </Link>
        </div>
      </Card>
    </AppShell>
  );
}
