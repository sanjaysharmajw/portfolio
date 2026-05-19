"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 1900);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="ld"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="ld-t">SANJAY SHARMA</div>
          <div className="ld-bar">
            <div className="ld-fill" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
