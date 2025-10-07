import { useState, useEffect } from "react";
import { Share2, Copy, CheckCircle, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import insightsData from "@/data/insights.json";

interface ShareOptions {
  diagnoses: boolean;
  medications: boolean;
  actionItems: boolean;
  vitalTrends: boolean;
  timeline: boolean;
  wearableInsights: boolean;
  quickNotes: boolean;
}

export default function ShareWithProviderModal() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  
  const [shareOptions, setShareOptions] = useState<ShareOptions>({
    diagnoses: true,
    medications: true,
    actionItems: true,
    vitalTrends: true,
    timeline: true,
    wearableInsights: false,
    quickNotes: true,
  });

  const toggleOption = (key: keyof ShareOptions) => {
    setShareOptions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const generateSummary = () => {
    const sections: string[] = [];
    const patient = insightsData.patient;
    
    // Header
    sections.push("═══════════════════════════════════════");
    sections.push("HEALTH SUMMARY FOR PROVIDER REVIEW");
    sections.push("═══════════════════════════════════════");
    sections.push(`Patient: ${patient.age}yo ${patient.gender}`);
    sections.push(`Weight: ${patient.weight} ${patient.weightUnit}`);
    sections.push(`Allergies: ${patient.allergies.join(", ")}`);
    sections.push(`Generated: ${new Date().toLocaleString()}`);
    sections.push("");

    // Diagnoses
    if (shareOptions.diagnoses) {
      sections.push("─── ACTIVE DIAGNOSES ───");
      insightsData.snapshot.diagnoses.forEach((diag: any) => {
        sections.push(`• ${diag.name} - ${diag.status}`);
        sections.push(`  Diagnosed: ${diag.diagnosedDate}`);
        sections.push(`  ${diag.lastMetric}`);
        sections.push("");
      });
    }

    // Medications
    if (shareOptions.medications) {
      sections.push("─── CURRENT MEDICATIONS ───");
      insightsData.snapshot.medications.forEach((med: any) => {
        sections.push(`• ${med.name} - ${med.dosage}`);
        sections.push(`  For: ${med.purpose}`);
        if (med.refillsRemaining) {
          sections.push(`  Refills: ${med.refillsRemaining} remaining, due ${med.refillDueDate}`);
        }
        sections.push("");
      });
    }

    // Action Items
    if (shareOptions.actionItems) {
      const savedActions = localStorage.getItem("actionItems");
      let actions;
      if (savedActions) {
        actions = JSON.parse(savedActions).filter((a: any) => !a.checked);
      } else {
        actions = insightsData.snapshot.actionItems;
      }

      const urgentActions = actions.filter((a: any) => a.priority === "urgent");
      const routineActions = actions.filter((a: any) => a.priority === "routine");
      const followUpActions = actions.filter((a: any) => a.priority === "follow-up");

      if (urgentActions.length > 0) {
        sections.push("─── URGENT DISCUSSION ITEMS ───");
        urgentActions.forEach((action: any, index: number) => {
          sections.push(`${index + 1}. ${action.text}`);
        });
        sections.push("");
      }

      if (routineActions.length > 0) {
        sections.push("─── ROUTINE DISCUSSION ITEMS ───");
        routineActions.forEach((action: any, index: number) => {
          sections.push(`${index + 1}. ${action.text}`);
        });
        sections.push("");
      }

      if (followUpActions.length > 0) {
        sections.push("─── FOLLOW-UP ITEMS ───");
        followUpActions.forEach((action: any, index: number) => {
          sections.push(`${index + 1}. ${action.text}`);
        });
        sections.push("");
      }
    }

    // Vital Trends
    if (shareOptions.vitalTrends) {
      sections.push("─── RECENT VITAL TRENDS ───");
      insightsData.snapshot.vitalTrends.forEach((trend: any) => {
        let line = `• ${trend.name}: ${trend.current}`;
        if (trend.change) {
          line += ` (${trend.change})`;
        }
        sections.push(line);
      });
      sections.push("");
    }

    // Timeline
    if (shareOptions.timeline) {
      sections.push("─── RECENT MEDICAL EVENTS ───");
      const recentEvents = insightsData.timeline.events.slice(0, 5);
      recentEvents.forEach((event: any) => {
        sections.push(`${event.date} - ${event.title}`);
        sections.push(`  Type: ${event.badge}`);
        if (event.provider) sections.push(`  Provider: ${event.provider}`);
        if (event.location) sections.push(`  Location: ${event.location}`);
        sections.push("");
      });
    }

    // Wearable Insights
    if (shareOptions.wearableInsights) {
      sections.push("─── WEARABLE DATA INSIGHTS ───");
      const metrics = insightsData.wearables.metrics;
      sections.push(`• Heart Rate: ${metrics.heartRate.current} bpm (${metrics.heartRate.changePercent})`);
      sections.push(`  Range: ${metrics.heartRate.range}`);
      sections.push(`• Steps: ${metrics.steps.current} (Goal: ${metrics.steps.goal})`);
      sections.push(`  Weekly Average: ${metrics.steps.weeklyAverage}`);
      sections.push(`• Sleep: ${metrics.sleep.current} hrs (${metrics.sleep.changePercent})`);
      sections.push(`  Deep Sleep: ${metrics.sleep.deepSleep}`);
      sections.push("");

      if (insightsData.wearables.aiInsight) {
        sections.push("AI-Detected Pattern:");
        sections.push(`• ${insightsData.wearables.aiInsight.description}`);
        sections.push(`  ${insightsData.wearables.aiInsight.correlation}`);
        sections.push("");
      }
    }

    // Quick Notes
    if (shareOptions.quickNotes) {
      const savedNotes = localStorage.getItem("quickNotes");
      if (savedNotes) {
        const notes = JSON.parse(savedNotes);
        if (notes.length > 0) {
          sections.push("─── PATIENT NOTES & QUESTIONS ───");
          notes.forEach((note: any, index: number) => {
            sections.push(`${index + 1}. ${note.text}`);
            sections.push(`   (${note.date} at ${note.timestamp})`);
          });
          sections.push("");
        }
      }
    }

    sections.push("═══════════════════════════════════════");
    sections.push("This summary was generated via Biogram Health Platform");
    sections.push("For clinical use only - contains protected health information");
    sections.push("═══════════════════════════════════════");

    return sections.join("\n");
  };

  const handleCopyToClipboard = async () => {
    const summary = generateSummary();
    
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      toast({
        title: "Summary Copied",
        description: "Health summary has been copied to your clipboard. You can now paste it into an email or message.",
      });
      
      setTimeout(() => {
        setCopied(false);
      }, 3000);
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Please try again or manually select and copy the text.",
        variant: "destructive",
      });
    }
  };

  const selectedCount = Object.values(shareOptions).filter(Boolean).length;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="gap-2"
          data-testid="button-share-provider"
        >
          <Share2 className="h-4 w-4" />
          Share with Provider
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl" data-testid="modal-share-provider">
        <DialogHeader>
          <DialogTitle>Share Health Summary with Provider</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Info Banner */}
          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-blue-900 dark:text-blue-100">
                  Select what to include in your health summary. This will generate a comprehensive text summary you can copy and share with your healthcare provider via secure messaging or email.
                </p>
              </div>
            </div>
          </div>

          {/* Selection Options */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold">Select Information to Share</h4>
              <Badge variant="secondary">{selectedCount} selected</Badge>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2" data-testid="checkbox-diagnoses">
                <Checkbox
                  id="diagnoses"
                  checked={shareOptions.diagnoses}
                  onCheckedChange={() => toggleOption("diagnoses")}
                />
                <Label htmlFor="diagnoses" className="cursor-pointer">
                  Diagnoses & Status
                </Label>
              </div>

              <div className="flex items-center space-x-2" data-testid="checkbox-medications">
                <Checkbox
                  id="medications"
                  checked={shareOptions.medications}
                  onCheckedChange={() => toggleOption("medications")}
                />
                <Label htmlFor="medications" className="cursor-pointer">
                  Current Medications
                </Label>
              </div>

              <div className="flex items-center space-x-2" data-testid="checkbox-action-items">
                <Checkbox
                  id="actionItems"
                  checked={shareOptions.actionItems}
                  onCheckedChange={() => toggleOption("actionItems")}
                />
                <Label htmlFor="actionItems" className="cursor-pointer">
                  Discussion Items
                </Label>
              </div>

              <div className="flex items-center space-x-2" data-testid="checkbox-vital-trends">
                <Checkbox
                  id="vitalTrends"
                  checked={shareOptions.vitalTrends}
                  onCheckedChange={() => toggleOption("vitalTrends")}
                />
                <Label htmlFor="vitalTrends" className="cursor-pointer">
                  Vital Trends
                </Label>
              </div>

              <div className="flex items-center space-x-2" data-testid="checkbox-timeline">
                <Checkbox
                  id="timeline"
                  checked={shareOptions.timeline}
                  onCheckedChange={() => toggleOption("timeline")}
                />
                <Label htmlFor="timeline" className="cursor-pointer">
                  Recent Medical Events
                </Label>
              </div>

              <div className="flex items-center space-x-2" data-testid="checkbox-wearable-insights">
                <Checkbox
                  id="wearableInsights"
                  checked={shareOptions.wearableInsights}
                  onCheckedChange={() => toggleOption("wearableInsights")}
                />
                <Label htmlFor="wearableInsights" className="cursor-pointer">
                  Wearable Data Insights
                </Label>
              </div>

              <div className="flex items-center space-x-2" data-testid="checkbox-quick-notes">
                <Checkbox
                  id="quickNotes"
                  checked={shareOptions.quickNotes}
                  onCheckedChange={() => toggleOption("quickNotes")}
                />
                <Label htmlFor="quickNotes" className="cursor-pointer">
                  My Notes & Questions
                </Label>
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold">Summary Preview</Label>
            <div className="bg-muted rounded-lg p-4 max-h-48 overflow-y-auto font-mono text-xs whitespace-pre-wrap" data-testid="summary-preview">
              {generateSummary()}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t">
            <p className="text-xs text-muted-foreground">
              Summary will be copied to your clipboard
            </p>
            <Button
              onClick={handleCopyToClipboard}
              className="gap-2"
              data-testid="button-copy-summary"
            >
              {copied ? (
                <>
                  <CheckCircle className="h-4 w-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copy Summary
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
