import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Custom hook untuk hitung mundur timer quiz berdasarkan absolute endTime
 * @param {Object} options
 * @param {number} options.endTime - Timestamp kapan waktu habis (Date.now() + duration * 1000)
 * @param {boolean} options.autoStart - Apakah timer langsung mulai
 * @param {Function} options.onTimeUp - Callback ketika waktu habis
 */
export function useTimer({ endTime, autoStart = false, onTimeUp } = {}) {
  // Hitung sisa waktu dari sekarang ke endTime
  const getRemainingTime = useCallback(() => {
    if (!endTime) return 0;
    const remaining = Math.floor((endTime - Date.now()) / 1000);
    return Math.max(0, remaining);
  }, [endTime]);

  const [timeLeft, setTimeLeft] = useState(getRemainingTime());
  const [isRunning, setIsRunning] = useState(autoStart);
  const intervalRef = useRef(null);
  const onTimeUpRef = useRef(onTimeUp);

  onTimeUpRef.current = onTimeUp;

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const start = useCallback(() => {
    setIsRunning(true);
    setTimeLeft(getRemainingTime()); // Update langsung saat mulai
  }, [getRemainingTime]);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const reset = useCallback(() => {
    clearTimer();
    setIsRunning(false);
    setTimeLeft(0);
  }, [clearTimer]);

  // Efek untuk mereset timeLeft jika endTime dari Store berubah
  useEffect(() => {
    setTimeLeft(getRemainingTime());
  }, [endTime, getRemainingTime]);

  useEffect(() => {
    if (!isRunning || !endTime) {
      clearTimer();
      return;
    }

    intervalRef.current = setInterval(() => {
      const remaining = getRemainingTime();
      setTimeLeft(remaining);

      if (remaining <= 0) {
        clearTimer();
        setIsRunning(false);
        if (onTimeUpRef.current) {
          onTimeUpRef.current();
        }
      }
    }, 1000);

    return () => clearTimer();
  }, [isRunning, endTime, getRemainingTime, clearTimer]);

  // Hitung waktu terpakai (Asumsi durasi asli adalah 603 detik)
  // Ini bisa disesuaikan kalau waktu terpakai butuh keakuratan absolut untuk API.
  const timeSpent = Math.max(0, 603 - timeLeft);

  return {
    timeLeft,
    timeSpent,
    isRunning,
    start,
    pause,
    reset,
  };
}
