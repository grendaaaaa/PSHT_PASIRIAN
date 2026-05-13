'use client';
import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import CrudTable, { Column } from '@/components/admin/CrudTable';

const TABLE = 'pengurus';

const COLUMNS: Column[] = [
  { key: 'id', label: 'ID', readOnly: true, hidden: true },
  { key: 'nama', label: 'Nama', required: true },
  { key: 'jabatan', label: 'Jabatan', required: true },
  { key: 'tipe_pengurus', label: 'Tipe Pengurus', type: 'select', options: ['INTI', 'HARIAN'], required: true },
  { key: 'image_url', label: 'Upload Foto URL', type: 'image' },
  { key: 'deskripsi_tugas', label: 'Deskripsi Tugas', type: 'textarea', hidden: true },
  { key: 'urutan', label: 'Urutan', type: 'number' },
];

export default function StrukturAdmin() {
  const [data, setData] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);

  const fetch = useCallback(async () => {
    setLoading(true);
    const { data: rows } = await supabase
      .from(TABLE)
      .select('*')
      .in('tipe_pengurus', ['INTI', 'HARIAN'])
      .order('urutan');
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
      title="Struktur Organisasi"
      columns={COLUMNS}
      data={data}
      loading={loading}
      onAdd={onAdd}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  );
}
