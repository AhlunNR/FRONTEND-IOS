const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

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
 * Menyimpan riwayat kuis ke server (Supabase)
 */
export async function saveHistoryToServer(record) {
  try {
    const res = await fetch(`${API_URL}/history`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(record),
    });
    const json = await res.json();
    return json.data;
  } catch (err) {
    // Gagal kirim ke server tidak boleh mengganggu UX, cukup log
    console.warn('Gagal menyimpan riwayat ke server:', err.message);
    return null;
  }
}

/**
 * Mengambil semua riwayat kuis dari server (untuk admin)
 */
export async function fetchAllHistory() {
  const res = await fetch(`${API_URL}/history`);
  const json = await res.json();

  if (!json.success) {
    throw new Error(json.message || 'Gagal memuat riwayat');
  }

  return json.data;
}
