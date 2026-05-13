'use client';
import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import CrudTable, { Column } from '@/components/admin/CrudTable';

const TABLE = 'berita';

export default function BeritaAdmin() {
  const [data, setData] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<{id: string, nama: string}[]>([]);

  const fetch = useCallback(async () => {
    setLoading(true);
    const [{ data: rows }, { data: cats }] = await Promise.all([
      supabase.from(TABLE).select('*').order('created_at', { ascending: false }),
      supabase.from('kategori_berita').select('id, nama')
    ]);
    setData(rows ?? []);
    setCategories(cats ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  const COLUMNS: Column[] = [
    { key: 'id', label: 'ID', readOnly: true, hidden: true },
    { key: 'judul', label: 'Judul', required: true },
    { key: 'slug', label: 'Slug (URL)', required: true },
    { 
      key: 'kategori_id', 
      label: 'Kategori', 
      type: 'select', 
      options: categories.map(c => `${c.id}:${c.nama}`), 
      required: true 
    },
    { key: 'published_at', label: 'Tanggal Publikasi', type: 'date', required: true },
    { key: 'ringkasan', label: 'Ringkasan', type: 'textarea', required: true },
    { key: 'content', label: 'Konten', type: 'textarea', hidden: true, required: true },
    { key: 'image_url', label: 'Gambar', type: 'image', hidden: true },
    { key: 'is_featured', label: 'Utama', type: 'select', options: ['true', 'false'] },
  ];

  // Helper to handle the 'id:name' format in CrudTable
  // We need to modify CrudTable slightly or handle it here.
  // Actually, let's keep it simple and just use the IDs for now, 
  // but let's make CrudTable handle 'value:label' format if possible.
  
  const onAdd = async (row: Record<string, unknown>) => {
    const payload = { ...row };
    if (typeof payload.kategori_id === 'string' && payload.kategori_id.includes(':')) {
      payload.kategori_id = payload.kategori_id.split(':')[0];
    }
    const { error } = await supabase.from(TABLE).insert([payload]);
    if (error) { alert(error.message); return; }
    await fetch();
  };

  const onEdit = async (row: Record<string, unknown>) => {
    const payload = { ...row };
    if (typeof payload.kategori_id === 'string' && payload.kategori_id.includes(':')) {
      payload.kategori_id = payload.kategori_id.split(':')[0];
    }
    const { error } = await supabase.from(TABLE).update(payload).eq('id', row.id);
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
      title="Berita"
      columns={COLUMNS}
      data={data}
      loading={loading}
      onAdd={onAdd}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  );
}
