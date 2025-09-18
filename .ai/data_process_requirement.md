
1. Context

Proyek FAT TOMORO Bridging bertujuan:

Menghilangkan kerja manual copy–paste dari BOH & BI ke Accurate.

Memastikan pembelian, penjualan, dan rekonsiliasi bank dilakukan otomatis dan terdokumentasi.

Memberikan laporan akurat harian, mingguan, bulanan, hingga tahunan dengan zero tolerance terhadap selisih yang tidak jelas.

Sumber data utama:

Sales Order (BOH / APS) → kebutuhan pembelian & penerimaan barang.

POS (Lotte/BEI) → transaksi penjualan harian.

Aggregator (GoFood, GrabFood, ShopeeFood, QPON) → settlement via email.

Rekening koran (Bank BNI, BCA, Jago, dsb.) → transaksi kas masuk/keluar.

Settlement Report → basis formula Gross → Nett (com fee, ads, promo).

2. Business Rules

Tanggal:
Sales(T) harus cocok dengan Bank(T+1), configurable per channel.

Prioritas Data:

BI/POS → sumber kebenaran utama (gross/net).

Bank → verifikasi kas masuk.

Selisih tetap diakui sebagai “Selisih Rekening Bank” bila belum teratasi.

Promo & QPON:

Diskon QPON diakui sementara di akun clearing, ditutup setelah laporan resmi masuk.

Selisih karena promo QPON → reason code khusus.

Audit Trail:
Semua data (upload, parse, match, approval) wajib tercatat dengan evidence (email, file, bank statement).

Integrasi:

Accurate API untuk posting pembelian & penjualan.

Scheduler untuk job rutin.

3. Process Frequency
Harian

Import file BOH (Sales Order) & update penerimaan barang.

Import POS per cabang (Lotte, BEI).

Import transaksi bank (BNI, BCA, Jago, QRIS).

Import email settlement (GoFood, GrabFood, ShopeeFood).

Generate laporan harian:

Gross, Fee, Ads, Nett per channel.

Crosscheck Nett ↔ Bank In.

Exception list (QPON, mismatch nominal/tanggal).

Mingguan

Rekap penjualan & bank per channel/cabang.

Analisis aging selisih.

Review status pending QPON.

Laporan performance (gross margin vs COGS).

Bulanan

Resume penjualan per channel/cabang.

Konsolidasi pembelian & stok (COGS update).

Rekonsiliasi selisih bank akhir bulan.

Posting ke Accurate (journal penjualan, pembelian, selisih).

Ekspor laporan audit (Excel/PDF).

Tahunan

Laporan konsolidasi tahunan (sales, COGS, margin).

Rekonsiliasi saldo awal vs akhir (stok & bank).

Analisis tren (growth, promo effectiveness, fee vs nett).

Persiapan audit eksternal.

4. Data Flow (ringkas)

Pembelian: BOH → Parser → Template Accurate → Validasi → Posting.

Penjualan: POS/BI + Email Settlement → Rule Gross→Nett → Bank T+1 → Matching → Posting.

Rekonsiliasi: Engine mencocokkan nominal, tanggal, channel → Exception jika selisih.

Laporan: Dashboard harian → rekap mingguan → konsolidasi bulanan → tahunan.

5. Exception Handling

Reason Codes: BANK_T_DELAY, FEE_VARIANCE, QPON_PROMO, ROUNDING, UNMAPPED_CHANNEL.

Queue: Semua mismatch tercatat, ada SLA (harian untuk besar, mingguan untuk kecil).

Resolution: Bisa dengan evidence tambahan (report QPON, bukti bank).

Default Accounting: Jika tidak bisa diselesaikan cepat, selisih dicatat ke akun khusus “Selisih Bank”.

6. Output & Reporting

Harian: Tabel perbandingan POS vs Settlement vs Bank, exception list.

Mingguan: Aging selisih, status QPON.

Bulanan: Konsolidasi penjualan, pembelian, margin, selisih.

Tahunan: Rekap tahunan, tren, laporan audit.

7. Acceptance Criteria

100% transaksi ter-upload ke sistem (no missing rows).

100% batch memiliki status MATCHED atau EXCEPTION (tidak ada yang “menggantung”).

Selisih ≤ toleransi yang ditentukan, default nol untuk posting ke Accurate.

Audit log lengkap, bisa retrace setiap langkah.