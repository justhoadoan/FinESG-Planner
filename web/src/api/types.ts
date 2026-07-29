/**
 * Shape dữ liệu FE dùng.
 *
 * TẠM THỜI viết tay ở giai đoạn FE-first. AD-20 yêu cầu type của API được
 * generate từ OpenAPI vào `api/generated/` và không sửa tay. Khi backend có
 * endpoint tương ứng, thay file này bằng client generate — các surface không
 * được định nghĩa lại shape ở nơi khác.
 */

import type {
  ObjectStatusKey,
  ReadinessLevelKey,
  SectorKey,
  SolverStatusKey,
} from '@/i18n/labels';

export interface CaseSummary {
  readonly id: string;
  readonly code: string;
  readonly name: string;
  readonly sector: SectorKey;
  readonly baseDate: string; // ISO date
  readonly currency: string;
  readonly version: number;
  readonly readiness: ReadinessLevelKey;
  readonly updatedAt: string;
  readonly openBlockers: number;
  readonly stale: boolean;
}

/** Một hàng trong checklist sẵn sàng — CMP-04, tính ở server (AD-15). */
export interface ReadinessRow {
  readonly key: string;
  readonly object: string;
  readonly owner: string;
  readonly status: ObjectStatusKey;
  readonly blocker: string | null;
  readonly nextActionLabel: string;
  readonly nextActionTarget: string;
  readonly axis: 'finance' | 'co2';
}

export interface ReadinessReport {
  readonly caseId: string;
  readonly level: ReadinessLevelKey;
  readonly inputVersion: number;
  readonly financeRows: readonly ReadinessRow[];
  readonly co2Rows: readonly ReadinessRow[];
  readonly baseDateMismatch: boolean;
}

// ─── S05: BCTC & Provenance ─────────────────────────────────────────────────

export interface Provenance {
  readonly documentName: string;
  readonly page: number;
  /** bbox chuẩn hóa [x, y, w, h] theo phân số [0,1] trang đã xoay — AD-8. */
  readonly bbox: readonly [number, number, number, number];
  readonly rawText: string;
  readonly method: 'TEXT_LAYER' | 'OCR' | 'MANUAL';
  /** null cho MANUAL. */
  readonly confidence: number | null;
}

export interface FsField {
  readonly code: string; // FS-01..FS-12
  readonly label: string;
  /** Giá trị chuẩn hóa; null nghĩa là chưa đọc được (AD-5). */
  readonly normalizedValue: number | null;
  readonly unit: string;
  readonly period: string;
  readonly scope: string;
  readonly status: ObjectStatusKey;
  readonly provenance: Provenance;
}

// ─── S06/S07: Kịch bản & Gói vay ────────────────────────────────────────────

export interface MonthlyRow {
  readonly key: string;
  readonly label: string;
  /** 12 giá trị; null giữ nguyên là thiếu. */
  readonly months: readonly (number | null)[];
  readonly unit: string;
  readonly status: ObjectStatusKey;
}

export interface ScenarioData {
  readonly caseId: string;
  readonly selected: 'LOW' | 'BASE' | 'HIGH';
  readonly rows: readonly MonthlyRow[];
  readonly thresholds: readonly { label: string; value: string; note: string }[];
  readonly discountNpv: string;
  readonly discountFinancing: string;
}

export interface LoanPackageView {
  readonly code: string;
  readonly name: string;
  readonly limit: string;
  readonly rate: string;
  readonly term: string;
  readonly grace: string;
  readonly status: ObjectStatusKey;
  readonly eligibilityNote: string;
}

// ─── S08/S10/S11: Dự án, CO₂, rủi ro ────────────────────────────────────────

export interface RiskDimension {
  readonly name: string;
  readonly score: 0 | 1 | 2;
  readonly reason: string;
}

