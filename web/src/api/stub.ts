/**
 * Dữ liệu stub cho giai đoạn FE-first.
 *
 * KHÔNG phải dữ liệu thật và không phải nguồn nghiệp vụ. Tồn tại để dựng và
 * duyệt giao diện end-to-end trước khi backend E1+ có endpoint. Con số ở đây
 * minh họa hình dạng đúng của kết quả, KHÔNG được tính bởi engine — engine
 * thật (E0) đã có golden test riêng. Mọi hàm trả Promise để chữ ký khớp client
 * thật sau này.
 */

import type {
  AuditEvent,
  CaseSummary,
  DiagnosisView,
  FsField,
  LoanPackageView,
  PlanView,
  ProjectView,
  ReadinessReport,
  RunContract,
  RunResult,
  ScenarioData,
  StrategyView,
} from './types';

const CASES: CaseSummary[] = [
  {
    id: 'case-hoang-thach',
    code: 'XM-HT-2024',
    name: 'Xi măng Hoàng Thạch — Kế hoạch CapEx xanh 2025',
    sector: 'CEMENT',
    baseDate: '2024-12-31',
    currency: 'VND',
    version: 3,
    readiness: 'DECISION_READY',
    updatedAt: '2026-07-28T14:20:00+07:00',
    openBlockers: 0,
    stale: false,
  },
  {
    id: 'case-thep-mien-nam',
    code: 'TH-TMN-2024',
    name: 'Thép Miền Nam — Lò điện hồ quang giai đoạn 1',
    sector: 'STEEL',
    baseDate: '2024-12-31',
    currency: 'VND',
    version: 1,
    readiness: 'SIMULATION_READY',
    updatedAt: '2026-07-29T09:05:00+07:00',
    openBlockers: 4,
    stale: false,
  },
  {
    id: 'case-ha-tien',
    code: 'XM-HT2-2024',
    name: 'Xi măng Hà Tiên — Thu hồi nhiệt thải',
    sector: 'CEMENT',
    baseDate: '2024-09-30',
    currency: 'VND',
    version: 2,
    readiness: 'NEEDS_RERUN',
    updatedAt: '2026-07-27T16:45:00+07:00',
    openBlockers: 1,
    stale: true,
  },
];

