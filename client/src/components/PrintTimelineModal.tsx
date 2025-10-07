import { useState } from "react";
import { Printer, FileText, Download } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import insightsData from "@/data/insights.json";

interface PrintTimelineModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PrintTimelineModal({ isOpen, onClose }: PrintTimelineModalProps) {
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [format, setFormat] = useState<"doctor" | "patient">("patient");
  const [showPreview, setShowPreview] = useState(false);

  const { patient, snapshot, timeline } = insightsData;

  const handlePrint = () => {
    window.print();
  };

  const handleExportPDF = () => {
    // In a real app, this would use a library like jsPDF or html2pdf
    window.print(); // For now, use browser print to PDF
  };

  const filterEventsByDateRange = () => {
    if (!dateRange.start && !dateRange.end) return timeline.events;

    return timeline.events.filter((event: any) => {
      const eventDate = new Date(event.date);
      const startDate = dateRange.start ? new Date(dateRange.start) : null;
      const endDate = dateRange.end ? new Date(dateRange.end) : null;

      if (startDate && eventDate < startDate) return false;
      if (endDate && eventDate > endDate) return false;
      return true;
    });
  };

  const filteredEvents = filterEventsByDateRange();

  const generateDoctorSummary = () => {
    const urgentActions = snapshot.actionItems.filter((a: any) => a.priority === "urgent");
    
    return {
      title: "Clinical Summary Report",
      sections: [
        {
          title: "Patient Information",
          content: `Age: ${patient.age} | Gender: ${patient.gender} | Weight: ${patient.weight} ${patient.weightUnit}
Allergies: ${patient.allergies.join(", ")}`
        },
        {
          title: "Active Diagnoses",
          content: snapshot.diagnoses.map((d: any) => 
            `• ${d.name} (${d.status}) - ${d.lastMetric}`
          ).join("\n")
        },
        {
          title: "Current Medications",
          content: snapshot.medications.map((m: any) => 
            `• ${m.name} ${m.dosage} - ${m.instructions}`
          ).join("\n")
        },
        {
          title: "Urgent Clinical Actions Required",
          content: urgentActions.map((a: any) => 
            `• ${a.text}\n  Trigger: ${a.trigger}`
          ).join("\n\n")
        },
        {
          title: "Recent Vital Trends (30 days)",
          content: snapshot.vitalTrends.map((v: any) => 
            `• ${v.name}: ${v.currentValue} ${v.unit} (${v.trend === 'up' ? '↑' : '↓'} ${v.changePercent})`
          ).join("\n")
        },
        {
          title: "Timeline of Events",
          content: filteredEvents.map((e: any) => 
            `${e.date} - ${e.title}\n${e.description}${e.provider ? `\nProvider: ${e.provider}` : ''}`
          ).join("\n\n")
        }
      ]
    };
  };

  const generatePatientSummary = () => {
    return {
      title: "My Health Summary",
      sections: [
        {
          title: "About Me",
          content: `${patient.age}-year-old ${patient.gender.toLowerCase()}, ${patient.weight} ${patient.weightUnit}
⚠️ Allergies: ${patient.allergies.join(", ")}`
        },
        {
          title: "What I'm Managing",
          content: snapshot.diagnoses.map((d: any) => 
            `• ${d.name}\n  ${d.description}\n  Status: ${d.status} - ${d.lastMetric}`
          ).join("\n\n")
        },
        {
          title: "My Current Medications",
          content: snapshot.medications.map((m: any) => 
            `• ${m.name} ${m.dosage}\n  ${m.purpose}\n  Take: ${m.instructions}`
          ).join("\n\n")
        },
        {
          title: "Important Things to Discuss with My Doctor",
          content: snapshot.actionItems
            .filter((a: any) => a.priority === "urgent")
            .map((a: any) => `• ${a.text}`)
            .join("\n")
        },
        {
          title: "How I'm Doing (Last 30 Days)",
          content: snapshot.vitalTrends.map((v: any) => 
            `• ${v.name}: ${v.currentValue} ${v.unit} ${v.trend === 'up' ? '(going up)' : '(improving)'}`
          ).join("\n")
        },
        {
          title: "My Health Journey",
          content: filteredEvents.map((e: any) => 
            `${e.date} - ${e.title}\n${e.description}`
          ).join("\n\n")
        }
      ]
    };
  };

  const summary = format === "doctor" ? generateDoctorSummary() : generatePatientSummary();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" data-testid="dialog-print-timeline">
        <DialogHeader>
          <DialogTitle>Print Health Summary</DialogTitle>
          <DialogDescription>
            Generate a comprehensive summary of your health timeline and data
          </DialogDescription>
        </DialogHeader>

        {/* Configuration */}
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="print-start-date">Start Date (Optional)</Label>
              <Input
                id="print-start-date"
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                className="mt-2"
                data-testid="input-print-date-start"
              />
            </div>
            <div>
              <Label htmlFor="print-end-date">End Date (Optional)</Label>
              <Input
                id="print-end-date"
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                className="mt-2"
                data-testid="input-print-date-end"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="format">Format</Label>
            <Select value={format} onValueChange={(value: "doctor" | "patient") => setFormat(value)}>
              <SelectTrigger className="mt-2" data-testid="select-print-format">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="patient">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Patient-Friendly (Easy to Read)
                  </div>
                </SelectItem>
                <SelectItem value="doctor">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Doctor-Friendly (Clinical Format)
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Summary Stats */}
          <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
            <Badge variant="secondary">{filteredEvents.length} Events</Badge>
            <Badge variant="secondary">{snapshot.medications.length} Medications</Badge>
            <Badge variant="secondary">{snapshot.diagnoses.length} Diagnoses</Badge>
            <Badge variant="destructive">
              {snapshot.actionItems.filter((a: any) => a.priority === "urgent").length} Urgent Actions
            </Badge>
          </div>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => setShowPreview(!showPreview)}
            data-testid="button-toggle-preview"
          >
            {showPreview ? "Hide" : "Show"} Preview
          </Button>

          {/* Preview */}
          {showPreview && (
            <div className="border border-border rounded-lg p-6 bg-white text-black print-summary">
              <h1 className="text-2xl font-bold mb-4 text-center">{summary.title}</h1>
              <div className="text-sm text-gray-600 mb-6 text-center">
                Generated on {new Date().toLocaleDateString()}
              </div>

              {summary.sections.map((section, index) => (
                <div key={index} className="mb-6">
                  <h2 className="text-lg font-bold mb-3 text-black border-b-2 border-gray-300 pb-2">
                    {section.title}
                  </h2>
                  <div className="whitespace-pre-line text-gray-800">
                    {section.content}
                  </div>
                </div>
              ))}

              <div className="mt-8 pt-4 border-t border-gray-300 text-xs text-gray-600">
                <p>This summary is generated from Biogram Health Platform</p>
                <p>For questions or concerns, consult with your healthcare provider</p>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="outline" onClick={handleExportPDF} className="gap-2" data-testid="button-export-pdf">
            <Download className="w-4 h-4" />
            Export PDF
          </Button>
          <Button onClick={handlePrint} className="gap-2" data-testid="button-print">
            <Printer className="w-4 h-4" />
            Print
          </Button>
        </DialogFooter>

        {/* Print-only styles */}
        <style>{`
          @media print {
            body * {
              visibility: hidden;
            }
            .print-summary, .print-summary * {
              visibility: visible;
            }
            .print-summary {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              padding: 20px;
            }
          }
        `}</style>
      </DialogContent>
    </Dialog>
  );
}
