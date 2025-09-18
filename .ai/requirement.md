# Tomoro Bridging – Requirements (MVP)

## Priority
1. Data Upload (CSV/Excel support for BOH, BI, Bank)
2. Accurate API Integration (Purchases, Sales, Journal)
3. AI Implementation (Mapping Assist, Anomaly Detection – optional, cost-controlled)

---

## 1. Upload Module
- Support: CSV & Excel files only (≤10MB).
- Types:
  - BOH (Purchases/Inventory: coffee, milk, etc.)
  - BI Sales (Multi-channel)
  - Bank Statements (optional for reconciliation)
- Flow:
  - User uploads → Parse & Normalize → Preview (first rows + summary) → Validate → Confirm Commit
- Features:
  - Auto-detect delimiter & encoding
  - Mapping Wizard (column, item, channel)
  - Validation (required fields, numeric ranges, duplicate detection)

## 2. Accurate API Integration
- Endpoints: Sales Invoice, Purchase Order/GR, Journal Entry
- Mode: Batch posting with retries + idempotency keys
- Rules:
  - Sales: Gross → Nett (fees, ads deducted)
  - Purchases: Map items to Inventory/COGS, include supplier, warehouse, tax
  - Reconciliation: If mismatch, BI as source of truth, differences posted to “Selisih Bank” account
- Audit: Log all API interactions (req/resp, status, errors)

## 3. Mapping Engine
- Column Mapping (external → internal field)
- Item Mapping (string patterns → SKU/ItemID)
- Channel Mapping (GoFood, GrabFood, etc.)
- COA Mapping (Sales, Ads, Fee, COGS, Inventory, Selisih)
- Bank Mapping (statement descriptions → channel/merchant)
- CRUD UI with versioning & preview tester

## 4. AI Implementation (Optional, Cost-Efficient)
- Use AI only when rule-based mapping < confidence threshold
- Scope:
  - Suggest field mapping from file headers
  - Fuzzy match item/product names
  - Flag anomalies in reconciliation (spikes, negatives)
- Guardrails:
  - Token/sample limits (process first 20–50 rows only)
  - Prefer OSS/local libs (rapidfuzz) → fallback to small/cheap APIs

## 5. User Roles & Permissions
- OPS: Upload & validate (cannot post to Accurate)
- FAT PSM: Approve mappings, confirm posting
- Admin: Manage mappings, integrations, scheduler, monitoring

## 6. Non-Functional
- Performance: Parse ≤3s per 1k rows
- Reliability: Retry w/ exponential backoff, idempotent commits
- Security: API key encryption, role-based access
- Observability: Success rate, error rate, latency dashboards

## 7. Data Model (MVP tables)
- files(id, type, name, size, status, meta)
- raw_rows(id, file_id, row_json)
- mappings(id, type, source, target, confidence, rules)
- transformed_rows(id, file_id, normalized_json, valid_flag, errors)
- batches(id, file_id, status, idempotency_key)
- post_results(id, batch_id, endpoint, status, response)
- audit_logs(id, actor, action, details, timestamp)

## 8. Implementation Plan
- Sprint 1: Upload (CSV/XLSX parsing, preview, validation, mapping)
- Sprint 2: Accurate API connector + posting rules
- Sprint 3: Sales reconciliation (BI vs Bank), resume report
- Sprint 4: AI suggestions (mapping assist, anomaly flagging)
- Sprint 5: Bank API integration & system hardening

---

## Libraries (Laravel 12 + Inertia 2 React)
- Use existing Laravel + Inertia upload handling
- For CSV/XLSX: [maatwebsite/excel] (Laravel Excel) – confirm before install
- For validation/mapping: native Laravel validation + custom mapping tables
- For charts/tables (UI): shadcn/ui, recharts (already aligned with React setup)
- For fuzzy search (optional AI-lite): [rapidfuzz] (confirm before install)
