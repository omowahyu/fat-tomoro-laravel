Baik, saya susun dokumen **`data_requirement.md`** dan beberapa turunan requirement berdasarkan fungsi, agar jelas bagi tim maupun agent bagaimana data harus dikelola untuk menghasilkan settlement seperti yang diminta.

---

# `data_requirement.md`

## 1. Purpose

Menyediakan pedoman pengelolaan data **Pembelian**, **Penjualan**, dan **Rekening Koran** sehingga:

* Tidak ada transaksi yang hilang/miss.
* Settlement (Gross → Nett → Bank) dapat dihitung konsisten.
* Selisih dapat diidentifikasi, diberi alasan (reason code), dan ditangani.

---

## 2. Data Sources

1. **Sales Order (BOH/APS)**

   * Format: CSV/PDF dari APS → transform ke Excel template Accurate.
   * Field utama: `ProductCode`, `ProductName`, `Qty`, `UOM`, `AmountInclTax`.

2. **POS (Lotte, BEI)**

   * Format: Export Excel/CSV.
   * Field utama: `ShortName`, `DivisionCategory`, `GroupCategory`, `GrossSales`, `Fee`, `Ads`, `NetSales`.

3. **Aggregator via Email (GoFood, GrabFood, ShopeeFood)**

   * Format: Email CSV/HTML → parser otomatis.
   * Field utama: `BusinessDate`, `Gross`, `Fee`, `Ads`, `Net`.

4. **Bank Statement (BNI, BCA, Jago, QRIS, GoPay, dsb.)**

   * Format: CSV/Excel.
   * Field utama: `TxDatetime`, `Debit/Credit`, `Amount`, `Description`, `Branch`.

5. **QPON Statement**

   * Format: Excel/CSV manual dari tim QPON.
   * Field utama: `BusinessDate`, `Channel`, `AmountDiscount`, `Orders`.

---

## 3. Data Processing Rules

### Pembelian

* Parser BOH → mapping ke Accurate Item & COA.
* Penerimaan barang → update stok & harga modal (ingredient\_cost).
* Posting: Purchase/GR/Invoice ke Accurate.

### Penjualan

* Input: POS/BI data (Gross per channel).
* Rule:

  ```
  Nett = Gross − Fee − Ads (− QPON_pending)
  ```
* Output: Sales Summary per Channel + Detail Item.

### Rekening Koran

* Tanggal match: Sales(T) ↔ Bank(T+N), default N=1.
* Deskripsi mutasi → normalisasi → mapping ke channel/merchant id.
* Selisih = BankIn − Nett.

### Settlement

* BI/POS = **sumber kebenaran**.
* Bank = **verifikasi kas masuk**.
* Jika berbeda → catat selisih ke akun `Selisih Bank`.
* QPON diakui ke akun clearing, direklas setelah laporan resmi masuk.

---

## 4. Functional Requirements

### A. Pembelian Module

* Import file BOH (CSV/PDF).
* Transform ke template Accurate.
* Validasi (COA, Supplier, Pajak, Qty, Harga).
* Preview → Approval → Posting API ke Accurate.
* Audit log setiap batch.

### B. Penjualan & Rekonsiliasi Module

* Import BI/POS (Gross per channel).
* Import Email Settlement.
* Import Bank Statement.
* Auto-compute Nett & match dengan Bank (T+N).
* Flag selisih, generate `reason_code`.
* Resume laporan per channel (Gross, Fee, Ads, Nett, BankIn, Selisih).
* Approval → Posting ke Accurate.

### C. QPON Handling

* Catat promo redemptions harian sebagai `PENDING`.
* Upload statement resmi → ubah status jadi `CONFIRMED`.
* Jika ada reimbursement bank, match ke bank\_tx.
* Selisih masuk akun `QPON_discount_clearing`.

---

## 5. Data Requirements by Function

| Fungsi       | Input Data                | Output Data                           | Catatan                     |
| ------------ | ------------------------- | ------------------------------------- | --------------------------- |
| Pembelian    | BOH CSV/PDF               | PO, GR, Invoice Accurate              | Mapping SKU → Item          |
| Penjualan    | BI POS + Email Settlement | Nett Sales per channel                | BI = source of truth        |
| Rekonsiliasi | POS/Email vs Bank         | Delta & status (OK, WAIT\_QPON, DIFF) | T+N configurable            |
| QPON         | POS Discount, QPON Report | Pending/Confirmed promo\_redemptions  | Clearing account            |
| Audit & Log  | Semua modul               | Audit trail lengkap                   | Evidence: email, bank, file |

---

## 6. Non-Functional Requirements

* **Accuracy**: Zero tolerance selisih tanpa alasan.
* **Auditability**: Semua langkah terekam (user, waktu, data sebelum/ sesudah).
* **Performance**: Processing harian ≤ 5 menit untuk 1.000+ transaksi.
* **Security**: Enkripsi data sensitif, masking nomor rekening.
* **Extensibility**: Channel/branch baru dapat ditambah tanpa perubahan besar.

---

## 7. Reporting Requirements

* **Harian**: Rekonsiliasi per channel, exception list.
* **Mingguan**: Aging selisih, status QPON.
* **Bulanan**: Konsolidasi pembelian, penjualan, margin, selisih bank.
* **Tahunan**: Laporan konsolidasi, tren, audit pack.

---

📌 Dengan format ini, tim dan agent bisa langsung tahu **apa yang harus dikumpulkan**, **bagaimana diproses**, dan **output apa yang divalidasi** agar settlement akurat.

Mau saya lanjutkan juga dengan **`system_requirement.md`** (arsitektur, modul, API, job scheduler) biar lengkap satu paket bersama `data_requirement.md`?
