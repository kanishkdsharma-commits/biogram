import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "@/components/Sidebar";
import HealthSnapshot from "@/components/HealthSnapshot";
import HealthTimeline from "@/components/HealthTimeline";
import WearableInsights from "@/components/WearableInsights";
import SecurityDrawer from "@/components/SecurityDrawer";
import QuickNoteButton from "@/components/QuickNoteButton";
import useKeyboardShortcuts from "@/hooks/useKeyboardShortcuts";

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState("snapshot");
  const [isSecurityDrawerOpen, setIsSecurityDrawerOpen] = useState(false);

  useKeyboardShortcuts({
    onSection1: () => setActiveSection("snapshot"),
    onSection2: () => setActiveSection("timeline"),
    onSection3: () => setActiveSection("wearables"),
  });

  const toggleSecurityDrawer = () => {
    setIsSecurityDrawerOpen(prev => !prev);
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case "snapshot":
        return <HealthSnapshot />;
      case "timeline":
        return <HealthTimeline />;
      case "wearables":
        return <WearableInsights />;
      default:
        return <HealthSnapshot />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        onToggleSecurity={toggleSecurityDrawer}
      />
      
      <main className="flex-1 overflow-y-auto bg-background">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderActiveSection()}
          </motion.div>
        </AnimatePresence>
      </main>

      <SecurityDrawer
        isOpen={isSecurityDrawerOpen}
        onClose={() => setIsSecurityDrawerOpen(false)}
      />

      {/* Quick Note Floating Button */}
      <QuickNoteButton />

      {/* Keyboard Shortcuts Hint */}
      <motion.div 
        className="fixed bottom-6 right-6 bg-card border border-border rounded-lg shadow-lg p-4 max-w-xs"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        data-testid="keyboard-shortcuts-hint"
      >
        <div className="flex items-start space-x-3">
          <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"></path>
          </svg>
          <div className="flex-1">
            <h4 className="font-semibold text-foreground text-sm mb-2">Keyboard Shortcuts</h4>
            <div className="space-y-1 text-xs text-muted-foreground">
              <div className="flex items-center justify-between">
                <span>Snapshot</span>
                <span className="kbd ml-2">1</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Timeline</span>
                <span className="kbd ml-2">2</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Wearables</span>
                <span className="kbd ml-2">3</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
