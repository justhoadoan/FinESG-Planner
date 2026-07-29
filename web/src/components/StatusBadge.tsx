import type { StatusLabel, Tone } from '@/i18n/labels';
import './StatusBadge.css';

/**
 * CMP-18 — Status badge.
 *
 * Behavioral contract: text + icon + màu, không bao giờ chỉ có màu (NFR-14).
 * Badge KHÔNG phải control — nó không focusable và không có onClick.
 */
export function StatusBadge({ status }: { status: StatusLabel }) {
  return (
    <span className="status-badge" data-tone={status.tone as Tone}>
      <span className="status-badge__glyph" aria-hidden="true">
        {status.glyph}
      </span>
      {status.label}
    </span>
  );
}