const REPORTS: Record<string, ReadinessReport> = {
  'case-hoang-thach': {
    caseId: 'case-hoang-thach',
    level: 'DECISION_READY',
    inputVersion: 3,
    baseDateMismatch: false,
    financeRows: [
      { key: 'fs', object: '12 Trường BCTC', owner: 'Lan — Kế toán trưởng', status: 'CONFIRMED', blocker: null, nextActionLabel: 'Xem đối chiếu', nextActionTarget: '/cases/case-hoang-thach/bctc', axis: 'finance' },
      { key: 'scenario', object: 'Kịch bản Cơ sở & giả định 12 tháng', owner: 'Minh — CFO', status: 'CONFIRMED', blocker: null, nextActionLabel: 'Xem Kịch bản', nextActionTarget: '/cases/case-hoang-thach/scenario', axis: 'finance' },
      { key: 'loans', object: 'Gói vay (2 gói)', owner: 'Minh — CFO', status: 'CONFIRMED', blocker: null, nextActionLabel: 'Xem Gói vay', nextActionTarget: '/cases/case-hoang-thach/funding', axis: 'finance' },
    ],
    co2Rows: [
      { key: 'co2-p1', object: 'Phiếu phát thải — Thu hồi nhiệt thải', owner: 'Thảo — ESG/MRV', status: 'CONFIRMED', blocker: null, nextActionLabel: 'Xem Phiếu', nextActionTarget: '/cases/case-hoang-thach/projects', axis: 'co2' },
      { key: 'co2-p3', object: 'Phiếu phát thải — Điện mặt trời mái', owner: 'Thảo — ESG/MRV', status: 'CONFIRMED', blocker: null, nextActionLabel: 'Xem Phiếu', nextActionTarget: '/cases/case-hoang-thach/projects', axis: 'co2' },
    ],
  },
  'case-thep-mien-nam': {
    caseId: 'case-thep-mien-nam',
    level: 'SIMULATION_READY',
    inputVersion: 1,
    baseDateMismatch: false,
    financeRows: [
      { key: 'fs', object: '12 Trường BCTC', owner: 'Lan — Kế toán trưởng', status: 'CONFIRMED', blocker: null, nextActionLabel: 'Xem đối chiếu', nextActionTarget: '/cases/case-thep-mien-nam/bctc', axis: 'finance' },
      { key: 'scenario', object: 'Kịch bản Cơ sở & giả định 12 tháng', owner: 'Minh — CFO', status: 'ESTIMATED', blocker: 'Chưa xác nhận dòng tiền kinh doanh và ngưỡng DSCR', nextActionLabel: 'Xác nhận giả định', nextActionTarget: '/cases/case-thep-mien-nam/scenario', axis: 'finance' },
      { key: 'loans', object: 'Gói vay', owner: 'Minh — CFO', status: 'DRAFT', blocker: 'Chưa cấu hình lịch giải ngân/trả nợ', nextActionLabel: 'Cấu hình Gói vay', nextActionTarget: '/cases/case-thep-mien-nam/funding', axis: 'finance' },
    ],
    co2Rows: [
      { key: 'co2-p1', object: 'Phiếu phát thải — Lò điện hồ quang', owner: 'Thảo — ESG/MRV', status: 'DRAFT', blocker: 'Chưa nhập đường cơ sở và Scope', nextActionLabel: 'Tạo Phiếu', nextActionTarget: '/cases/case-thep-mien-nam/projects', axis: 'co2' },
    ],
  },
  'case-ha-tien': {
    caseId: 'case-ha-tien',
    level: 'NEEDS_RERUN',
    inputVersion: 2,
    baseDateMismatch: true,
    financeRows: [
      { key: 'fs', object: '12 Trường BCTC', owner: 'Lan — Kế toán trưởng', status: 'CONFIRMED', blocker: null, nextActionLabel: 'Xem đối chiếu', nextActionTarget: '/cases/case-ha-tien/bctc', axis: 'finance' },
    ],
    co2Rows: [],
  },
};

// ─── S05: 12 Trường BCTC của Hoàng Thạch (đơn vị: tỷ VND) ───────────────────

const DOC = 'VI_Baocaotaichinhrieng_2024.pdf';
const fs = (
  code: string, label: string, value: number | null, page: number,
  bbox: [number, number, number, number], rawText: string,
  status: FsField['status'] = 'CONFIRMED', conf: number | null = 0.98,
  method: FsField['provenance']['method'] = 'TEXT_LAYER',
): FsField => ({
  code, label, normalizedValue: value, unit: 'tỷ VND',
  period: 'Năm 2024', scope: 'Riêng lẻ', status,
  provenance: { documentName: DOC, page, bbox, rawText, method, confidence: conf },
});

