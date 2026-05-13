'use client';
import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import CrudTable, { Column } from '@/components/admin/CrudTable';

const TABLE = 'bidang_organisasi';

const COLUMNS: Column[] = [
  { key: 'id', label: 'ID', readOnly: true, hidden: true },
  { key: 'nama', label: 'Nama Bidang', required: true },
  { key: 'deskripsi', label: 'Deskripsi', type: 'textarea' },
  { key: 'icon_name', label: 'Icon (Lucide)', type: 'select', options: ['Dumbbell', 'Network', 'Megaphone', 'Sparkles', 'Shield', 'Briefcase', 'Users', 'Target'], required: true },
  { key: 'image_url', label: 'Image URL (Optional)', type: 'image' },
];

export default function BidangAdmin() {
  const [data, setData] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);

  const fetch = useCallback(async () => {
    setLoading(true);
    const { data: rows } = await supabase.from(TABLE).select('*').order('id');
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
      title="Bidang & Divisi"
      columns={COLUMNS}
      data={data}
      loading={loading}
      onAdd={onAdd}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  );
}
