import { useState } from "react";
import { motion } from "framer-motion";
import ParticlesBackground from "@/components/cyber/Particles";
import Sidebar from "@/components/cyber/Sidebar";
import ChatInterface from "@/components/cyber/ChatInterface";
import UnlockScreen from "@/components/cyber/UnlockScreen";
import { CodeModal, AboutModal } from "@/components/cyber/Modals";

export default function CyberpunkHome() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(0);
  
  // Modal States
  const [aboutOpen, setAboutOpen] = useState(false);
  const [codeModal, setCodeModal] = useState<{ isOpen: boolean; code: string; lang: string }>({
    isOpen: false,
    code: "",
    lang: "javascript"
  });

  const handleResetChat = () => {
    setResetTrigger(prev => prev + 1);
  };

  const handleViewCode = (code: string, lang: string) => {
    setCodeModal({ isOpen: true, code, lang });
  };

  return (
    <div className="relative w-full h-screen overflow-hidden font-body text-cyber-text selection:bg-cyber-secondary selection:text-cyber-bg">
      <ParticlesBackground />
      
      {!isUnlocked && <UnlockScreen onUnlock={() => setIsUnlocked(true)} />}

      <motion.div 
        className="flex h-full opacity-0"
        animate={{ opacity: isUnlocked ? 1 : 0 }}
        transition={{ duration: 1 }}
      >
        <Sidebar 
          onResetChat={handleResetChat} 
          onOpenAbout={() => setAboutOpen(true)}
        />
        
        <main className="flex-grow relative flex flex-col h-full overflow-hidden">
            <ChatInterface 
                onViewCode={handleViewCode} 
                resetTrigger={resetTrigger}
            />
        </main>
      </motion.div>

      {/* Modals */}
      <AboutModal 
        isOpen={aboutOpen} 
        onClose={() => setAboutOpen(false)} 
      />
      
      <CodeModal 
        isOpen={codeModal.isOpen} 
        onClose={() => setCodeModal(prev => ({ ...prev, isOpen: false }))} 
        code={codeModal.code}
        lang={codeModal.lang}
      />
    </div>
  );
}