const FS_FIELDS: Record<string, FsField[]> = {
  'case-hoang-thach': [
    fs('FS-01', 'Tiền và tương đương tiền', 412.6, 5, [0.62, 0.28, 0.16, 0.03], '412.583.114.220'),
    fs('FS-02', 'Tài sản ngắn hạn', 1840.2, 5, [0.62, 0.22, 0.16, 0.03], '1.840.201.664.180'),
    fs('FS-03', 'Nợ ngắn hạn', 1290.7, 6, [0.62, 0.34, 0.16, 0.03], '1.290.744.910.500'),
    fs('FS-04', 'Vay ngắn hạn', 640.0, 6, [0.62, 0.40, 0.16, 0.03], '640.019.220.000'),
    fs('FS-05', 'Vay dài hạn', 210.5, 6, [0.62, 0.52, 0.16, 0.03], '210.480.000.000'),
    fs('FS-06', 'Tổng nợ phải trả', 1820.9, 6, [0.62, 0.58, 0.16, 0.03], '1.820.904.110.500'),
    fs('FS-07', 'Vốn chủ sở hữu', 2450.0, 6, [0.62, 0.70, 0.16, 0.03], '2.450.010.220.000'),
    fs('FS-08', 'Doanh thu thuần', 3980.4, 8, [0.60, 0.18, 0.18, 0.03], '3.980.412.660.100'),
    fs('FS-09', 'Lợi nhuận trước thuế', 286.1, 8, [0.60, 0.62, 0.18, 0.03], '286.104.550.000'),
    fs('FS-10', 'Chi phí lãi vay', 92.4, 8, [0.60, 0.48, 0.18, 0.03], '92.388.100.000',
       'NEEDS_REVIEW', 0.71, 'OCR'),
    fs('FS-11', 'Lợi nhuận sau thuế', 228.9, 8, [0.60, 0.70, 0.18, 0.03], '228.883.640.000'),
    fs('FS-12', 'LC tiền thuần từ HĐKD', 540.7, 10, [0.58, 0.30, 0.20, 0.03], '540.712.900.000'),
  ],
};

// ─── S06/S07: Kịch bản & Gói vay ────────────────────────────────────────────

const m = (...v: (number | null)[]): readonly (number | null)[] => v;

const SCENARIOS: Record<string, ScenarioData> = {
  'case-hoang-thach': {
    caseId: 'case-hoang-thach',
    selected: 'BASE',
    discountNpv: '11,0%/năm',
    discountFinancing: '9,5%/năm',
    rows: [
      { key: 'op', label: 'Dòng tiền KD trước trả nợ', unit: 'tỷ VND', status: 'CONFIRMED',
        months: m(38, 41, 44, 40, 46, 48, 45, 47, 50, 49, 52, 60) },
      { key: 'exist-p', label: 'Trả gốc nợ hiện hữu', unit: 'tỷ VND', status: 'CONFIRMED',
        months: m(18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18) },
      { key: 'exist-i', label: 'Trả lãi nợ hiện hữu', unit: 'tỷ VND', status: 'CONFIRMED',
        months: m(7, 7, 6.8, 6.8, 6.6, 6.6, 6.4, 6.4, 6.2, 6.2, 6, 6) },
      { key: 'capex', label: 'CapEx giải ngân (tổng DA)', unit: 'tỷ VND', status: 'CONFIRMED',
        months: m(60, 80, 90, 70, 50, 40, 30, 20, 10, 0, 0, 0) },
    ],
    thresholds: [
      { label: 'Tiền mặt tối thiểu', value: '≥ 150 tỷ VND / tháng', note: 'Áp cho từng tháng (DR-16)' },
      { label: 'DSCR tối thiểu', value: '≥ 1,25', note: 'Chỉ áp khi có nghĩa vụ nợ' },
      { label: 'Nợ cuối kỳ / Vốn chủ', value: '≤ 0,80', note: 'Mẫu số là Vốn chủ cơ sở FS-07' },
      { label: 'Hạn mức vốn nội bộ', value: '≤ 300 tỷ VND', note: 'Trần Σ u_i' },
    ],
  },
};

const LOANS: Record<string, LoanPackageView[]> = {
  'case-hoang-thach': [
    { code: 'L1', name: 'Tín dụng xanh — NH Thương mại A', limit: '500 tỷ VND', rate: '7,2%/năm', term: '60 tháng', grace: '6 tháng', status: 'CONFIRMED', eligibilityNote: 'Đủ điều kiện cho mọi Dự án giảm phát thải có MRV' },
    { code: 'L2', name: 'Vay đầu tư thiết bị — NH B', limit: '300 tỷ VND', rate: '8,5%/năm', term: '48 tháng', grace: '0 tháng', status: 'CONFIRMED', eligibilityNote: 'Chỉ cấp cho Dự án thiết bị; loại Dự án phần mềm/tư vấn' },
  ],
};

// ─── S08/S10/S11: Dự án ─────────────────────────────────────────────────────

