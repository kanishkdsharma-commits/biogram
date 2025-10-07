import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import VitalTrendChart from "@/components/VitalTrendChart";
import MedicationDetailsModal from "@/components/MedicationDetailsModal";
import ActionChecklist from "@/components/ActionChecklist";
import insightsData from "@/data/insights.json";

export default function HealthSnapshot() {
  const { snapshot } = insightsData;
  const [selectedMedication, setSelectedMedication] = useState<any | null>(null);

  return (
    <section className="p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-3xl font-bold text-foreground">Health Snapshot</h2>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>Updated just now</span>
            </div>
          </div>
          <p className="text-muted-foreground">AI-powered insights from your health data</p>
        </div>

        {/* AI-Detected Action Checklist */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ActionChecklist actions={snapshot.actionItems as any} />
        </motion.div>

        {/* Main Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Diagnoses Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Card className="slide-in">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-foreground">Active Diagnoses</h3>
                  <Badge variant="secondary" data-testid="diagnoses-count">
                    {snapshot.diagnoses.length} Active
                  </Badge>
                </div>
                <div className="space-y-4">
                  {snapshot.diagnoses.map((diagnosis, index) => (
                    <motion.div
                      key={index}
                      className="p-4 bg-muted rounded-lg"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1, duration: 0.3 }}
                      data-testid={`diagnosis-${index}`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">
                            {diagnosis.name}
                          </h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            Diagnosed: {diagnosis.diagnosedDate}
                          </p>
                        </div>
                        <Badge 
                          variant={diagnosis.status === 'well-controlled' ? 'secondary' : 
                                 diagnosis.status === 'needs attention' ? 'destructive' : 'default'}
                        >
                          {diagnosis.status}
                        </Badge>
                      </div>
                      <div className="mt-3 flex items-center text-sm text-muted-foreground">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                        </svg>
                        <span>{diagnosis.lastMetric}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Medications Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Card className="slide-in">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-foreground">Current Medications</h3>
                  <Badge variant="secondary" data-testid="medications-count">
                    {snapshot.medications.length} Active
                  </Badge>
                </div>
                <div className="space-y-3">
                  {snapshot.medications.map((medication, index) => (
                    <motion.div
                      key={index}
                      className={`flex items-center justify-between p-3 rounded-lg cursor-pointer hover:shadow-md transition-shadow ${
                        medication.needsRefill ? 'bg-accent/10 border border-accent/20' : 'bg-muted'
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1, duration: 0.3 }}
                      data-testid={`medication-${index}`}
                      onClick={() => setSelectedMedication(medication)}
                    >
                      <div className="flex-1">
                        <h4 className="font-medium text-sm text-foreground">
                          {medication.name} {medication.dosage}
                        </h4>
                        <p className={`text-xs mt-1 ${
                          medication.needsRefill ? 'text-accent' : 'text-muted-foreground'
                        }`}>
                          {medication.needsRefill ? `⚠️ ${medication.instructions}` : medication.instructions}
                        </p>
                        <p className="text-xs mt-1 text-primary">Click for detailed interaction info →</p>
                      </div>
                      {medication.needsRefill ? (
                        <Button 
                          size="sm" 
                          className="text-xs" 
                          data-testid={`refill-${index}`}
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          Refill
                        </Button>
                      ) : (
                        <Badge variant="secondary">Active</Badge>
                      )}
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Vital Trends */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Card className="slide-in">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-6">Vital Trends (Last 30 Days)</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {snapshot.vitalTrends.map((vital, index) => (
                  <div key={index} className="space-y-3" data-testid={`vital-trend-${index}`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-foreground">{vital.name}</h4>
                        <p className="text-2xl font-bold text-foreground mt-1">{vital.currentValue}</p>
                        <p className="text-xs text-muted-foreground">{vital.unit}</p>
                      </div>
                      <div className="text-right">
                        <Badge 
                          variant={vital.trend === 'up' ? 'destructive' : 'secondary'}
                          className="inline-flex items-center"
                        >
                          {vital.trend === 'up' ? (
                            <TrendingUp className="w-3 h-3 mr-1" />
                          ) : (
                            <TrendingDown className="w-3 h-3 mr-1" />
                          )}
                          {vital.changePercent}
                        </Badge>
                      </div>
                    </div>
                    <div className="h-16 relative">
                      <VitalTrendChart 
                        data={vital.sparklineData} 
                        color={vital.color}
                        delay={index * 0.3}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Medication Details Modal */}
      {selectedMedication && (
        <MedicationDetailsModal
          isOpen={!!selectedMedication}
          onClose={() => setSelectedMedication(null)}
          medication={selectedMedication}
        />
      )}
    </section>
  );
}
