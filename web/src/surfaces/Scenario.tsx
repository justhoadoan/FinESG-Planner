import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getCase, getScenario } from '@/api/stub';
import { OBJECT_STATUS } from '@/i18n/labels';
import { useAsync } from '@/lib/useAsync';
import { AppShell } from '@/components/AppShell';
import { StatusBadge } from '@/components/StatusBadge';
import { Card, LoadingState, PageHeading } from '@/components/primitives';
import './Scenario.css';

const MONTH_LABELS = Array.from({ length: 12 }, (_, i) => `T${i + 1}`);

/**
 * S06 — Kịch bản & giả định 12 tháng.
 *
 * Bảng 12 tháng dùng native `<table>` (CMP-07) với caption, th scope, cột định
 * danh dính và cuộn ngang khi hẹp. Formula disclosure (CMP-08) mở cấu thành.
 * Hai tỷ lệ chiết khấu tách biệt (NPV và Chi phí tài trợ) — UI không gộp.
 */
export function Scenario() {
  const { caseId = '' } = useParams();
  const caseState = useAsync(() => getCase(caseId), [caseId]);
  const scenState = useAsync(() => getScenario(caseId), [caseId]);
  const [showFormula, setShowFormula] = useState(false);

  const activeCase = caseState.status === 'ready' ? caseState.data : undefined;

  if (scenState.status !== 'ready' || !scenState.data) {
    return (
      <AppShell activeCase={activeCase}>
        {scenState.status === 'loading' ? (
          <LoadingState label="Đang tải Kịch bản…" />
        ) : (
          <PageHeading title="Kịch bản chưa sẵn sàng" lead="Hồ sơ này chưa có dữ liệu Kịch bản để hiển thị." />
        )}
      </AppShell>
    );
  }

  const s = scenState.data;

  return (
    <AppShell activeCase={activeCase}>
      <PageHeading
        title="Kịch bản & giả định 12 tháng"
        lead="Chọn một Kịch bản mẫu rồi chỉ sửa/xác nhận các biến có tác động đến khả năng chi trả. Giá trị mẫu mang nhãn Ước tính cho tới khi CFO xác nhận."
        actions={<Link to={`/cases/${caseId}/funding`} className="btn btn--secondary">Tới Gói vay →</Link>}
      />

      {/* Scenario selector — CMP-10, native radio trong fieldset */}
      <fieldset className="scenario-selector">
        <legend className="scenario-selector__legend">Kịch bản</legend>
        {(['LOW', 'BASE', 'HIGH'] as const).map((k) => (
          <label key={k} className={'scenario-opt' + (s.selected === k ? ' is-selected' : '')}>
            <input type="radio" name="scenario" defaultChecked={s.selected === k} />
            <span className="scenario-opt__name">
              {k === 'LOW' ? 'Thấp' : k === 'BASE' ? 'Cơ sở' : 'Cao'}
            </span>
            <span className="scenario-opt__note">
              {k === 'BASE' ? 'Đã xác nhận' : 'Bản sao để phân tích độ nhạy'}
            </span>
          </label>
        ))}
      </fieldset>

      <div className="scenario-table-wrap" tabIndex={0} role="region" aria-label="Bảng dòng tiền 12 tháng, cuộn ngang">
        <table className="scenario-table">
          <caption>
            Dòng tiền theo tháng — Kịch bản Cơ sở, đơn vị tỷ VND. Tổng 12 tháng ở
            cột cuối; ô tính toán chỉ đọc.
          </caption>
          <thead>
            <tr>
              <th scope="col" className="sticky-col">Dòng</th>
              {MONTH_LABELS.map((mo) => (
                <th key={mo} scope="col">{mo}</th>
              ))}
              <th scope="col" className="total-col">Tổng</th>
              <th scope="col">Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {s.rows.map((row) => {
              const total = row.months.reduce<number>((a, v) => a + (v ?? 0), 0);
              return (
                <tr key={row.key}>
                  <th scope="row" className="sticky-col">{row.label}</th>
                  {row.months.map((v, i) => (
                    <td key={i} className="num">
                      {v === null ? <span className="cell-null">N/A</span> : v}
                    </td>
                  ))}
                  <td className="num total-col">{total.toLocaleString('vi-VN')}</td>
                  <td><StatusBadge status={OBJECT_STATUS[row.status]} /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <button
        type="button"
        className="formula-toggle"
        aria-expanded={showFormula}
        onClick={() => setShowFormula((v) => !v)}
      >
        {showFormula ? '▾' : '▸'} Công thức cấu thành (CFADS, DSCR, Tiền cuối kỳ)
      </button>
      {showFormula && (
        <div className="formula-disclosure">
          <code>CFADS12 = OperatingCashPreDebt12 + ProjectOCF12</code>
          <code>DebtService12 = ExistingDebtService12 + NewDebtService12</code>
          <code>DSCR12 = CFADS12 / DebtService12 (N/A nếu DebtService12 = 0)</code>
          <code>Cash_t = Cash_(t−1) + OpCash_t + ΣProjectOCF_t + Drawdown_t − ΣCapEx_t − DebtService_t</code>
          <p className="formula-disclosure__note">
            Kiểm tra thanh khoản áp cho <strong>từng tháng</strong> (Cash_t ≥ ngưỡng),
            không chỉ cuối kỳ — để một tháng giữa kỳ thiếu tiền không bị che bởi
            Tiền cuối kỳ dương.
          </p>
        </div>
      )}

      <div className="scenario-cols">
        <Card>
          <h2 className="scenario-cols__title">Ngưỡng tài chính</h2>
          <dl className="threshold-list">
            {s.thresholds.map((t) => (
              <div key={t.label}>
                <dt>{t.label}</dt>
                <dd><span className="num">{t.value}</span><span className="threshold-note">{t.note}</span></dd>
              </div>
            ))}
          </dl>
        </Card>
        <Card>
          <h2 className="scenario-cols__title">Tỷ lệ chiết khấu</h2>
          <p className="scenario-cols__hint">Hai tỷ lệ riêng biệt; UI không gộp thành một "tỷ lệ tài chính".</p>
          <dl className="threshold-list">
            <div><dt>Chiết khấu NPV</dt><dd><span className="num">{s.discountNpv}</span></dd></div>
            <div><dt>Chiết khấu Chi phí tài trợ</dt><dd><span className="num">{s.discountFinancing}</span></dd></div>
          </dl>
        </Card>
      </div>
    </AppShell>
  );
}
