import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playSound } from "@/lib/sounds";

interface UnlockScreenProps {
  onUnlock: () => void;
}

export default function UnlockScreen({ onUnlock }: UnlockScreenProps) {
  const [isVisible, setIsVisible] = useState(true);

  const handleUnlock = () => {
    playSound("click");
    playSound("boot");
    setIsVisible(false);
    setTimeout(onUnlock, 500); // Wait for animation
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center"
        >
          <motion.button
            whileHover={{ 
                scale: 1.05, 
                backgroundColor: "var(--cyber-primary)", 
                color: "#000",
                boxShadow: "0 0 25px var(--cyber-primary)"
            }}
            whileTap={{ scale: 0.95 }}
            onClick={handleUnlock}
            className="font-display text-2xl px-8 py-4 border-2 border-cyber-primary text-cyber-primary bg-transparent cursor-pointer transition-colors duration-300 text-shadow-primary tracking-widest uppercase"
          >
            Enter the Spex
          </motion.button>
          
          {/* <p className="mt-6 text-sm text-gray-500 font-body tracking-wider animate-pulse">
            Automated Website-to-RAG AI Chatbot Generator

          </p> */}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
