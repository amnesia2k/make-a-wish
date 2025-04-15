"use client";

import React, { useEffect, useState } from "react";
import ReactConfetti from "react-confetti";
import { useWindowSize } from "react-use";

export default function Confetti() {
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (width && height) {
      setShowConfetti(true);
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [width, height]);

  return showConfetti ? <ReactConfetti width={width} height={height} /> : null;
}
