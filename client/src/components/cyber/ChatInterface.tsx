import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MessageBubble from "./MessageBubble";
import TypingArea from "./TypingArea";
import { playSound } from "@/lib/sounds";

interface Message {
  id: string;
  text: string;
  type: "user" | "bot";
  code?: string;
  lang?: string;
}

interface ChatInterfaceProps {
  onViewCode: (code: string, lang: string) => void;
  resetTrigger: number; // Increment to reset
}

const RESPONSES: Record<string, string> = {
  "css code": "Here is a CSS animation example:\n```css\n@keyframes example-anim {\n  from { opacity: 0; }\n  to { opacity: 1; }\n}\n.element {\n  animation: example-anim 1s ease-in-out;\n}\n```",
  "js code": "Request: Summation Function\n```javascript\n// A simple function to sum array elements\nconst sumArray = (arr) => {\n  return arr.reduce((total, current) => total + current, 0);\n}\nconsole.log(sumArray([10, 20, 30]));\n```",
  "default": "I am CYBER-AI v11.1. I can assist with code generation and system analysis. Try asking for 'JS Code' or 'CSS Code'.",
};

export default function ChatInterface({ onViewCode, resetTrigger }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showHeader, setShowHeader] = useState(true);

  // Reset chat when trigger changes
  useEffect(() => {
    if (resetTrigger > 0) {
        setMessages([]);
        setShowHeader(true);
    }
  }, [resetTrigger]);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (text: string) => {
    playSound("send");
    setIsTyping(true);
    
    if (showHeader) setShowHeader(false);

    const newUserMsg: Message = {
      id: Date.now().toString(),
      text,
      type: "user",
    };

    setMessages((prev) => [...prev, newUserMsg]);

    // Simulate delay
    setTimeout(() => {
        const lowerText = text.toLowerCase();
        let responseKey = Object.keys(RESPONSES).find((k) => lowerText.includes(k));
        
        // If not found, check if it contains "code" generically or default
        if (!responseKey) responseKey = "default";

        const rawResponse = RESPONSES[responseKey];
        
        // Parse code blocks roughly
        const codeMatch = rawResponse.match(/```(\w+)?\n([\s\S]*?)```/);
        let botMsg: Message;

        if (codeMatch) {
            const lang = codeMatch[1] || 'javascript';
            const code = codeMatch[2];
            const cleanText = rawResponse.replace(/```[\s\S]*?```/, "").trim();
            
            botMsg = {
                id: (Date.now() + 1).toString(),
                text: cleanText || "Here is the requested code:",
                type: "bot",
                code,
                lang
            };
        } else {
            botMsg = {
                id: (Date.now() + 1).toString(),
                text: rawResponse,
                type: "bot"
            };
        }

        setMessages((prev) => [...prev, botMsg]);
        setIsTyping(false);
        playSound("send"); // Maybe a different sound for receive? reuse send for now
    }, 1500);
  };

  return (
    <div className="flex flex-col flex-grow h-full overflow-hidden relative">
      <div 
        ref={scrollRef}
        className="flex-grow overflow-y-auto p-6 scroll-smooth"
      >
        <div className="max-w-4xl mx-auto w-full min-h-full flex flex-col">
          
          <AnimatePresence>
            {showHeader && (
              <motion.header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8 mt-12 text-center"
              >
                <h1 className="text-4xl md:text-6xl font-display text-cyber-primary text-shadow-primary tracking-widest">
                  CYBER-AI
                </h1>
                <p className="mt-4 text-cyber-secondary font-body tracking-wider text-lg opacity-80">
                   NEURAL INTERFACE V11.1
                </p>
              </motion.header>
            )}
          </AnimatePresence>

          <div className="flex-grow space-y-6 pb-4">
            {messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} onViewCode={onViewCode} />
            ))}
            
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex justify-start w-full"
              >
                <div className="bg-[rgba(0,240,255,0.08)] px-5 py-3 rounded-[1.25rem] rounded-bl-sm border-l-2 border-[rgba(0,240,255,0.4)]">
                   <span className="flex gap-1">
                     <span className="w-2 h-2 bg-cyber-secondary rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                     <span className="w-2 h-2 bg-cyber-secondary rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                     <span className="w-2 h-2 bg-cyber-secondary rounded-full animate-bounce"></span>
                   </span>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <TypingArea onSend={handleSend} isTyping={isTyping} />
    </div>
  );
}
