import { useState, useRef, useEffect } from "react";
import { MessageBubble } from "./MessageBubble";
import { TypingArea } from "./TypingArea";
import { motion, AnimatePresence } from "framer-motion";

// 1. Yahan se 'export' hata diya hai
const ChatInterface = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'SYSTEM INITIALIZED. NEURAL LINK ESTABLISHED. HOW CAN I ASSIST?' }
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen max-w-5xl mx-auto p-4 md:p-6">
      {/* Header Area */}
      <div className="mb-6 flex justify-between items-center border-b border-cyber-secondary/20 pb-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl text-cyber-secondary neon-text-cyan italic tracking-tighter">
            CYBER-AI <span className="text-xs text-cyber-primary neon-text-yellow ml-2">v11.1</span>
          </h1>
          <p className="text-[10px] tracking-[0.3em] text-slate-500 uppercase">Neural Processing Unit Active</p>
        </div>
      </div>

      {/* Messages Window */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto mb-4 space-y-4 pr-2 custom-scrollbar"
      >
        <AnimatePresence mode="popLayout">
          {messages.map((msg, index) => (
            <MessageBubble key={index} role={msg.role as any} content={msg.content} />
          ))}
        </AnimatePresence>
      </div>

      {/* Input Area */}
      <div className="cyber-glass rounded-2xl p-2 neon-border-cyan">
        <TypingArea onSend={(text: string) => setMessages([...messages, { role: 'user', content: text }])} />
      </div>
    </div>
  );
};

// 2. File ke end mein ye Default Export add kiya hai
export default ChatInterface;