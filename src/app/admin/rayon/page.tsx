'use client';
import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import CrudTable, { Column } from '@/components/admin/CrudTable';

const TABLE = 'rayon';

const COLUMNS: Column[] = [
  { key: 'id', label: 'ID', readOnly: true, hidden: true },
  { key: 'nama', label: 'Nama Rayon', required: true },
  { key: 'sektor', label: 'Sektor', type: 'select', options: ['Utara', 'Pusat', 'Selatan'], required: true },
  { key: 'ketua_nama', label: 'Nama Ketua', required: true },
  { key: 'jadwal', label: 'Jadwal', required: true },
  { key: 'lokasi', label: 'Lokasi', required: true },
  { key: 'whatsapp', label: 'No. WhatsApp (62xxx)' },
  { key: 'instagram', label: 'Username Instagram (@xxx)' },
  { key: 'image_url', label: 'Upload Gambar', type: 'image', hidden: true },
  { key: 'is_pusat', label: 'Pusat?', type: 'select', options: ['true', 'false'] },
];

export default function RayonAdmin() {
  const [data, setData] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);

  const fetch = useCallback(async () => {
    setLoading(true);
    const { data: rows } = await supabase.from(TABLE).select('*').order('nama');
    setData(rows ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  const onAdd = async (row: Record<string, unknown>) => {
    const { error } = await supabase.from(TABLE).insert([row]);
    if (error) { alert(error.message); return; }
    await fetch();
  };

  const onEdit = async (row: Record<string, unknown>) => {
    const { error } = await supabase.from(TABLE).update(row).eq('id', row.id);
    if (error) { alert(error.message); return; }
    await fetch();
  };

  const onDelete = async (id: unknown) => {
    const { error } = await supabase.from(TABLE).delete().eq('id', id);
    if (error) { alert(error.message); return; }
    await fetch();
  };

  return (
    <CrudTable
      title="Data Rayon"
      columns={COLUMNS}
      data={data}
      loading={loading}
      onAdd={onAdd}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  );
}
