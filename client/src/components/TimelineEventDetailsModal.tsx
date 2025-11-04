import { motion } from "framer-motion";
import { Calendar, Lightbulb, BookOpen, TrendingUp, CheckCircle, AlertCircle, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface TimelineEventDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: {
    type: string;
    title: string;
    date: string;
    badge: string;
    description: string;
    provider?: string;
    location?: string;
    aiSummary?: {
      whatHappened: string;
      whyItMatters: string;
      medicalTermsExplained: Array<{
        term: string;
        simple: string;
      }>;
      keyNumbers: Array<{
        metric: string;
        value: string;
        context: string;
        trend: string;
      }>;
      actionsTaken: string[];
      followUpNeeded: string;
    };
  };
}

const getEventTypeColor = (type: string) => {
  switch (type.toLowerCase()) {
    case "visit":
      return "bg-blue-500/10 text-blue-600 border-blue-500/20";
    case "lab":
      return "bg-green-500/10 text-green-600 border-green-500/20";
    case "emergency":
      return "bg-red-500/10 text-red-600 border-red-500/20";
    case "medication":
      return "bg-purple-500/10 text-purple-600 border-purple-500/20";
    case "note":
      return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20";
    default:
      return "bg-gray-500/10 text-gray-600 border-gray-500/20";
  }
};

const getTrendColor = (trend: string) => {
  switch (trend.toLowerCase()) {
    case "improving":
    case "on-target":
    case "healthy":
    case "normal":
    case "much-improved":
      return "text-green-600";
    case "elevated":
    case "too-high":
    case "high":
      return "text-red-600";
    case "stable":
    case "baseline":
    case "overweight":
      return "text-yellow-600";
    default:
      return "text-muted-foreground";
  }
};

const getTrendIcon = (trend: string) => {
  switch (trend.toLowerCase()) {
    case "improving":
    case "on-target":
    case "healthy":
    case "normal":
    case "much-improved":
      return <CheckCircle className="w-4 h-4 text-green-600" />;
    case "elevated":
    case "too-high":
    case "high":
      return <AlertCircle className="w-4 h-4 text-red-600" />;
    default:
      return null;
  }
};

export default function TimelineEventDetailsModal({
  isOpen,
  onClose,
  event,
}: TimelineEventDetailsModalProps) {
  if (!event.aiSummary) {
    return null;
  }

  const { aiSummary } = event;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" data-testid="timeline-event-details-modal">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold flex items-center gap-3">
              <Calendar className="w-6 h-6 text-primary" />
              {event.title}
            </DialogTitle>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <Badge className={`${getEventTypeColor(event.type)} border`}>
              {event.badge}
            </Badge>
            <span className="text-sm text-muted-foreground">• {event.date}</span>
          </div>
          {event.provider && (
            <p className="text-sm text-muted-foreground mt-1">
              {event.provider} {event.location && `• ${event.location}`}
            </p>
          )}
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* What Happened - Main AI Summary */}
          <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                  <Lightbulb className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-2">What Happened</h3>
                  <p className="text-sm text-foreground leading-relaxed">
                    {aiSummary.whatHappened}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Why It Matters */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-blue-500" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Why It Matters</h3>
              </div>
              <p className="text-sm text-foreground leading-relaxed bg-muted/50 rounded-lg p-4">
                {aiSummary.whyItMatters}
              </p>
            </CardContent>
          </Card>

          {/* Medical Terms Explained */}
          {aiSummary.medicalTermsExplained && aiSummary.medicalTermsExplained.length > 0 && (
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-purple-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Medical Terms Explained</h3>
                </div>
                <div className="space-y-3">
                  {aiSummary.medicalTermsExplained.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-muted/50 rounded-lg p-4"
                    >
                      <h4 className="font-semibold text-sm text-foreground mb-1">{item.term}</h4>
                      <p className="text-sm text-muted-foreground">{item.simple}</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Key Numbers with Context */}
          {aiSummary.keyNumbers && aiSummary.keyNumbers.length > 0 && (
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-green-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Key Numbers</h3>
                </div>
                <div className="space-y-4">
                  {aiSummary.keyNumbers.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-muted/50 rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-sm text-foreground">{item.metric}</h4>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-primary">{item.value}</span>
                          {getTrendIcon(item.trend)}
                        </div>
                      </div>
                      <p className={`text-sm ${getTrendColor(item.trend)}`}>{item.context}</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Actions Taken */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-orange-500" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">What Was Done</h3>
              </div>
              <div className="space-y-2">
                {aiSummary.actionsTaken.map((action, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-start gap-3 text-sm text-foreground"
                  >
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                    </div>
                    <span>{action}</span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Follow-up Needed */}
          <Card className="border-l-4 border-l-primary">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Next Steps</h3>
              </div>
              <p className="text-sm text-foreground leading-relaxed bg-primary/5 rounded-lg p-4">
                {aiSummary.followUpNeeded}
              </p>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
