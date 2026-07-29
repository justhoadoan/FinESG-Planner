import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAudit, getCase } from '@/api/stub';
import { useAsync } from '@/lib/useAsync';
import { formatDateTime } from '@/lib/format';
import { AppShell } from '@/components/AppShell';
import { Button, Card, LoadingState, PageHeading } from '@/components/primitives';
import './Evidence.css';

const PACKAGE_SECTIONS = [
  { n: 1, title: 'Phạm vi & giới hạn sử dụng', note: 'Nhãn Phân tích tài chính 12 tháng · người xác nhận' },
  { n: 2, title: 'BCTC & Provenance', note: '12 Trường có trang/vùng nguồn mở được' },
  { n: 3, title: 'Giả định, tài trợ & ngưỡng', note: 'Kịch bản Cơ sở · 2 Gói vay · ngưỡng đã xác nhận' },
  { n: 4, title: 'Dự án, CO₂ & rủi ro', note: 'Không có điểm tổng hợp; trạng thái từng đại lượng' },
  { n: 5, title: 'CapEx sau tháng 12', note: 'P1 còn 140 tỷ — phần chưa được kiểm chứng nguồn' },
  { n: 6, title: 'Chiến lược, Phương án & giải thích', note: 'Thứ tự mục tiêu · lý do chọn/loại · trạng thái bộ giải' },
  { n: 7, title: 'Phiên bản & Audit Trail', note: 'v3 · nguồn hệ số phát thải · nhật ký thay đổi' },
  { n: 8, title: 'Tuyên bố giới hạn', note: 'Không phải khuyến nghị đầu tư hay phê duyệt tín dụng' },
];

/**
 * S18 (Gói bằng chứng) + S19 (Audit Trail).
 *
 * Xem trước 8 section được PRD FR-26 đánh số; Chọn Phương án cuối và Xuất là hai
 * hậu quả riêng (CMP-25). Audit timeline (CMP-26) truy ngược ai đổi/xác nhận gì.
 */
export function Evidence() {
  const { caseId = '' } = useParams();
  const caseState = useAsync(() => getCase(caseId), [caseId]);
  const auditState = useAsync(() => getAudit(caseId), [caseId]);
  const [preview, setPreview] = useState(false);

  const activeCase = caseState.status === 'ready' ? caseState.data : undefined;

  return (
    <AppShell activeCase={activeCase}>
      <PageHeading
        title="Gói bằng chứng & lịch sử"
        lead="Xuất Gói bằng chứng cho Phương án đã chọn, hoặc truy ngược mọi thay đổi qua Audit Trail. Chọn Phương án cuối và Xuất là hai bước riêng."
      />

      <div className="evidence-cols">
        <Card>
          <div className="evidence-export__head">
            <h2 className="evidence-h2">Gói bằng chứng PDF</h2>
            <span className="evidence-scope">Không watermark mô phỏng · Phương án An toàn (đã chọn)</span>
          </div>
          <ol className="package-sections">
            {PACKAGE_SECTIONS.map((s) => (
              <li key={s.n}>
                <span className="package-sections__n">{s.n}</span>
                <span>
                  <span className="package-sections__title">{s.title}</span>
                  <span className="package-sections__note">{s.note}</span>
                </span>
              </li>
            ))}
          </ol>
          <div className="evidence-actions">
            <Button variant="secondary" onClick={() => setPreview((v) => !v)} aria-expanded={preview}>
              {preview ? 'Ẩn xem trước' : 'Xem trước Gói bằng chứng'}
            </Button>
            <Button>Xuất PDF</Button>
          </div>
          {preview && (
            <div className="export-preview" role="note">
              <p><strong>Tên tệp dự kiến:</strong> <code>GoiBangChung_XM-HT-2024_v3_AnToan.pdf</code></p>
              <p><strong>Mã lần chạy:</strong> <code>run-ht-safe-03</code> · <strong>Người xác nhận:</strong> Minh (CFO), Lan (Kế toán), Thảo (ESG)</p>
              <p>Không đưa tên tệp đầy đủ hay số liệu nhạy cảm vào URL. Xuất thất bại giữ nguyên cấu hình để thử lại.</p>
            </div>
          )}
        </Card>

        <Card>
          <h2 className="evidence-h2">Audit Trail</h2>
          {auditState.status !== 'ready' ? (
            <LoadingState label="Đang tải nhật ký…" />
          ) : (
            <ol className="audit-timeline">
              {auditState.data.map((e, i) => (
                <li key={i} className="audit-event">
                  <div className="audit-event__dot" aria-hidden="true" />
                  <div className="audit-event__body">
                    <div className="audit-event__head">
                      <span className="audit-event__action">{e.action}</span>
                      <span className="audit-event__ver">v{e.version}</span>
                    </div>
                    <div className="audit-event__target">{e.target}</div>
                    {(e.before || e.after) && (
                      <div className="audit-event__change">
                        {e.before && <span className="audit-event__before">{e.before}</span>}
                        {e.before && e.after && <span aria-hidden="true"> → </span>}
                        {e.after && <span className="audit-event__after">{e.after}</span>}
                      </div>
                    )}
                    <div className="audit-event__meta">{e.actor} · {formatDateTime(e.at)}</div>
                  </div>
                </li>
              ))}
            </ol>
          )}
        </Card>
      </div>
    </AppShell>
  );
}
