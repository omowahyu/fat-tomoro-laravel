# FAT TOMORO BRIDGING — REQUIREMENTS

---

# `requirement.md`

## 1. Purpose

Dokumen ini adalah **pengarah utama** untuk AI maupun tim developer dalam memahami kebutuhan proyek **FAT TOMORO Bridging**.
Semua detail lanjutan disimpan di file terpisah agar konteks ringan dan modular.

---

## 2. File Reference & Usage

* **`project_requirement.md`** → gambaran umum proyek, stack, scope, roadmap.
* **`system_requirement.md`** → arsitektur sistem, modul, integrasi, scheduler.
* **`data_process_requirement.md`** → aturan proses data (import, mapping, validation, audit).
* **`report_requirement.md`** → kebutuhan output laporan harian, mingguan, bulanan, tahunan.
* **`database.txt`** → rancangan tabel & struktur DB (pakai raw SQL, optimized untuk recon).

📌 **Rule:**
Jika perlu membuat query SQL atau rincian tabel → gunakan **`database.txt`**.
Jika perlu menjelaskan proses → gunakan **`data_process_requirement.md`**.
Jika perlu membuat flow arsitektur → gunakan **`system_requirement.md`**.
Jika perlu menjabarkan stack & rencana sprint → gunakan **`project_requirement.md`**.
Jika perlu format laporan → gunakan **`report_requirement.md`**.

---

## 3. Business Principles (Core)

* **Source of truth**: POS/BI.
* **Settlement Rule**: `Nett = Gross − Fee − Ads` (− QPON jika ada laporan).
* **Bank Check**: Nett Sales(T) = Bank In(T+N).
* **Zero tolerance**: Selisih tanpa alasan tidak boleh.
* **Reason codes** wajib (`BANK_T_DELAY`, `FEE_VARIANCE`, `QPON_PROMO`, `ROUNDING`, `UNMAPPED_CHANNEL`).
* **Auditability**: Semua proses tersimpan dengan evidence (file, email, bank).

---

## 4. AI Usage Guideline

* AI **tidak langsung commit data** → hanya membantu validasi, mapping suggestion, atau anomali detection.
* Default mode: **rule-based deterministik**.
* Semua output AI → preview/exception → harus di-review user.
* Jangan load semua dokumen sekaligus, cukup panggil dokumen sesuai kebutuhan (lihat §2).

---

## 5. Acceptance Criteria

* 100% transaksi masuk sistem.
* Semua batch status = `MATCHED` atau `EXCEPTION`.
* Laporan tersedia on-time: Harian T+1 07:00 WIB.
* Selisih ≤ 0 kecuali ada reason code.
* Semua posting ke Accurate sukses / tercatat di exception queue.

---

📌 Dengan struktur ini, AI/tim hanya baca `requirement.md` dulu → lalu navigasi ke file lain sesuai kebutuhan.

---

Apakah mau saya buatkan juga contoh **alur kerja untuk AI** (semacam flow: “kalau user minta query → buka database.txt, kalau minta laporan → buka report\_requirement.md”), supaya jadi semacam SOP mini?
