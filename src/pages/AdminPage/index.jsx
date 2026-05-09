import React, { useEffect, useState } from 'react';
import { fetchAllHistory, deleteAllHistoryFromServer, deleteHistoryById as deleteHistoryByIdApi } from '@/services/api';
import { formatTime } from '@/utils/formatTime';
import {
  Shield, RefreshCcw, Users, BarChart3, Clock,
  CheckCircle2, XCircle, Timer, Trash2, LayoutDashboard,
  ClipboardList, Lock, Settings, ChevronRight, User, TrendingUp, Zap
} from 'lucide-react';

const CHAPTER_TITLES = {
  1: 'PENGERTIAN, SIFAT, FUNGSI',
  3: 'BIOGRAFI BADEN-POWELL',
  5: 'SCOUTING FOR BOYS',
  9: 'BERKEMAH (HIDUP DI ALAM BEBAS)',
  12: 'MORSE',
  15: 'MEMBACA PETA (NAVIGASI)',
  20: 'SANDI PRAMUKA',
  24: 'P3K dan KESEHATAN',
  99: 'SOAL GABUNGAN',
};

const getGradeInfo = (grade) => {
  switch (grade) {
    case 'A': return { color: 'text-green-400', bg: 'bg-green-400/10 border-green-400/20', dot: 'bg-green-400' };
    case 'B': return { color: 'text-blue-400', bg: 'bg-blue-400/10 border-blue-400/20', dot: 'bg-blue-400' };
    case 'C': return { color: 'text-orange-400', bg: 'bg-orange-400/10 border-orange-400/20', dot: 'bg-orange-400' };
    default: return { color: 'text-red-400', bg: 'bg-red-400/10 border-red-400/20', dot: 'bg-red-400' };
  }
};

// ─── SIDEBAR MENU ITEMS ─────────────────────────────────────────
const MENU = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'results', label: 'Hasil Kuis', icon: ClipboardList },
  { id: 'security', label: 'Keamanan', icon: Lock },
  { id: 'settings', label: 'Pengaturan', icon: Settings },
];

