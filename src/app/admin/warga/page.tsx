'use client';
import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import CrudTable, { Column } from '@/components/admin/CrudTable';

const TABLE = 'statistik_ranting';

const COLUMNS: Column[] = [
  { key: 'id', label: 'ID', readOnly: true, hidden: true },
  { key: 'total_warga', label: 'Total Warga', type: 'number', required: true },
  { key: 'total_siswa', label: 'Total Siswa', type: 'number', required: true },
  { key: 'total_prestasi', label: 'Total Prestasi', type: 'number', required: true },
  { key: 'total_rayon', label: 'Total Rayon', type: 'number', required: true },
];

export default function StatistikAdmin() {
  const [data, setData] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);

  const fetch = useCallback(async () => {
    setLoading(true);
    const { data: rows } = await supabase.from(TABLE).select('*').limit(1);
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
      title="Statistik Ranting"
      columns={COLUMNS}
      data={data}
      loading={loading}
      onAdd={onAdd}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  );
}
