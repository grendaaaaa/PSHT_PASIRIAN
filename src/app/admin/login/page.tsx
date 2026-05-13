'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { signIn, supabase } from '@/lib/supabase';
import { Eye, EyeOff, Lock, Mail, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMsg('');

    if (isRegister) {
      const { error, data } = await supabase.auth.signUp({ email, password });
      if (error) {
        setError(error.message);
      } else {
        setSuccessMsg('Pendaftaran berhasil! Silakan cek email Anda untuk verifikasi jika diwajibkan, atau langsung masuk.');
        setIsRegister(false);
      }
    } else {
      const { error } = await signIn(email, password);
      if (error) {
        setError('Email atau password salah. Pastikan kredensial Supabase sudah benar.');
      } else {
        router.push('/admin');
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#F0EBE3] flex items-center justify-center px-4">
      <div className="w-full max-w-[448px]">
        <div className="bg-white rounded-2xl shadow-xl shadow-black/10 border border-[#E4DCCF] overflow-hidden">
          <div className="bg-[#576F72] px-8 py-8 text-center">
            <div className="flex justify-center mb-3">
              <Image
                src="/images/psht_logo_ranting.png"
                alt="Logo PSHT"
                width={72}
                height={72}
                className="object-contain drop-shadow-lg"
              />
            </div>
            <h1 className="text-white font-bold text-xl tracking-wide">PSHT Ranting Pasirian</h1>
            <p className="text-[#E4DCCF] text-sm mt-1">Panel Admin</p>
          </div>

          <div className="px-8 py-8">
            <h2 className="text-[#576F72] font-bold text-lg mb-6">
              {isRegister ? 'Daftar Akun Admin' : 'Masuk ke Dashboard'}
            </h2>

            {error && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 mb-5 text-sm">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </div>
            )}
            
            {successMsg && (
              <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg px-4 py-3 mb-5 text-sm">
                {successMsg}
              </div>
            )}

            <form onSubmit={handleAuth} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-[#576F72] mb-1.5">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7D9D9C]" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="admin@pshtpasirian.or.id"
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#E4DCCF] bg-[#F0EBE3] focus:outline-none focus:border-[#576F72] focus:ring-2 focus:ring-[#576F72]/20 text-sm transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#576F72] mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7D9D9C]" />
                  <input
                    type={showPass ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-[#E4DCCF] bg-[#F0EBE3] focus:outline-none focus:border-[#576F72] focus:ring-2 focus:ring-[#576F72]/20 text-sm transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(v => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7D9D9C] hover:text-[#576F72]"
                  >
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#576F72] hover:bg-[#3d5558] text-white font-bold py-2.5 rounded-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Memproses...
                  </>
                ) : (isRegister ? 'Daftar' : 'Masuk')}
              </button>
            </form>

            <div className="mt-4 text-center">
              <button
                onClick={() => { setIsRegister(!isRegister); setError(''); setSuccessMsg(''); }}
                className="text-sm text-[#7D9D9C] hover:text-[#576F72] underline"
              >
                {isRegister ? 'Sudah punya akun? Masuk di sini' : 'Belum punya akun admin? Daftar'}
              </button>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-[#7D9D9C] mt-4">
          © 2024 PSHT Ranting Pasirian
        </p>
      </div>
    </div>
  );
}