const PROJECTS: Record<string, ProjectView[]> = {
  'case-hoang-thach': [
    {
      code: 'P1', name: 'Thu hồi nhiệt thải phát điện (WHR)',
      capexLifetime: '320 tỷ VND', capex12m: '180 tỷ VND', capexPost12m: '140 tỷ VND',
      npvBeforeFinancing: '156,4 tỷ VND', financeStatus: 'CONFIRMED', co2Status: 'CONFIRMED',
      riskTotal: 4, riskBand: 'Trung bình', redFlag: false,
      risk: [
        { name: 'Trưởng thành kỹ thuật', score: 1, reason: 'Công nghệ WHR phổ biến, đã có tham chiếu trong nước' },
        { name: 'Nhà cung cấp/triển khai', score: 1, reason: 'Hai nhà thầu EPC báo giá; chưa chốt hợp đồng' },
        { name: 'Độ chắc chắn CapEx–dòng tiền', score: 1, reason: 'CapEx có báo giá; dòng tiền phụ thuộc giá điện tự dùng' },
        { name: 'Phụ thuộc vận hành/pháp lý', score: 0, reason: 'Không cần giấy phép phát điện lên lưới' },
        { name: 'Độ tin cậy CO₂/MRV', score: 1, reason: 'Có phương pháp đo; hệ số điện lưới theo EVN 2023' },
      ],
      emissions: {
        baseline: 'Điện lưới EVN mua ngoài, 41.500 MWh/năm',
        scope: 'SCOPE_2', annualReduction: '18.200 tCO₂e/năm',
        factorSource: 'Hệ số lưới điện VN 2023 (Bộ TN&MT), phiên bản 12/2023',
        method: 'Sản lượng điện tự phát × hệ số lưới',
        period: '12 tháng vận hành đầy đủ', dataType: 'REAL',
        overlapGroup: null, status: 'CONFIRMED',
      },
    },
    {
      code: 'P2', name: 'Biến tần cho quạt lò và nghiền',
      capexLifetime: '48 tỷ VND', capex12m: '48 tỷ VND', capexPost12m: null,
      npvBeforeFinancing: '31,2 tỷ VND', financeStatus: 'CONFIRMED', co2Status: 'NEEDS_REVIEW',
      riskTotal: 2, riskBand: 'Thấp', redFlag: false,
      risk: [
        { name: 'Trưởng thành kỹ thuật', score: 0, reason: 'Biến tần là giải pháp trưởng thành' },
        { name: 'Nhà cung cấp/triển khai', score: 0, reason: 'Nhiều nhà cung cấp sẵn có' },
        { name: 'Độ chắc chắn CapEx–dòng tiền', score: 1, reason: 'Tiết kiệm điện ước tính, chưa đo thực tế' },
        { name: 'Phụ thuộc vận hành/pháp lý', score: 0, reason: 'Không phụ thuộc pháp lý' },
        { name: 'Độ tin cậy CO₂/MRV', score: 1, reason: 'Thiếu nguồn hệ số phát thải và phiên bản' },
      ],
      emissions: {
        baseline: 'Tiêu thụ điện quạt lò hiện tại',
        scope: 'SCOPE_2', annualReduction: '3.400 tCO₂e/năm',
        factorSource: '', method: 'Tiết kiệm điện × hệ số lưới',
        period: '12 tháng vận hành đầy đủ', dataType: 'REAL',
        overlapGroup: 'GRID_ELECTRICITY', status: 'NEEDS_REVIEW',
      },
    },
    {
      code: 'P3', name: 'Điện mặt trời mái nhà xưởng',
      capexLifetime: '95 tỷ VND', capex12m: '95 tỷ VND', capexPost12m: null,
      npvBeforeFinancing: '62,8 tỷ VND', financeStatus: 'CONFIRMED', co2Status: 'CONFIRMED',
      riskTotal: 3, riskBand: 'Thấp', redFlag: false,
      risk: [
        { name: 'Trưởng thành kỹ thuật', score: 0, reason: 'PV mái là công nghệ trưởng thành' },
        { name: 'Nhà cung cấp/triển khai', score: 1, reason: 'Nhà thầu đủ năng lực; phụ thuộc kết cấu mái' },
        { name: 'Độ chắc chắn CapEx–dòng tiền', score: 1, reason: 'Sản lượng phụ thuộc bức xạ theo mùa' },
        { name: 'Phụ thuộc vận hành/pháp lý', score: 1, reason: 'Cần thỏa thuận đấu nối tự dùng' },
        { name: 'Độ tin cậy CO₂/MRV', score: 0, reason: 'Đo bằng công tơ, MRV rõ ràng' },
      ],
      emissions: {
        baseline: 'Điện lưới EVN mua ngoài',
        scope: 'SCOPE_2', annualReduction: '9.600 tCO₂e/năm',
        factorSource: 'Hệ số lưới điện VN 2023 (Bộ TN&MT), phiên bản 12/2023',
        method: 'Sản lượng PV × hệ số lưới',
        period: '12 tháng vận hành đầy đủ', dataType: 'REAL',
        overlapGroup: 'GRID_ELECTRICITY', status: 'CONFIRMED',
      },
    },
    {
      code: 'P4', name: 'Thay thế một phần clinker bằng phụ gia',
      capexLifetime: '28 tỷ VND', capex12m: '28 tỷ VND', capexPost12m: null,
      npvBeforeFinancing: '40,1 tỷ VND', financeStatus: 'CONFIRMED', co2Status: 'DRAFT',
      riskTotal: 7, riskBand: 'Cao', redFlag: true,
      risk: [
        { name: 'Trưởng thành kỹ thuật', score: 1, reason: 'Cần điều chỉnh cấp phối, thử nghiệm chất lượng' },
        { name: 'Nhà cung cấp/triển khai', score: 1, reason: 'Nguồn phụ gia chưa ổn định' },
        { name: 'Độ chắc chắn CapEx–dòng tiền', score: 1, reason: 'Tiết kiệm phụ thuộc giá clinker' },
        { name: 'Phụ thuộc vận hành/pháp lý', score: 2, reason: 'Cờ đỏ: cần chứng nhận hợp chuẩn xi măng trước khi bán' },
        { name: 'Độ tin cậy CO₂/MRV', score: 2, reason: 'Chưa có phương pháp đo giảm phát thải quá trình được duyệt' },
      ],
      emissions: null,
    },
  ],
};

