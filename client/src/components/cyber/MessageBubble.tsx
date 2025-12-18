import { motion } from "framer-motion";
import { Code, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

interface MessageBubbleProps {
  message: {
    id: string;
    text: string;
    type: "user" | "bot";
    code?: string;
    lang?: string;
  };
  onViewCode: (code: string, lang: string) => void;
}

export default function MessageBubble({ message, onViewCode }: MessageBubbleProps) {
  const isUser = message.type === "user";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn(
        "flex w-full mb-4",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[85%] px-5 py-3 rounded-[1.25rem] text-lg leading-relaxed relative overflow-hidden group transition-all duration-300",
          isUser
            ? "bg-[rgba(252,238,10,0.08)] text-cyber-text rounded-br-sm shadow-[0_4px_15px_rgba(252,238,10,0.05)] border-r-2 border-[rgba(252,238,10,0.4)]"
            : "bg-[rgba(0,240,255,0.08)] text-cyber-text rounded-bl-sm shadow-[0_4px_15px_rgba(0,240,255,0.05)] border-l-2 border-[rgba(0,240,255,0.4)]"
        )}
      >
        <p className="whitespace-pre-wrap">{message.text}</p>
        
        {message.code && (
          <button
            onClick={() => onViewCode(message.code!, message.lang || "javascript")}
            className="mt-3 flex items-center gap-2 px-3 py-1.5 text-sm font-bold border border-cyber-secondary text-cyber-secondary hover:bg-cyber-secondary hover:text-cyber-bg transition-all duration-200 shadow-[0_0_15px_transparent] hover:shadow-[0_0_15px_var(--cyber-secondary)] cursor-pointer"
          >
            <Code className="w-4 h-4" />
            VIEW SOURCE
          </button>
        )}
      </div>
    </motion.div>
  );
}
