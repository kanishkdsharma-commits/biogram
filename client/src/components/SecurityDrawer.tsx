import { motion, AnimatePresence } from "framer-motion";
import { X, Lock, Shield, CheckCircle, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

interface SecurityDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SecurityDrawer({ isOpen, onClose }: SecurityDrawerProps) {
  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="security-overlay active fixed inset-0 bg-black/50 z-[999]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            data-testid="security-overlay"
          />
        )}
      </AnimatePresence>

      {/* Drawer */}
      <motion.div
        className={`security-drawer fixed top-0 right-0 w-96 h-full bg-background border-l border-border shadow-xl z-[1000] overflow-y-auto ${isOpen ? 'open' : ''}`}
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? 0 : "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        data-testid="security-drawer"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">Security & Privacy</h2>
            <Button variant="ghost" size="icon" onClick={onClose} data-testid="close-security-drawer">
              <X className="w-6 h-6" />
            </Button>
          </div>

          <div className="space-y-6">
            {/* Encryption Section */}
            <motion.div
              className="bg-muted rounded-lg p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              data-testid="encryption-section"
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                  <Lock className="w-6 h-6 text-secondary-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1">Encryption at Rest & in Transit</h3>
                  <p className="text-sm text-muted-foreground">AES-256 encryption for stored data, TLS 1.3 for all transmissions</p>
                  <div className="mt-3 flex items-center space-x-2">
                    <div className="flex-1 h-2 bg-secondary/20 rounded-full overflow-hidden">
                      <div className="h-full w-full bg-secondary rounded-full"></div>
                    </div>
                    <Badge variant="secondary" className="text-xs">Active</Badge>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Audit Trail */}
            <motion.div
              className="bg-muted rounded-lg p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              data-testid="audit-section"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-foreground">Audit Trail</h3>
                <Switch defaultChecked data-testid="audit-toggle" />
              </div>
              <p className="text-sm text-muted-foreground">Track all access and modifications to your health data</p>
              <div className="mt-4 space-y-2">
                <div className="flex items-center text-xs text-muted-foreground">
                  <div className="w-2 h-2 bg-secondary rounded-full mr-2"></div>
                  <span>Last accessed: 2 minutes ago</span>
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <div className="w-2 h-2 bg-secondary rounded-full mr-2"></div>
                  <span>Total events logged: 47</span>
                </div>
              </div>
            </motion.div>

            {/* Data Minimization */}
            <motion.div
              className="bg-muted rounded-lg p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              data-testid="data-minimization-section"
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1">Data Minimization</h3>
                  <p className="text-sm text-muted-foreground">We only collect and store what's necessary for your health insights</p>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <div className="text-center p-2 bg-background rounded">
                      <div className="text-lg font-bold text-secondary">94%</div>
                      <div className="text-xs text-muted-foreground">Data Relevant</div>
                    </div>
                    <div className="text-center p-2 bg-background rounded">
                      <div className="text-lg font-bold text-primary">30d</div>
                      <div className="text-xs text-muted-foreground">Auto-Purge</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Access Controls */}
            <motion.div
              className="border-t border-border pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              data-testid="access-controls-section"
            >
              <h3 className="font-semibold text-foreground mb-3">Data Access Controls</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <div className="font-medium text-sm">Third-party Sharing</div>
                    <div className="text-xs text-muted-foreground">Control data sharing with external services</div>
                  </div>
                  <Switch data-testid="third-party-toggle" />
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <div className="font-medium text-sm">Anonymous Analytics</div>
                    <div className="text-xs text-muted-foreground">Help improve Biogram with anonymous usage data</div>
                  </div>
                  <Switch defaultChecked data-testid="analytics-toggle" />
                </div>
              </div>
            </motion.div>

            {/* Compliance Note */}
            <motion.div
              className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              data-testid="compliance-note"
            >
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="text-sm text-foreground">
                  <p className="font-medium mb-1">HIPAA-Ready Architecture</p>
                  <p className="text-muted-foreground">Our security infrastructure is designed with HIPAA compliance standards in mind. Full compliance certification in progress.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