// ─── S12–S16: Chiến lược & kết quả ──────────────────────────────────────────

const STRATEGIES: StrategyView[] = [
  { key: 'SAFE', name: 'An toàn', tiers: [
    { order: 1, text: 'Tối đa tổng NPV' },
    { order: 2, text: 'Giảm tổng vốn vay mới' },
    { order: 3, text: 'Giảm Chi phí tài trợ' },
    { order: 4, text: 'Phá hòa xác định theo mã' },
  ] },
  { key: 'BALANCED', name: 'Cân bằng', tiers: [
    { order: 1, text: 'Đạt ngưỡng CO₂ tối thiểu đã xác nhận' },
    { order: 2, text: 'Tối đa tổng NPV' },
    { order: 3, text: 'Giảm Chi phí tài trợ' },
    { order: 4, text: 'Giảm tổng Điểm rủi ro' },
    { order: 5, text: 'Phá hòa xác định theo mã' },
  ] },
  { key: 'FAST_TRANSITION', name: 'Chuyển đổi nhanh', tiers: [
    { order: 1, text: 'Đạt ngưỡng NPV, tiền mặt, DSCR tối thiểu' },
    { order: 2, text: 'Tối đa tổng CO₂ đã xác nhận' },
    { order: 3, text: 'Tối đa tổng NPV' },
    { order: 4, text: 'Giảm Chi phí tài trợ' },
    { order: 5, text: 'Phá hòa xác định theo mã' },
  ] },
];