// ─── OVERVIEW PANEL ─────────────────────────────────────────────
function OverviewPanel({ history }) {
  const totalAttempts = history.length;
  const uniqueDevices = new Set(history.map(h => h.device_id)).size;
  const avgScore = totalAttempts > 0
    ? Math.round(history.reduce((sum, h) => sum + h.score, 0) / totalAttempts)
    : 0;

  const gradeCount = { A: 0, B: 0, C: 0, D: 0 };
  history.forEach(h => { gradeCount[h.grade] = (gradeCount[h.grade] || 0) + 1; });

  const chapterStats = {};
  history.forEach(h => {
    if (!chapterStats[h.chapter]) chapterStats[h.chapter] = { count: 0, totalScore: 0 };
    chapterStats[h.chapter].count++;
    chapterStats[h.chapter].totalScore += h.score;
  });

  const recentItems = history.slice(0, 5);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-extrabold text-white">Overview</h2>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { icon: BarChart3, label: 'Total Kuis', value: totalAttempts, color: 'text-blue-400' },
          { icon: Users, label: 'Perangkat', value: uniqueDevices, color: 'text-purple-400' },
          { icon: TrendingUp, label: 'Rata-rata', value: avgScore, color: 'text-green-400' },
          { icon: CheckCircle2, label: 'Grade A', value: gradeCount.A, color: 'text-emerald-400' },
        ].map((s, i) => (
          <div key={i} className="bg-zinc-900/50 rounded-2xl border border-zinc-800/50 p-4 flex flex-col items-center">
            <s.icon size={18} className={`${s.color} mb-1.5`} />
            <span className="text-2xl font-black text-white">{s.value}</span>
            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mt-0.5">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Grade Distribution */}
      <div className="bg-zinc-900/50 rounded-2xl border border-zinc-800/50 p-5">
        <h3 className="text-sm font-bold text-white mb-3">Distribusi Grade</h3>
        <div className="flex gap-3">
          {['A', 'B', 'C', 'D'].map(g => {
            const info = getGradeInfo(g);
            const pct = totalAttempts > 0 ? Math.round((gradeCount[g] / totalAttempts) * 100) : 0;
            return (
              <div key={g} className="flex-1 text-center">
                <div className={`text-lg font-black ${info.color}`}>{gradeCount[g]}</div>
                <div className="text-[10px] text-zinc-500 font-bold">Grade {g}</div>
                <div className="mt-1.5 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${info.dot}`} style={{ width: `${pct}%` }}></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Popular Chapters */}
      <div className="bg-zinc-900/50 rounded-2xl border border-zinc-800/50 p-5">
        <h3 className="text-sm font-bold text-white mb-3">Statistik Per Bab</h3>
        <div className="space-y-2">
          {Object.entries(chapterStats).sort((a, b) => b[1].count - a[1].count).map(([ch, stat]) => (
            <div key={ch} className="flex items-center justify-between py-1.5 border-b border-zinc-800/30 last:border-0">
              <span className="text-xs text-zinc-300 font-medium truncate flex-1">Bab {ch} — {CHAPTER_TITLES[ch] || '...'}</span>
              <span className="text-xs text-zinc-500 ml-2">{stat.count}x</span>
              <span className="text-xs text-blue-400 font-bold ml-3">avg {Math.round(stat.totalScore / stat.count)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-zinc-900/50 rounded-2xl border border-zinc-800/50 p-5">
        <h3 className="text-sm font-bold text-white mb-3">Aktivitas Terbaru</h3>
        {recentItems.length === 0 ? (
          <p className="text-xs text-zinc-500">Belum ada data.</p>
        ) : (
          <div className="space-y-2">
            {recentItems.map(item => {
              const info = getGradeInfo(item.grade);
              const d = new Date(item.created_at);
              const displayName = item.profiles?.full_name || item.profiles?.email?.split('@')[0] || 'Anonim';
              const shortId = item.device_id?.slice(-3) || '???';
              return (
                <div key={item.id} className="flex items-center gap-3 py-1.5 border-b border-zinc-800/30 last:border-0">
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${info.dot}`}></div>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs text-white font-medium">{displayName}</span>
                    <span className="text-[10px] text-zinc-600 ml-1">#{shortId}</span>
                    <span className="text-[10px] text-zinc-500 ml-2">Bab {item.chapter}</span>
                  </div>
                  <span className={`text-xs font-bold ${info.color}`}>{item.score}</span>
                  <span className="text-[10px] text-zinc-600">{d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── RESULTS PANEL ──────────────────────────────────────────────
function ResultsPanel({ history, onDeleteOne, onDeleteAll }) {
  const gabunganResults = history.filter(h => h.chapter === 99);
  const regularResults = history.filter(h => h.chapter !== 99);

  const renderRow = (item, isGabungan = false) => {
    const info = getGradeInfo(item.grade);
    const d = new Date(item.created_at);
    const displayName = item.profiles?.full_name || item.profiles?.email?.split('@')[0] || 'Anonim';
    const shortId = item.device_id?.slice(-3) || '???';

    return (
      <div key={item.id} className={`rounded-xl border p-4 flex items-center gap-4 ${isGabungan ? 'bg-amber-500/5 border-amber-500/15' : 'bg-zinc-900/50 border-zinc-800/40'}`}>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center border font-black text-sm flex-shrink-0 ${info.bg} ${info.color}`}>
          {item.grade}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <User size={12} className="text-zinc-500" />
            <span className="text-sm font-bold text-white truncate">{displayName}</span>
            <span className="text-[10px] text-zinc-600 font-mono">#{shortId}</span>
          </div>
          <div className="flex items-center gap-2 mt-1 text-[10px] text-zinc-500 flex-wrap">
            <span>{item.chapter === 99 ? 'Gabungan' : `Bab ${item.chapter}`}</span>
            <span>•</span>
            <span className="flex items-center gap-0.5"><CheckCircle2 size={10} className="text-green-500" /> {item.correct_count}</span>
            <span className="flex items-center gap-0.5"><XCircle size={10} className="text-red-500" /> {item.wrong_count}</span>
            <span>•</span>
            <span className="flex items-center gap-0.5"><Timer size={10} /> {formatTime(item.time_spent || 0)}</span>
          </div>
        </div>
        <div className="text-right flex-shrink-0">
          <div className={`text-lg font-black ${info.color}`}>{item.score}</div>
          <div className="text-[9px] text-zinc-600">
            {d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })} {d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
        <button onClick={() => onDeleteOne(item.id)} className="p-2 rounded-lg text-zinc-600 hover:text-red-400 hover:bg-red-400/10 transition-all flex-shrink-0" title="Hapus">
          <Trash2 size={14} />
        </button>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-extrabold text-white">Hasil Kuis</h2>
        {history.length > 0 && (
          <button onClick={onDeleteAll} className="text-[11px] text-red-400 bg-red-400/10 px-3 py-1.5 rounded-full border border-red-400/20 active:bg-red-400/20 font-bold flex items-center gap-1">
            <Trash2 size={11} /> Hapus Semua
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="text-center py-16">
          <ClipboardList size={40} className="text-zinc-700 mx-auto mb-3" />
          <p className="text-zinc-500 text-sm">Belum ada data kuis.</p>
        </div>
      ) : (
        <>
          {/* SOAL GABUNGAN Section */}
          {gabunganResults.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Zap size={14} className="text-amber-400" />
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">Soal Gabungan</span>
                <span className="text-[10px] text-zinc-600">({gabunganResults.length})</span>
              </div>
              <div className="space-y-2">
                {gabunganResults.map(item => renderRow(item, true))}
              </div>
            </div>
          )}

          {/* Separator */}
          {gabunganResults.length > 0 && regularResults.length > 0 && (
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-zinc-800/50"></div>
              <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">Per Bab</span>
              <div className="h-px flex-1 bg-zinc-800/50"></div>
            </div>
          )}

          {/* REGULAR Section */}
          {regularResults.length > 0 && (
            <div>
              {gabunganResults.length > 0 && (
                <div className="flex items-center gap-2 mb-3">
                  <ClipboardList size={14} className="text-blue-400" />
                  <span className="text-xs font-bold text-blue-300 uppercase tracking-wider">Kuis Per Bab</span>
                  <span className="text-[10px] text-zinc-600">({regularResults.length})</span>
                </div>
              )}
              <div className="space-y-2">
                {regularResults.map(item => renderRow(item, false))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ─── SECURITY PANEL ─────────────────────────────────────────────
function SecurityPanel() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-extrabold text-white">Keamanan</h2>
      <div className="bg-zinc-900/50 rounded-2xl border border-zinc-800/50 p-6 text-center">
        <Lock size={40} className="text-zinc-600 mx-auto mb-3" />
        <h3 className="text-base font-bold text-white mb-1">Segera Hadir</h3>
        <p className="text-xs text-zinc-500 max-w-xs mx-auto">Fitur keamanan seperti login admin, rate-limiting, dan audit log akan tersedia di versi selanjutnya.</p>
      </div>
    </div>
  );
}

// ─── SETTINGS PANEL ─────────────────────────────────────────────
function SettingsPanel() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-extrabold text-white">Pengaturan</h2>
      <div className="bg-zinc-900/50 rounded-2xl border border-zinc-800/50 p-6 text-center">
        <Settings size={40} className="text-zinc-600 mx-auto mb-3" />
        <h3 className="text-base font-bold text-white mb-1">Segera Hadir</h3>
        <p className="text-xs text-zinc-500 max-w-xs mx-auto">Pengaturan timer, jumlah soal, dan konfigurasi bab akan tersedia di versi selanjutnya.</p>
      </div>
    </div>
  );
}

// ─── MAIN ADMIN PAGE ────────────────────────────────────────────
export default function AdminPage() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeMenu, setActiveMenu] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const loadHistory = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAllHistory();
      setHistory(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadHistory(); }, []);

  const handleDeleteAll = async () => {
    if (!window.confirm('Yakin ingin menghapus SEMUA riwayat kuis dari database?')) return;
    try {
      await deleteAllHistoryFromServer();
      setHistory([]);
    } catch (err) {
      alert('Gagal menghapus: ' + err.message);
    }
  };

  const handleDeleteOne = async (id) => {
    if (!window.confirm('Hapus riwayat ini?')) return;
    try {
      await deleteHistoryByIdApi(id);
      setHistory(prev => prev.filter(h => h.id !== id));
    } catch (err) {
      alert('Gagal menghapus: ' + err.message);
    }
  };

  const renderPanel = () => {
    if (loading) return <div className="flex justify-center py-20"><div className="text-zinc-400 animate-pulse text-sm">Memuat data...</div></div>;
    if (error) return <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 text-center"><p className="text-red-400 text-sm">{error}</p><button onClick={loadHistory} className="text-red-300 underline text-xs mt-2">Coba lagi</button></div>;

    switch (activeMenu) {
      case 'overview': return <OverviewPanel history={history} />;
      case 'results': return <ResultsPanel history={history} onDeleteOne={handleDeleteOne} onDeleteAll={handleDeleteAll} />;
      case 'security': return <SecurityPanel />;
      case 'settings': return <SettingsPanel />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-300 font-sans flex relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-[-5%] left-[-5%] w-80 h-80 bg-purple-600/8 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 bg-blue-600/6 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 z-40 md:hidden" onClick={() => setSidebarOpen(false)}></div>
      )}

      {/* Sidebar */}
      <aside className={`fixed md:sticky top-0 left-0 h-screen w-64 bg-zinc-950/80 backdrop-blur-2xl border-r border-zinc-800/50 flex flex-col z-50 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        {/* Logo */}
        <div className="p-5 border-b border-zinc-800/50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
              <Shield size={18} className="text-purple-400" />
            </div>
            <div>
              <h1 className="text-sm font-extrabold text-white tracking-tight">Admin Panel</h1>
              <p className="text-[10px] text-zinc-600">Boyman Quiz</p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-3 space-y-1">
          {MENU.map(item => {
            const isActive = activeMenu === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { setActiveMenu(item.id); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-purple-500/10 text-purple-300 border border-purple-500/20'
                    : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200 border border-transparent'
                }`}
              >
                <item.icon size={18} />
                {item.label}
                {isActive && <ChevronRight size={14} className="ml-auto text-purple-500/50" />}
              </button>
            );
          })}
        </nav>

        {/* Refresh */}
        <div className="p-3 border-t border-zinc-800/50">
          <button
            onClick={loadHistory}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-400 text-xs font-bold disabled:opacity-50 active:bg-zinc-800"
          >
            <RefreshCcw size={14} className={loading ? 'animate-spin' : ''} />
            Refresh Data
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-h-screen relative z-10">
        {/* Mobile Top Bar */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-zinc-800/50 bg-zinc-950/50 backdrop-blur-xl sticky top-0 z-30">
          <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400">
            <LayoutDashboard size={18} />
          </button>
          <span className="text-sm font-bold text-white">{MENU.find(m => m.id === activeMenu)?.label}</span>
          <button onClick={loadHistory} disabled={loading} className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400">
            <RefreshCcw size={16} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>

        <div className="p-5 md:p-8 max-w-4xl">
          {renderPanel()}
        </div>
      </main>
    </div>
  );
}
