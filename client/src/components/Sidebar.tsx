import { Button } from "@/components/ui/button";
import { Home, Clock, Activity, Shield, HelpCircle } from "lucide-react";

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  onToggleSecurity: () => void;
  onToggleJargon: () => void;
  isJargonActive: boolean;
}

export default function Sidebar({
  activeSection,
  onSectionChange,
  onToggleSecurity,
  onToggleJargon,
  isJargonActive,
}: SidebarProps) {
  const navigationItems = [
    { id: "snapshot", label: "Health Snapshot", icon: Home, shortcut: "1" },
    { id: "timeline", label: "Health Timeline", icon: Clock, shortcut: "2" },
    { id: "wearables", label: "Wearable Insights", icon: Activity, shortcut: "3" },
  ];

  return (
    <aside className="w-64 bg-card border-r border-border flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Biogram</h1>
            <p className="text-xs text-muted-foreground">Your Health Story</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant="ghost"
              className={`w-full justify-between h-12 px-4 ${
                activeSection === item.id ? "section-active" : ""
              }`}
              onClick={() => onSectionChange(item.id)}
              data-testid={`nav-${item.id}`}
            >
              <div className="flex items-center space-x-3">
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </div>
              <span className="kbd">{item.shortcut}</span>
            </Button>
          );
        })}

        <div className="pt-4 mt-4 border-t border-border">
          <Button
            variant="ghost"
            className={`w-full justify-between h-12 px-4 ${
              isJargonActive ? "section-active" : ""
            }`}
            onClick={onToggleJargon}
            data-testid="jargon-toggle"
          >
            <div className="flex items-center space-x-3">
              <HelpCircle className="w-5 h-5" />
              <span className="font-medium">Jargon Translator</span>
            </div>
            <span className="kbd">T</span>
          </Button>
        </div>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center space-x-3">
          <img 
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100" 
            alt="User profile" 
            className="w-10 h-10 rounded-full" 
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">Sarah Johnson</p>
            <p className="text-xs text-muted-foreground truncate">Last sync: 2m ago</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSecurity}
            title="Security Settings"
            data-testid="security-button"
          >
            <Shield className="w-5 h-5 text-muted-foreground" />
          </Button>
        </div>
      </div>
    </aside>
  );
}