const RUN_CONTRACT: Record<string, RunContract> = {
  'case-hoang-thach': {
    caseId: 'case-hoang-thach',
    inputVersion: 3,
    strategies: STRATEGIES,
    allowedLoans: ['L1', 'L2'],
    eligibleProjects: ['P1', 'P2', 'P3'],
    excludedProjects: [
      { code: 'P4', reason: 'Cờ đỏ rủi ro trọng yếu chưa xử lý (chứng nhận hợp chuẩn + MRV)' },
    ],
    simulationData: [],
    outputKind: 'FINANCE_12M',
  },
};

const PLAN_SAFE: PlanView = {
  runId: 'run-ht-safe-03',
  strategy: 'SAFE', strategyName: 'An toàn',
  solverStatus: 'VERIFIED_OPTIMAL', mipGap: '0,0%', solveSeconds: '0,84',
  metricGroups: [
    { title: 'Vòng đời', metrics: [
      { label: 'NPV trước tài trợ', value: '219,2', unit: 'tỷ VND', period: 'vòng đời', tone: 'finance' },
    ] },
    { title: 'Phát thải', metrics: [
      { label: 'CO₂ đã xác nhận', value: '27.800', unit: 'tCO₂e', period: 'năm vận hành đầy đủ', tone: 'carbon' },
      { label: 'CO₂ 12 tháng đầu', value: '11.400', unit: 'tCO₂e', period: '12 tháng đầu', tone: 'carbon' },
    ] },
    { title: 'Thanh khoản 12 tháng', metrics: [
      { label: 'Tiền cuối kỳ', value: '198,6', unit: 'tỷ VND', period: 'tháng 12', tone: 'finance' },
      { label: 'CFADS', value: '560,0', unit: 'tỷ VND', period: '12 tháng', tone: 'finance' },
      { label: 'DSCR', value: '1,84', unit: '', period: '12 tháng', tone: 'finance' },
    ] },
    { title: 'Vốn & nợ', metrics: [
      { label: 'Vốn nội bộ', value: '155,0', unit: 'tỷ VND', period: '', tone: 'neutral' },
      { label: 'Vốn vay mới', value: '120,0', unit: 'tỷ VND', period: '', tone: 'debt' },
      { label: 'Chi phí tài trợ', value: '38,4', unit: 'tỷ VND (PV)', period: '', tone: 'debt' },
      { label: 'Nợ cuối kỳ / Vốn chủ', value: '0,71', unit: '', period: '', tone: 'debt' },
    ] },
    { title: 'Rủi ro', metrics: [
      { label: 'Tổng Điểm rủi ro danh mục', value: '7', unit: '/ 30 tối đa', period: '', tone: 'risk' },
    ] },
  ],
  decisions: [
    { code: 'P1', name: 'Thu hồi nhiệt thải (WHR)', selected: true, reason: 'Đóng góp NPV cao nhất; đủ điều kiện Gói vay L1', internalCapital: '60,0 tỷ', loanCapital: '120,0 tỷ (L1)', post12mWarning: 'Còn 140 tỷ CapEx sau tháng 12 — nguồn vốn tương lai chưa được mô hình kiểm chứng' },
    { code: 'P3', name: 'Điện mặt trời mái', selected: true, reason: 'NPV dương, rủi ro thấp; tài trợ bằng vốn nội bộ', internalCapital: '95,0 tỷ', loanCapital: '0' },
    { code: 'P2', name: 'Biến tần quạt lò', selected: false, reason: 'Không nằm trong tập tối ưu ở tầng NPV; CO₂ chưa xác nhận nên không đóng góp mục tiêu phụ' },
    { code: 'P4', name: 'Thay thế clinker', selected: false, reason: 'Cờ đỏ rủi ro trọng yếu — bị loại khỏi đề xuất tự động' },
  ],
  bindingConstraints: ['Hạn mức vốn nội bộ (Σ u_i = 155 ≤ 300)', 'DSCR 12 tháng = 1,84 ≥ 1,25 (còn dư)'],
};

