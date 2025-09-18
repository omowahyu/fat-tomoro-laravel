# FAT TOMORO BRIDGING — REQUIREMENTS

## Current Process (As-Is)

### 1. Order Bahan Baku (BOH → Accurate)
- OPS order bahan baku ke Tomoro Pusat via APS BOH
- FAT PSM copy-paste BOH data ke Accurate
- Barang dikirim & diterima, dicocokkan dengan invoice
- FAT PSM juga input penerimaan di Accurate

**Pain Point**: Manual copy–paste, rawan salah, lambat

### 2. Rekonsiliasi Penjualan Multi-Channel
- Data penjualan dikumpulkan dari berbagai channel (offline, delivery, dll.)
- Rekening koran ditandai sesuai channel
- Data disusun di Excel, ada kolom tambahan (diskon, dll.)
- Rekonsiliasi manual antara BI, agregator, rekening koran

**Pain Point**: Manual cek satu per satu, banyak error, tidak efisien

---

## Proposed IT Plan (To-Be)

### Pembelian (BOH → Accurate)
1. FAT PSM unduh data BOH (CSV/PDF)
2. Upload ke aplikasi bridging
3. Sistem parsing & konversi ke template Accurate (Excel/JSON)
4. Validasi COA, supplier, pajak, gudang
5. Preview → FAT PSM approve
6. Post otomatis ke Accurate API

### Penjualan & Rekonsiliasi
1. FAT PSM upload BI sales (per tanggal, all channel)
2. FAT PSM upload Bank statement (CSV/Excel / API)
3. Sistem auto-generate diskon (Gross → Nett)
4. Matching engine:
   - T (BI) ↔ T+1 (Bank)
   - Nominal & channel mapping
5. Resume per channel: Gross, Fee, Ads, Nett, Bank In, Selisih
6. FAT PSM review selisih, approve
7. Post ke Accurate API (Sales/Journal)

---

## Navigation Structure (Modules)

- **Dashboard**
  - Status job (Pembelian, Penjualan, Rekonsiliasi)
  - Meteran data: % berhasil, selisih, error aging
  - Quick actions: Upload BI, Upload Bank, Sinkron BOH

- **Pembelian**
  - Import BOH (CSV/PDF)
  - Transform & Preview
  - Mapping & Validasi (COA, supplier, pajak, gudang)
  - Posting ke Accurate
  - Histori & Audit

- **Penjualan & Rekonsiliasi**
  - Upload Penjualan BI
  - Upload Rekening Koran
  - Auto Generate Diskon
  - Match & Verifikasi (T vs T+1)
  - Review Selisih
  - Posting Penjualan ke Accurate
  - Resume Rekonsiliasi

- **Master & Mapping**
  - COA Mapping
  - Item/Product Mapping
  - Channel Mapping
  - Bank Mapping
  - Tax & Fee Rules

- **Integrasi & Scheduler**
  - BOH Export, BI Export, Accurate API, Bank API
  - Scheduler jobs (retry, SLA)

- **Audit & Notifikasi**
  - Activity Logs
  - Error Center
  - Notifikasi (email/Slack/WA)

- **Pengaturan**
  - Template import/export
  - Timezone, format angka/tanggal
  - Multi-entity (multi store)

---

## Business Rules (Rule Engine)

- Tanggal match: T (BI) ↔ T+1 (Bank), parameterizable
- Source of truth: BI; selisih diakui ke akun khusus
- Toleransi mismatch: nominal/% per channel
- Duplikasi dicegah (cek no dokumen/transaksi)
- Fallback: user tagging kolom jika parser gagal

---

## Laporan & Ekspor
- Resume Rekonsiliasi per channel (harian/mingguan/bulanan)
- Log Posting Accurate
- Aging Selisih
- Ekspor: Excel/CSV/PDF

---

## Roadmap (Sprint-Level)

- **Sprint 1**: Fondasi Pembelian (Parser BOH, validasi, posting)
- **Sprint 2**: Penjualan & Resume (Upload BI, Gross→Nett, posting sales summary)
- **Sprint 3**: Rekening Koran & Matching (Upload Bank, engine, selisih)
- **Sprint 4**: AI Assist & Scheduler (anomali, mapping suggestion, jobs, notifikasi)
- **Sprint 5**: API Bank (Opsional) & Hardening (audit trail, security, idempotency)

---

## Acceptance Criteria (Samples)
- Pembelian: 100% PO/GR valid, 0 duplikasi, masuk Accurate < 2 menit
- Penjualan: Resume cocok dengan BI, selisih bank terdeteksi, posting sukses
- Rekonsiliasi: 100% auto-match, sisanya tercatat sebagai exception

---

## Go-Live Checklist
- Finalisasi COA & channel mapping
- Uji 3 hari data historis
- SOP error handling & rollback
- Training FAT PSM & OPS
- Monitoring aktif + notifikasi

---

## Catatan Implementasi
- Source of truth penjualan = BI Tomoro, selisih → akun “Selisih Bank”
- Timezone: Asia/Jakarta
- Multi-store support: filter per entitas
