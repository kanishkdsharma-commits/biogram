import { motion } from "framer-motion";
import { Calendar, FileText, Activity, Pill, Clock, User } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface ConditionDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  condition: {
    name: string;
    description: string;
    diagnosedDate: string;
    status: string;
    lastMetric: string;
    latestAssessment: {
      date: string;
      provider: string;
      notes: string;
    };
    treatmentPlan: string[];
    criticalEvents: Array<{
      date: string;
      type: string;
      description: string;
    }>;
    relatedMedications: string[];
  };
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "well-controlled":
      return "bg-green-500/10 text-green-600 border-green-500/20";
    case "needs attention":
      return "bg-red-500/10 text-red-600 border-red-500/20";
    case "improving":
      return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20";
    default:
      return "bg-blue-500/10 text-blue-600 border-blue-500/20";
  }
};

const getEventTypeColor = (type: string) => {
  switch (type.toLowerCase()) {
    case "office visit":
      return "bg-blue-500";
    case "lab result":
      return "bg-green-500";
    case "medication change":
      return "bg-yellow-500";
    case "initial diagnosis":
      return "bg-purple-500";
    case "wearable alert":
      return "bg-orange-500";
    default:
      return "bg-gray-500";
  }
};

export default function ConditionDetailsModal({
  isOpen,
  onClose,
  condition,
}: ConditionDetailsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" data-testid="condition-details-modal">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold flex items-center gap-3">
              <Activity className="w-6 h-6 text-primary" />
              {condition.name}
            </DialogTitle>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <Badge className={`${getStatusColor(condition.status)} border`}>
              {condition.status === "well-controlled" ? "Well Controlled" : condition.status === "needs attention" ? "Needs Attention" : "Improving"}
            </Badge>
            <span className="text-sm text-muted-foreground">
              • Diagnosed {condition.diagnosedDate}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-2">{condition.description}</p>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Latest Assessment from Provider */}
          <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-1">Latest Assessment</h3>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>{condition.latestAssessment.provider}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{condition.latestAssessment.date}</span>
                    </div>
                  </div>
                  <p className="text-sm text-foreground leading-relaxed">
                    {condition.latestAssessment.notes}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Current Status */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                  <Activity className="w-5 h-5 text-blue-500" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Current Status</h3>
              </div>
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-sm font-medium text-foreground">{condition.lastMetric}</p>
              </div>
            </CardContent>
          </Card>

          {/* Treatment Plan */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-green-500" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Treatment Plan</h3>
              </div>
              <ul className="space-y-3">
                {condition.treatmentPlan.map((item, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    data-testid={`treatment-plan-item-${index}`}
                  >
                    <div className="flex-shrink-0 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">
                      {index + 1}
                    </div>
                    <p className="text-sm text-foreground flex-1">{item}</p>
                  </motion.li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Critical Events Timeline */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-purple-500" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Critical Events</h3>
              </div>
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />
                
                <div className="space-y-4">
                  {condition.criticalEvents.map((event, index) => (
                    <motion.div
                      key={index}
                      className="relative pl-12"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.08 }}
                      data-testid={`critical-event-${index}`}
                    >
                      {/* Timeline dot */}
                      <div className={`absolute left-2.5 top-2 w-3 h-3 rounded-full ${getEventTypeColor(event.type)}`} />
                      
                      <div className="bg-muted/50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="outline" className="text-xs">
                            {event.type}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{event.date}</span>
                        </div>
                        <p className="text-sm text-foreground">{event.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Related Medications */}
          {condition.relatedMedications.length > 0 && (
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center">
                    <Pill className="w-5 h-5 text-orange-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Related Medications</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {condition.relatedMedications.map((medication, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="px-3 py-1"
                      data-testid={`related-medication-${index}`}
                    >
                      <Pill className="w-3 h-3 mr-1" />
                      {medication}
                    </Badge>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  These medications are currently being used to manage this condition
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
