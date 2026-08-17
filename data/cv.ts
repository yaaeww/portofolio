export type ProjectContribution = {
  title: string;
  detail: string;
  points?: string[];
};

export type Project = {
  title: string;
  description: string;
  tech: string[];
  image?: string;
  contributions?: ProjectContribution[];
};

export type Certificate = {
  title: string;
  issuer: string;
  year: string;
  image?: string;
};

export type Experience = {
  role: string;
  company: string;
  duration: string;
  points: string[];
};

export type FeaturedSkill = {
  title: string;
  subtitle: string;
  skills: string[];
  icon: "brain" | "layers" | "trend" | "shield" | "database" | "server" | "layout" | "cloud";
};

export type Organization = {
  role: string;
  organization: string;
  duration: string;
  description?: string;
};

export type CVData = {
  name: string;
  title: string;
  summary: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  linkedinCertifications: string;
  linkedinSkills: string;
  skills: string[];
  featuredSkills: FeaturedSkill[];
  projects: Project[];
  certificates: Certificate[];
  experience: Experience;
  organizations: Organization[];
};

export const cvData: CVData = {
  name: "MUHAMMAD IHYA 'ULUMUDDIN",
  title: "AI Engineering & Full Stack Developer",
  summary:
    "Saya adalah Software Engineer yang memiliki ketertarikan pada pengembangan aplikasi web full stack dan teknologi AI. Saya senang mengubah ide atau permasalahan menjadi solusi yang dapat digunakan secara nyata, mulai dari merancang sistem, membangun backend dan frontend, mengelola database, hingga mengintegrasikan teknologi AI ketika memang memberikan nilai tambah.\n\nSaya memiliki pengalaman mengembangkan aplikasi menggunakan Go, React, Laravel, Node.js, PostgreSQL, MySQL, serta Python untuk kebutuhan machine learning dan data processing. Selama magang sebagai Programmer di PT Aplikasi Dagang Teknologi, saya terlibat dalam pengembangan produk pembayaran dan keuangan, berkolaborasi dengan tim frontend dan backend, serta belajar bagaimana membangun sistem yang tidak hanya berjalan, tetapi juga dapat dipelihara dan dikembangkan.\n\nBagi saya, menjadi software engineer bukan hanya tentang menulis kode. Saya percaya bahwa pemahaman terhadap masalah, kemampuan berkomunikasi, kemauan menerima feedback, dan konsistensi untuk terus belajar sama pentingnya dengan kemampuan teknis.\n\nSaya dikenal sebagai pribadi yang tidak mudah menyerah, senang mengeksplorasi hal baru, dan selalu berusaha memahami alasan di balik sebuah solusi. Saat ini saya terus mengembangkan kemampuan di bidang software engineering, AI/ML, system architecture, dan pengembangan produk dengan tujuan dapat menghasilkan teknologi yang benar-benar memberikan manfaat bagi penggunanya.",
  location: "Indonesia",
  email: "muhammadihya11289@gmail.com",
  github: "https://github.com/",
  linkedin: "https://www.linkedin.com/in/muhammad-ihya-ulumuddin/",
  linkedinCertifications:
    "https://www.linkedin.com/in/muhammad-ihya-ulumuddin/details/certifications/",
  linkedinSkills:
    "https://www.linkedin.com/in/muhammad-ihya-ulumuddin/details/skills/",
  skills: [
    "React",
    "Next.js",
    "TypeScript",
    "Go",
    "Express.js",
    "PostgreSQL",
    "Redis",
    "Docker",
  ],
  featuredSkills: [
    {
      title: "Machine Learning",
      subtitle: "Modeling, feature engineering & deep learning",
      skills: ["Python", "Pandas", "Deep Learning", "Feature Engineering"],
      icon: "brain",
    },
    {
      title: "Data Science & Visualization",
      subtitle: "From raw data to clear insights",
      skills: ["Data Cleaning", "Data Visualization", "Geospatial Analysis"],
      icon: "layers",
    },
    {
      title: "Time Series Forecasting",
      subtitle: "Forecasting with hybrid models",
      skills: ["Forecasting", "Multistep Strategy", "Hybrid Models"],
      icon: "trend",
    },
    {
      title: "AI Ethics & Explainability",
      subtitle: "Transparent, responsible AI",
      skills: ["SHAP Values", "PDP", "Permutation Importance", "AI Bias Mitigation"],
      icon: "shield",
    },
    {
      title: "SQL & Big Data",
      subtitle: "Query optimization at scale",
      skills: ["Advanced SQL", "BigQuery", "PostgreSQL", "MySQL"],
      icon: "database",
    },
    {
      title: "Back-End Development",
      subtitle: "REST APIs & scalable services",
      skills: ["Go", "Node.js", "Express.js", "Django", "Laravel"],
      icon: "server",
    },
    {
      title: "Front-End Development",
      subtitle: "Interactive web experiences",
      skills: ["React.js", "Web Applications", "Web Design"],
      icon: "layout",
    },
    {
      title: "Cloud & AI Platforms",
      subtitle: "Cloud-native, serverless & MLOps",
      skills: ["AWS S3", "Azure ML Studio", "Azure Functions", "Cloud Computing"],
      icon: "cloud",
    },
  ],
  projects: [
    {
      title: "Sistem Analisis Kesegaran Mangga Berbasis AI",
      description:
        "Sistem analisis kesegaran mangga berbasis kecerdasan buatan menggunakan metode Random Forest untuk mengklasifikasikan tingkat kesegaran buah, dikombinasikan dengan API geografis untuk mengidentifikasi lahan dengan tingkat kesuburan yang optimal. Mesin AI dibangun menggunakan Python mulai dari pengolahan citra, pelatihan model, hingga penyajian hasil prediksi.",
      tech: ["Python", "scikit-learn", "Random Forest", "OpenCV", "Geographic API"],
      image: "/project/mangga.jpeg",
      contributions: [
        {
          title: "Model Klasifikasi Kesegaran dengan Random Forest",
          detail:
            "Membangun model machine learning Random Forest untuk mengklasifikasikan tingkat kesegaran mangga (segar, mulai layu, atau busuk) berdasarkan fitur yang diekstrak dari citra buah.",
          points: [
            "Pelatihan model menggunakan scikit-learn dengan evaluasi akurasi, precision, recall, dan F1-score.",
            "Hyperparameter tuning untuk meningkatkan performa klasifikasi dan mencegah overfitting.",
          ],
        },
        {
          title: "Pipeline Pengolahan Citra (OpenCV)",
          detail:
            "Mengembangkan pipeline pengolahan citra menggunakan OpenCV untuk mengekstrak fitur visual seperti warna kulit, tekstur permukaan, dan ukuran buah sebelum dimasukkan ke model.",
          points: [
            "Segmentasi area buah untuk memisahkan latar belakang dari objek mangga.",
            "Ekstraksi fitur warna (RGB/HSV) dan tekstur sebagai masukan utama model Random Forest.",
          ],
        },
        {
          title: "Identifikasi Lahan dengan API Geografis",
          detail:
            "Mengintegrasikan API geografis untuk menganalisis kondisi lahan, sehingga sistem dapat merekomendasikan lokasi dengan tingkat kesuburan yang optimal untuk budidaya mangga.",
          points: [
            "Pengambilan data geospasial (kondisi tanah, iklim, elevasi) dari API geografis berdasarkan koordinat lahan.",
            "Penilaian kesesuaian lahan yang dikombinasikan dengan hasil prediksi kesegaran untuk rekomendasi budidaya.",
          ],
        },
        {
          title: "REST API Prediksi",
          detail:
            "Menyediakan layanan REST API yang memungkinkan pengguna mengirim citra mangga dan menerima hasil klasifikasi kesegaran beserta rekomendasi lahan.",
          points: [
            "Endpoint prediksi kesegaran dari input gambar dengan respons JSON berisi kelas, skor keyakinan, dan saran.",
            "Endpoint analisis lahan yang mengembalikan penilaian kesuburan berdasarkan koordinat geografis.",
          ],
        },
        {
          title: "Dashboard Visualisasi Hasil",
          detail:
            "Membangun antarmuka untuk menampilkan hasil prediksi kesegaran dan peta analisis lahan agar mudah dipahami pengguna.",
          points: [
            "Visualisasi distribusi hasil klasifikasi kesegaran mangga dari batch pengujian.",
            "Tampilan peta interaktif untuk hasil analisis kesuburan lahan berdasarkan lokasi.",
          ],
        },
      ],
    },
    {
      title: "FoodDash",
      description:
        "Aplikasi pesan-antar makanan. Kontribusi saya sebagai full stack developer menggunakan PHP dengan framework Laravel — dari pembuatan API dan manajemen database hingga antarmuka pengguna, termasuk fitur-fitur umum sistem e-commerce seperti katalog produk, keranjang, checkout, pembayaran, manajemen pesanan, hingga notifikasi.",
      tech: ["PHP", "Laravel", "MySQL", "Midtrans"],
      image: "/project/fooddash.png",
      contributions: [
        {
          title: "Autentikasi & Manajemen Pengguna",
          detail:
            "Sistem login dan registrasi pengguna (customer, restoran, dan admin) dengan Laravel dengan proteksi kata sandi serta manajemen profil dan alamat pengiriman.",
          points: [
            "Sesi autentikasi aman dengan Laravel Auth & middleware role untuk memisahkan hak akses customer, merchant, dan admin.",
            "Manajemen alamat pengiriman (multi-address) agar pengguna dapat menyimpan beberapa lokasi antar.",
          ],
        },
        {
          title: "Katalog Produk & Pencarian",
          detail:
            "Halaman katalog menu makanan dari berbagai restoran dengan kategori, pencarian, dan filter agar pengguna mudah menemukan makanan yang diinginkan.",
          points: [
            "CRUD menu & restoran lengkap (nama, harga, gambar, stok, kategori) dikelola oleh pihak restoran.",
            "Pencarian berdasarkan nama makanan/restoran dan filter kategori, harga, serta rating.",
          ],
        },
        {
          title: "Keranjang Belanja & Checkout",
          detail:
            "Fitur keranjang belanja yang menyimpan pilihan pengguna sebelum checkout, dilanjutkan alur checkout yang mencatat detail pesanan, alamat antar, dan metode pembayaran.",
          points: [
            "Keranjang per pengguna dengan kalkulasi subtotal, biaya pengiriman, dan total otomatis.",
            "Checkout menghasilkan kode pesanan unik dan menyimpan riwayat pesanan untuk dipantau pengguna.",
          ],
        },
        {
          title: "Pembayaran Midtrans",
          detail:
            "Integrasi payment gateway Midtrans untuk memproses pembayaran pesanan secara daring (transfer bank, e-wallet, QRIS, dan channel lainnya).",
          points: [
            "Pembuatan transaksi via Midtrans Snap API dengan status pembayaran yang diperbarui otomatis.",
            "Verifikasi callback webhook dengan signature key Midtrans agar status pesanan hanya berubah jika pembayaran benar-benar terverifikasi.",
            "Handling status pembayaran (pending, success, failure) dan pembaruan stok menu setelah transaksi sukses.",
          ],
        },
        {
          title: "Manajemen Pesanan & Status Real-Time",
          detail:
            "Alur manajemen pesanan dari diterima, diproses restoran, diantar kurir, hingga selesai — dengan pembaruan status yang terlihat pengguna secara real-time.",
          points: [
            "Pembaruan status pesanan dari pihak restoran (diterima, dimasak, siap antar, dikirim, selesai).",
            "Riwayat pesanan & detail transaksi lengkap untuk pengguna dan admin.",
          ],
        },
        {
          title: "Rating & Review",
          detail:
            "Pengguna dapat memberi rating dan ulasan terhadap restoran maupun menu setelah pesanan selesai, membantu pengguna lain memilih.",
          points: [
            "Rating bintang dan komentar per restoran/menu dengan validasi hanya untuk pesanan yang sudah selesai.",
            "Agregasi rating otomatis yang ditampilkan di katalog.",
          ],
        },
        {
          title: "Notifikasi & Dashboard Admin",
          detail:
            "Notifikasi untuk pengguna dan restoran (status pesanan, pembayaran) serta dashboard admin untuk memantau seluruh aktivitas platform.",
          points: [
            "Notifikasi in-app untuk perubahan status pesanan dan konfirmasi pembayaran.",
            "Dashboard admin dengan laporan pesanan, pendapatan, dan manajemen pengguna/restoran.",
          ],
        },
      ],
    },
    {
      title: "Sistem Payment Point Online Bank (PPOB)",
      description:
        "Sistem Payment Point Online Bank (PPOB) merupakan platform yang menyediakan layanan pembayaran tagihan dan pembelian produk digital secara daring. Sistem ini dikembangkan untuk memberikan kemudahan kepada masyarakat dalam melakukan transaksi melalui satu platform yang terintegrasi dengan berbagai penyedia layanan. Selama pelaksanaan magang, penulis berkontribusi sebagai programmer dalam pengembangan beberapa modul utama yang mendukung peningkatan performa, keamanan, dan skalabilitas sistem. Sistem ini dibangun menggunakan teknologi Node.js (Express.js) dengan Sequelize ORM sebagai backend utama yang efisien, database PostgreSQL untuk penyimpanan data yang terstruktur, serta Redis Cache untuk mempercepat respons data.",
      tech: [
        "Node.js",
        "Express.js",
        "PostgreSQL",
        "Redis",
        "Sequelize ORM",
      ],
      image: "/project/ppob.png",
      contributions: [
        {
          title: "Sistem Affiliate Marketing (Pemasaran Afiliasi Multi-Level)",
          detail:
            "Fitur pembagian komisi transaksi secara otomatis dan berjenjang hingga 5 level upline sponsor. Penulis bertanggung jawab merancang dan mengimplementasikan mekanisme pembagian komisi afiliasi secara otomatis hingga lima tingkat upline menggunakan Recursive Common Table Expression (CTE) pada PostgreSQL. Selain itu, penulis mengembangkan logika perhitungan komisi, mekanisme pembatasan keuntungan (Hard Cap), serta optimasi proses distribusi komisi agar berjalan secara efisien dan konsisten. Untuk memastikan performa tinggi dan keamanan finansial platform, fitur ini didukung oleh tiga pilar teknologi utama:",
          points: [
            "Pencarian Upline Efisien (Recursive CTE): Penelusuran jaringan sponsor tidak menggunakan perulangan kode aplikasi yang boros query (N+1 Query Problem), melainkan menggunakan perintah Recursive Common Table Expression (CTE) pada PostgreSQL. Kueri ini mampu menarik seluruh rantai upline sponsor dalam satu kali eksekusi database.",
            "Logika Pengaman Anggaran (Anti-Boncos Hard Cap): Jika akumulasi komisi yang direncanakan (cashback pembeli + koin reward + bonus 5 level upline) melampaui sisa laba transaksi yang telah dialokasikan, sistem secara otomatis menghitung semua nominal komisi kemudian dikalikan dengan rasio ini untuk mencegah kerugian saldo perusahaan.",
            "Margin Pengaman Perusahaan Dinamis (Target Profit): Sebelum komisi dibagikan, sistem mengambil hak keuntungan bersih perusahaan terlebih dahulu (companyReservedProfit). Persentase target profit ini disesuaikan secara dinamis berdasarkan coverage keuangan perusahaan; jika kondisi keuangan masuk zona waspada (rasio di bawah 50%), target profit otomatis dinaikkan 5% hingga 10% untuk menjaga arus kas.",
          ],
        },
        {
          title: "SEO (Search Engine Optimization) & Otomasi Artikel Gemini AI",
          detail:
            "Fitur ini mengintegrasikan kecerdasan buatan Google Generative AI untuk menghasilkan konten blog promosi guna meningkatkan kunjungan organik secara otomatis. Penulis mengimplementasikan integrasi Google Gemini AI untuk menghasilkan artikel secara otomatis, mengembangkan mekanisme validasi struktur SEO, serta membangun sistem pembaruan sitemap secara dinamis agar konten yang dihasilkan memenuhi standar Search Engine Optimization (SEO). Fitur ini bekerja dengan alur sebagai berikut:",
          points: [
            "Mesin Penulis Bertenaga Gemini AI: Sistem memanggil API Google Generative AI menggunakan model utama gemini-2.0-flash (dengan model cadangan gemini-2.0-flash-lite menggunakan algoritma exponential backoff jika mendeteksi rate limit 429).",
            "Audit Kualitas Semantik & SEO Otomatis: Konten HTML yang dihasilkan AI tidak langsung diterbitkan, melainkan diaudit secara real-time oleh sistem validasi internal yang mengecek keseimbangan tag HTML, kehadiran struktur tag semantik (tag H1, minimal 3 tag H2, tabel penyajian data, dan daftar berpoin <ul>/<ol>), density kata kunci fokus berkisar antara 1.0% - 4.5%, serta penulisan FAQ Schema berbasis JSON-LD (application/ld+json). Jika salah satu syarat gagal, sistem akan melakukan retry dan memberi feedback korektif ke AI.",
            "Sitemap Indeks Dinamis: Sitemap XML diperbarui secara otomatis setiap kali ada produk baru atau artikel baru yang terbit, membagi URL menjadi sub-sitemap postingan, halaman statis, kategori, produk, dan tag (yang diekstrak secara dinamis dari array JSONB PostgreSQL).",
          ],
        },
        {
          title: "Role-Based Access Control (RBAC)",
          detail:
            "Sistem manajemen hak akses diimplementasikan pada tingkat router Express.js menggunakan custom middleware untuk menyaring hak akses pengguna secara ketat. Penulis mengimplementasikan mekanisme autentikasi berbasis JSON Web Token (JWT), mengembangkan middleware Role-Based Access Control (RBAC) sebagai pengendali hak akses pengguna berdasarkan peran, serta memastikan setiap permintaan API divalidasi sesuai dengan izin akses yang dimiliki pengguna.",
          points: [
            "Pemisahan Peran yang Jelas: Hak akses dibagi menjadi peran Super Admin (kontrol penuh), Admin (manajemen operasional), Marketing (manajemen promo dan konten).",
            "Keamanan Database Modular: Konfigurasi hak akses disimpan secara modular di dalam PostgreSQL dengan pemisahan schema data yang aman. Setiap request API divalidasi ke database untuk memastikan token JWT yang digunakan memiliki izin akses (actions) yang sesuai dengan rute endpoint yang dituju.",
          ],
        },
        {
          title: "Modul Developer API & Rate Limiting",
          detail:
            "Modul ini ditujukan bagi pihak ketiga yang ingin mengintegrasikan produk digital PPOB dari platform ke dalam sistem mereka sendiri. Penulis mengembangkan modul Developer API yang meliputi implementasi autentikasi menggunakan API Key, penerapan mekanisme rate limiting berbasis Redis, serta pengamanan layanan untuk mencegah penyalahgunaan API oleh pihak ketiga.",
          points: [
            "Autentikasi API Key: Setiap pihak ketiga dibekali API Key terenkripsi SHA-256 yang divalidasi di setiap header request API.",
            "Proteksi Abuse via Redis Rate Limiter: Untuk mencegah serangan banjir request (Denial of Service) dan penyalahgunaan kuota vendor, modul ini dilengkapi pembatasan rate limit request harian yang dikonfigurasi secara dinamis. Status hit dihitung secara real-time memanfaatkan penyimpanan cepat memori Redis (Redis In-Memory Key-Value Storage).",
          ],
        },
        {
          title: "Integrasi Supplier API (Real-Time Sync)",
          detail:
            "Untuk pemrosesan penyediaan produk digital, sistem terhubung langsung ke dua API eksternal berskala nasional. Penulis mengintegrasikan sistem dengan Digiflazz API untuk memperoleh data produk secara real-time, memproses transaksi produk digital, serta mengembangkan mekanisme sinkronisasi harga dan validasi transaksi agar proses pembelian berjalan secara aman dan andal.",
          points: [
            "Supplier API Digiflazz: Terintegrasi secara real-time untuk melakukan transaksi pembelian produk digital (pulsa, token, kuota) menggunakan tanda tangan transaksi MD5 (username + apiKey + refId).",
            "Double Disk Caching & Single SKU Inquiry: Untuk mencegah kegagalan request akibat limit kuota hit harian Digiflazz, daftar harga prepaid dan postpaid disimpan dalam cache lokal berbasis file JSON dengan masa aktif (TTL) 30 menit. Sebelum transaksi dieksekusi, sistem melakukan pengecekan harga real-time per satu item (Single SKU Inquiry) untuk mencocokkan harga guna menghindari kerugian akibat perubahan harga modal sepihak dari supplier.",
          ],
        },
      ],
    },
    {
      title: "UangKu — Family Finance Management",
      description:
        "UangKu adalah platform manajemen keuangan berbasis keluarga (family finance management) yang dikembangkan untuk membantu setiap keluarga mengelola pendapatan, pengeluaran, anggaran bulanan, target menabung, dan cicilan utang secara transparan dan kolaboratif. Sistem ini dibangun dengan arsitektur modern berkinerja tinggi menggunakan bahasa pemrograman Golang dengan Gin Framework pada backend, database PostgreSQL untuk persistensi data relasional terstruktur, serta React.js pada frontend untuk menyediakan antarmuka pengguna (User Interface) yang interaktif, responsif, dan dinamis. Penulis berkontribusi secara langsung pada implementasi beberapa modul utama yang mencakup autentikasi, manajemen transaksi keuangan, integrasi kecerdasan buatan, pemrosesan OCR, sistem pembayaran, serta optimasi basis data.",
      tech: ["Golang", "Gin Framework", "PostgreSQL", "React.js", "Node.js"],
      image: "/project/uangku.png",
      contributions: [
        {
          title: "Arsitektur Multi-Tenant per Keluarga (Family ID Data Isolation)",
          detail:
            "Penulis mengimplementasikan mekanisme autentikasi berbasis JSON Web Token (JWT), mengembangkan middleware multi-tenant untuk mengisolasi data setiap keluarga berdasarkan family_id, serta membangun mekanisme validasi status langganan dan hak akses pengguna agar setiap permintaan hanya dapat mengakses data sesuai ruang lingkup keluarganya.",
          points: [
            "JWT Token Payload Isolation: Autentikasi JWT dikonfigurasi secara ketat untuk menyematkan klaim family_id dan family_role di dalam token, memastikan seluruh operasi query database tersaring otomatis berdasarkan ruang lingkup keluarga masing-masing (data tenant isolation).",
            "Dynamic Tenant Middleware: Menggunakan TenantMiddleware pada framework Gin untuk memvalidasi status berlangganan keluarga secara real-time. Jika status keluarga dinilai expired atau blocked oleh admin, akses data akan langsung ditolak (aborted).",
            "Legacy Trial Auto-Recovery: Middleware memiliki logika penanganan kompatibilitas akun lama (legacy compatibility) yang mendeteksi jika masa trial tidak terisi di database, kemudian mengisinya secara otomatis dengan durasi 7 hari sejak akun dibuat dan memperbaruinya secara otomatis ke database.",
            "Super Admin Bypass: Menyediakan pintu bypass otorisasi khusus untuk peran super_admin dalam mengelola parameter sistem secara global tanpa terhambat validasi id keluarga.",
          ],
        },
        {
          title: "Manajemen Multi-Wallet & Reversal Transaksi Atomik",
          detail:
            "Penulis mengembangkan modul pengelolaan multi-wallet yang mendukung berbagai sumber dana dalam satu keluarga, mengimplementasikan mekanisme transaksi atomik menggunakan GORM Transaction dan Row Locking, serta memastikan konsistensi saldo ketika terjadi transaksi secara bersamaan (concurrent transaction).",
          points: [
            "Pengelolaan Beragam Sumber Dana: Sistem memungkinkan satu keluarga memiliki dan memantau beberapa jenis dompet secara paralel (seperti Rekening Utama, Tabungan, dan Dompet Tunai).",
            "GORM Row Locking untuk Integritas Saldo: Proses pembaruan saldo dompet diproteksi oleh mekanisme transaksi GORM dengan row locking tingkat database untuk menghindari kondisi balapan (race condition) ketika beberapa anggota keluarga mencatat pengeluaran secara bersamaan.",
            "Sistem Reversal Transaksi Atomik: Ketika transaksi dihapus atau diperbarui, sistem menjalankan prosedur pembalikan saldo secara otomatis. Nominal transaksi dikembalikan ke dompet asal, dialokasikan ulang dari target tabungan, atau dikurangkan dari cicilan utang secara atomik untuk menjamin konsistensi data finansial.",
          ],
        },
        {
          title: "AI Financial Coach & Framework Perilaku 3D (OpenAI Integration)",
          detail:
            "Penulis mengembangkan logika analisis perilaku keuangan pengguna berdasarkan riwayat transaksi, mengintegrasikan layanan OpenAI untuk menghasilkan rekomendasi finansial yang bersifat personal, serta mengimplementasikan algoritma deteksi kebocoran keuangan (Leak Detection Engine) untuk mengidentifikasi pola pengeluaran yang tidak efisien.",
          points: [
            "Behavioral Persona Framework 3D: Fitur AI Coach melakukan klasifikasi psikologi finansial pengguna berdasarkan tiga parameter data: Sumbu X untuk Discipline (diukur dari Savings Rate), Sumbu Y untuk Spending Nature (rasio pengeluaran keinginan terhadap kebutuhan), dan Sumbu Z untuk Consistency (dilihat dari stabilitas saldo). Kombinasi ini melahirkan gelar perilaku unik seperti Structured Essentialist - Steady atau Adaptive Experiential - Dynamic.",
            "Mesin Deteksi Kebocoran Finansial (Leak Detection Engine): Sistem secara terprogram mendeteksi anomali pengeluaran (misalnya, jika biaya Makanan mencapai >25% total pengeluaran bulanan saat tingkat tabungan rendah).",
          ],
        },
        {
          title: "OCR Struk Belanja Hibrida (Bilingual Tesseract OCR)",
          detail:
            "Penulis mengembangkan layanan OCR berbasis Node.js menggunakan Tesseract OCR untuk mengekstraksi informasi dari struk belanja, serta mengimplementasikan parser berbasis Regular Expression (Regex) pada backend Golang guna mengidentifikasi nama merchant, nominal transaksi, dan tanggal transaksi secara otomatis.",
          points: [
            "Microservice OCR Terpisah: Mengembangkan microservice berbasis Node.js yang menjalankan engine Tesseract OCR (tesseract.js) pada port 3002 dengan worker persisten dwibahasa (ind+eng) untuk mengekstrak data dari struk belanja fisik berukuran hingga 10MB dengan latensi rendah.",
            "Ekstraksi Informasi Regex (LocalOCRProvider): Output teks dari Tesseract diproses di Go backend menggunakan parser berbasis ekspresi reguler (Regex) untuk menyaring nama merchant (dengan pengecualian kata kunci operasional kasir), nominal total belanja (mendukung penulisan mata uang Rp, USD, $, serta pemisah desimal koma/titik), dan ekstraksi tanggal (mendukung format ISO, DD-MM-YYYY, serta konversi nama bulan berbahasa Indonesia).",
          ],
        },
        {
          title: "Budget Planning Berbasis Alokasi 50/30/10/10 & WhatsApp Alerting",
          detail:
            "Penulis mengimplementasikan mekanisme pembentukan kategori anggaran secara otomatis (Auto-Seeding Budget), mengembangkan logika pengalokasian anggaran berdasarkan metode 50/30/10/10, serta mengintegrasikan notifikasi WhatsApp melalui API Fonnte sebagai pengingat ketika anggaran mendekati atau melampaui batas yang ditentukan.",
          points: [
            "Auto-Seeding Anggaran Keluarga: Saat pertama kali keluarga mendaftarkan akun, sistem memicu fungsi seedMissingBudgets yang berguna untuk membuat kategori anggaran default berbasis aturan populer 50% Kebutuhan, 30% Keinginan, 10% Tabungan, dan 10% Dana Darurat.",
            "Indonesian Household Context Budgeting: Pembagian kategori disesuaikan dengan profil konsumsi keluarga Indonesia (seperti Makanan & Dapur, Tagihan Rumah, Pendidikan, Transportasi, Kesehatan, Zakat & Sedekah, serta Hiburan).",
            "WhatsApp Alert Integration: Ketika pengeluaran keluarga mencatat transaksi baru, diubah, atau mendekati batas limit anggaran bulanan, sistem memicu pengiriman notifikasi instan secara asynchronous melalui integrasi API WhatsApp Fonnte dan in-app notification.",
          ],
        },
        {
          title: "Modul Debt & Saving Goals Terintegrasi dengan Konversi Aset",
          detail:
            "Penulis mengembangkan mekanisme pengelolaan utang dan target tabungan, termasuk logika pembayaran cicilan dinamis (Dynamic Cycle Advancement), perhitungan denda keterlambatan secara otomatis, serta fitur konversi target tabungan menjadi aset ketika tujuan keuangan telah tercapai.",
          points: [
            "Dynamic Cycle Advancement (Cicilan Dinamis): Pada modul utang (debt_service.go), sistem secara dinamis mendeteksi pembayaran lebih awal (overpayment). Sisa pembayaran berlebih secara otomatis diakumulasikan ke siklus berikutnya dan memajukan tanggal jatuh tempo cicilan secara otomatis (NextInstallmentDueDate).",
            "H+1 Overdue Penalty Engine: Sistem secara otomatis menghitung denda keterlambatan jika tanggal hari ini telah melewati batas jatuh tempo (H+1) dan total bayar cicilan bulanan belum terpenuhi. Denda akan secara otomatis menambahkan sisa utang dan memicu rekaman denda (DebtPenalty) serta notifikasi peringatan.",
            "Konversi Goal ke Aset Riil: Ketika target tabungan (Saving Goals) telah terpenuhi 100%, sistem menyediakan fungsi ConvertToAsset yang secara otomatis memindahkan dana tabungan tersebut menjadi catatan aset keluarga (likuid maupun non-likuid) dan menutup status target menabung menjadi converted.",
          ],
        },
        {
          title: "Payment Gateway TriPay untuk Langganan Premium",
          detail:
            "Penulis mengintegrasikan sistem dengan TriPay Payment Gateway untuk mendukung proses pembayaran langganan premium, mengimplementasikan validasi callback menggunakan tanda tangan digital HMAC-SHA256, serta mengembangkan mekanisme aktivasi paket premium secara otomatis setelah pembayaran berhasil diverifikasi.",
          points: [
            "Pembayaran Otomatis: Integrasi API TriPay untuk pembelian paket berlangganan premium keluarga guna memperbanyak slot anggota dan kapasitas dompet multi-wallet.",
            "Presisi Kalkulasi Customer Fee: Sistem menerapkan rumus pembagian biaya transaksi jika dibebankan ke pembeli secara akurat: Charge = (Price + Flat) / (1 - Percent/100).",
            "Keamanan Callback Signature HMAC-SHA256: Callback dari server TriPay diverifikasi menggunakan tanda tangan digital HMAC-SHA256 berdasarkan private key merchant sebelum mengaktifkan durasi paket premium secara otomatis di database.",
          ],
        },
        {
          title: "Partisi Tabel Database Dinamis (SAS Method Partitioning)",
          detail:
            "Penulis mengimplementasikan mekanisme partisi tabel (PostgreSQL Range Partitioning) untuk meningkatkan skalabilitas basis data, mengembangkan worker pembentukan partisi secara otomatis, serta melakukan optimasi indeks agar proses pencarian dan pelaporan transaksi tetap memiliki performa tinggi meskipun jumlah data terus bertambah.",
          points: [
            "PostgreSQL Range Partitioning: Untuk mengantisipasi penurunan performa basis data akibat pencatatan jutaan transaksi dari ribuan keluarga, tabel transactions dipisah menggunakan partisi bulanan (transactions_YYYY_MM).",
            "Worker & JIT Partition Maker: Pembuatan tabel partisi dilakukan pre-emptive setiap bulan oleh daemon worker partition_worker.go maupun secara dinamis menggunakan fungsi EnsurePartitionForDate ketika ada transaksi masuk dengan tanggal di luar partisi aktif.",
            "Optimasi Kueri Indeks (Anti-Kejebol): Dilengkapi dengan indeks komposit (idx_transactions_performance_v4 dan idx_transactions_category_agg) pada tabel partisi utama untuk mempercepat query statistik finansial dan pencarian transaksi di bawah 500 ms.",
          ],
        },
      ],
    },
  ],
  certificates: [
    {
      title: "Sertifikat Magang — Programmer (Intern)",
      issuer: "PT Aplikasi Dagang Teknologi",
      year: "2026",
      image: "/sertifikat/sertifikat_magang_pt_adt.jpeg",
    },
    {
      title: "Sertifikat Kompetensi (UKK) — Teknik Komputer dan Jaringan",
      issuer: "Cisco Networking Academy",
      year: "2022",
      image: "/sertifikat/sertifikat_cisco_ukk.jpeg",
    },
    {
      title: "Techcomfest Web Application Competition",
      issuer: "Techcomfest — Politeknik Negeri Indramayu",
      year: "2026",
      image: "/sertifikat/techcomfest-2026.jpeg",
    },
    {
      title: "AI Ready ASEAN",
      issuer: "ASEAN Foundation",
      year: "2026",
      image: "/sertifikat/ai-ready-asean.jpeg",
    },
    {
      title: "Advanced SQL",
      issuer: "Kaggle",
      year: "2026",
      image: "/sertifikat/kaggle-advanced-sql.png",
    },
    {
      title: "Intro to Machine Learning",
      issuer: "Kaggle",
      year: "2026",
      image: "/sertifikat/kaggle-intro-to-machine-learning.png",
    },
    {
      title: "Intro to Programming",
      issuer: "Kaggle",
      year: "2026",
      image: "/sertifikat/kaggle-intro-to-programming.png",
    },
    {
      title: "Intro to SQL",
      issuer: "Kaggle",
      year: "2026",
      image: "/sertifikat/kaggle-intro-to-sql.png",
    },
    {
      title: "Pandas",
      issuer: "Kaggle",
      year: "2026",
      image: "/sertifikat/kaggle-pandas.png",
    },
    {
      title: "Python",
      issuer: "Kaggle",
      year: "2026",
      image: "/sertifikat/kaggle-python.png",
    },
    {
      title: "AWS S3 Basics",
      issuer: "Coursera Guided Project",
      year: "2026",
      image: "/sertifikat/thumbs/AWS-S3-Basics.png",
    },
    {
      title: "Azure: create a REST API using NodeJS Serverless Functions",
      issuer: "Coursera Guided Project",
      year: "2026",
      image:
        "/sertifikat/thumbs/Azure-create-a-REST-API-using-NodeJS-Serverless-Functions.png",
    },
    {
      title: "Build a computer vision app with Azure Cognitive Services",
      issuer: "Coursera Guided Project — Microsoft",
      year: "2026",
      image:
        "/sertifikat/thumbs/Build-a-computer-vision-app-with-Azure-Cognitive-Services.png",
    },
    {
      title: "Build a free website with WordPress",
      issuer: "Coursera Guided Project",
      year: "2026",
      image: "/sertifikat/thumbs/Build-a-free-website-with-WordPress.png",
    },
    {
      title: "Build a mobile app with Google Sheets on Glide and no coding",
      issuer: "Coursera Guided Project",
      year: "2026",
      image:
        "/sertifikat/thumbs/Build-a-mobile-app-with-Google-Sheets-on-Glide-and-no-coding.png",
    },
    {
      title: "Business Analysis & Process Management",
      issuer: "Coursera Guided Project",
      year: "2026",
      image: "/sertifikat/thumbs/Business-Analysis-Process-Management.png",
    },
    {
      title: "Create a Financial Statement using Microsoft Excel",
      issuer: "Coursera Guided Project",
      year: "2026",
      image:
        "/sertifikat/thumbs/Create-a-Financial-Statement-using-Microsoft-Excel.png",
    },
    {
      title: "Create a Lead Generation Messenger Chatbot using Chatfuel",
      issuer: "Coursera Guided Project",
      year: "2026",
      image:
        "/sertifikat/thumbs/Create-a-Lead-Generation-Messenger-Chatbot-using-Chatfuel.png",
    },
    {
      title: "Create your e-commerce store with Shopify",
      issuer: "Coursera Guided Project",
      year: "2026",
      image: "/sertifikat/thumbs/Create-your-e-commerce-store-with-Shopify.png",
    },
    {
      title: "Create Your First Python Program From UST",
      issuer: "Coursera Guided Project",
      year: "2026",
      image: "/sertifikat/thumbs/Create-Your-First-Python-Program-From-UST.png",
    },
    {
      title: "Creating a Budget with Microsoft Excel",
      issuer: "Coursera Guided Project",
      year: "2026",
      image: "/sertifikat/thumbs/Creating-a-Budget-with-Microsoft-Excel.png",
    },
    {
      title: "Discounted Cash Flow Modeling",
      issuer: "Coursera Guided Project",
      year: "2026",
      image: "/sertifikat/thumbs/Discounted-Cash-Flow-Modeling.png",
    },
    {
      title: "Getting Started in Google Analytics",
      issuer: "Coursera Guided Project",
      year: "2026",
      image: "/sertifikat/thumbs/Getting-Started-in-Google-Analytics.png",
    },
    {
      title: "Google Ads for Beginners",
      issuer: "Coursera Guided Project",
      year: "2026",
      image: "/sertifikat/thumbs/Google-Ads-for-Beginners.png",
    },
    {
      title: "How to Use Lookup Reference Math and Text Functions in Excel",
      issuer: "Coursera Guided Project",
      year: "2026",
      image:
        "/sertifikat/thumbs/How-to-Use-Lookup-Reference-Math-and-Text-Functions-in-Excel.png",
    },
    {
      title: "Introduction to Business Analysis Using Spreadsheets: Basics",
      issuer: "Coursera Guided Project",
      year: "2026",
      image:
        "/sertifikat/thumbs/Introduction-to-Business-Analysis-Using-Spreadsheets-Basics.png",
    },
    {
      title: "Introduction to CRM with HubSpot",
      issuer: "Coursera Guided Project",
      year: "2026",
      image: "/sertifikat/thumbs/Introduction-to-CRM-with-HubSpot.png",
    },
    {
      title: "Introduction to Project Management with ClickUp",
      issuer: "Coursera Guided Project",
      year: "2026",
      image:
        "/sertifikat/thumbs/Introduction-to-Project-Management-with-ClickUp.png",
    },
    {
      title: "Machine Learning Pipelines with Azure ML Studio",
      issuer: "Coursera Guided Project",
      year: "2026",
      image:
        "/sertifikat/thumbs/Machine-Learning-Pipelines-with-Azure-ML-Studio.png",
    },
    {
      title: "Search Engine Optimization (SEO) with Squarespace",
      issuer: "Coursera Guided Project",
      year: "2026",
      image: "/sertifikat/thumbs/Search-Engine-Optimization-SEO-with.png",
    },
    {
      title: "Use Canva to Design Digital Course Collateral",
      issuer: "Coursera Guided Project",
      year: "2026",
      image: "/sertifikat/thumbs/Use-Canva-to-Design-Digital-Course-Collateral.png",
    },
    {
      title: "Working with BigQuery",
      issuer: "Coursera Guided Project",
      year: "2026",
      image: "/sertifikat/thumbs/Working-with-BigQuery.png",
    },
  ],
  experience: {
    role: "Programmer (Intern)",
    company: "PT Aplikasi Dagang Teknologi",
    duration: "Jan 2026 - Jun 2026",
    points: [
      "Mengembangkan dan memelihara fitur untuk produk pembayaran dan keuangan.",
      "Berkolaborasi dengan engineer di tim frontend (React) dan backend (Go).",
      "Meningkatkan performa API dan efisiensi query database.",
    ],
  },
  organizations: [
    {
      role: "Ketua Pelaksana",
      organization:
        "Himpunan Mahasiswa Program Studi Rekayasa Perangkat Lunak Politeknik Negeri Indramayu (HIMARPL)",
      duration: "Jun 2025 · 1 bulan",
      description:
        "Menjadi Ketua Pelaksana Program P3M untuk masyarakat.",
    },
    {
      role: "Sekretaris Sub-Divisi Eksternal",
      organization:
        "Himpunan Mahasiswa Program Studi Rekayasa Perangkat Lunak Politeknik Negeri Indramayu (HIMARPL)",
      duration: "Okt 2024 – Feb 2025",
    },
    {
      role: "Staf Muda",
      organization:
        "BEM Politeknik Negeri Indramayu Kabinet Narayana — Hubungan Internal",
      duration: "Jun 2023 – Jun 2024",
    },
  ],
};