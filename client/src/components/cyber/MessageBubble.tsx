import { motion } from "framer-motion";

export const MessageBubble = ({ role, content }: { role: 'user' | 'assistant', content: string }) => {
  const isBot = role === 'assistant';

  return (
    <motion.div 
      initial={{ opacity: 0, x: isBot ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`flex ${isBot ? 'justify-start' : 'justify-end'} w-full`}
    >
      <div className={`max-w-[85%] p-4 rounded-xl relative ${
        isBot 
        ? 'cyber-glass border-l-4 border-l-cyber-secondary text-cyan-50' 
        : 'bg-cyber-secondary/10 border border-cyber-secondary/30 text-white ml-12'
      }`}>
        {/* Decorative corner for bot */}
        {isBot && <div className="absolute top-0 left-0 w-2 h-2 bg-cyber-secondary shadow-[0_0_8px_#00f0ff]" />}
        
        <p className="text-sm font-light leading-relaxed tracking-wide">{content}</p>
        
        <div className={`text-[9px] mt-2 uppercase tracking-widest opacity-50 font-bold ${isBot ? 'text-cyber-secondary' : 'text-cyber-primary'}`}>
          {isBot ? "// AI_LOG_RESPONSE" : "// USER_INPUT"}
        </div>
      </div>
    </motion.div>
  );
};