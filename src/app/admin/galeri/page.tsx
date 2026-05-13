'use client';
import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import CrudTable, { Column } from '@/components/admin/CrudTable';

const TABLE = 'galeri';

const COLUMNS: Column[] = [
  { key: 'id', label: 'ID', readOnly: true, hidden: true },
  { key: 'image_url', label: 'Foto Galeri', type: 'image' },
  { key: 'created_at', label: 'Dibuat Pada', readOnly: true },
];

export default function GaleriAdmin() {
  const [data, setData] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);

  const fetch = useCallback(async () => {
    setLoading(true);
    const { data: rows } = await supabase.from(TABLE).select('*').order('created_at', { ascending: false });
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
      title="Manajemen Galeri"
      columns={COLUMNS}
      data={data}
      loading={loading}
      onAdd={onAdd}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  );
}
