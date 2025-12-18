import { useState } from "react";
import { Menu, Plus, HelpCircle, History, Settings, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface SidebarProps {
  onResetChat: () => void;
  onOpenAbout: () => void;
}

export default function Sidebar({ onResetChat, onOpenAbout }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(window.innerWidth > 768);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const menuItems = [
    { icon: HelpCircle, label: "Help" },
    { icon: History, label: "Activity" },
    { icon: Settings, label: "Settings" },
  ];

  return (
    <aside
      className={cn(
        "relative flex flex-col shrink-0 h-full p-4 transition-[width] duration-300 ease-in-out border-r border-[rgba(0,240,255,0.2)] bg-cyber-surface backdrop-blur-md shadow-[5px_0_25px_rgba(0,0,0,0.3)] z-50",
        isOpen ? "w-64" : "w-20"
      )}
    >
      <button
        onClick={toggleSidebar}
        className="flex items-center gap-4 h-11 px-3 rounded-lg bg-transparent text-cyber-secondary hover:bg-[rgba(0,240,255,0.1)] hover:text-cyber-text hover:shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all mb-8 justify-center w-full"
      >
        <Menu className="w-6 h-6" />
      </button>

      <button
        onClick={onResetChat}
        className={cn(
          "flex items-center gap-4 h-11 px-3 rounded-lg bg-transparent text-cyber-secondary hover:bg-[rgba(0,240,255,0.1)] hover:text-cyber-text hover:shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all mb-4 overflow-hidden whitespace-nowrap",
          isOpen ? "w-full justify-start" : "w-12 justify-center mx-auto"
        )}
      >
        <Plus className="w-6 h-6 shrink-0" />
        <AnimatePresence>
          {isOpen && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              className="font-body font-bold"
            >
              New Chat
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      <button
        id="about-btn"
        onClick={onOpenAbout}
        className={cn(
          "flex items-center gap-4 h-11 px-3 rounded-lg bg-transparent text-cyber-secondary hover:bg-[rgba(0,240,255,0.1)] hover:text-cyber-text hover:shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all mb-4 overflow-hidden whitespace-nowrap",
          isOpen ? "w-full justify-start" : "w-12 justify-center mx-auto"
        )}
      >
        <Info className="w-6 h-6 shrink-0" />
        <AnimatePresence>
          {isOpen && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              className="font-body font-bold"
            >
              About Project
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      <div className="flex-grow overflow-y-auto" />

      <div className="mt-auto space-y-2">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className={cn(
              "flex items-center gap-4 h-11 px-3 rounded-lg bg-transparent text-cyber-secondary hover:bg-[rgba(0,240,255,0.1)] hover:text-cyber-text hover:shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all overflow-hidden whitespace-nowrap",
              isOpen ? "w-full justify-start" : "w-12 justify-center mx-auto"
            )}
          >
            <item.icon className="w-6 h-6 shrink-0" />
            <AnimatePresence>
              {isOpen && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  className="font-body font-bold"
                >
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        ))}
      </div>
    </aside>
  );
}
