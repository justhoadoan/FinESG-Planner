/**
 * Catalog nhãn trạng thái — AD-19.
 *
 * Nguồn thật cuối cùng là backend `/api/v1/meta/labels` (chưa dựng). Ở giai
 * đoạn FE-first, catalog này giữ tạm cùng shape để không có literal tiếng Việt
 * rải trong JSX. Khi backend có endpoint, thay bằng fetch — component không đổi.
 *
 * Mỗi trạng thái mang nhãn + tên icon + vai trò màu (token DESIGN.md). Không
 * bao giờ chỉ dùng màu để phân biệt (NFR-14).
 */

export type Tone =
  | 'confirmed'
  | 'verified'
  | 'warning'
  | 'error'
  | 'estimated'
  | 'simulation'
  | 'info'
  | 'stale'
  | 'neutral';

export interface StatusLabel {
  readonly label: string;
  readonly tone: Tone;
  /** Ký hiệu chữ đi kèm — icon thật thay sau, nhưng không bao giờ chỉ có màu. */
  readonly glyph: string;
}

/** Trạng thái đối tượng — state machine EXPERIENCE.md. */
export const OBJECT_STATUS = {
  DRAFT: { label: 'Nháp', tone: 'neutral', glyph: '○' },
  NEEDS_REVIEW: { label: 'Cần kiểm tra', tone: 'warning', glyph: '⚠' },
  CONFIRMED: { label: 'Đã xác nhận', tone: 'confirmed', glyph: '✓' },
  REJECTED: { label: 'Bị từ chối', tone: 'error', glyph: '✕' },
  ESTIMATED: { label: 'Ước tính', tone: 'estimated', glyph: '✎' },
  SIMULATION: { label: 'Mô phỏng', tone: 'simulation', glyph: '⌁' },
  STALE: { label: 'Cần chạy lại', tone: 'stale', glyph: '↻' },
} as const satisfies Record<string, StatusLabel>;

/** Mức sẵn sàng Hồ sơ — ma trận §4.1 / EXPERIENCE.md. */
export const READINESS_LEVEL = {
  INSUFFICIENT: { label: 'Chưa đủ dữ liệu', tone: 'neutral', glyph: '○' },
  SIMULATION_READY: { label: 'Sẵn sàng mô phỏng', tone: 'simulation', glyph: '⌁' },
  FINANCE_READY: { label: 'Sẵn sàng tài chính 12 tháng', tone: 'info', glyph: '◆' },
  DECISION_READY: { label: 'Sẵn sàng quyết định', tone: 'verified', glyph: '⛨' },
  NEEDS_RERUN: { label: 'Cần chạy lại', tone: 'stale', glyph: '↻' },
} as const satisfies Record<string, StatusLabel>;

/** Trạng thái bộ giải — 6 giá trị PRD §4.5.1. */
export const SOLVER_STATUS = {
  VERIFIED_OPTIMAL: { label: 'Tối ưu đã kiểm chứng', tone: 'verified', glyph: '⛨' },
  FEASIBLE_NOT_PROVEN: { label: 'Khả thi chưa chứng minh tối ưu', tone: 'warning', glyph: '⚠' },
  INFEASIBLE: { label: 'Vô nghiệm', tone: 'error', glyph: '⊘' },
  UNBOUNDED: { label: 'Không bị chặn', tone: 'error', glyph: '∞' },
  ERROR: { label: 'Lỗi', tone: 'error', glyph: '✕' },
  FAILED_CHECK: { label: 'Không vượt Bộ kiểm tra nghiệm', tone: 'error', glyph: '⊘' },
} as const satisfies Record<string, StatusLabel>;

export const SECTORS = {
  CEMENT: 'Xi măng',
  STEEL: 'Thép',
} as const;

export type ObjectStatusKey = keyof typeof OBJECT_STATUS;
export type ReadinessLevelKey = keyof typeof READINESS_LEVEL;
export type SolverStatusKey = keyof typeof SOLVER_STATUS;
export type SectorKey = keyof typeof SECTORS;
