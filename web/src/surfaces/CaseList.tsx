import { Link } from 'react-router-dom';
import { listCases } from '@/api/stub';
import { READINESS_LEVEL, SECTORS } from '@/i18n/labels';
import { useAsync } from '@/lib/useAsync';
import { formatDate, formatDateTime } from '@/lib/format';
import { AppShell } from '@/components/AppShell';
import { StatusBadge } from '@/components/StatusBadge';
import {
  Button,
  EmptyState,
  ErrorState,
  LoadingState,
  PageHeading,
} from '@/components/primitives';
import './CaseList.css';

/**
 * S01 — Danh sách Hồ sơ phân tích.
 *
 * Điểm vào ứng dụng. Tạo/đổi tên/mở/sao chép/xóa. Empty state có CTA tạo Hồ sơ,
 * không hiển thị dashboard rỗng (State Patterns).
 */
export function CaseList() {
  const state = useAsync(listCases, []);

  return (
    <AppShell>
      <PageHeading
        title="Hồ sơ phân tích"
        lead="Mỗi Hồ sơ tập hợp BCTC, giả định 12 tháng, Dự án và các lần chạy cho một doanh nghiệp xi măng hoặc thép."
        actions={<Button>+ Tạo Hồ sơ phân tích</Button>}
      />

      {state.status === 'loading' && <LoadingState label="Đang tải danh sách Hồ sơ…" />}

      {state.status === 'error' && (
        <ErrorState
          title="Không tải được danh sách Hồ sơ"
          body="Yêu cầu không hoàn tất; không có dữ liệu nào bị thay đổi. Thử lại sau giây lát."
        />
      )}

      {state.status === 'ready' && state.data.length === 0 && (
        <EmptyState
          title="Chưa có Hồ sơ phân tích nào"
          body="Tạo Hồ sơ đầu tiên để bắt đầu: chọn doanh nghiệp, ngành, ngày gốc và kỳ BCTC. Hệ thống sẽ dựng checklist đầu vào tương ứng."
          action={<Button>+ Tạo Hồ sơ phân tích</Button>}
        />
      )}

      {state.status === 'ready' && state.data.length > 0 && (
        <ul className="case-list">
          {state.data.map((c) => (
            <li key={c.id}>
              <Link to={`/cases/${c.id}/`} className="case-card">
                <div className="case-card__head">
                  <span className="case-card__code num">{c.code}</span>
                  <StatusBadge status={READINESS_LEVEL[c.readiness]} />
                </div>
                <h2 className="case-card__name">{c.name}</h2>
                <dl className="case-card__meta">
                  <div>
                    <dt>Ngành</dt>
                    <dd>{SECTORS[c.sector]}</dd>
                  </div>
                  <div>
                    <dt>Ngày gốc</dt>
                    <dd className="num">{formatDate(c.baseDate)}</dd>
                  </div>
                  <div>
                    <dt>Tiền tệ</dt>
                    <dd>{c.currency}</dd>
                  </div>
                  <div>
                    <dt>Phiên bản</dt>
                    <dd className="num">v{c.version}</dd>
                  </div>
                </dl>
                <div className="case-card__foot">
                  <span className="case-card__updated">
                    Cập nhật {formatDateTime(c.updatedAt)}
                  </span>
                  {c.openBlockers > 0 && (
                    <span className="case-card__blockers">
                      {c.openBlockers} mục cần xử lý
                    </span>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </AppShell>
  );
}
