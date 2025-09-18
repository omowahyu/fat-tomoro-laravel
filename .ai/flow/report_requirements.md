Baik, saya lengkapi dengan dokumen **`report_requirement.md`** agar satu paket dengan `data_requirement.md` dan `system_requirement.md`. Dokumen ini fokus ke **format & isi laporan** yang harus dihasilkan, sesuai siklus harian, mingguan, bulanan, dan tahunan.

---

# `report_requirement.md`

## 1. Purpose

Mendefinisikan standar laporan yang dihasilkan oleh sistem **FAT TOMORO Bridging**, agar tim akuntansi, operasional, dan auditor memiliki visibilitas penuh atas:

* Pembelian
* Penjualan
* Settlement (Gross → Nett → Bank)
* Selisih & Exception
* Rekap periodik

---

## 2. Report Types

### A. Daily Reports

1. **Daily Sales & Settlement Report**

   * Fields:
     \| Date | Branch | Channel | Gross | Fee | Ads | Nett | BankIn (T+N) | QPON Pending | Delta | Status |
   * Status: `OK`, `WAIT_QPON`, `DIFF`.

2. **Daily Exception List**

   * Fields:
     \| Date | Branch | Channel | Nett | BankIn | Delta | ReasonCode | SLA | EvidenceLink |
   * Reason codes: `BANK_T_DELAY`, `QPON_PROMO`, `FEE_VARIANCE`, `ROUNDING`, `UNMAPPED_CHANNEL`.

3. **Daily Inventory Usage Report**

   * Fields:
     \| Date | Branch | Product | Qty Sold | Ingredient | Qty Used | UOM | COGS |
   * Derived from BOM.

---

### B. Weekly Reports

1. **Weekly Sales Rollup**

   * Fields:
     \| ISO Week | Branch | Channel | Gross | Fee | Ads | Nett | BankIn | Delta |
   * Grouped by week.

2. **Aging Exception Report**

   * Buckets: `0-3 days`, `4-7 days`, `8-14 days`, `15+ days`.
   * Fields:
     \| Branch | Channel | Bucket | Count | Total Delta |

3. **Weekly QPON Pending Report**

   * Fields:
     \| Week | Channel | Pending Amount | Orders | % of Nett |

---

### C. Monthly Reports

1. **Monthly Sales & Bank Reconciliation**

   * Fields:
     \| Month | Branch | Channel | Nett (POS) | BankIn | Delta | % Match |
   * Summary per branch/channel.

2. **Monthly Purchase & Inventory Report**

   * Fields:
     \| Month | Branch | Ingredient | Qty In (Receipt) | Qty Out (Usage) | Balance | Avg Cost | Total Value |
   * Untuk valuasi persediaan.

3. **Monthly Margin Analysis**

   * Fields:
     \| Branch | Product | Gross Sales | Nett Sales | COGS | Margin | Margin % |
   * Derived from BOM + cost effective date.

4. **Monthly Exception Review**

   * Fields:
     \| Month | Branch | Channel | ReasonCode | Count | Total Delta |
   * Untuk evaluasi kualitas rekonsiliasi.

---

### D. Yearly Reports

1. **Annual Sales Summary**

   * Fields:
     \| Year | Gross | Fee | Ads | Nett | BankIn | Delta |
   * Konsolidasi tahunan.

2. **Annual Purchase & COGS Summary**

   * Fields:
     \| Year | Total Purchase | Total Usage | Ending Inventory | COGS |
   * Basis laporan laba rugi.

3. **Annual Trend Analysis**

   * Fields:
     \| Month | Nett Sales | COGS | Margin | Delta Bank |
   * Grafik tren pertumbuhan dan selisih.

4. **Audit Pack**

   * Isi:

     * Export Daily Settlement (full year).
     * Exception list resolved/unresolved.
     * Mapping master (COA, channel, bank).
     * Evidence logs (email, bank, QPON).

---

## 3. Distribution

* Format: **Excel, CSV, PDF**.
* Jalur distribusi:

  * Harian → email notifikasi + dashboard.
  * Mingguan → dashboard summary.
  * Bulanan → laporan keuangan Accurate + PDF archive.
  * Tahunan → audit pack (ZIP).

---

## 4. Acceptance Criteria

* Laporan tersedia **T+1 07:00 WIB** untuk harian.
* Laporan konsisten: jumlah transaksi = jumlah record di database.
* Delta tercatat dengan reason code, tidak ada “blank mismatch”.
* Audit pack dapat menelusuri semua transaksi dari sumber (email/bank/BI).

---

Dengan 3 dokumen ini:

* `data_requirement.md` → **apa** yang harus diolah.
* `system_requirement.md` → **bagaimana** sistemnya dibangun.
* `report_requirement.md` → **output** yang wajib dihasilkan.

---

Apakah Anda ingin saya satukan ketiga dokumen ini ke dalam satu **bundle folder** (misalnya `requirements/`) supaya tim bisa langsung pakai dalam repo project?
