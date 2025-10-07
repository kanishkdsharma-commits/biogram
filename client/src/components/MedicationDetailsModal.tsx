import { motion, AnimatePresence } from "framer-motion";
import { X, AlertTriangle, Activity, User, Heart, Pill, Clock } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import insightsData from "@/data/insights.json";

interface MedicationDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  medication: {
    name: string;
    dosage: string;
    purpose: string;
    instructions: string;
    interactions: Array<{
      type: string;
      severity: string;
      interactsWith: string;
      warning: string;
      whatToWatch: string;
    }>;
    sideEffects: Array<{
      effect: string;
      likelihood: string;
      severity: string;
    }>;
    demographicRisks: Array<{
      factor: string;
      risk: string;
      note: string;
    }>;
    wearableInsights: Array<{
      metric: string;
      status: string;
      note: string;
    }>;
    conditionWarnings: Array<{
      condition: string;
      note: string;
    }>;
  };
}

const getSeverityColor = (severity: string) => {
  switch (severity.toLowerCase()) {
    case "high":
      return "bg-red-500 text-white";
    case "medium":
      return "bg-yellow-500 text-white";
    case "low":
      return "bg-green-500 text-white";
    default:
      return "bg-gray-500 text-white";
  }
};

const getSeverityBadgeVariant = (severity: string): "destructive" | "default" | "secondary" => {
  switch (severity.toLowerCase()) {
    case "high":
      return "destructive";
    case "medium":
      return "default";
    case "low":
      return "secondary";
    default:
      return "default";
  }
};

const getLikelihoodText = (likelihood: string) => {
  switch (likelihood.toLowerCase()) {
    case "common":
      return "Common (>10%)";
    case "uncommon":
      return "Uncommon (1-10%)";
    case "rare":
      return "Rare (<1%)";
    default:
      return likelihood;
  }
};

export default function MedicationDetailsModal({
  isOpen,
  onClose,
  medication,
}: MedicationDetailsModalProps) {
  const { patient } = insightsData;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" data-testid="medication-details-modal">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold flex items-center gap-3">
              <Pill className="w-6 h-6 text-primary" />
              {medication.name} {medication.dosage}
            </DialogTitle>
          </div>
          <p className="text-muted-foreground mt-2">{medication.purpose}</p>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* What This Means For You - Personalized Summary */}
          <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                  <User className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-2">What This Means For You</h3>
                  <p className="text-sm text-foreground mb-2">
                    Based on your profile ({patient.age}-year-old {patient.gender}, {patient.weight} {patient.weightUnit}), 
                    current medications, and recent health data:
                  </p>
                  <ul className="space-y-2 text-sm text-foreground">
                    {medication.interactions.length > 0 && (
                      <li className="flex items-start gap-2">
                        <span className="text-accent font-semibold">•</span>
                        <span>You have {medication.interactions.length} medication interaction{medication.interactions.length > 1 ? 's' : ''} to be aware of</span>
                      </li>
                    )}
                    {medication.wearableInsights.length > 0 && (
                      <li className="flex items-start gap-2">
                        <span className="text-secondary font-semibold">•</span>
                        <span>Your wearable data shows trends that may be affected by this medication</span>
                      </li>
                    )}
                    {medication.demographicRisks.length > 0 && medication.demographicRisks[0].risk !== 'low' && (
                      <li className="flex items-start gap-2">
                        <span className="text-yellow-500 font-semibold">•</span>
                        <span>Your age or demographics may increase certain risks</span>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Drug-Drug Interactions */}
          {medication.interactions.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-accent" />
                Drug Interactions
              </h3>
              <div className="space-y-3">
                {medication.interactions.map((interaction, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className={`${interaction.severity === 'high' ? 'border-red-500 bg-red-50 dark:bg-red-950/20' : ''}`}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Badge variant={getSeverityBadgeVariant(interaction.severity)} data-testid={`interaction-severity-${index}`}>
                              {interaction.severity.toUpperCase()} RISK
                            </Badge>
                            <span className="font-semibold text-foreground">with {interaction.interactsWith}</span>
                          </div>
                        </div>
                        <p className="text-sm text-foreground mb-3">{interaction.warning}</p>
                        <div className="bg-muted p-3 rounded-lg">
                          <p className="text-xs font-semibold text-muted-foreground mb-1">What to Watch For:</p>
                          <p className="text-sm text-foreground">{interaction.whatToWatch}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Side Effects */}
          {medication.sideEffects.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-secondary" />
                Possible Side Effects
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {medication.sideEffects.map((sideEffect, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className={`${sideEffect.severity === 'high' ? 'border-red-500' : ''}`}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <p className="font-medium text-sm text-foreground">{sideEffect.effect}</p>
                          <Badge variant={getSeverityBadgeVariant(sideEffect.severity)} className="ml-2 text-xs" data-testid={`side-effect-severity-${index}`}>
                            {sideEffect.severity}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{getLikelihoodText(sideEffect.likelihood)}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Wearable Insights */}
          {medication.wearableInsights.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Heart className="w-5 h-5 text-primary" />
                Your Health Data Insights
              </h3>
              <div className="space-y-3">
                {medication.wearableInsights.map((insight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="bg-primary/5">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant={
                            insight.status === 'improving' ? 'secondary' : 
                            insight.status === 'needs attention' || insight.status === 'elevated' ? 'destructive' : 
                            'default'
                          }>
                            {insight.metric}
                          </Badge>
                          <span className="text-xs text-muted-foreground">({insight.status})</span>
                        </div>
                        <p className="text-sm text-foreground">{insight.note}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Demographic & Age-Related Risks */}
          {medication.demographicRisks.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-secondary" />
                Age & Demographic Considerations
              </h3>
              <div className="space-y-3">
                {medication.demographicRisks.map((risk, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm font-semibold text-foreground">{risk.factor}</span>
                          <Badge variant={getSeverityBadgeVariant(risk.risk)} className="text-xs">
                            {risk.risk} risk
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{risk.note}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Condition-Related Warnings */}
          {medication.conditionWarnings.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-accent" />
                Related to Your Conditions
              </h3>
              <div className="space-y-3">
                {medication.conditionWarnings.map((warning, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="bg-accent/5">
                      <CardContent className="p-4">
                        <p className="text-sm font-semibold text-foreground mb-1">{warning.condition}</p>
                        <p className="text-sm text-muted-foreground">{warning.note}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* When To Call Your Doctor */}
          <Card className="bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                When To Call Your Doctor
              </h3>
              <ul className="space-y-2 text-sm text-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-red-600">•</span>
                  <span>Any severe or unexpected symptoms from the list above</span>
                </li>
                {medication.sideEffects.some(se => se.severity === 'high') && (
                  <li className="flex items-start gap-2">
                    <span className="text-red-600">•</span>
                    <span>Signs of serious side effects like {medication.sideEffects.find(se => se.severity === 'high')?.effect.toLowerCase()}</span>
                  </li>
                )}
                {medication.interactions.some(i => i.severity === 'high') && (
                  <li className="flex items-start gap-2">
                    <span className="text-red-600">•</span>
                    <span>Symptoms of serious drug interactions: {medication.interactions.find(i => i.severity === 'high')?.whatToWatch}</span>
                  </li>
                )}
                <li className="flex items-start gap-2">
                  <span className="text-red-600">•</span>
                  <span>If you need to start any new medications (prescription or over-the-counter)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600">•</span>
                  <span>Any questions or concerns about this medication</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