export interface EmissionsEvidence {
  readonly baseline: string;
  readonly scope: 'SCOPE_1' | 'SCOPE_2';
  readonly annualReduction: string; // tCO₂e/năm
  readonly factorSource: string;
  readonly method: string;
  readonly period: string;
  readonly dataType: 'REAL' | 'SIMULATION';
  readonly overlapGroup: string | null;
  readonly status: ObjectStatusKey;
}

export interface ProjectView {
  readonly code: string;
  readonly name: string;
  readonly capexLifetime: string;
  readonly capex12m: string;
  readonly capexPost12m: string | null; // cảnh báo nếu có
  readonly npvBeforeFinancing: string;
  readonly financeStatus: ObjectStatusKey;
  readonly co2Status: ObjectStatusKey;
  readonly riskTotal: number; // 0..10
  readonly riskBand: 'Thấp' | 'Trung bình' | 'Cao';
  readonly redFlag: boolean;
  readonly risk: readonly RiskDimension[];
  readonly emissions: EmissionsEvidence | null;
}

// ─── S12–S16: Lần chạy, Chiến lược, Kết quả ─────────────────────────────────

export interface StrategyTier {
  readonly order: number;
  readonly text: string;
}

export interface StrategyView {
  readonly key: 'SAFE' | 'BALANCED' | 'FAST_TRANSITION';
  readonly name: string;
  readonly tiers: readonly StrategyTier[];
}

export interface RunContract {
  readonly caseId: string;
  readonly inputVersion: number;
  readonly strategies: readonly StrategyView[];
  readonly allowedLoans: readonly string[];
  readonly eligibleProjects: readonly string[];
  readonly excludedProjects: readonly { code: string; reason: string }[];
  readonly simulationData: readonly string[];
  readonly outputKind: 'SIMULATION' | 'FINANCE_12M';
}

/** Một chỉ tiêu kết quả — mọi số có đơn vị + kỳ. CMP-21. */
export interface Metric {
  readonly label: string;
  readonly value: string;
  readonly unit: string;
  readonly period: string;
  readonly tone?: 'finance' | 'carbon' | 'debt' | 'risk' | 'neutral';
}

export interface MetricGroup {
  readonly title: string;
  readonly metrics: readonly Metric[];
}

export interface ProjectDecision {
  readonly code: string;
  readonly name: string;
  readonly selected: boolean;
  /** Nguồn vốn nếu chọn; lý do nếu loại. */
  readonly reason: string;
  readonly internalCapital?: string;
  readonly loanCapital?: string;
  readonly post12mWarning?: string;
}

export interface PlanView {
  readonly runId: string;
  readonly strategy: StrategyView['key'];
  readonly strategyName: string;
  readonly solverStatus: SolverStatusKey;
  readonly mipGap: string;
  readonly solveSeconds: string;
  readonly metricGroups: readonly MetricGroup[];
  readonly decisions: readonly ProjectDecision[];
  readonly bindingConstraints: readonly string[];
}

/** Một hàng chẩn đoán Vô nghiệm — basis khai báo tường minh (AD-12). */
export interface ConstraintRow {
  readonly code: string;
  readonly label: string;
  readonly actual: string;
  readonly threshold: string;
  readonly slack: string;
  readonly basis: 'LEDGER' | 'MODEL_SLACK';
  readonly deepLink: string;
  readonly deepLinkLabel: string;
}

export interface DiagnosisView {
  readonly runId: string;
  readonly strategy: StrategyView['key'];
  readonly strategyName: string;
  readonly rows: readonly ConstraintRow[];
}

export type RunResult =
  | { readonly kind: 'plan'; readonly plan: PlanView }
  | { readonly kind: 'diagnosis'; readonly diagnosis: DiagnosisView };

// ─── S19: Audit ─────────────────────────────────────────────────────────────

export interface AuditEvent {
  readonly at: string;
  readonly actor: string;
  readonly target: string;
  readonly action: string;
  readonly before: string | null;
  readonly after: string | null;
  readonly version: number;
}
