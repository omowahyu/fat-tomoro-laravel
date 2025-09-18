
---

# `system_requirement.md`

## 1. Purpose

Mendefinisikan kebutuhan sistem (arsitektur, modul, integrasi, scheduler, audit) untuk aplikasi **FAT TOMORO Bridging** yang mengelola:

* Pembelian (BOH → Accurate).
* Penjualan (POS/BI, Email Settlement → Bank → Accurate).
* Rekonsiliasi (settlement Gross → Nett → Bank).
* QPON & Promo Handling.
* Audit & Reporting.

---

## 2. System Architecture

### Logical Layers

1. **Presentation Layer**

   * Web app (Laravel 12 + Inertia React).
   * UI untuk upload, preview, validasi, approval.
   * Dashboard status & exception queue.

2. **Application Layer**

   * Modules: Pembelian, Penjualan, Rekonsiliasi, QPON, Master & Mapping.
   * Matching engine (tanggal, nominal, channel, QPON rules).
   * Rule engine untuk toleransi, reason code assignment.
   * AI Assist (opsional) untuk anomaly detection & mapping.

3. **Data Layer**

   * Database MariaDB/MySQL.
   * Tabel master (product, ingredient, mapping).
   * Transaksi (sales\_batches, bank\_transactions, promo\_redemptions).
   * View `comparison_daily_channel` untuk rekonsiliasi.
   * Audit log.

4. **Integration Layer**

   * Accurate API (post Purchase, GR, Sales, Journal).
   * Email ingestion (parser settlement).
   * Bank API (opsional, polling/CSV upload).
   * File upload (CSV/Excel).

---

## 3. Functional Modules

### A. Dashboard

* Ringkasan status job (harian/mingguan).
* Notifikasi error & aging selisih.
* Quick action: Upload BI, Upload Bank, Sync BOH.

### B. Pembelian

* Upload BOH file.
* Transform → template Accurate.
* Mapping & validasi COA, supplier, pajak.
* Approval → API posting ke Accurate.
* Histori batch & audit log.

### C. Penjualan & Rekonsiliasi

* Upload BI POS (Gross per channel).
* Upload Email Settlement (GoFood, GrabFood, ShopeeFood).
* Upload/Import Bank Statement.
* Auto-compute Nett.
* Matching engine: Sales(T) ↔ Bank(T+N).
* Exception list dengan reason code.
* Resume laporan per channel (Gross, Fee, Ads, Nett, BankIn, Delta).
* Approval → posting summary ke Accurate.

### D. QPON & Promo

* Catat promo harian (PENDING).
* Upload statement resmi (CONFIRMED).
* Reimburse → match ke bank\_tx.
* Clearing account otomatis.

### E. Master & Mapping

* COA mapping (Sales, COGS, Fee, Ads, Selisih Bank).
* Item mapping (BOH SKU ↔ Accurate Item).
* Channel mapping (POS/BI ↔ Accurate).
* Bank mapping (deskripsi mutasi ↔ channel/merchant).

### F. Audit & Reporting

* Audit trail setiap aksi.
* Laporan harian, mingguan, bulanan, tahunan.
* Export: Excel, CSV, PDF.

---

## 4. Integration

### Accurate API

* Endpoint: Auth, Post Sales, Post Purchase/GR, Post Journal.
* Mode: Sync per batch, idempotency key untuk mencegah duplikasi.

### Email Ingestion

* Parser Gmail/IMAP.
* Ekstrak settlement (gross, fee, ads, nett).
* Evidence URL tersimpan.

### Bank

* CSV upload (BNI/BCA/Jago).
* API polling/webhook (opsional).
* Normalisasi description → channel mapping.

---

## 5. Scheduler & Jobs

### Daily Jobs

* Import POS/BI, Email, Bank.
* Generate settlement (Gross→Nett).
* Run matching engine.
* Notify exception (Slack/WA/email).

### Weekly Jobs

* Rollup per channel & branch.
* Aging selisih (0–3d, 4–7d, >7d).
* Review QPON pending.

### Monthly Jobs

* Konsolidasi penjualan & pembelian.
* Rekonsiliasi bank.
* Posting jurnal penyesuaian ke Accurate.
* Export laporan audit.

### Yearly Jobs

* Consolidated report.
* Analisis tren.
* Audit pack.

---

## 6. Non-Functional Requirements

* **Auditability**: setiap upload, parse, match, approve harus tercatat.
* **Zero Tolerance**: selisih tanpa alasan masuk `exception`.
* **Performance**: 1.000+ transaksi harian diproses < 5 menit.
* **Scalability**: bisa tambah cabang/channel tanpa refactor.
* **Security**: enkripsi data sensitif, masking nomor rekening.

---

## 7. Exception Handling

* **Reason Codes**: `BANK_T_DELAY`, `FEE_VARIANCE`, `QPON_PROMO`, `ROUNDING`, `UNMAPPED_CHANNEL`.
* **Exception Queue**: status `OPEN`, `IN_PROGRESS`, `RESOLVED`.
* **SLA**:

  * Harian untuk selisih besar.
  * Mingguan untuk promo/fee kecil.

---

## 8. Acceptance Criteria

* 100% transaksi masuk ke sistem.
* Semua transaksi berstatus `MATCHED` atau `EXCEPTION`.
* Zero unexplained delta sebelum posting ke Accurate.
* Laporan sesuai periode (harian–tahunan) tersedia & terverifikasi.

---

Apakah Anda ingin saya buatkan juga **`report_requirement.md`** (spesifikasi format laporan: tabel harian, mingguan, bulanan, tahunan) biar lengkap jadi satu set dokumentasi requirement?
