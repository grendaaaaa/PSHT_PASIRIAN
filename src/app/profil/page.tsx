import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { CircleCheck, Eye, Rocket } from 'lucide-react';

export default function ProfilPage() {
  return (
    <div className="bg-background text-on-surface font-body-md overflow-x-hidden">
      <Navbar />
      <main>

        {/* Hero Section */}
        <section className="relative h-[320px] sm:h-[380px] md:h-[400px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img className="w-full h-full object-cover" alt="Profil PSHT" src="https://images.unsplash.com/photo-1544098485-2a2ed6da40ba?q=80&w=2070&auto=format&fit=crop" />
            <div className="absolute inset-0 bg-black/60"></div>
          </div>
          <div className="relative z-10 text-center text-white px-4 sm:px-gutter max-w-4xl flex flex-col items-center">
            <nav className="flex justify-center mb-2 sm:mb-sm gap-xs text-white/70 text-xs sm:text-label-md">
              <a className="hover:text-white transition-colors" href="/">Beranda</a>
              <span>/</span>
              <span className="text-white">Profil</span>
            </nav>
            <h1 className="font-display-lg text-2xl sm:text-4xl md:text-display-lg mb-2 sm:mb-md leading-tight">Profil Organisasi</h1>
            <p className="text-sm sm:text-base md:text-body-lg text-white/90 max-w-2xl mx-auto">Menjaga tradisi, membangun karakter, dan mencetak generasi pesilat yang berbudi luhur melalui disiplin Persaudaraan Setia Hati Terate di Ranting Pasirian.</p>
          </div>
        </section>

        {/* Tentang Kami */}
        <section className="py-xl bg-surface">
          <div className="max-w-max-width mx-auto px-gutter grid grid-cols-1 md:grid-cols-2 gap-xl items-center">
            <div className="space-y-md">
              <div className="w-16 h-1 bg-tertiary mb-sm"></div>
              <span className="text-tertiary font-label-md text-label-md uppercase tracking-widest block">Mengenal Lebih Dekat</span>
              <h2 className="font-headline-md text-headline-md text-primary">Tentang Kami</h2>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                Persaudaraan Setia Hati Terate (PSHT) Ranting Pasirian merupakan bagian integral dari organisasi bela diri nasional yang berfokus pada pengembangan fisik, mental, dan spiritual anggotanya. Kami berdiri sebagai wadah bagi putra-putri daerah untuk menimba ilmu pencak silat yang berlandaskan nilai-nilai persaudaraan.
              </p>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                Di bawah bimbingan pelatih yang bersertifikasi dan berpengalaman, kami berkomitmen untuk melestarikan warisan budaya bangsa sekaligus beradaptasi dengan tuntutan olahraga modern. Disiplin, integritas, dan rasa hormat menjadi pilar utama dalam setiap proses latihan yang kami jalankan.
              </p>
              <button className="bg-transparent border border-tertiary text-primary px-lg py-sm rounded-lg font-label-md text-label-md hover:bg-tertiary/5 transition-all active:scale-95 mt-sm">
                VISI LENGKAP KAMI
              </button>
            </div>
            <div className="relative rounded-xl overflow-hidden shadow-ambient">
              <img className="w-full h-[450px] object-cover" alt="Latihan PSHT Pasirian" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDf5auHzPWDc46pzHXNAP6yJfyMQnhpMbz5QBJjPlByoRB4UH8ulyLz79JQ_a5lYGhHXKEAZk8gQIl7Aq7CghEONqnrpsoypIU6unInF0J5-Xcdic1C8jFzxt2H1feVvi0UTVlQBzSODYQNLFcaGxQ-H6xCUn0nar-tMWxmb0gmXNVEwjD75ZuZmvfIjVUAav08mxFLMLZVTgsY1C9DHSpWGT6_bgMAQGcxxXBWdKAYM2rC1XinkhMToOvFCP1afCcu7tjkgCxODcYs" />
              <div className="absolute bottom-6 left-6 bg-tertiary text-on-primary px-md py-xs rounded-lg font-label-md text-sm shadow-lg">
                Certified Academy
              </div>
            </div>
          </div>
        </section>

        {/* Sejarah Section */}
        <section className="py-xl bg-surface-container-low">
          <div className="max-w-max-width mx-auto px-gutter">
            <div className="text-center mb-xl">
              <h2 className="font-headline-md text-headline-md text-primary mb-xs">Sejarah Perjalanan</h2>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto">
                Jejak langkah dan tonggak sejarah perkembangan PSHT di wilayah Pasirian sejak masa pembentukan hingga saat ini.
              </p>
            </div>

            <div className="relative">
              {/* Garis tengah (desktop only) */}
              <div className="absolute left-1/2 -translate-x-1/2 h-full w-px bg-outline-variant hidden md:block"></div>

              {/* Timeline */}
              <div className="relative pl-8 md:pl-0 border-l-2 border-outline-variant md:border-l-0 space-y-lg">

                {/* Event 1 */}
                <div className="relative flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="absolute -left-[2.35rem] top-2 w-4 h-4 rounded-full bg-primary border-4 border-surface-container-low md:hidden"></div>
                  <div className="md:w-[45%] bg-surface p-lg rounded-xl shadow-md shadow-black/10 hover:shadow-lg hover:shadow-black/15 transition-shadow duration-300 border border-outline-variant/30">
                    <span className="text-tertiary font-bold mb-xs block font-label-md text-label-md">1980 — Inisiasi</span>
                    <h3 className="font-headline-sm text-headline-sm text-primary mb-xs">Awal Mula Pergerakan</h3>
                    <p className="text-on-surface-variant font-body-md text-body-md">Pembentukan embrio latihan pertama di wilayah Pasirian oleh para tokoh perintis yang membawa semangat dari pusat.</p>
                  </div>
                  <div className="hidden md:block w-4 h-4 rounded-full bg-primary border-4 border-surface-container-low z-10"></div>
                  <div className="hidden md:block md:w-[45%]"></div>
                </div>

                {/* Event 2 */}
                <div className="relative flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="absolute -left-[2.35rem] top-2 w-4 h-4 rounded-full bg-primary border-4 border-surface-container-low md:hidden"></div>
                  <div className="hidden md:block md:w-[45%] md:order-1"></div>
                  <div className="hidden md:block w-4 h-4 rounded-full bg-primary border-4 border-surface-container-low z-10 md:order-2"></div>
                  <div className="md:w-[45%] md:order-3 bg-surface p-lg rounded-xl shadow-md shadow-black/10 hover:shadow-lg hover:shadow-black/15 transition-shadow duration-300 border border-outline-variant/30">
                    <span className="text-tertiary font-bold mb-xs block font-label-md text-label-md">1995 — Ekspansi</span>
                    <h3 className="font-headline-sm text-headline-sm text-primary mb-xs">Peresmian Ranting Pasirian</h3>
                    <p className="text-on-surface-variant font-body-md text-body-md">Pengukuhan resmi sebagai Ranting di bawah naungan Cabang, menandai era administrasi yang lebih terstruktur.</p>
                  </div>
                </div>

                {/* Event 3 */}
                <div className="relative flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="absolute -left-[2.35rem] top-2 w-4 h-4 rounded-full bg-primary border-4 border-surface-container-low md:hidden"></div>
                  <div className="md:w-[45%] bg-surface p-lg rounded-xl shadow-md shadow-black/10 hover:shadow-lg hover:shadow-black/15 transition-shadow duration-300 border border-outline-variant/30">
                    <span className="text-tertiary font-bold mb-xs block font-label-md text-label-md">2010 — Prestasi</span>
                    <h3 className="font-headline-sm text-headline-sm text-primary mb-xs">Era Keemasan Kompetisi</h3>
                    <p className="text-on-surface-variant font-body-md text-body-md">Pencapaian luar biasa atlet Ranting Pasirian di tingkat kabupaten dan provinsi, memperkuat reputasi sebagai pusat pelatihan berkualitas.</p>
                  </div>
                  <div className="hidden md:block w-4 h-4 rounded-full bg-primary border-4 border-surface-container-low z-10"></div>
                  <div className="hidden md:block md:w-[45%]"></div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* Visi & Misi Section */}
        <section className="py-xl bg-surface">
          <div className="max-w-max-width mx-auto px-gutter">
            <div className="grid md:grid-cols-2 gap-lg">
              {/* Visi Card */}
              <div className="bg-surface p-xl rounded-xl border border-outline-variant/30 shadow-md shadow-black/10 hover:shadow-xl hover:shadow-black/20 transition-shadow duration-300 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-lg opacity-5 group-hover:opacity-10 transition-opacity">
                  <Eye className="w-40 h-40" />
                </div>
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center mb-md text-primary">
                    <Eye className="w-6 h-6" />
                  </div>
                  <h2 className="font-headline-sm text-headline-sm text-primary mb-sm">Visi Kami</h2>
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    Menjadi pusat unggulan pendidikan karakter dan pelestarian pencak silat yang melahirkan pendekar berbudi luhur, berprestasi, dan bermanfaat bagi masyarakat Pasirian.
                  </p>
                </div>
              </div>

              {/* Misi Card */}
              <div className="bg-surface p-xl rounded-xl border border-outline-variant/30 shadow-md shadow-black/10 hover:shadow-xl hover:shadow-black/20 transition-shadow duration-300 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-lg opacity-5 group-hover:opacity-10 transition-opacity">
                  <Rocket className="w-40 h-40" />
                </div>
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center mb-md text-primary">
                    <Rocket className="w-6 h-6" />
                  </div>
                  <h2 className="font-headline-sm text-headline-sm text-primary mb-sm">Misi Kami</h2>
                  <ul className="space-y-sm">
                    <li className="flex items-start gap-xs">
                      <CircleCheck className="w-5 h-5 text-tertiary mt-0.5 shrink-0" />
                      <span className="text-on-surface-variant font-body-md text-body-md">Menyelenggarakan pelatihan pencak silat yang disiplin dan sistematis.</span>
                    </li>
                    <li className="flex items-start gap-xs">
                      <CircleCheck className="w-5 h-5 text-tertiary mt-0.5 shrink-0" />
                      <span className="text-on-surface-variant font-body-md text-body-md">Menanamkan nilai-nilai kerohanian dan persaudaraan yang kuat.</span>
                    </li>
                    <li className="flex items-start gap-xs">
                      <CircleCheck className="w-5 h-5 text-tertiary mt-0.5 shrink-0" />
                      <span className="text-on-surface-variant font-body-md text-body-md">Mencetak kader yang memiliki mental juara dan integritas tinggi.</span>
                    </li>
                    <li className="flex items-start gap-xs">
                      <CircleCheck className="w-5 h-5 text-tertiary mt-0.5 shrink-0" />
                      <span className="text-on-surface-variant font-body-md text-body-md">Aktif berkontribusi dalam kegiatan sosial kemasyarakatan.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}