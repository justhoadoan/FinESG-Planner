import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCase, getFsFields } from '@/api/stub';
import type { FsField } from '@/api/types';
import { OBJECT_STATUS } from '@/i18n/labels';
import { useAsync } from '@/lib/useAsync';
import { AppShell } from '@/components/AppShell';
import { StatusBadge } from '@/components/StatusBadge';
import { LoadingState, PageHeading } from '@/components/primitives';
import './BctcReconcile.css';

/**
 * S05 — Không gian đối chiếu 12 Trường BCTC.
 *
 * Màn chữ ký evidence-first: mỗi giá trị (CMP-05 source-linked field) đặt cạnh
 * PDF provenance viewer (CMP-06) đồng bộ trang + bounding box. Provenance là
 * thành phần bắt buộc (AD-8); trường Confidence thấp/OCR tự đứng trước hàng đợi
 * kiểm tra.
 */
export function BctcReconcile() {
  const { caseId = '' } = useParams();
  const caseState = useAsync(() => getCase(caseId), [caseId]);
  const fieldsState = useAsync(() => getFsFields(caseId), [caseId]);
  const [activeCode, setActiveCode] = useState<string | null>(null);

  const activeCase = caseState.status === 'ready' ? caseState.data : undefined;

  if (fieldsState.status !== 'ready') {
    return (
      <AppShell activeCase={activeCase}>
        <LoadingState label="Đang tải 12 Trường BCTC…" />
      </AppShell>
    );
  }

  const fields = fieldsState.data;
  // Confidence thấp / cần kiểm tra đứng trước (EXPERIENCE.md UJ-2 bước 3).
  const ordered = [...fields].sort(
    (a, b) => rank(a) - rank(b) || a.code.localeCompare(b.code),
  );
  const active = fields.find((f) => f.code === activeCode) ?? ordered[0];
  const confirmed = fields.filter((f) => f.status === 'CONFIRMED').length;

  return (
    <AppShell activeCase={activeCase}>
      <PageHeading
        title="Đối chiếu 12 Trường BCTC"
        lead={`${confirmed}/12 trường đã xác nhận. Trường có mức tin cậy trích xuất thấp hoặc từ OCR được đưa lên đầu hàng đợi kiểm tra.`}
      />

      <div className="bctc">
        <div className="bctc__fields" role="list" aria-label="12 Trường BCTC">
          {ordered.map((f) => (
            <button
              key={f.code}
              type="button"
              role="listitem"
              className={'field-row' + (f.code === active.code ? ' is-active' : '')}
              aria-pressed={f.code === active.code}
              onClick={() => setActiveCode(f.code)}
            >
              <span className="field-row__code">{f.code}</span>
              <span className="field-row__body">
                <span className="field-row__label">{f.label}</span>
                <span className="field-row__value num">
                  {f.normalizedValue === null ? (
                    <span className="field-row__null">Cần kiểm tra · chưa đọc được</span>
                  ) : (
                    `${f.normalizedValue.toLocaleString('vi-VN')} ${f.unit}`
                  )}
                </span>
                <span className="field-row__meta">
                  {f.period} · {f.scope} ·{' '}
                  {f.provenance.method === 'OCR'
                    ? `OCR · Confidence ${Math.round((f.provenance.confidence ?? 0) * 100)}%`
                    : f.provenance.method === 'MANUAL'
                      ? 'Nhập tay'
                      : `Lớp text · Confidence ${Math.round((f.provenance.confidence ?? 0) * 100)}%`}
                </span>
              </span>
              <StatusBadge status={OBJECT_STATUS[f.status]} />
            </button>
          ))}
        </div>

        <aside className="bctc__viewer" aria-label="Xem nguồn PDF">
          <PdfProvenance field={active} />
        </aside>
      </div>
    </AppShell>
  );
}

function rank(f: FsField): number {
  if (f.status === 'NEEDS_REVIEW') return 0;
  if (f.provenance.method === 'OCR') return 1;
  return 2;
}

/**
 * CMP-06 — PDF provenance viewer (mô phỏng).
 *
 * Chưa có PDF thật ở giai đoạn FE-first; viewer vẽ một trang đại diện và tô
 * bounding box tại đúng tọa độ phân số. Luôn có mô tả text tương đương để không
 * cần nhìn hai panel mới hiểu Provenance (Accessibility Floor).
 */
function PdfProvenance({ field }: { field: FsField }) {
  const [x, y, w, h] = field.provenance.bbox;
  return (
    <div className="pdf">
      <div className="pdf__head">
        <span className="pdf__doc">{field.provenance.documentName}</span>
        <span className="pdf__page">Trang {field.provenance.page}</span>
      </div>

      <div className="pdf__page-surface" role="img"
        aria-label={`Vùng nguồn của ${field.code} ${field.label}: trang ${field.provenance.page}, văn bản gốc "${field.provenance.rawText}"`}>
        {/* Các dòng giả lập một trang BCTC. */}
        {Array.from({ length: 22 }).map((_, i) => (
          <div key={i} className="pdf__line" style={{ width: `${40 + ((i * 37) % 55)}%` }} />
        ))}
        <div
          className="pdf__bbox"
          style={{ left: `${x * 100}%`, top: `${y * 100}%`, width: `${w * 100}%`, height: `${h * 100}%` }}
        >
          <span className="pdf__bbox-tag">{field.code}</span>
        </div>
      </div>

      <dl className="pdf__meta">
        <div><dt>Văn bản gốc</dt><dd className="num">{field.provenance.rawText}</dd></div>
        <div><dt>Giá trị chuẩn hóa</dt><dd className="num">{field.normalizedValue === null ? 'N/A' : `${field.normalizedValue.toLocaleString('vi-VN')} ${field.unit}`}</dd></div>
        <div><dt>Kỳ / phạm vi</dt><dd>{field.period} · {field.scope}</dd></div>
        <div><dt>Phương thức</dt><dd>{field.provenance.method === 'OCR' ? 'OCR' : field.provenance.method === 'MANUAL' ? 'Nhập tay' : 'Lớp text'}</dd></div>
      </dl>

      {field.status === 'NEEDS_REVIEW' && (
        <div className="pdf__notice" role="note">
          <strong>Cần kiểm tra.</strong> Confidence thấp hoặc thiếu vùng nguồn.
          Kế toán xác nhận sau khi đối chiếu; giá trị chưa xác nhận không được dùng
          trong bất kỳ phép tính nào, kể cả Sàng lọc mô phỏng.
        </div>
      )}
    </div>
  );
}
