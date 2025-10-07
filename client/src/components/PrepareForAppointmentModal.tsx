import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Printer, X, FileText, CheckSquare, TrendingUp, Pill, StickyNote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import insightsData from "@/data/insights.json";

interface ActionItem {
  id: string;
  text: string;
  priority: string;
  triggerType: string;
  checked?: boolean;
  custom?: boolean;
}

export default function PrepareForAppointmentModal() {
  const [open, setOpen] = useState(false);
  const [uncheckedActions, setUncheckedActions] = useState<ActionItem[]>([]);
  const [quickNotes, setQuickNotes] = useState<any[]>([]);

  useEffect(() => {
    if (open) {
      // Load unchecked actions from localStorage
      const savedActions = localStorage.getItem("actionItems");
      if (savedActions) {
        const actions = JSON.parse(savedActions);
        const unchecked = actions.filter((action: ActionItem) => !action.checked);
        setUncheckedActions(unchecked);
      } else {
        // Use default actions if none saved
        const defaultActions = insightsData.snapshot.actionItems.map((action: any) => ({
          ...action,
          checked: false,
          custom: false,
        }));
        setUncheckedActions(defaultActions);
      }

      // Load quick notes
      const savedNotes = localStorage.getItem("quickNotes");
      if (savedNotes) {
        setQuickNotes(JSON.parse(savedNotes));
      }
    }
  }, [open]);

  const handlePrint = () => {
    window.print();
  };

  // Get recent vital trends from insights
  const vitalTrends = insightsData.snapshot.vitalTrends || [];
  
  // Get medications that might need review
  const medications = insightsData.snapshot.medications || [];
  const medicationsNeedingReview = medications.filter((med: any) => {
    // Flag medications with potential issues
    return med.sideEffects?.some((se: any) => se.likelihood === "common") ||
           med.interactions?.some((int: any) => int.severity === "medium" || int.severity === "high");
  });

  const urgentActions = uncheckedActions.filter(a => a.priority === "urgent");
  const routineActions = uncheckedActions.filter(a => a.priority === "routine");
  const followUpActions = uncheckedActions.filter(a => a.priority === "follow-up");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="gap-2"
          data-testid="button-prepare-appointment"
        >
          <FileText className="h-4 w-4" />
          Prepare for Appointment
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto print:max-w-full print:max-h-full">
        <DialogHeader className="print:hidden">
          <div className="flex items-center justify-between">
            <DialogTitle>Appointment Preparation Checklist</DialogTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrint}
              className="gap-2"
              data-testid="button-print-checklist"
            >
              <Printer className="h-4 w-4" />
              Print
            </Button>
          </div>
        </DialogHeader>

        {/* Print-only header */}
        <div className="hidden print:block mb-8">
          <h1 className="text-3xl font-bold mb-2">Appointment Preparation Checklist</h1>
          <p className="text-muted-foreground">
            Patient: {insightsData.patient.age}yo {insightsData.patient.gender} | 
            Generated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="space-y-6" data-testid="checklist-content">
          {/* Summary Stats */}
          <div className="grid grid-cols-4 gap-4 print:mb-6">
            <div className="bg-red-50 dark:bg-red-950/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                {urgentActions.length}
              </div>
              <div className="text-sm text-red-700 dark:text-red-300">Urgent Items</div>
            </div>
            <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {routineActions.length}
              </div>
              <div className="text-sm text-blue-700 dark:text-blue-300">Routine Items</div>
            </div>
            <div className="bg-orange-50 dark:bg-orange-950/20 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {medicationsNeedingReview.length}
              </div>
              <div className="text-sm text-orange-700 dark:text-orange-300">Med Reviews</div>
            </div>
            <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {quickNotes.length}
              </div>
              <div className="text-sm text-green-700 dark:text-green-300">Quick Notes</div>
            </div>
          </div>

          {/* Urgent Action Items */}
          {urgentActions.length > 0 && (
            <div className="print:break-inside-avoid">
              <div className="flex items-center gap-2 mb-3">
                <CheckSquare className="h-5 w-5 text-red-500" />
                <h3 className="text-lg font-semibold">Urgent Discussion Items</h3>
                <Badge variant="destructive">{urgentActions.length}</Badge>
              </div>
              <div className="space-y-2">
                {urgentActions.map((action, index) => (
                  <div
                    key={action.id}
                    className="flex items-start gap-3 p-3 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800"
                    data-testid={`urgent-action-${index}`}
                  >
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 font-semibold text-sm flex-shrink-0 mt-0.5">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{action.text}</p>
                      {action.custom && (
                        <Badge variant="outline" className="mt-1 text-xs">Custom</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Routine Action Items */}
          {routineActions.length > 0 && (
            <div className="print:break-inside-avoid">
              <div className="flex items-center gap-2 mb-3">
                <CheckSquare className="h-5 w-5 text-blue-500" />
                <h3 className="text-lg font-semibold">Routine Discussion Items</h3>
                <Badge variant="secondary">{routineActions.length}</Badge>
              </div>
              <div className="space-y-2">
                {routineActions.map((action, index) => (
                  <div
                    key={action.id}
                    className="flex items-start gap-3 p-3 bg-muted rounded-lg"
                    data-testid={`routine-action-${index}`}
                  >
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary font-semibold text-sm flex-shrink-0 mt-0.5">
                      {index + 1}
                    </div>
                    <p className="text-sm flex-1">{action.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recent Vital Trends */}
          {vitalTrends.length > 0 && (
            <div className="print:break-inside-avoid">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Recent Vital Trends</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {vitalTrends.slice(0, 4).map((trend: any, index: number) => (
                  <div
                    key={index}
                    className="p-3 bg-muted rounded-lg"
                    data-testid={`vital-trend-${index}`}
                  >
                    <div className="font-medium text-sm mb-1">{trend.name}</div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-semibold">{trend.current}</span>
                      {trend.change && (
                        <Badge
                          variant={trend.trend === "up" ? "destructive" : "default"}
                          className="text-xs"
                        >
                          {trend.change}
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Medications Needing Review */}
          {medicationsNeedingReview.length > 0 && (
            <div className="print:break-inside-avoid">
              <div className="flex items-center gap-2 mb-3">
                <Pill className="h-5 w-5 text-orange-500" />
                <h3 className="text-lg font-semibold">Medications to Review</h3>
                <Badge variant="outline">{medicationsNeedingReview.length}</Badge>
              </div>
              <div className="space-y-2">
                {medicationsNeedingReview.map((med: any, index: number) => (
                  <div
                    key={index}
                    className="p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg border border-orange-200 dark:border-orange-800"
                    data-testid={`medication-review-${index}`}
                  >
                    <div className="font-medium text-sm mb-1">
                      {med.name} - {med.dosage}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {med.sideEffects?.some((se: any) => se.likelihood === "common") && (
                        <span>Check for common side effects • </span>
                      )}
                      {med.interactions?.length > 0 && (
                        <span>Drug interaction present</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Notes */}
          {quickNotes.length > 0 && (
            <div className="print:break-inside-avoid">
              <div className="flex items-center gap-2 mb-3">
                <StickyNote className="h-5 w-5 text-yellow-500" />
                <h3 className="text-lg font-semibold">Your Notes & Questions</h3>
                <Badge variant="outline">{quickNotes.length}</Badge>
              </div>
              <div className="space-y-2">
                {quickNotes.map((note: any, index: number) => (
                  <div
                    key={index}
                    className="p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border border-yellow-200 dark:border-yellow-800"
                    data-testid={`note-${index}`}
                  >
                    <div className="text-sm mb-1">{note.text}</div>
                    <div className="text-xs text-muted-foreground">
                      {note.date} at {note.timestamp}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Follow-up Items */}
          {followUpActions.length > 0 && (
            <div className="print:break-inside-avoid">
              <div className="flex items-center gap-2 mb-3">
                <CheckSquare className="h-5 w-5 text-muted-foreground" />
                <h3 className="text-lg font-semibold">Follow-up Items</h3>
                <Badge variant="outline">{followUpActions.length}</Badge>
              </div>
              <div className="space-y-2">
                {followUpActions.map((action, index) => (
                  <div
                    key={action.id}
                    className="flex items-start gap-3 p-2 text-sm text-muted-foreground"
                    data-testid={`followup-action-${index}`}
                  >
                    <span>•</span>
                    <p className="flex-1">{action.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Print Instructions */}
        <div className="hidden print:block mt-8 pt-4 border-t">
          <p className="text-sm text-muted-foreground">
            ✓ Review all items before your appointment<br />
            ✓ Check off items as you discuss them<br />
            ✓ Add any new concerns that arise during the visit
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
