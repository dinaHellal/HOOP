import { useEffect, useState } from "react";

const END_DATE = new Date("2025-08-09T02:20:00"); // 8/8/2025 11:59 PM

export default function Banner() {
  const [timeLeft, setTimeLeft] = useState("");

  const updateCountdown = () => {
    const now = new Date().getTime();
    const diff = END_DATE.getTime() - now;

    if (diff <= 0) {
      setTimeLeft("Offer ended");
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
const NOTIFY_BEFORE_MINUTES = 1000;

    setTimeLeft(`${days} : ${hours} : ${minutes} : ${seconds}`);

if (diff <= NOTIFY_BEFORE_MINUTES  * 60 * 1000) {
  notifyMe();
}

  };

  const notifyMe = () => {
    if (Notification.permission === "granted") {
      new Notification("Hurry! Offer ends in 30 minutes.");
    }
  };

  useEffect(() => {
    // نطلب صلاحية الإشعار
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }

    updateCountdown();
    // تحديث كل ثانية بدل كل دقيقة ✨
    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);
  }, );

  return (
    <div className="flex justify-center">
      <p className="bg-white/35 text-amber-900 font-bold z-1000 p-1 text-center rounded-md w-full">
        Offer ends in: {timeLeft}
      </p>
    </div>
  );
}
