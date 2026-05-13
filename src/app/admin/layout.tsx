'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { supabase, signOut } from '@/lib/supabase';
import {
  LayoutDashboard, Users, Newspaper, MapPin, Network, Palette,
  LogOut, Menu, X, ChevronRight
} from 'lucide-react';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/berita', label: 'Berita', icon: Newspaper },
  { href: '/admin/rayon', label: 'Data Rayon', icon: MapPin },
  { href: '/admin/struktur', label: 'Struktur', icon: Network },
  { href: '/admin/bidang', label: 'Bidang', icon: Network },
  { href: '/admin/galeri', label: 'Galeri', icon: Palette },
  { href: '/admin/warga', label: 'Warga / Siswa', icon: Users },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [checking, setChecking] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    // Kalau sudah di halaman login, tidak perlu cek session
    if (isLoginPage) {
      setChecking(false);
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.replace('/admin/login');
        // Tetap set checking false agar tidak stuck di spinner
        setChecking(false);
      } else {
        setUserEmail(data.session.user.email ?? '');
        setChecking(false);
      }
    });
  }, [isLoginPage, router]);

  const handleSignOut = async () => {
    await signOut();
    router.replace('/admin/login');
  };

  // Halaman login — render langsung tanpa sidebar
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Masih mengecek session
  if (checking) {
    return (
      <div className="min-h-screen bg-[#F0EBE3] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#E4DCCF] border-t-[#576F72] rounded-full animate-spin" />
      </div>
    );
  }

  const isActive = (item: typeof navItems[0]) => {
    if (item.exact) return pathname === item.href;
    return pathname.startsWith(item.href);
  };

  return (
    <div className="min-h-screen bg-[#F0EBE3] flex">
      {/* Sidebar overlay mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-[#576F72] z-40 flex flex-col transition-transform duration-300
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:sticky`}
      >
        {/* Logo */}
        <div className="px-6 py-6 border-b border-white/10 flex items-center gap-3">
          <Image
            src="/images/psht_logo_ranting.png"
            alt="Logo"
            width={40}
            height={40}
            className="object-contain"
          />
          <div>
            <p className="text-white font-bold text-sm leading-tight">PSHT Pasirian</p>
            <p className="text-[#E4DCCF] text-[10px] uppercase tracking-widest">Admin Panel</p>
          </div>
          <button
            className="ml-auto md:hidden text-white/60 hover:text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map(item => {
            const active = isActive(item);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  active
                    ? 'bg-white/15 text-white'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <item.icon className="w-4 h-4 shrink-0" />
                <span className="flex-1">{item.label}</span>
                {active && <ChevronRight className="w-3 h-3 opacity-60" />}
              </Link>
            );
          })}
        </nav>

        {/* User + Logout */}
        <div className="px-3 py-4 border-t border-white/10">
          <div className="px-3 py-2 mb-2">
            <p className="text-[#E4DCCF] text-[10px] uppercase tracking-widest mb-0.5">Login sebagai</p>
            <p className="text-white text-xs font-medium truncate">{userEmail}</p>
          </div>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition-all"
          >
            <LogOut className="w-4 h-4" />
            Keluar
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="bg-white border-b border-[#E4DCCF] px-4 sm:px-6 py-3 flex items-center gap-3 sticky top-0 z-20">
          <button
            className="md:hidden p-2 rounded-lg text-[#576F72] hover:bg-[#F0EBE3]"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="text-[#576F72] font-bold text-base">
            {navItems.find(n => isActive(n))?.label ?? 'Admin'}
          </h1>
          <Link
            href="/"
            className="ml-auto text-xs text-[#7D9D9C] hover:text-[#576F72] transition-colors"
          >
            ← Lihat Website
          </Link>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 sm:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
