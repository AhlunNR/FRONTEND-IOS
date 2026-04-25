import React from 'react';
import { formatTime } from '@/utils/formatTime';

/**
 * Komponen Timer yang menampilkan sisa waktu
 */
export default function Timer({ timeLeft, isRunning }) {
  const isUrgent = timeLeft <= 60; // Kurang dari 1 menit
  const isCritical = timeLeft <= 30; // Kurang dari 30 detik

  return (
    <div
      className={`font-mono font-bold px-3 py-1 rounded-full text-sm ${
        isCritical
          ? 'bg-red-100 text-red-700 animate-pulse'
          : isUrgent
          ? 'bg-orange-100 text-orange-700'
          : 'bg-green-100 text-green-700'
      }`}
    >
      {formatTime(timeLeft)}
    </div>
  );
}
