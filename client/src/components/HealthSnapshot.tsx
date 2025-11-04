import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, AlertCircle, ChevronRight, Activity, Heart, Droplet } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import VitalTrendChart from "@/components/VitalTrendChart";
import MedicationDetailsModal from "@/components/MedicationDetailsModal";
import ActionChecklist from "@/components/ActionChecklist";
import insightsData from "@/data/insights.json";

export default function HealthSnapshot() {
  const { snapshot } = insightsData;
  const [selectedMedication, setSelectedMedication] = useState<any | null>(null);
  const [showActionChecklist, setShowActionChecklist] = useState(false);

  // Calculate urgent action items count
  const urgentCount = snapshot.actionItems.filter((item: any) => item.priority === "urgent").length;

  // Map vital trends to metric cards (BP, HR, Blood Sugar)
  const bloodPressureVital = snapshot.vitalTrends.find((v: any) => v.name === "Blood Pressure");
  const heartRateVital = snapshot.vitalTrends.find((v: any) => v.name === "Heart Rate");
  const bloodSugarVital = snapshot.vitalTrends.find((v: any) => v.name === "Blood Sugar");

  // Helper function to render severity dots
  const renderSeverityDots = (status: string) => {
    const severityMap: { [key: string]: number } = {
      "well-controlled": 4,
      "improving": 4,
      "needs attention": 2,
    };
    const filledDots = severityMap[status] || 3;
    const totalDots = 5;

    const dotColor = status === "well-controlled" 
      ? "text-green-500" 
      : status === "needs attention" 
      ? "text-red-500" 
      : "text-yellow-500";

    return (
      <div className="flex gap-0.5">
        {Array.from({ length: totalDots }).map((_, i) => (
          <span
            key={i}
            className={`text-lg ${i < filledDots ? dotColor : "text-muted-foreground/30"}`}
          >
            ●
          </span>
        ))}
      </div>
    );
  };

  return (
    <section className="p-8">
      <div className="max-w-7xl mx-auto">
        {/* Compact Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-3xl font-bold text-foreground">Health Snapshot</h2>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>Updated just now</span>
            </div>
          </div>
        </div>

        {/* Compact Alert Banner */}
        {urgentCount > 0 && (
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex items-center justify-between cursor-pointer hover:bg-red-500/15 transition-colors"
              onClick={() => setShowActionChecklist(!showActionChecklist)}
              data-testid="alert-banner"
            >
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-500" />
                <div>
                  <span className="font-medium text-foreground">
                    {urgentCount} {urgentCount === 1 ? 'item' : 'items'} need attention
                  </span>
                  <span className="text-sm text-muted-foreground ml-2">
                    → View actions
                  </span>
                </div>
              </div>
              <ChevronRight className={`w-5 h-5 text-muted-foreground transition-transform ${showActionChecklist ? 'rotate-90' : ''}`} />
            </div>
          </motion.div>
        )}

        {/* Expandable Action Checklist */}
        {showActionChecklist && (
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ActionChecklist actions={snapshot.actionItems as any} />
          </motion.div>
        )}

        {/* 3 Large Vital Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Blood Pressure Card */}
          {bloodPressureVital && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              <Card className="slide-in">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center">
                      <Activity className="w-5 h-5 text-red-500" />
                    </div>
                    <h3 className="text-sm font-medium text-muted-foreground">Blood Pressure</h3>
                  </div>
                  <div className="mb-4">
                    <p className="text-4xl font-bold text-foreground mb-1">
                      {bloodPressureVital.currentValue}
                    </p>
                    <div className="flex items-center gap-2">
                      <Badge variant={bloodPressureVital.trend === 'up' ? 'destructive' : 'secondary'}>
                        {bloodPressureVital.trend === 'up' ? '⚠️' : '✅'} {bloodPressureVital.trend === 'up' ? 'Elevated' : 'Normal'}
                      </Badge>
                    </div>
                  </div>
                  <div className="h-16 mb-3">
                    <VitalTrendChart
                      data={bloodPressureVital.sparklineData}
                      color={bloodPressureVital.color}
                      delay={0.2}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Target: &lt;130/80 {bloodPressureVital.unit}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Heart Rate Card */}
          {heartRateVital && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <Card className="slide-in">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-pink-500/10 rounded-lg flex items-center justify-center">
                      <Heart className="w-5 h-5 text-pink-500" />
                    </div>
                    <h3 className="text-sm font-medium text-muted-foreground">Heart Rate</h3>
                  </div>
                  <div className="mb-4">
                    <p className="text-4xl font-bold text-foreground mb-1">
                      {heartRateVital.currentValue}
                    </p>
                    <div className="flex items-center gap-2">
                      <Badge variant={heartRateVital.trend === 'up' ? 'destructive' : 'secondary'}>
                        {heartRateVital.trend === 'up' ? '⚠️' : '✅'} {heartRateVital.trend === 'up' ? `Up ${heartRateVital.changePercent}` : 'Normal'}
                      </Badge>
                    </div>
                  </div>
                  <div className="h-16 mb-3">
                    <VitalTrendChart
                      data={heartRateVital.sparklineData}
                      color={heartRateVital.color}
                      delay={0.3}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {heartRateVital.trend === 'up' ? 'Up 9% (1 week)' : 'Stable range'}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Blood Sugar Card */}
          {bloodSugarVital && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <Card className="slide-in">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                      <Droplet className="w-5 h-5 text-blue-500" />
                    </div>
                    <h3 className="text-sm font-medium text-muted-foreground">Blood Sugar</h3>
                  </div>
                  <div className="mb-4">
                    <p className="text-4xl font-bold text-foreground mb-1">
                      {bloodSugarVital.currentValue}
                    </p>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">
                        ✅ Down {bloodSugarVital.changePercent}
                      </Badge>
                    </div>
                  </div>
                  <div className="h-16 mb-3">
                    <VitalTrendChart
                      data={bloodSugarVital.sparklineData}
                      color={bloodSugarVital.color}
                      delay={0.4}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Down 5% ✓ Improving
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>

        {/* Compact Active Conditions */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">Active Conditions</h3>
                <Badge variant="secondary" data-testid="diagnoses-count">
                  {snapshot.diagnoses.length}
                </Badge>
              </div>
              <div className="space-y-3">
                {snapshot.diagnoses.map((diagnosis: any, index: number) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                    data-testid={`diagnosis-${index}`}
                  >
                    <div className="flex items-center gap-4 flex-1">
                      {renderSeverityDots(diagnosis.status)}
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground">{diagnosis.name}</h4>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {diagnosis.lastMetric}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant={
                        diagnosis.status === "well-controlled"
                          ? "secondary"
                          : diagnosis.status === "needs attention"
                          ? "destructive"
                          : "default"
                      }
                      className="text-xs"
                    >
                      {diagnosis.status === "well-controlled"
                        ? "Well controlled"
                        : diagnosis.status === "needs attention"
                        ? "Needs attention"
                        : "Improving"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Compact Medications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">Medications</h3>
                <div className="flex items-center gap-2">
                  {snapshot.medications.some((m: any) => m.needsRefill) && (
                    <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                      1 needs refill
                    </Badge>
                  )}
                  <Badge variant="secondary" data-testid="medications-count">
                    {snapshot.medications.length}
                  </Badge>
                </div>
              </div>
              <div className="space-y-2">
                {snapshot.medications.map((medication: any, index: number) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-3 rounded-lg cursor-pointer hover:bg-muted/70 transition-colors ${
                      medication.needsRefill ? "bg-yellow-500/5 border border-yellow-500/20" : "bg-muted/30"
                    }`}
                    onClick={() => setSelectedMedication(medication)}
                    data-testid={`medication-${index}`}
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          medication.needsRefill ? "bg-yellow-500" : "bg-blue-500"
                        }`}
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-sm text-foreground">
                          {medication.name} {medication.dosage}
                        </h4>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {medication.needsRefill ? (
                        <Badge variant="outline" className="text-yellow-600 border-yellow-600 text-xs">
                          Refill needed
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="text-xs">
                          Active
                        </Badge>
                      )}
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-4 text-center">
                → Click any medication to view interactions &amp; side effects
              </p>
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
