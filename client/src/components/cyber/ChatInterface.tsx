import { useState, useRef, useEffect } from "react";
import { MessageBubble } from "./MessageBubble";
import { TypingArea } from "./TypingArea";
import { motion, AnimatePresence } from "framer-motion";

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'SYSTEM INITIALIZED. NEURAL LINK ESTABLISHED. HOW CAN I ASSIST?' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logic to stay at bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isTyping]);

  // Unified send logic for both input field and quick action chips
  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    setMessages(prev => [...prev, { role: 'user', content: text }]);
    setIsTyping(true);

    // API Simulation (Replace with your actual fetch call later)
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `NEURAL DATA RETRIEVED: Processing command "${text.toUpperCase()}". All systems operational.` 
      }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-screen max-w-5xl mx-auto p-4 md:p-6 overflow-hidden">
      
      {/* Header Area */}
      <div className="mb-6 flex justify-between items-center border-b border-cyber-secondary/20 pb-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl text-cyber-secondary neon-text-cyan italic tracking-tighter">
            SPEX 
          </h1>
          <p className="text-[10px] tracking-[0.3em] text-white uppercase">Scrape the Web, Source the Truth</p>
        </div>
        <div className="flex items-center gap-2">
           <div className="w-2 h-2 rounded-full bg-cyber-secondary animate-pulse shadow-[0_0_8px_#00f0ff]" />
           <span className="text-[10px] text-cyber-secondary font-bold tracking-widest">ONLINE</span>
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
          
          {isTyping && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="flex justify-start mb-4"
            >
              <div className="cyber-glass px-4 py-2 rounded-xl border border-cyber-secondary/30">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-cyber-secondary rounded-full animate-bounce" />
                  <span className="w-1.5 h-1.5 bg-cyber-secondary rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 bg-cyber-secondary rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Quick Action Chips (Feature Upgrade) */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-2 no-scrollbar">
        {['SCAN DOMAIN', 'CRAWL DATA', 'SYSTEM STATUS', 'REBOOT LOGIC'].map((chip) => (
          <button 
            key={chip} 
            onClick={() => handleSendMessage(chip)}
            className="text-[10px] border border-cyber-secondary/40 px-4 py-1.5 rounded-full text-cyber-secondary hover:bg-cyber-secondary/20 hover:border-cyber-secondary transition-all whitespace-nowrap font-display tracking-wider bg-cyber-secondary/5"
          >
            {`[ ${chip} ]`}
          </button>
        ))}
      </div>

      {/* Input Area */}
      <div className="cyber-glass rounded-2xl p-2 neon-border-cyan mb-2">
        <TypingArea onSend={handleSendMessage} isLoading={isTyping} />
      </div>
      
      <p className="text-center text-[8px] text-slate-600 tracking-[0.4em] uppercase">
        End-to-End Neural Encryption Active
      </p>
    </div>
  );
};

export default ChatInterface;