import { useState, useEffect } from "react";

export function useRatings(productKey: string) {
  const storageKey = `rating_${productKey}`;

  const [rating, setRating] = useState<number>(0);
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const data = localStorage.getItem(storageKey);
    if (data) {
      const parsed = JSON.parse(data);
      setRating(parsed.rating);
      setCount(parsed.count);
    }
  }, [storageKey]);

  const handleRate = (star: number) => {
    // compute new average
    const newCount = count + 1;
    const newRating = ((rating * count) + star) / newCount;

    setRating(newRating);
    setCount(newCount);
    localStorage.setItem(storageKey, JSON.stringify({ rating: newRating, count: newCount }));
  };

  return { rating, count, handleRate };
}