const PLAN_FAST: PlanView = {
  ...PLAN_SAFE,
  runId: 'run-ht-fast-03', strategy: 'FAST_TRANSITION', strategyName: 'Chuyển đổi nhanh',
  solveSeconds: '1,12',
  metricGroups: [
    { title: 'Vòng đời', metrics: [
      { label: 'NPV trước tài trợ', value: '250,4', unit: 'tỷ VND', period: 'vòng đời', tone: 'finance' },
    ] },
    { title: 'Phát thải', metrics: [
      { label: 'CO₂ đã xác nhận', value: '27.800', unit: 'tCO₂e', period: 'năm vận hành đầy đủ', tone: 'carbon' },
      { label: 'CO₂ 12 tháng đầu', value: '11.400', unit: 'tCO₂e', period: '12 tháng đầu', tone: 'carbon' },
    ] },
    { title: 'Thanh khoản 12 tháng', metrics: [
      { label: 'Tiền cuối kỳ', value: '162,3', unit: 'tỷ VND', period: 'tháng 12', tone: 'finance' },
      { label: 'CFADS', value: '560,0', unit: 'tỷ VND', period: '12 tháng', tone: 'finance' },
      { label: 'DSCR', value: '1,51', unit: '', period: '12 tháng', tone: 'finance' },
    ] },
    { title: 'Vốn & nợ', metrics: [
      { label: 'Vốn nội bộ', value: '155,0', unit: 'tỷ VND', period: '', tone: 'neutral' },
      { label: 'Vốn vay mới', value: '200,0', unit: 'tỷ VND', period: '', tone: 'debt' },
      { label: 'Chi phí tài trợ', value: '61,7', unit: 'tỷ VND (PV)', period: '', tone: 'debt' },
      { label: 'Nợ cuối kỳ / Vốn chủ', value: '0,78', unit: '', period: '', tone: 'debt' },
    ] },
    { title: 'Rủi ro', metrics: [
      { label: 'Tổng Điểm rủi ro danh mục', value: '9', unit: '/ 30 tối đa', period: '', tone: 'risk' },
    ] },
  ],
  decisions: [
    { code: 'P1', name: 'Thu hồi nhiệt thải (WHR)', selected: true, reason: 'CO₂ cao nhất và NPV cao; L1', internalCapital: '60,0 tỷ', loanCapital: '120,0 tỷ (L1)', post12mWarning: 'Còn 140 tỷ CapEx sau tháng 12 chưa kiểm chứng nguồn' },
    { code: 'P3', name: 'Điện mặt trời mái', selected: true, reason: 'Thêm CO₂ đã xác nhận; L2', internalCapital: '15,0 tỷ', loanCapital: '80,0 tỷ (L2)' },
    { code: 'P2', name: 'Biến tần quạt lò', selected: false, reason: 'CO₂ chưa xác nhận → không vào mục tiêu CO₂; NPV thấp hơn P1/P3' },
    { code: 'P4', name: 'Thay thế clinker', selected: false, reason: 'Cờ đỏ rủi ro trọng yếu — bị loại' },
  ],
  bindingConstraints: ['Ngưỡng CO₂ tối thiểu = 20.000 tCO₂e (đạt 27.800)', 'DSCR 12 tháng = 1,51 ≥ 1,25'],
};

/** Chiến lược Cân bằng ở phiên bản này cho cùng Phương án với An toàn. */
const PLAN_BALANCED: PlanView = {
  ...PLAN_SAFE, runId: 'run-ht-balanced-03', strategy: 'BALANCED', strategyName: 'Cân bằng', solveSeconds: '0,97',
};

