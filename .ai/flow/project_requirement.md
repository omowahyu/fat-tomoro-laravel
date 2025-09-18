# FAT TOMORO BRIDGING — REQUIREMENTS

---

# `project_requirement.md`

## 1. Project Overview

**Nama Proyek:** FAT TOMORO Bridging
**Tujuan Utama:**

* Menghilangkan kerja manual (copy–paste) dari BOH/BI ke Accurate.
* Mengotomatiskan pembelian, penjualan, dan rekonsiliasi bank.
* Memberikan laporan akurat (harian, mingguan, bulanan, tahunan) dengan *zero tolerance* selisih yang tidak jelas.
* Menyediakan exception queue dengan reason codes (selisih selalu bisa dijelaskan).

---

## 2. Business Objectives

* **Accuracy**: 100% transaksi masuk, delta = 0 atau ada reason code.
* **Auditability**: Semua data punya evidence (file/email/bank/QPON).
* **Efficiency**: Proses ≤ 5 menit untuk >1000 transaksi harian.
* **Transparency**: Laporan multi-level (harian–tahunan) dengan aging selisih.
* **Scalability**: Support multi-branch, multi-channel, multi-bank.

---

## 3. Functional Scope

### 3.1 Pembelian

* Upload BOH (CSV/PDF).
* Parser → transform ke template Accurate.
* Validasi COA, supplier, pajak.
* Approval → posting ke Accurate API.

### 3.2 Penjualan & Settlement

* Upload POS/BI per channel.
* Upload Email settlement (GoFood, GrabFood, ShopeeFood).
* Upload Bank statement (BNI, BCA, Jago, QRIS).
* Rule **Gross → Nett (Gross − Fee − Ads)**.
* Crosscheck Nett ↔ Bank In (T+N).
* Jika ada diskon QPON → masuk akun clearing, tunggu laporan resmi.

### 3.3 Rekonsiliasi

* Matching engine: Sales(T) ↔ Bank(T+N).
* Exception queue dengan **reason codes**:

  * `BANK_T_DELAY`, `FEE_VARIANCE`, `QPON_PROMO`, `ROUNDING`, `UNMAPPED_CHANNEL`.
* Aging bucket: `0–3d`, `4–7d`, `8–14d`, `15d+`.

### 3.4 Reporting

* Harian: Settlement & exception list.
* Mingguan: Aging selisih, QPON pending.
* Bulanan: Konsolidasi sales, pembelian, margin, selisih bank.
* Tahunan: Consolidated report + audit pack.

---

## 4. Technology Stack

### Backend

* **Framework**: Laravel 12
* **Language**: PHP 8.3+
* **Database**: MariaDB 10.6+ (utf8mb4)
* **Cache/Queue**: Redis 7+
* **API Integration**: Accurate API (REST), optional Bank API

### Frontend

* **Framework**: Inertia v2 + React 18
* **UI Kit**: shadcn/ui, recharts (dashboard, charting)
* **Build Tool**: Vite

### DevOps

* **Environment**: Laravel Sail (Dockerized)
* **Version Control**: GitHub
* **CI/CD**: manual or future integration (GitHub Actions)
* **Scheduler**: Laravel Scheduler + Supervisor

### Libraries

* **Excel/CSV parsing**: `maatwebsite/excel`
* **Validation/Mapping**: Laravel Validation + custom mapping tables
* **Fuzzy/AI assist**: RapidFuzz (OSS), optional LLM (Gemini/GPT OSS)

---

## 5. Core Database Entities

* **Files & Rows** → upload, parse, transform.
* **Purchases** → purchase\_docs, purchase\_items.
* **Sales** → sales\_docs, sales\_items.
* **Bank** → bank\_rows, descriptor\_norm, match\_key.
* **Promo/QPON** → promo\_redemptions, qpon\_statements.
* **Reconciliation** → recon\_matches, recon\_exceptions.
* **Mappings** → mapping\_columns, mapping\_items, mapping\_channels, mapping\_coa.
* **Audit** → audit\_logs.
* **Scheduler** → scheduler\_jobs.

---

## 6. Process Frequency

* **Daily**: import, settlement, recon, report.
* **Weekly**: rollup, aging, QPON pending.
* **Monthly**: consolidation, posting ke Accurate, export audit.
* **Yearly**: consolidated report, audit pack, trend analysis.

---

## 7. Acceptance Criteria

* 100% transaksi ter-upload (tidak ada yang hilang).
* Semua batch `MATCHED` atau `EXCEPTION` (tidak ada status “gantung”).
* Selisih ≤ 0 tanpa alasan (absolute rule).
* Semua posting ke Accurate sukses atau tercatat di exception queue.
* Laporan tersedia tepat waktu (harian T+1 07:00 WIB).

---

## 8. Roadmap

* **Sprint 1**: Pembelian → BOH parser, posting Accurate.
* **Sprint 2**: Penjualan → POS upload, Gross→Nett, posting sales summary.
* **Sprint 3**: Rekonsiliasi → Bank upload, matching engine, exception queue.
* **Sprint 4**: QPON Handling → clearing, statement upload, reconciliation.
* **Sprint 5**: Reporting & Hardening → dashboards, audit, security, API bank opsional.

---

## 9. Data Import Considerations
- Parser utama: `maatwebsite/excel` (CSV/XLSX).
- Semua data masuk wajib melewati:
  1. **Header Normalization** → lowercase, trim, replace special chars.
  2. **Mapping Rules** → column, item, channel, COA.
  3. **Validation** → tipe data, tanggal, angka, required fields.
- Jika header/kolom tidak cocok → masuk ke *exception queue*, user harus review.
- Tidak ada AI auto-mapping, semua bersifat rule-based & deterministic.
- Preview mode wajib sebelum commit → tampilkan 5–10 baris pertama.

---

📌 Dengan dokumen ini, semua requirement proyek bisa dilihat **end-to-end**: dari kebutuhan bisnis, scope, stack, database inti, sampai roadmap.

---