import { Send, Terminal } from "lucide-react";
import { useState } from "react";

interface TypingAreaProps {
  onSend: (text: string) => void;
  isLoading?: boolean;
}

export const TypingArea = ({ onSend, isLoading }: TypingAreaProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleAction = () => {
    if (inputValue.trim() && !isLoading) {
      onSend(inputValue);
      setInputValue("");
    }
  };

  return (
    <div className="relative group p-2">
      <div className="relative flex items-center">
        <div className="absolute left-4 text-cyber-secondary/50">
          <Terminal size={18} />
        </div>
        
        <input 
          type="text" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="ENTER NEURAL COMMAND..."
          className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-16 focus:outline-none focus:border-cyber-secondary/50 focus:ring-1 focus:ring-cyber-secondary/50 transition-all text-cyan-50 placeholder:text-slate-600 tracking-wider"
          onKeyDown={(e) => e.key === 'Enter' && handleAction()}
        />
        
        <button 
          onClick={handleAction}
          disabled={isLoading || !inputValue.trim()}
          className="absolute right-2 p-3 bg-cyber-secondary hover:bg-cyan-400 text-black rounded-lg transition-all shadow-lg shadow-cyan-500/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};