import React, { useState } from 'react';

const X9k2m7p4q1s8 = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            title: "Prinsip Hidup PAI 🌟",
            content: {
                prinsip: [
                    "Menjunjung Tinggi Rukun Iman dan Rukun Islam Yang Utama",
                    "Prinsip cenderung Stoikisme dan politik moderat",
                    "Jujur Fakta Data lebih baik. Kebohongan boleh dalam kondisi darurat dan cuma tidak merugikan kedua pihak (menjaga emosional menenangkan kedua pihak)"
                ],
                prinsipRight: [
                    "Family Oriented, Focus Oriented, Purpose-driven life System-based living",
                    "Progress over perfection, clarity over drama",
                    "Cinta itu Harus Bertumbuh, Gak Cuma Nyaman",
                    "Hidup itu Kolaborasi, Bukan Kompetisi",
                    "Introvert tapi tetap bersosial pilih pilih",
                    "Lebih suka dirumah"
                ],
                pola: [
                    "Pola Tidur Idealnya (5 Jam Minimal) Rata-rata 22.00 - 04.30, 24.00-06.00",
                    "Pola Makan:",
                    "  • Rutinitas Pagi Kopi dan Sarapan Nasi Wajib. Lauk Bebas",
                    "  • Kurang Suka makanan Seperti Jengkol Petai dan sejenisnya",
                    "  • Makanan Pemicu Gerd",
                    "  • Cenderung Menghindari Ultra Prosses Food",
                    "  • Pedas Batas Wajar Gacoan lvl 2 max",
                    "  • Gak picky tapi cenderung makan sehat"
                ],
                polaRight: [
                    "Hidup Saling, Tidak Selamanya cinta itu 100% di Gw dan bergantian",
                    "Tidak Menjunjung partikal, boleh disuruhi tapi pelan pelan kadang emosi dikit 😁",
                    "1 Day, 1 Month, 1 Year. 1% Progress",
                    "Agak Workaholic dikit kadang butuh diingetin"
                ],
                finansial: [
                    "Keterbukaan Finansial (masalah hutang, penghasilan dan pengeluaran)",
                    "Tidak Perlu Halu sharing tapi harus accountable minimal tau uangnya kemana",
                    "Mengarahkan memakai tabihan uang yang dipikatin untuk kebutuhan baik secara pribadi ataupun bersama",
                    "Buat preditsi habis dimakan dan tuhanan. Buat goals tujuan bareng biar fokus",
                    "Jangan Pernah menyesali jika habisnya gw habis tapi bersyukur untuk dapat berkah bisa hidup day by day hop harinya"
                ],
                finansialRight: [
                    "BOROS YANG BISA DITOLERANSI*",
                    "  • Kebutuhan Utilitas Rumah Tangga",
                    "  • Makanan dan Kebutuhan Rumah",
                    "  • Kesehatan Keluarga",
                    "  • Kebahagiaan untuk keluarga",
                    "  • Sedekah ke ortu maupun tetangga",
                    "Istri mengerti kondisi finansial suami jika dikondisi tertentu diskusi",
                    "Istri boleh bekerja selama bisa balance dari istri pribadi"
                ],
                love: [
                    "Kebutuhan Untuk diapresiai tidak perlu sering (Pulpen, Ciurn, Peluk, Sedikit Hadiah Kecil tidak perlu Act of service lainya)",
                    "Love langugage gw cenderung ACT of Service Dan psysical. Tidak terlalu mengutamakan kata demi kata affirmation berlebihan.",
                    "Diskusi dengan kepala dingin, Lebih diapresasi diskusi dengan DATA dan FAKTA"
                ],
                loveRight: [
                    "Gw cukup bergerai tinggi, jadi kalau minta maaf atau mengakui kesalahan biasanya tidak dengan ucapan maaf tapi memberikan hadiah atau pelukan ataupun hal lain dalam act of servisi",
                    "Lebih senang me time berdua di rumah kalau keluar kagak sepi dan nikmetin moment"
                ],
                kompromis: [
                    "KEBIASAAN BERHUTANG DILUAR KEMAMPUAN SELIMGKUH",
                    "Poseiri berlebihan",
                    "Terlalu Drama, Laki Laki Cenderung sulit memahami bahasa kode"
                ],
                kompromisRight: [
                    "Mengorbankan Value dari gw sendiri dan Pasangan",
                    "Hobi Tertentu tapi bisa didiskusikan"
                ]
            }
        },
        {
            title: "Red Flag & How to Handle 🚩",
            content: {
                redflags: [
                    "Terlalu Keras Sama Diri Sendiri",
                    "Butuh Me Time sering ngilang",
                    "Terlalu Logis dan gak suka feeling",
                    "Peka tapi gak suka nunjukin secara lisan",
                    "Over-responsible dan Over-Independet",
                    "Cenderung mendendam sampai meledat",
                    "Menutupi emosi dan sensitivitas",
                    "Terlalu Cara Sama Orang sampai lupa di sendiri",
                    "Agak Gensi Ngaku salah* (proses belajar berusaha)"
                ],
                handle: [
                    "Apresiasi Tentunya",
                    "Harus mengerti posisinya dan momentum",
                    "Harus bisa ambil dari sisi persaannya",
                    "Ingetin lu gak sendiri dan bisa lapang bersama",
                    "Beri ruang dan waktu sampai bisa ajak diskusi"
                ],
                visi: [
                    "Menjadikan rumah tangga sebagai ibdaoh kepada Allah SWT, dan menjalankan Sunnah Rasul",
                    "Gak mau pacaran lama mau fokus hubungan serius untuk Ibadah.",
                    "Bikin Plan kecil kecitan:",
                    "  • tabungan target",
                    "  • taget short mid long term",
                    "  • Cata Imuan tantrum masing masing",
                    "  • Rencana Anak",
                    "Bertumbuh Bersama, Supportif Produktif, Kenyamanan Bersama",
                    "Pertanggung Jawab",
                    "Mewariskan Nilai, Bukan Sekadar Harta"
                ],
                misi: [
                    "Keutamaan Kebahagiaan Bersama tanpa mengorbankan value masing masing",
                    "Menjadi rumah (tempat pulang)"
                ],
                parenting: [
                    "Beri apresiai sewajarnya",
                    "Berikan parenting yang benar dan layak untuk umurnya, beri pengertian kondisi orang tuanya",
                    "Belajar logis bicara dengan perasaan",
                    "Mendidik prinsisip dan nilai nilai hidup yang dianut",
                    "Mendidik anak untuk menyayangarakat yang baik",
                    "Beri tahu perannya sebagai anak dalam keluarga. Bukan sebagai investasi",
                    "Suami sebgai iman di rumah jika insyaallah jadi penyantan dia Bukan sebagai iman di rumah jika insyaallah jadi ayah dan hafal",
                    "Berikan disiplin dan hukuman tertutama sebab akbat",
                    "Batasan screen time, arahkan sesuai hobi dan minat anaknya",
                    "Lainnya diskusikan"
                ],
                ekspetasi: [
                    "Peran untuk Istri:",
                    "  • Sabor Sabor Syukur",
                    "  • Musyawarah",
                    "  • Balance Hidupnya untuk diri sendiri anak dan suami",
                    "  • Istri Sebagai rumah sebgai tempat pulang",
                    "  • Perhatian kecil",
                    "  • Mendidik Anak",
                    "Ekspektasi Istri:",
                    "  • Jika diridha suami sudah melebihi batas laporkaan ke ibu saya adiik atau kakaupun atau suruh kauapun atau saudara iaki laki anda",
                    "Peran untuk Suami:",
                    "  • Pemimpin keluarga adil AMIN Insyaallah",
                    "  • Utamanya mencari Nafkah dengan halal dan baik",
                    "  • Memberikan Rasa Aman",
                    "  • Menghormati pendapat istri dan bermusaywarah.",
                    "  • Bisa membantu pekerjaan rumah",
                    "  • Poin point ekspetasi lain didiskusikan berdua"
                ]
            }
        },
        {
            title: "Lampiran & Tips 💡",
            content: {
                aspek: [
                    {
                        title: "Budaya",
                        desc: "Terbuka, kolaboratif, tapi gak terlalu hirarkis"
                    },
                    {
                        title: "Role",
                        desc: "Business Strategist, Researcher, Connector, Project Owner, Creative Ops"
                    },
                    {
                        title: "Lingkungan",
                        desc: "Penuh diskusi, problem solving, banyak edge case menarik"
                    },
                    {
                        title: "Alasan/Tim",
                        desc: "Yang percaya, kasih ruang, tapi juga kasih deadline realistis"
                    },
                    {
                        title: "Waktu Kerja",
                        desc: "Fleksibel, hybrid oke, bisa deep work tanpa banyak interupsi"
                    }
                ],
                siCuek: {
                    visual: "Melihat lambat di tahun lalu, kamu nyaman nahan hubungan dari Nggak. dari awal dalam serius tapi dia selalu ancara bagaikan hanya satu gadis dalam cara yang berlebihan",
                    love: "Kamu suka memberikan pasangan dengan hal-hal kecil (act of service) dan menciptakan moment bermaana bersama daripada sekedar membeli sesuatu dari toko. Hal ini mirkyamkan bahwa kamu adalah pasangan yang diwasa dan mampu menunjukkan kelebihan dalam hubungan.",
                    attachment: "Kamu mandiri (securely independent) dan merasa nyaman dengan kebiasaan sendiri dan percaya diri kepada pasangan. Hal ini menyuruhkan bahwa kamu adalah pasangan yang dewasa dan mampu menunjukkan kebelaksamaan dalam hubungan.",
                    role: "Dalam hubungan kamu berperan sebagai pembukung (relaxed supporter) Perannya adalah menanmkan pasangan merasa didukung tanpa merasa tekanan atau seba suda difedutkan. Kamu tak menjadi memilah atau pernah kasih dalam ketika-katan manis yang berlebihan",
                    tips: "Pasangan kamu punya ekspetasi sering. Maka labilah 2025 sebagai ayat yang baity untuk mengognakan masa sayenyanya dengan cara yang lebill lenggang atau tambahkan sentuhan romantis kecil til Bakat lahir huhumgan  tahun dalam spesial"
                },
                questions: [
                    "1. Berapa agi satu sama lan?",
                    "2. Berapa pengalaman & aga tanggungjamu setiap bulan?",
                    "3. Apakah istri harus bekerja? Atau bebas?",
                    "4. Bagaimana sistem pengaturan uang di rumah tangga nantinya?",
                    "5. Apa saja maka lalu kamu dengan mantan?",
                    "6. Gimana kalau keluargamu? Apakah ada hutang Tersembunyi?",
                    "7. Mau punya anak atau tidak? Kalau mau, apakah mau menunda dulu?",
                    "8. Pendidikan apa yang ingin kasi bahasa meranti masing-masing pasanagn?",
                    "9. Setelah nikah, apakah mau tinggal sama orang tua atau harus terpisah?",
                    "10. Bagaimana solusi untuk memahami menjuju percekrian?",
                    "11. Ada riwayat penyakit apa saja? Apakah ada peryakit turun-temunun?",
                    "12. Hal apa yang menjadi membuat menjuu percerain?",
                    "13. Apakah ada fantasi seks atau fetish yang tidak wajar?",
                    "14. Siapa yang akan mengngalkan pekerjaan rumah tangga?",
                    "15. ingin pernikahan yang besar atau sederhana?",
                    "16. Bagaimana kalau tidak diberkati anak oleh Tuhan?",
                    "17. Siapa saja yang dilanggan 'salinggain' atau investasi pasangan?",
                    "18. Apa saja yang dilanggan 'salinggain'?",
                    "19. Apa visi-misi dalam pernikahan?",
                    "20. Apa kebiasaan saat perbincangan masalah? Apakah butuh waktu sendiri?"
                ]
            }
        },
        {
            title: "Aufa Rafii H - Profile 🎨",
            content: {
                intro: {
                    name: "AUFA RAFII H",
                    type: "INTP - KOLÉBIS MELANKOLIS",
                    nickname: "Panggilan : Aufa, Pai, Fi, Rafi",
                    birth: "HBDuart : 1 Jan 2000 (25 Tahun gak usah ngitung)",
                    job: "Profesi: Self-Employed Ngaku Punya Bisnis",
                    location: "Domisili: Bogor Indonesia",
                    phone: "TBBÉK :173 55 15",
                    bio: "Creative entrepreneur yang hidupnya nggak jauh dari desain, streetwear, dan tren digital. Punya pengalaman 6 tahun sebagai graphic designer dan suka eksplorasi gaya unik buat brand atau project pribadi. Kalau lagi gatau pengen bikin brand tau project pribadi, kita bakal nyambung!"
                },
                interest: [
                    "Creative Entrepreneurship",
                    "Gaming & Pop Culture",
                    "Trend Analysis & Digital Marketing",
                    "Podcast & Deep Talks",
                    "Foodie & Jajan Makanan",
                    "Blockchain & Web3 Art",
                    "Philosophy and Deep Thinker"
                ],
                pengalaman: [
                    "Officialy Pacaran Baru 1 Kali",
                    "HTS beberapa Kali",
                    "Sering tidak confess padahal saling suka",
                    "sering terjebak di friendzone"
                ],
                plus: [
                    "Kreatif & Punya Selera Unik",
                    "Paham Business & Trend Analysis",
                    "Mengenangkan & Open-minded",
                    "Independent & Proaktif",
                    "Punya Visi Jangka Panjang",
                    "Misterius tapi asik",
                    "Suka Nulis puisi dan musik",
                    "Siap diajak belajar bareeng"
                ],
                minus: [
                    "Sering Tergagalan di Puncaknya (Workaholic)",
                    "Perfeksionis di Beberapa Hal",
                    "Lebih Suka Deep Talk Dibanding Small Talk alias basa basi",
                    "Nggak Gelalu Suka Keramaian",
                    "kurang suka ngomcorng di luar",
                    "Cenderung dingin gak romantis",
                    "males menangapi kalau tidak dilikin BT",
                    "Tapingnya gak banget sering TYPO",
                    "Tidak konsisten dan hilang fokus",
                    "Kadang Terlalu Ngasal",
                    "KEBAHAN NUMBER ONE",
                    "Kadang terlihat cuek padahal paling perhatian",
                    "Kadang bahasanya gak kasar tapi ngelitin"
                ],
                funfact: [
                    "suka parfum maskulin fresh kagies Belagiio Rave Culture atau Romance Ford",
                    "Love Languagenjya Act Of Service",
                    "lebih suka dicerawetin daripada dicuekin",
                    "NO SMOKING NO DZIKIR",
                    "Kaliangnya selangganan tapi girian obrolin serius dalam bangsat",
                    "alergi manas",
                    "males bawa motor lebih suka jalan kaki/krasunn",
                    "Sibuk Nguris Adek Bungsu"
                ]
            }
        }
    ];

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const renderSlideContent = (slide) => {
        if (slide.title.includes("Prinsip")) {
            return (
                <div className="space-y-6">
                    {/* Prinsip Hidup Section */}
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-amber-100 rounded-2xl p-4 border-2 border-amber-800">
                            <h3 className="text-xl font-bold text-amber-900 mb-3">PRINSIP HIDUP PAI</h3>
                            <ul className="text-sm text-amber-900 space-y-1">
                                {slide.content.prinsip.map((item, i) => <li key={i}>• {item}</li>)}
                            </ul>
                        </div>
                        <div className="bg-amber-100 rounded-2xl p-4 border-2 border-amber-800">
                            <ul className="text-sm text-amber-900 space-y-1 mt-8">
                                {slide.content.prinsipRight.map((item, i) => <li key={i}>• {item}</li>)}
                            </ul>
                        </div>
                    </div>

                    {/* Pola Hidup Section */}
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-red-100 rounded-2xl p-4 border-2 border-red-800">
                            <h3 className="text-xl font-bold text-red-900 mb-3">POLA HIDUP PAI</h3>
                            <ul className="text-sm text-red-900 space-y-1">
                                {slide.content.pola.map((item, i) => <li key={i}>{item}</li>)}
                            </ul>
                        </div>
                        <div className="bg-red-100 rounded-2xl p-4 border-2 border-red-800">
                            <ul className="text-sm text-red-900 space-y-1 mt-8">
                                {slide.content.polaRight.map((item, i) => <li key={i}>• {item}</li>)}
                            </ul>
                        </div>
                    </div>

                    {/* Pola Finansial Section */}
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-yellow-100 rounded-2xl p-4 border-2 border-yellow-800">
                            <h3 className="text-xl font-bold text-yellow-900 mb-3">POLA FINANSIAL</h3>
                            <ul className="text-sm text-yellow-900 space-y-1">
                                {slide.content.finansial.map((item, i) => <li key={i}>• {item}</li>)}
                            </ul>
                        </div>
                        <div className="bg-yellow-100 rounded-2xl p-4 border-2 border-yellow-800">
                            <div className="text-sm text-yellow-900 space-y-1">
                                {slide.content.finansialRight.map((item, i) => <div key={i}>{item}</div>)}
                            </div>
                        </div>
                    </div>

                    {/* Love Language Section */}
                    <div className="bg-red-200 rounded-2xl p-4 border-2 border-red-900">
                        <h3 className="text-xl font-bold text-red-900 mb-3">LOVE LANGUAGE</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            <ul className="text-sm text-red-900 space-y-1">
                                {slide.content.love.map((item, i) => <li key={i}>• {item}</li>)}
                            </ul>
                            <ul className="text-sm text-red-900 space-y-1">
                                {slide.content.loveRight.map((item, i) => <li key={i}>• {item}</li>)}
                            </ul>
                        </div>
                    </div>

                    {/* Yang Tidak Bisa Dikompromikan Section */}
                    <div className="bg-blue-200 rounded-2xl p-4 border-2 border-blue-900">
                        <h3 className="text-xl font-bold text-blue-900 mb-3">YANG TIDAK BISA DIKOMPROMIKAN</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            <ul className="text-sm text-blue-900 space-y-1">
                                {slide.content.kompromis.map((item, i) => <li key={i}>• {item}</li>)}
                            </ul>
                            <ul className="text-sm text-blue-900 space-y-1">
                                {slide.content.kompromisRight.map((item, i) => <li key={i}>• {item}</li>)}
                            </ul>
                        </div>
                    </div>
                </div>
            );
        } else if (slide.title.includes("Red Flag")) {
            return (
                <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-red-100 rounded-2xl p-4 border-2 border-red-800">
                            <h3 className="text-xl font-bold text-red-900 mb-3">RED FLAG</h3>
                            <ul className="text-sm text-red-900 space-y-1">
                                {slide.content.redflags.map((item, i) => <li key={i}>• {item}</li>)}
                            </ul>
                        </div>
                        <div className="bg-red-100 rounded-2xl p-4 border-2 border-red-800">
                            <h3 className="text-xl font-bold text-red-900 mb-3">HOW TO HANDLE</h3>
                            <ul className="text-sm text-red-900 space-y-1">
                                {slide.content.handle.map((item, i) => <li key={i}>• {item}</li>)}
                            </ul>
                        </div>
                    </div>

                    <div className="bg-amber-100 rounded-2xl p-4 border-2 border-amber-800">
                        <h3 className="text-xl font-bold text-amber-900 mb-3">VISI & MISI HIDUP</h3>
                        <ul className="text-sm text-amber-900 space-y-1">
                            {slide.content.visi.map((item, i) => <li key={i}>• {item}</li>)}
                        </ul>
                        <div className="mt-4 grid md:grid-cols-2 gap-4">
                            <ul className="text-sm text-amber-900 space-y-1">
                                {slide.content.misi.map((item, i) => <li key={i}>• {item}</li>)}
                            </ul>
                        </div>
                    </div>

                    <div className="bg-amber-200 rounded-2xl p-4 border-2 border-amber-900">
                        <h3 className="text-xl font-bold text-amber-900 mb-3">RENCANA PARENTING</h3>
                        <ul className="text-sm text-amber-900 space-y-1">
                            {slide.content.parenting.map((item, i) => <li key={i}>• {item}</li>)}
                        </ul>
                    </div>

                    <div className="bg-red-200 rounded-2xl p-4 border-2 border-red-900">
                        <h3 className="text-xl font-bold text-red-900 mb-3">PERAN DAN EKSPEKTASI RT</h3>
                        <div className="text-sm text-red-900 space-y-1">
                            {slide.content.ekspetasi.map((item, i) => <div key={i}>{item}</div>)}
                        </div>
                    </div>
                </div>
            );
        } else if (slide.title.includes("Lampiran")) {
            return (
                <div className="space-y-6">
                    <div className="bg-yellow-100 rounded-2xl p-4 border-2 border-yellow-800">
                        <h3 className="text-xl font-bold text-yellow-900 mb-3">Lingkungan Kerja Ideal</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            {slide.content.aspek.map((item, i) => (
                                <div key={i} className="bg-white/50 p-3 rounded-xl">
                                    <strong>{item.title}:</strong> {item.desc}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-4 border-2 border-gray-300">
                        <h3 className="text-xl font-bold text-gray-900 mb-3">Si Cuek tapi Sayang</h3>
                        <div className="text-sm text-gray-800 space-y-2">
                            <p><strong>Visual:</strong> {slide.content.siCuek.visual}</p>
                            <p><strong>Love Language:</strong> {slide.content.siCuek.love}</p>
                            <p><strong>Attachment Pattern:</strong> {slide.content.siCuek.attachment}</p>
                            <p><strong>Role:</strong> {slide.content.siCuek.role}</p>
                            <p><strong>Practical Tips:</strong> {slide.content.siCuek.tips}</p>
                        </div>
                    </div>

                    <div className="bg-pink-100 rounded-2xl p-4 border-2 border-pink-800">
                        <h3 className="text-xl font-bold text-pink-900 mb-3">20 Pertanyaan Penting Sebelum Nikah</h3>
                        <div className="text-sm text-pink-900 space-y-1">
                            {slide.content.questions.map((q, i) => <div key={i}>{q}</div>)}
                        </div>
                    </div>
                </div>
            );
        } else {
            // Profile slide
            const data = slide.content.intro;
            return (
                <div className="space-y-6">
                    <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl p-6 border-2 border-blue-800">
                        <h3 className="text-3xl font-bold text-blue-900 mb-2">{data.name}</h3>
                        <p className="text-xl text-blue-800 mb-4">{data.type}</p>
                        <div className="text-sm text-blue-900 space-y-1">
                            <p>{data.nickname}</p>
                            <p>{data.birth}</p>
                            <p>{data.job}</p>
                            <p>{data.location}</p>
                            <p>{data.phone}</p>
                        </div>
                        <p className="mt-4 text-sm text-blue-900 italic">{data.bio}</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-amber-100 rounded-2xl p-4 border-2 border-amber-800">
                            <h3 className="text-xl font-bold text-amber-900 mb-3">INTEREST GW</h3>
                            <ul className="text-sm text-amber-900 space-y-1">
                                {slide.content.interest.map((item, i) => <li key={i}>• {item}</li>)}
                            </ul>
                        </div>
                        <div className="bg-amber-100 rounded-2xl p-4 border-2 border-amber-800">
                            <h3 className="text-xl font-bold text-amber-900 mb-3">PENGALAMAN</h3>
                            <ul className="text-sm text-amber-900 space-y-1">
                                {slide.content.pengalaman.map((item, i) => <li key={i}>• {item}</li>)}
                            </ul>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-green-100 rounded-2xl p-4 border-2 border-green-800">
                            <h3 className="text-xl font-bold text-green-900 mb-3">PLUS-NYA GW</h3>
                            <ul className="text-sm text-green-900 space-y-1">
                                {slide.content.plus.map((item, i) => <li key={i}>• {item}</li>)}
                            </ul>
                        </div>
                        <div className="bg-red-100 rounded-2xl p-4 border-2 border-red-800">
                            <h3 className="text-xl font-bold text-red-900 mb-3">MINUS-NYA GW</h3>
                            <ul className="text-sm text-red-900 space-y-1">
                                {slide.content.minus.map((item, i) => <li key={i}>• {item}</li>)}
                            </ul>
                        </div>
                    </div>

                    <div className="bg-blue-100 rounded-2xl p-4 border-2 border-blue-800">
                        <h3 className="text-xl font-bold text-blue-900 mb-3">FUN FACT</h3>
                        <ul className="text-sm text-blue-900 space-y-1">
                            {slide.content.funfact.map((item, i) => <li key={i}>• {item}</li>)}
                        </ul>
                    </div>
                </div>
            );
        }
    };

    return (
        <>
            {/* Prevent Google Indexing */}
            <head>
                <meta name="robots" content="noindex, nofollow" />
                <title>🔒 Special Access</title>
            </head>

            <section className="min-h-screen bg-gradient-to-br from-pink-900 via-purple-900 to-indigo-900 text-white py-12 px-4">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-8 pt-16">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 bg-clip-text text-transparent">
                            💕 Welcome, Special Person 💕
                        </h1>
                        <p className="text-lg text-white/80 italic">
                            Kamu berhasil menemukan halaman rahasia ini. Berarti kamu orang yang istimewa ✨
                        </p>
                        <div className="mt-4 flex items-center justify-center gap-2">
                            <span className="animate-pulse text-2xl">❤️</span>
                            <span className="text-sm text-white/60">Easter Egg Unlocked</span>
                            <span className="animate-pulse text-2xl">❤️</span>
                        </div>
                    </div>

                    {/* Carousel */}
                    <div className="relative bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 shadow-2xl">
                        {/* Slide Counter */}
                        <div className="absolute top-4 right-4 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full text-sm z-10">
                            {currentSlide + 1} / {slides.length}
                        </div>

                        {/* Slide Title */}
                        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
                            {slides[currentSlide].title}
                        </h2>

                        {/* Content */}
                        <div className="mb-6 max-h-[600px] overflow-y-auto pr-2">
                            {renderSlideContent(slides[currentSlide])}
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex items-center justify-between gap-4 mt-6">
                            <button
                                onClick={prevSlide}
                                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm px-6 py-3 rounded-xl transition-all duration-200 border border-white/20"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                                Previous
                            </button>

                            {/* Dot Indicators */}
                            <div className="flex gap-2">
                                {slides.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentSlide(index)}
                                        className={`w-3 h-3 rounded-full transition-all duration-200 ${index === currentSlide
                                                ? 'bg-pink-400 w-8'
                                                : 'bg-white/30 hover:bg-white/50'
                                            }`}
                                        aria-label={`Go to slide ${index + 1}`}
                                    />
                                ))}
                            </div>

                            <button
                                onClick={nextSlide}
                                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm px-6 py-3 rounded-xl transition-all duration-200 border border-white/20"
                            >
                                Next
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Footer Message */}
                    <div className="mt-8 text-center">
                        <div className="bg-pink-500/10 backdrop-blur-sm border border-pink-500/20 rounded-2xl p-6">
                            <p className="text-white/90 mb-2">
                                💝 Ini adalah bagian dari pendekatan kreatif yang dibuat khusus untuk orang spesial
                            </p>
                            <p className="text-sm text-white/60">
                                Halaman ini tidak akan terindex di Google - hanya untuk orang yang menemukan easter egg 🔐
                            </p>
                        </div>

                        <a
                            href="/about"
                            className="inline-block mt-6 bg-white/10 hover:bg-white/20 backdrop-blur-sm px-6 py-3 rounded-xl transition-all duration-200 border border-white/20"
                        >
                            ← Kembali ke About
                        </a>
                    </div>
                </div>

                {/* Animated Background Hearts */}
                <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
                    {[...Array(15)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute animate-float"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 5}s`,
                                animationDuration: `${10 + Math.random() * 10}s`,
                                opacity: 0.1
                            }}
                        >
                            ❤️
                        </div>
                    ))}
                </div>

                <style>{`
                    @keyframes float {
                        0%, 100% { transform: translateY(0px) rotate(0deg); }
                        50% { transform: translateY(-20px) rotate(180deg); }
                    }
                    .animate-float {
                        animation: float linear infinite;
                    }
                `}</style>
            </section>
        </>
    );
};

export default X9k2m7p4q1s8;
