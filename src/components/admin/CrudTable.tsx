'use client';
import { useState } from 'react';
import { Pencil, Trash2, Plus, Search, X, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export type Column = {
  key: string;
  label: string;
  type?: 'text' | 'textarea' | 'number' | 'date' | 'select' | 'image';
  options?: string[];
  hidden?: boolean;      // hide from table view
  readOnly?: boolean;    // show in form but not editable
  required?: boolean;    // mandatory field
};

type Props = {
  title: string;
  columns: Column[];
  data: Record<string, unknown>[];
  loading: boolean;
  onAdd: (row: Record<string, unknown>) => Promise<void>;
  onEdit: (row: Record<string, unknown>) => Promise<void>;
  onDelete: (id: unknown) => Promise<void>;
  idKey?: string;
};

const PAGE_SIZE = 10;

export default function CrudTable({
  title, columns, data, loading,
  onAdd, onEdit, onDelete, idKey = 'id'
}: Props) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState<'add' | 'edit' | 'delete' | null>(null);
  const [selected, setSelected] = useState<Record<string, unknown> | null>(null);
  const [form, setForm] = useState<Record<string, unknown>>({});
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const visibleCols = columns.filter(c => !c.hidden);
  const formCols = columns.filter(c => !c.readOnly || modal === 'edit');

  const filtered = data.filter(row =>
    visibleCols.some(col =>
      String(row[col.key] ?? '').toLowerCase().includes(search.toLowerCase())
    )
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const openAdd = () => {
    const empty: Record<string, unknown> = {};
    columns.forEach(c => { empty[c.key] = ''; });
    setForm(empty);
    setModal('add');
  };

  const openEdit = (row: Record<string, unknown>) => {
    setSelected(row);
    setForm({ ...row });
    setModal('edit');
  };

  const openDelete = (row: Record<string, unknown>) => {
    setSelected(row);
    setModal('delete');
  };

  const closeModal = () => { setModal(null); setSelected(null); setForm({}); setErrors({}); };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, colKey: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSaving(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      const { error: uploadError } = await supabase.storage.from('images').upload(filePath, file);
      if (uploadError) {
        alert(`Gagal upload gambar: ${uploadError.message}. Pastikan bucket "images" di Supabase sudah ada dan dapat diakses public.`);
        return;
      }

      const { data } = supabase.storage.from('images').getPublicUrl(filePath);
      setForm(f => ({ ...f, [colKey]: data.publicUrl }));
    } catch (err) {
      alert("Terjadi kesalahan saat mengupload gambar.");
    } finally {
      setSaving(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = { ...form };
      const newErrors: Record<string, string> = {};

      columns.forEach(col => {
        const val = payload[col.key];

        // Validation
        if (col.required && (val === undefined || val === null || val === '')) {
          newErrors[col.key] = `${col.label} wajib diisi`;
        }

        if (col.type === 'number' && val !== undefined && val !== null && val !== '') {
          payload[col.key] = Number(val);
        } else if (col.type === 'select' && (col.options?.includes('true') || col.options?.includes('false'))) {
          if (val === 'true') payload[col.key] = true;
          if (val === 'false') payload[col.key] = false;
        } else if (val === '') {
          payload[col.key] = null;
        }
      });

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        setSaving(false);
        return;
      }

      if (modal === 'add') {
        delete payload[idKey];
        await onAdd(payload);
      } else if (modal === 'edit') {
        await onEdit(payload);
      }
      closeModal();
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat menyimpan data.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!selected) return;
    setSaving(true);
    try { await onDelete(selected[idKey]); }
    finally { setSaving(false); closeModal(); }
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E4DCCF] shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-[#E4DCCF] flex flex-col sm:flex-row sm:items-center gap-3">
        <h2 className="font-bold text-[#576F72] text-base flex-1">{title}</h2>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#7D9D9C]" />
            <input
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              placeholder="Cari..."
              className="pl-8 pr-3 py-1.5 text-sm rounded-lg border border-[#E4DCCF] bg-[#F0EBE3] focus:outline-none focus:border-[#576F72] w-44"
            />
          </div>
          <button
            onClick={openAdd}
            className="flex items-center gap-1.5 bg-[#576F72] hover:bg-[#3d5558] text-white text-sm font-medium px-3 py-1.5 rounded-lg transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            Tambah
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {loading ? (
          <div className="flex items-center justify-center py-16 text-[#7D9D9C]">
            <Loader2 className="w-6 h-6 animate-spin mr-2" />
            Memuat data...
          </div>
        ) : paginated.length === 0 ? (
          <div className="text-center py-16 text-[#7D9D9C] text-sm">
            {search ? 'Tidak ada data yang cocok.' : 'Belum ada data.'}
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#F0EBE3] border-b border-[#E4DCCF]">
                <th className="px-4 py-3 text-left text-xs font-semibold text-[#576F72] uppercase tracking-wider w-10">#</th>
                {visibleCols.map(col => (
                  <th key={col.key} className="px-4 py-3 text-left text-xs font-semibold text-[#576F72] uppercase tracking-wider whitespace-nowrap">
                    {col.label}
                  </th>
                ))}
                <th className="px-4 py-3 text-right text-xs font-semibold text-[#576F72] uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4DCCF]">
              {paginated.map((row, idx) => (
                <tr key={String(row[idKey])} className="hover:bg-[#F0EBE3]/60 transition-colors">
                  <td className="px-4 py-3 text-[#7D9D9C] text-xs">{(page - 1) * PAGE_SIZE + idx + 1}</td>
                  {visibleCols.map(col => (
                    <td key={col.key} className="px-4 py-3 text-[#1c1a17] max-w-[200px]">
                      {col.type === 'image' && row[col.key] ? (
                        <img src={String(row[col.key])} alt="" className="w-10 h-10 rounded object-cover" />
                      ) : (
                        <span className="line-clamp-2">{String(row[col.key] ?? '-')}</span>
                      )}
                    </td>
                  ))}
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => openEdit(row)}
                        className="p-1.5 rounded-lg text-[#7D9D9C] hover:bg-[#7D9D9C]/10 hover:text-[#576F72] transition-all"
                        title="Edit"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => openDelete(row)}
                        className="p-1.5 rounded-lg text-[#7D9D9C] hover:bg-red-50 hover:text-red-600 transition-all"
                        title="Hapus"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {!loading && filtered.length > PAGE_SIZE && (
        <div className="px-5 py-3 border-t border-[#E4DCCF] flex items-center justify-between text-sm">
          <span className="text-[#7D9D9C] text-xs">{filtered.length} data</span>
          <div className="flex items-center gap-1">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
              className="p-1.5 rounded-lg border border-[#E4DCCF] text-[#576F72] disabled:opacity-30 hover:bg-[#F0EBE3]">
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <span className="px-3 text-[#576F72] font-medium text-xs">{page} / {totalPages}</span>
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
              className="p-1.5 rounded-lg border border-[#E4DCCF] text-[#576F72] disabled:opacity-30 hover:bg-[#F0EBE3]">
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Modal Add/Edit */}
      {(modal === 'add' || modal === 'edit') && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[512px] max-h-[90vh] flex flex-col">
            <div className="px-6 py-4 border-b border-[#E4DCCF] flex items-center justify-between">
              <h3 className="font-bold text-[#576F72]">
                {modal === 'add' ? `Tambah ${title}` : `Edit ${title}`}
              </h3>
              <button onClick={closeModal} className="text-[#7D9D9C] hover:text-[#576F72]">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="px-6 py-4 overflow-y-auto space-y-4 flex-1">
              {formCols.filter(c => c.key !== idKey || modal === 'edit').map(col => (
                <div key={col.key}>
                  <label className="block text-xs font-semibold text-[#576F72] uppercase tracking-wider mb-1.5">
                    {col.label} {col.required && <span className="text-red-500">*</span>}
                  </label>
                  {col.type === 'textarea' ? (
                    <textarea
                      rows={3}
                      value={String(form[col.key] ?? '')}
                      onChange={e => setForm(f => ({ ...f, [col.key]: e.target.value }))}
                      className={`w-full px-3 py-2 text-sm rounded-lg border bg-[#F0EBE3] focus:outline-none focus:border-[#576F72] resize-none ${errors[col.key] ? 'border-red-500' : 'border-[#E4DCCF]'}`}
                    />
                  ) : col.type === 'select' ? (
                    <select
                      value={String(form[col.key] ?? '')}
                      onChange={e => setForm(f => ({ ...f, [col.key]: e.target.value }))}
                      className={`w-full px-3 py-2 text-sm rounded-lg border bg-[#F0EBE3] focus:outline-none focus:border-[#576F72] ${errors[col.key] ? 'border-red-500' : 'border-[#E4DCCF]'}`}
                    >
                      <option value="">-- Pilih --</option>
                      {col.options?.map(o => {
                        const [val, label] = o.includes(':') ? o.split(':') : [o, o];
                        return <option key={val} value={o}>{label}</option>;
                      })}
                    </select>
                  ) : col.type === 'image' ? (
                    <div className="space-y-2">
                      {!!form[col.key] && (
                        <div className="relative w-32 h-32 group">
                          <img src={String(form[col.key])} alt="Preview" className="w-full h-full object-cover rounded-xl border border-[#E4DCCF] shadow-sm" />
                          <button 
                            onClick={() => setForm(f => ({ ...f, [col.key]: '' }))}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                      <div className="flex flex-col gap-2">
                        <input
                          type="text"
                          placeholder="Tempel URL gambar di sini..."
                          value={String(form[col.key] ?? '')}
                          onChange={e => setForm(f => ({ ...f, [col.key]: e.target.value }))}
                          className="w-full px-3 py-2 text-sm rounded-lg border border-[#E4DCCF] bg-[#F0EBE3] focus:outline-none focus:border-[#576F72]"
                        />
                        <div className="relative">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileUpload(e, col.key)}
                            disabled={saving}
                            className="hidden"
                            id={`file-upload-${col.key}`}
                          />
                          <label 
                            htmlFor={`file-upload-${col.key}`}
                            className="flex items-center justify-center gap-2 w-full py-2 px-4 rounded-lg border-2 border-dashed border-[#7D9D9C]/30 text-[#576F72] text-sm font-medium hover:bg-[#7D9D9C]/10 hover:border-[#7D9D9C] cursor-pointer transition-all"
                          >
                            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                            {saving ? 'Mengunggah...' : 'Upload dari Perangkat'}
                          </label>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <input
                      type={col.type === 'number' ? 'number' : col.type === 'date' ? 'date' : 'text'}
                      value={String(form[col.key] ?? '')}
                      onChange={e => setForm(f => ({ ...f, [col.key]: e.target.value }))}
                      readOnly={col.readOnly}
                      className={`w-full px-3 py-2 text-sm rounded-lg border bg-[#F0EBE3] focus:outline-none focus:border-[#576F72] ${errors[col.key] ? 'border-red-500' : 'border-[#E4DCCF]'}`}
                    />
                  )}
                  {errors[col.key] && (
                    <p className="mt-1 text-[10px] text-red-500 font-bold uppercase tracking-wider">{errors[col.key]}</p>
                  )}
                </div>
              ))}
            </div>
            <div className="px-6 py-4 border-t border-[#E4DCCF] flex justify-end gap-2">
              <button onClick={closeModal} className="px-4 py-2 text-sm rounded-lg border border-[#E4DCCF] text-[#576F72] hover:bg-[#F0EBE3]">
                Batal
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-4 py-2 text-sm rounded-lg bg-[#576F72] hover:bg-[#3d5558] text-white font-medium disabled:opacity-60 flex items-center gap-2"
              >
                {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                {modal === 'add' ? 'Simpan' : 'Update'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Delete */}
      {modal === 'delete' && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[384px] p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
                <Trash2 className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <h3 className="font-bold text-[#576F72]">Hapus Data</h3>
                <p className="text-xs text-[#7D9D9C]">Tindakan ini tidak dapat dibatalkan</p>
              </div>
            </div>
            <p className="text-sm text-[#1c1a17] mb-6">
              Yakin ingin menghapus data ini?
            </p>
            <div className="flex justify-end gap-2">
              <button onClick={closeModal} className="px-4 py-2 text-sm rounded-lg border border-[#E4DCCF] text-[#576F72] hover:bg-[#F0EBE3]">
                Batal
              </button>
              <button
                onClick={handleDelete}
                disabled={saving}
                className="px-4 py-2 text-sm rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium disabled:opacity-60 flex items-center gap-2"
              >
                {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
