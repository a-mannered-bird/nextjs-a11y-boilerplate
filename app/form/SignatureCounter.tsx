"use client";

import { useEffect, useState } from "react";

export default function () {
  const [count, setCount] = useState(0);
  const [milestone, setMilestone] = useState(0);
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const newSignatures = Math.round(Math.random() * 100);
      setCount((count) => {
        const nextCount = count + newSignatures;
        setMilestone((milestone) => {
          if (milestone + 10000 < nextCount) {
            setAnnouncement(`You have reached ${nextCount} signatures.`);
            return nextCount;
          }
          return milestone;
        });
        return nextCount;
      });
    }, 200);

    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <>
      <p aria-hidden="true">{count.toLocaleString("de-DE")} signatures</p>
      <p role="status" className="visually-hidden">
        {announcement}
      </p>
    </>
  );
}
