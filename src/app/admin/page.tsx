'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Newspaper, MapPin, Network, Users, TrendingUp, Briefcase } from 'lucide-react';
import Link from 'next/link';

type Stat = { label: string; value: number; icon: React.ElementType; href: string; color: string };

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stat[]>([
    { label: 'Berita', value: 0, icon: Newspaper, href: '/admin/berita', color: 'bg-[#7D9D9C]/15 text-[#576F72]' },
    { label: 'Rayon', value: 0, icon: MapPin, href: '/admin/rayon', color: 'bg-[#E4DCCF] text-[#576F72]' },
    { label: 'Struktur', value: 0, icon: Network, href: '/admin/struktur', color: 'bg-[#576F72]/10 text-[#576F72]' },
    { label: 'Bidang', value: 0, icon: Briefcase, href: '/admin/bidang', color: 'bg-amber-50 text-amber-700' },
    { label: 'Total Warga', value: 0, icon: Users, href: '/admin/warga', color: 'bg-[#7D9D9C]/20 text-[#576F72]' },
    { label: 'Total Siswa', value: 0, icon: TrendingUp, href: '/admin/warga', color: 'bg-emerald-50 text-emerald-700' },
    { label: 'Prestasi', value: 0, icon: TrendingUp, href: '/admin/warga', color: 'bg-blue-50 text-blue-700' },
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounts = async () => {
      // 1. Fetch record counts from main tables
      const tables = ['berita', 'rayon', 'pengurus', 'bidang_organisasi'];
      const counts = await Promise.all(
        tables.map(t => supabase.from(t).select('*', { count: 'exact', head: true }))
      );

      // 2. Fetch the statistik_ranting row
      const { data: stData } = await supabase.from('statistik_ranting').select('*');
      const st = stData?.[0];

      setStats([
        { label: 'Berita', value: counts[0].count ?? 0, icon: Newspaper, href: '/admin/berita', color: 'bg-[#7D9D9C]/15 text-[#576F72]' },
        { label: 'Rayon', value: counts[1].count ?? 0, icon: MapPin, href: '/admin/rayon', color: 'bg-[#E4DCCF] text-[#576F72]' },
        { label: 'Struktur', value: counts[2].count ?? 0, icon: Network, href: '/admin/struktur', color: 'bg-[#576F72]/10 text-[#576F72]' },
        { label: 'Bidang', value: counts[3].count ?? 0, icon: Briefcase, href: '/admin/bidang', color: 'bg-amber-50 text-amber-700' },
        { label: 'Total Warga', value: st?.total_warga ?? 0, icon: Users, href: '/admin/warga', color: 'bg-[#7D9D9C]/20 text-[#576F72]' },
        { label: 'Total Siswa', value: st?.total_siswa ?? 0, icon: Users, href: '/admin/warga', color: 'bg-emerald-50 text-emerald-700' },
        { label: 'Prestasi', value: st?.total_prestasi ?? 0, icon: TrendingUp, href: '/admin/warga', color: 'bg-blue-50 text-blue-700' },
      ]);
      setLoading(false);
    };
    fetchCounts();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-[#576F72]">Dashboard</h2>
        <p className="text-sm text-[#7D9D9C] mt-1">Selamat datang di panel admin PSHT Ranting Pasirian</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(stat => (
          <Link key={stat.label} href={stat.href}
            className="bg-white rounded-xl border border-[#E4DCCF] p-5 hover:shadow-md hover:-translate-y-0.5 transition-all group">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${stat.color}`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <p className="text-2xl font-bold text-[#576F72]">
              {loading ? <span className="inline-block w-8 h-6 bg-[#E4DCCF] rounded animate-pulse" /> : stat.value}
            </p>
            <p className="text-xs text-[#7D9D9C] mt-0.5 font-medium">{stat.label}</p>
          </Link>
        ))}
      </div>

      {/* Quick links */}
      <div className="bg-white rounded-xl border border-[#E4DCCF] p-5">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-4 h-4 text-[#7D9D9C]" />
          <h3 className="font-semibold text-[#576F72] text-sm">Akses Cepat</h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {stats.map(stat => (
            <Link key={stat.label} href={stat.href}
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg border border-[#E4DCCF] text-sm text-[#576F72] hover:bg-[#F0EBE3] transition-all">
              <stat.icon className="w-4 h-4 text-[#7D9D9C]" />
              {stat.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
