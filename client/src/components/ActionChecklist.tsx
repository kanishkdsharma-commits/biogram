import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Activity, Heart, Pill, User, ChevronDown, ChevronRight, 
  Plus, AlertCircle, Clock, CheckCircle2 
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ActionItem {
  id: string;
  text: string;
  priority: "urgent" | "routine" | "follow-up";
  triggerType: "vital" | "wearable" | "medication" | "demographic";
  trigger: string;
  source: string;
  isCustom?: boolean;
}

interface ActionChecklistProps {
  actions: ActionItem[];
}

export default function ActionChecklist({ actions }: ActionChecklistProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [customActions, setCustomActions] = useState<ActionItem[]>([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newActionText, setNewActionText] = useState("");
  const [newActionPriority, setNewActionPriority] = useState<"urgent" | "routine" | "follow-up">("routine");

  // Load checked items and custom actions from localStorage
  useEffect(() => {
    const savedChecked = localStorage.getItem("checkedActionItems");
    const savedCustom = localStorage.getItem("customActionItems");
    
    if (savedChecked) {
      setCheckedItems(new Set(JSON.parse(savedChecked)));
    }
    
    if (savedCustom) {
      setCustomActions(JSON.parse(savedCustom));
    }
  }, []);

  // Save to localStorage whenever checked items change
  useEffect(() => {
    localStorage.setItem("checkedActionItems", JSON.stringify(Array.from(checkedItems)));
  }, [checkedItems]);

  // Save custom actions to localStorage
  useEffect(() => {
    localStorage.setItem("customActionItems", JSON.stringify(customActions));
  }, [customActions]);

  const allActions = [...actions, ...customActions];
  const uncheckedCount = allActions.filter(action => !checkedItems.has(action.id)).length;

  const handleToggle = (id: string) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(id)) {
      newChecked.delete(id);
    } else {
      newChecked.add(id);
    }
    setCheckedItems(newChecked);
  };

  const handleAddCustomAction = () => {
    if (!newActionText.trim()) return;

    const newAction: ActionItem = {
      id: `custom-${Date.now()}`,
      text: newActionText,
      priority: newActionPriority,
      triggerType: "vital",
      trigger: "User-added action",
      source: "Manual entry",
      isCustom: true,
    };

    setCustomActions([...customActions, newAction]);
    setNewActionText("");
    setNewActionPriority("routine");
    setShowAddDialog(false);
  };

  const getTriggerIcon = (type: string) => {
    switch (type) {
      case "vital":
        return Activity;
      case "wearable":
        return Heart;
      case "medication":
        return Pill;
      case "demographic":
        return User;
      default:
        return Activity;
    }
  };

  const getPriorityConfig = (priority: string) => {
    switch (priority) {
      case "urgent":
        return {
          icon: AlertCircle,
          color: "text-red-500",
          bg: "bg-red-500/10",
          border: "border-red-500/20",
          label: "Urgent",
          variant: "destructive" as const,
        };
      case "routine":
        return {
          icon: Clock,
          color: "text-yellow-500",
          bg: "bg-yellow-500/10",
          border: "border-yellow-500/20",
          label: "Routine",
          variant: "secondary" as const,
        };
      case "follow-up":
        return {
          icon: CheckCircle2,
          color: "text-blue-500",
          bg: "bg-blue-500/10",
          border: "border-blue-500/20",
          label: "Follow-up",
          variant: "outline" as const,
        };
      default:
        return {
          icon: Clock,
          color: "text-yellow-500",
          bg: "bg-yellow-500/10",
          border: "border-yellow-500/20",
          label: "Routine",
          variant: "secondary" as const,
        };
    }
  };

  // Sort by priority: urgent first, then routine, then follow-up
  const sortedActions = [...allActions].sort((a, b) => {
    const priorityOrder = { urgent: 0, routine: 1, "follow-up": 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  // Separate checked and unchecked for auto-archive display
  const uncheckedActions = sortedActions.filter(action => !checkedItems.has(action.id));
  const checkedActions = sortedActions.filter(action => checkedItems.has(action.id));

  return (
    <Card className="slide-in">
      <CardContent className="p-6">
        {/* Header */}
        <div 
          className="flex items-center justify-between cursor-pointer mb-4"
          onClick={() => setIsExpanded(!isExpanded)}
          data-testid="action-checklist-header"
        >
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-accent-foreground" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">AI-Detected Actions</h3>
              <p className="text-sm text-muted-foreground">
                {uncheckedCount} action{uncheckedCount !== 1 ? 's' : ''} to review
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                setShowAddDialog(true);
              }}
              data-testid="button-add-action"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add
            </Button>
            {isExpanded ? (
              <ChevronDown className="w-5 h-5 text-muted-foreground" />
            ) : (
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            )}
          </div>
        </div>

        {/* Expandable Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Unchecked Actions */}
              <div className="space-y-3 mb-6">
                {uncheckedActions.map((action, index) => {
                  const TriggerIcon = getTriggerIcon(action.triggerType);
                  const priorityConfig = getPriorityConfig(action.priority);
                  const PriorityIcon = priorityConfig.icon;

                  return (
                    <motion.div
                      key={action.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                      className={`p-4 rounded-lg border-2 ${priorityConfig.border} ${priorityConfig.bg}`}
                      data-testid={`action-item-${action.id}`}
                    >
                      <div className="flex items-start gap-3">
                        <Checkbox
                          checked={false}
                          onCheckedChange={() => handleToggle(action.id)}
                          className="mt-1"
                          data-testid={`checkbox-${action.id}`}
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <p className="text-sm font-medium text-foreground flex-1">
                              {action.text}
                            </p>
                            <Badge variant={priorityConfig.variant} className="flex items-center gap-1">
                              <PriorityIcon className="w-3 h-3" />
                              {priorityConfig.label}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <TriggerIcon className={`w-3 h-3 ${priorityConfig.color}`} />
                            <span>{action.trigger}</span>
                          </div>
                          {action.isCustom && (
                            <Badge variant="outline" className="mt-2 text-xs">
                              Custom Action
                            </Badge>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Checked Actions (Archive) */}
              {checkedActions.length > 0 && (
                <div className="pt-4 border-t border-border">
                  <h4 className="text-sm font-semibold text-muted-foreground mb-3">
                    Completed ({checkedActions.length})
                  </h4>
                  <div className="space-y-2">
                    {checkedActions.map((action) => (
                      <div
                        key={action.id}
                        className="p-3 rounded-lg bg-muted/50 opacity-60"
                        data-testid={`completed-action-${action.id}`}
                      >
                        <div className="flex items-start gap-3">
                          <Checkbox
                            checked={true}
                            onCheckedChange={() => handleToggle(action.id)}
                            className="mt-0.5"
                          />
                          <p className="text-sm text-muted-foreground line-through flex-1">
                            {action.text}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>

      {/* Add Custom Action Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent data-testid="dialog-add-action">
          <DialogHeader>
            <DialogTitle>Add Custom Action</DialogTitle>
            <DialogDescription>
              Add your own action item to track for your next appointment.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="action-text">Action Item</Label>
              <Textarea
                id="action-text"
                placeholder="e.g., Ask about new exercise routine"
                value={newActionText}
                onChange={(e) => setNewActionText(e.target.value)}
                className="mt-2"
                rows={3}
                data-testid="input-action-text"
              />
            </div>
            <div>
              <Label htmlFor="priority">Priority Level</Label>
              <Select
                value={newActionPriority}
                onValueChange={(value: "urgent" | "routine" | "follow-up") => setNewActionPriority(value)}
              >
                <SelectTrigger className="mt-2" data-testid="select-priority">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="urgent">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-500" />
                      Urgent
                    </div>
                  </SelectItem>
                  <SelectItem value="routine">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-yellow-500" />
                      Routine
                    </div>
                  </SelectItem>
                  <SelectItem value="follow-up">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-500" />
                      Follow-up
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddCustomAction} data-testid="button-save-action">
              Add Action
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
