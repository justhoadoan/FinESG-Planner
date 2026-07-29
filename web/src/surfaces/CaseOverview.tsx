import { useParams } from 'react-router-dom';
import { getCase, getReadiness } from '@/api/stub';
import { READINESS_LEVEL } from '@/i18n/labels';
import { useAsync } from '@/lib/useAsync';
import { AppShell } from '@/components/AppShell';
import { ReadinessRow } from '@/components/ReadinessRow';
import { StatusBadge } from '@/components/StatusBadge';
import {
  Button,
  Card,
  ErrorState,
  LoadingState,
  PageHeading,
} from '@/components/primitives';
import './CaseOverview.css';

/**
 * S03 — Tổng quan & mức sẵn sàng.
 *
 * Checklist theo người phụ trách với HAI TRỤC ĐỘC LẬP: sẵn sàng tài chính và
 * sẵn sàng CO₂ (EXPERIENCE.md). Mỗi blocker/stale row có owner và một hành động
 * kế tiếp cụ thể. Readiness được backend tính (AD-15); FE chỉ render report.
 */
export function CaseOverview() {
  const { caseId = '' } = useParams();
  const caseState = useAsync(() => getCase(caseId), [caseId]);
  const reportState = useAsync(() => getReadiness(caseId), [caseId]);

  if (caseState.status === 'loading' || reportState.status === 'loading') {
    return (
      <AppShell activeCase={caseState.status === 'ready' ? caseState.data : undefined}>
        <LoadingState label="Đang tải tổng quan Hồ sơ…" />
      </AppShell>
    );
  }

  if (
    caseState.status === 'error' ||
    reportState.status === 'error' ||
    !caseState.data ||
    !reportState.data
  ) {
    return (
      <AppShell>
        <ErrorState
          title="Không mở được Hồ sơ"
          body="Hồ sơ không tồn tại hoặc bạn không có quyền xem. Quay lại Danh sách Hồ sơ được phép xem."
        />
      </AppShell>
    );
  }

  const activeCase = caseState.data;
  const report = reportState.data;

  return (
    <AppShell activeCase={activeCase}>
      <PageHeading
        title="Tổng quan & mức sẵn sàng"
        lead={activeCase.name}
        actions={
          <Button variant="secondary" aria-disabled={report.level === 'INSUFFICIENT'}>
            Tới bước Tối ưu
          </Button>
        }
      />

      {report.baseDateMismatch && (
        <div className="banner banner--warning" role="note">
          <strong>Ngày gốc lệch ngày kết thúc kỳ BCTC.</strong> Hồ sơ này chỉ có thể
          ở mức <em>Sàng lọc mô phỏng</em>; chức năng roll-forward số dư nằm ngoài
          MVP. Điều chỉnh trong siêu dữ liệu Hồ sơ nếu đây là nhầm lẫn.
        </div>
      )}

      <Card className="readiness-summary">
        <div className="readiness-summary__level">
          <span className="readiness-summary__label">Mức sẵn sàng hiện tại</span>
          <StatusBadge status={READINESS_LEVEL[report.level]} />
        </div>
        <p className="readiness-summary__note">
          Sẵn sàng tài chính và sẵn sàng CO₂ là hai trục độc lập. Hồ sơ cần đạt cả
          hai, cộng kết quả <em>Tối ưu đã kiểm chứng</em>, mới tới mức Sẵn sàng
          quyết định.
        </p>
      </Card>

      <div className="readiness-axes">
        <section aria-labelledby="axis-finance" className="readiness-axis">
          <h2 id="axis-finance" className="readiness-axis__title">
            Trục tài chính
          </h2>
          <ul className="readiness-axis__rows">
            {report.financeRows.map((row) => (
              <ReadinessRow key={row.key} row={row} />
            ))}
          </ul>
        </section>

        <section aria-labelledby="axis-co2" className="readiness-axis">
          <h2 id="axis-co2" className="readiness-axis__title">
            Trục CO₂
          </h2>
          {report.co2Rows.length > 0 ? (
            <ul className="readiness-axis__rows">
              {report.co2Rows.map((row) => (
                <ReadinessRow key={row.key} row={row} />
              ))}
            </ul>
          ) : (
            <p className="readiness-axis__empty">
              Chưa có Phiếu bằng chứng phát thải nào. CO₂ chưa xác nhận sẽ bị loại
              khỏi mục tiêu chính, nhưng Dự án vẫn tham gia được Chiến lược không
              cần CO₂.
            </p>
          )}
        </section>
      </div>
    </AppShell>
  );
}
