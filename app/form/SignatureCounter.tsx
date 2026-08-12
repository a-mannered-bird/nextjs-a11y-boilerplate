"use client";

import { useEffect, useRef, useState } from "react";

const MILESTONE_INTERVAL = 10_000;

export function SignatureCounter() {
  const [count, setCount] = useState(0);
  const [announcement, setAnnouncement] = useState("");
  const totalRef = useRef(0);
  const lastAnnouncedRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const next = totalRef.current + Math.round(Math.random() * 100);
      totalRef.current = next;
      setCount(next);

      if (next >= lastAnnouncedRef.current + MILESTONE_INTERVAL) {
        lastAnnouncedRef.current = next;
        setAnnouncement(`${next.toLocaleString("de-DE")} signatures reached.`);
      }
    }, 200);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <p>{count.toLocaleString("de-DE")} signatures</p>
      <p role="status" className="visually-hidden">
        {announcement}
      </p>
    </>
  );
}
