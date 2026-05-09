import { supabase } from '@/lib/supabase';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Helper: get auth headers
 */
async function getAuthHeaders() {
  const { data: { session } } = await supabase.auth.getSession();
  if (session?.access_token) {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session.access_token}`,
    };
  }
  return { 'Content-Type': 'application/json' };
}

/**
 * Mengambil daftar bab yang tersedia
 */
export async function fetchChapters() {
  const res = await fetch(`${API_URL}/quiz/chapters`);
  const json = await res.json();

  if (!json.success) {
    throw new Error(json.message || 'Gagal memuat daftar bab');
  }

  return json.data;
}

/**
 * Mengambil soal berdasarkan bab
 */
export async function fetchQuestionsByChapter(chapterId) {
  const res = await fetch(`${API_URL}/quiz/${chapterId}`);
  const json = await res.json();

  if (!json.success) {
    throw new Error(json.message || 'Gagal memuat soal');
  }

  return json.data;
}

/**
 * Mengirim jawaban ke backend dan mendapatkan skor
 */
export async function submitAnswers(chapterId, answers, timeSpent) {
  const res = await fetch(`${API_URL}/quiz/${chapterId}/submit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ answers, timeSpent }),
  });
  const json = await res.json();

  if (!json.success) {
    throw new Error(json.message || 'Gagal mengirim jawaban');
  }

  return json.data;
}

/**
 * Menyimpan riwayat kuis ke server (authenticated)
 */
export async function saveHistoryToServer(record) {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_URL}/history`, {
      method: 'POST',
      headers,
      body: JSON.stringify(record),
    });
    const json = await res.json();
    return json.data;
  } catch (err) {
    console.warn('Gagal menyimpan riwayat ke server:', err.message);
    return null;
  }
}

/**
 * Mengambil riwayat kuis milik user yang login
 */
export async function fetchMyHistory() {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_URL}/history/me`, { headers });
  const json = await res.json();

  if (!json.success) {
    throw new Error(json.message || 'Gagal memuat riwayat');
  }

  return json.data;
}

/**
 * Mengambil semua riwayat kuis dari server (admin only)
 */
export async function fetchAllHistory() {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_URL}/history`, { headers });
  const json = await res.json();

  if (!json.success) {
    throw new Error(json.message || 'Gagal memuat riwayat');
  }

  return json.data;
}

/**
 * Menghapus semua riwayat kuis di server (admin only)
 */
export async function deleteAllHistoryFromServer() {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_URL}/history`, { method: 'DELETE', headers });
  const json = await res.json();

  if (!json.success) {
    throw new Error(json.message || 'Gagal menghapus riwayat');
  }

  return true;
}

/**
 * Menghapus satu riwayat kuis berdasarkan ID (admin only)
 */
export async function deleteHistoryById(id) {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_URL}/history/${id}`, { method: 'DELETE', headers });
  const json = await res.json();

  if (!json.success) {
    throw new Error(json.message || 'Gagal menghapus riwayat');
  }

  return true;
}
