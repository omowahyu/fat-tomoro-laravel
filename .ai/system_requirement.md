Oke, saya akan tulis ulang semua requirement ke dalam 5 file berbeda sesuai struktur yang Anda inginkan. Jadi setiap file fokus ke satu aspek saja, tanpa overlap.
---

# `system_requirement.md`

## Architecture

* **Presentation Layer:** Laravel Inertia + React.
* **Application Layer:** Pembelian, Penjualan, Rekonsiliasi, QPON, Mapping, Audit.
* **Data Layer:** MariaDB, raw SQL optimized.
* **Integration Layer:** Accurate API, Bank CSV/API, Email parser.

## Functional Modules

* **Dashboard:** status job, exception aging, quick upload.
* **Pembelian:** Upload BOH → validate → post Accurate.
* **Penjualan:** Upload POS/Email → Gross→Nett.
* **Rekonsiliasi:** Sales vs Bank match T+N, exception queue.
* **QPON:** Redemptions pending, statement upload, clearing.
* **Master Mapping:** COA, item, channel, bank.
* **Audit:** full logs + evidence.

## Scheduler Jobs

* **Daily:** Import data, settlement, recon, report, notify exception.
* **Weekly:** Rollup per channel, aging selisih, QPON pending.
* **Monthly:** Consolidation sales & purchase, posting ke Accurate, export audit.
* **Yearly:** Consolidated report, trend analysis, audit pack.

---


# `report_requirement.md`

## Daily Reports

* **Settlement Report:** POS vs Email vs Bank.
* **Exception List:** delta + reason code.
* **Inventory Usage:** BOM → COGS.

## Weekly Reports

* Rollup per channel/branch.
* Aging exception (0–3d, 4–7d, 8–14d, 15d+).
* QPON pending.

## Monthly Reports

* Konsolidasi sales vs bank.
* Purchase & inventory valuation.
* Margin analysis.
* Exception review.

## Yearly Reports

* Annual sales summary.
* Annual COGS & margin.
* Trend analysis.
* Audit pack (full year evidence).

## Distribution

* Format: Excel, CSV, PDF.
* Harian via notifikasi & dashboard.
* Bulanan via posting Accurate + PDF archive.
* Tahunan via audit pack (ZIP).

---

# `database.txt`

## Core

* `files` (upload meta)
* `raw_rows` (snapshot original)
* `audit_logs`

## Purchases

* `purchase_docs` (po, gr, invoice)
* `purchase_items`

## Sales

* `sales_docs` (gross, fee, ads, net, qpon\_adjustment, bank\_in, delta, status)
* `sales_items`

## Bank

* `bank_rows` (description, descriptor\_norm, status)

## Promo/QPON

* `promo_redemptions` (pending/confirmed)
* `qpon_statements`

## Reconciliation

* `reason_codes`
* `recon_matches`
* `recon_exceptions`

## Indexing

* `(sales_date, channel_code)` di `sales_docs`.
* `(txn_date, description)` di `bank_rows`.
* `(business_date, channel_code)` di `promo_redemptions`.

---

Apakah Anda mau saya tambahkan satu file **`query_examples.sql`** berisi raw query siap pakai (contoh laporan harian, aging, margin), supaya langsung usable untuk uji coba?
