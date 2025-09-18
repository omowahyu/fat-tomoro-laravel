
---

# `project_requirement.md`

## Project Overview

**Nama Proyek:** FAT TOMORO Bridging
**Tujuan:**

* Menghilangkan copy–paste manual dari BOH/BI ke Accurate.
* Automasi pembelian, penjualan, dan rekonsiliasi bank.
* Laporan akurat harian–tahunan dengan *zero tolerance mismatch*.

## Scope

* **Pembelian:** Import BOH → transform → validasi → posting ke Accurate.
* **Penjualan:** Import POS & Email settlement → Gross → Nett → BankIn.
* **Rekonsiliasi:** Matching Sales(T) ↔ Bank(T+N), semua selisih via reason code.
* **QPON Handling:** Diskon pending → clearing → closing saat laporan resmi masuk.
* **Reporting:** Harian, mingguan, bulanan, tahunan.

## Stack

* **Backend:** Laravel 12, PHP 8.3, MariaDB 10.6+, Redis 7.
* **Frontend:** Inertia v2 + React 18, shadcn/ui, recharts.
* **Infra:** Laravel Sail (Docker), GitHub, Supervisor Scheduler.
* **Libs:** maatwebsite/excel untuk CSV/XLSX.

## Roadmap

* **Sprint 1:** Pembelian (parser BOH, posting).
* **Sprint 2:** Penjualan (POS + Gross→Nett).
* **Sprint 3:** Rekonsiliasi (Bank upload, matching engine).
* **Sprint 4:** QPON handling (clearing + statement).
* **Sprint 5:** Reporting & Hardening.

---