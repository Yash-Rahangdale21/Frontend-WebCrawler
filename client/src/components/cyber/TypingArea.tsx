import { useState, useRef, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface TypingAreaProps {
  onSend: (text: string) => void;
  isTyping: boolean;
}

export default function TypingArea({ onSend, isTyping }: TypingAreaProps) {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = () => {
    if (!input.trim() || isTyping) return;
    onSend(input);
    setInput("");
    if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
    }
  };

  return (
    <div className="flex-shrink-0 p-6 bg-gradient-to-t from-cyber-bg via-cyber-bg to-transparent">
      <div className="relative max-w-4xl mx-auto bg-cyber-surface border border-[rgba(0,240,255,0.2)] backdrop-blur-md rounded-[1.25rem] p-2 flex items-end gap-2 min-h-[80px] shadow-[0_0_20px_rgba(0,0,0,0.3)]">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder="Enter command..."
          rows={1}
          className="flex-grow bg-transparent border-none outline-none resize-none text-cyber-text text-base p-3 max-h-[200px] font-body placeholder:text-gray-600 focus:ring-0"
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || isTyping}
          className={cn(
            "p-2 rounded-full transition-all duration-300 ease-out flex-shrink-0 mb-1",
            input.trim() && !isTyping
              ? "bg-cyber-primary text-cyber-bg scale-100 opacity-100 rotate-0 shadow-[0_0_10px_var(--cyber-primary)] hover:scale-110"
              : "bg-transparent text-gray-500 scale-75 opacity-0 rotate-45"
          )}
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