const DIAGNOSIS_TIGHT: DiagnosisView = {
  runId: 'run-ht-fast-tight',
  strategy: 'FAST_TRANSITION', strategyName: 'Chuyển đổi nhanh (ngưỡng CO₂ = 32.000)',
  rows: [
    { code: 'CO2_MIN', label: 'Ngưỡng CO₂ tối thiểu', actual: '27.800 tCO₂e', threshold: '≥ 32.000 tCO₂e', slack: 'thiếu 4.200 tCO₂e', basis: 'LEDGER', deepLink: '/cases/case-hoang-thach/projects', deepLinkLabel: 'Xem Dự án & CO₂ đã xác nhận' },
    { code: 'CASH_T4', label: 'Tiền mặt tháng 4', actual: 'past 132 tỷ VND', threshold: '≥ 150 tỷ VND', slack: 'thiếu 18 tỷ VND', basis: 'LEDGER', deepLink: '/cases/case-hoang-thach/scenario', deepLinkLabel: 'Xem tiến độ CapEx & giải ngân' },
  ],
};

// ─── S19: Audit ─────────────────────────────────────────────────────────────

const AUDIT: Record<string, AuditEvent[]> = {
  'case-hoang-thach': [
    { at: '2026-07-28T14:20:00+07:00', actor: 'Minh — CFO', target: 'Phương án (Chiến lược An toàn)', action: 'Chọn Phương án cuối', before: null, after: 'run-ht-safe-03', version: 3 },
    { at: '2026-07-28T11:05:00+07:00', actor: 'Thảo — ESG/MRV', target: 'Phiếu phát thải P3', action: 'Xác nhận', before: 'Cần kiểm tra', after: 'Đã xác nhận', version: 3 },
    { at: '2026-07-27T16:30:00+07:00', actor: 'Minh — CFO', target: 'Kịch bản Cơ sở', action: 'Xác nhận giả định 12 tháng', before: 'Ước tính', after: 'Đã xác nhận', version: 3 },
    { at: '2026-07-27T09:12:00+07:00', actor: 'Lan — Kế toán trưởng', target: 'FS-10 Chi phí lãi vay', action: 'Sửa giá trị OCR', before: '92.4 (OCR)', after: '92.4 (đã kiểm)', version: 2 },
    { at: '2026-07-26T15:40:00+07:00', actor: 'Lan — Kế toán trưởng', target: '12 Trường BCTC', action: 'Xác nhận toàn bộ & khóa phiên bản', before: null, after: 'v2', version: 2 },
  ],
};

// ─── API ────────────────────────────────────────────────────────────────────

const delay = <T,>(value: T): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(value), 160));

export const listCases = () => delay<CaseSummary[]>([...CASES]);
export const getCase = (id: string) => delay(CASES.find((c) => c.id === id));
export const getReadiness = (id: string) => delay<ReadinessReport | undefined>(REPORTS[id]);
export const getFsFields = (id: string) => delay<FsField[]>(FS_FIELDS[id] ?? []);
export const getScenario = (id: string) => delay<ScenarioData | undefined>(SCENARIOS[id]);
export const getLoans = (id: string) => delay<LoanPackageView[]>(LOANS[id] ?? []);
export const getProjects = (id: string) => delay<ProjectView[]>(PROJECTS[id] ?? []);
export const getRunContract = (id: string) => delay<RunContract | undefined>(RUN_CONTRACT[id]);
export const getAudit = (id: string) => delay<AuditEvent[]>(AUDIT[id] ?? []);

/** Trả kết quả theo Chiến lược cho case Hoàng Thạch. */
export function getRunResult(id: string, strategy: string): Promise<RunResult | undefined> {
  if (id !== 'case-hoang-thach') return delay(undefined);
  const map: Record<string, RunResult> = {
    SAFE: { kind: 'plan', plan: PLAN_SAFE },
    BALANCED: { kind: 'plan', plan: PLAN_BALANCED },
    FAST_TRANSITION: { kind: 'plan', plan: PLAN_FAST },
    INFEASIBLE: { kind: 'diagnosis', diagnosis: DIAGNOSIS_TIGHT },
  };
  return delay(map[strategy]);
}

export const ALL_STRATEGY_PLANS: PlanView[] = [PLAN_SAFE, PLAN_BALANCED, PLAN_FAST];
