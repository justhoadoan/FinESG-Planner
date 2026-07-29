import { useParams } from 'react-router-dom';
import { getCase, getLoans } from '@/api/stub';
import { OBJECT_STATUS } from '@/i18n/labels';
import { useAsync } from '@/lib/useAsync';
import { AppShell } from '@/components/AppShell';
import { StatusBadge } from '@/components/StatusBadge';
import { Card, LoadingState, PageHeading } from '@/components/primitives';
import './Funding.css';

/**
 * S07 — Gói vay.
 *
 * 1–3 Gói vay cho một lần chạy. Mỗi gói có điều kiện đủ; Dự án không đáp ứng
 * điều kiện của một gói chỉ bị loại khỏi gói đó, không khỏi toàn danh mục.
 */
export function Funding() {
  const { caseId = '' } = useParams();
  const caseState = useAsync(() => getCase(caseId), [caseId]);
  const loansState = useAsync(() => getLoans(caseId), [caseId]);
  const activeCase = caseState.status === 'ready' ? caseState.data : undefined;

  return (
    <AppShell activeCase={activeCase}>
      <PageHeading
        title="Gói vay"
        lead="Chọn hoặc cấu hình 1–3 Gói vay mới được phép cho một lần chạy. Gói vay chưa đủ dữ liệu không được dùng trong Phân tích tài chính 12 tháng."
      />

      {loansState.status !== 'ready' ? (
        <LoadingState label="Đang tải Gói vay…" />
      ) : (
        <div className="loan-grid">
          {loansState.data.map((loan) => (
            <Card key={loan.code} className="loan-card">
              <div className="loan-card__head">
                <div>
                  <span className="loan-card__code">{loan.code}</span>
                  <h2 className="loan-card__name">{loan.name}</h2>
                </div>
                <StatusBadge status={OBJECT_STATUS[loan.status]} />
              </div>
              <dl className="loan-card__terms">
                <div><dt>Hạn mức</dt><dd className="num">{loan.limit}</dd></div>
                <div><dt>Lãi suất</dt><dd className="num">{loan.rate}</dd></div>
                <div><dt>Kỳ hạn</dt><dd className="num">{loan.term}</dd></div>
                <div><dt>Ân hạn</dt><dd className="num">{loan.grace}</dd></div>
              </dl>
              <div className="loan-card__eligibility">
                <span className="loan-card__eligibility-label">Điều kiện đủ</span>
                {loan.eligibilityNote}
              </div>
            </Card>
          ))}
          {loansState.data.length < 3 && (
            <div className="loan-add" role="note">
              <p><strong>Thêm Gói vay thứ {loansState.data.length + 1}</strong></p>
              <p>Tối đa 3 gói cho một lần chạy. Gói thứ tư sẽ bị chặn kèm lý do rõ ràng.</p>
            </div>
          )}
        </div>
      )}
    </AppShell>
  );
}
