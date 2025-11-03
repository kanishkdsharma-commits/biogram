import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Heart, 
  Activity, 
  Moon, 
  TrendingUp,
  ChevronDown,
  ChevronUp,
  Zap,
  Droplet,
  Weight,
  Apple,
  BarChart3,
  Battery,
  Brain,
  Footprints,
  Wind,
  Thermometer
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import VitalTrendChart from "@/components/VitalTrendChart";
import insightsData from "@/data/insights.json";

export default function WearableInsights() {
  const { wearables } = insightsData;
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem("wearables-expanded-sections");
    return saved ? JSON.parse(saved) : {
      cardiovascular: true,
      recovery: true,
      sleep: true,
      activity: true,
      bodyNutrition: true,
      trends: false
    };
  });

  useEffect(() => {
    localStorage.setItem("wearables-expanded-sections", JSON.stringify(expandedSections));
  }, [expandedSections]);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const toggleAll = () => {
    const allExpanded = Object.values(expandedSections).every(v => v);
    const newState = Object.keys(expandedSections).reduce((acc, key) => {
      acc[key] = !allExpanded;
      return acc;
    }, {} as Record<string, boolean>);
    setExpandedSections(newState);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent": case "normal": case "good": return "text-green-500";
      case "fair": case "moderate": case "average": return "text-yellow-500";
      case "poor": case "elevated": case "needs attention": return "text-red-500";
      default: return "text-muted-foreground";
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case "excellent": case "normal": case "good": return "bg-green-500/10 border-green-500/20";
      case "fair": case "moderate": case "average": return "bg-yellow-500/10 border-yellow-500/20";
      case "poor": case "elevated": case "needs attention": return "bg-red-500/10 border-red-500/20";
      default: return "bg-muted/10 border-border";
    }
  };

  return (
    <section className="p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h2 className="text-3xl font-bold text-foreground">Wearable Insights</h2>
              <p className="text-muted-foreground">Real-time health metrics from your devices</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
                <span className="text-sm text-muted-foreground">Synced 2 min ago</span>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={toggleAll}
                data-testid="button-toggle-all-sections"
              >
                {Object.values(expandedSections).every(v => v) ? (
                  <>
                    <ChevronUp className="w-4 h-4 mr-2" />
                    Collapse All
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4 mr-2" />
                    Expand All
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* AI Insight Banner */}
        <motion.div
          className="mb-8 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          data-testid="ai-insight-banner"
        >
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
              <Brain className="w-7 h-7 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground mb-2">AI-Detected Pattern</h3>
              <p className="text-foreground mb-3">{wearables.aiInsight.description}</p>
              <div className="flex items-center space-x-2">
                <Badge className="correlation-badge bg-accent/20 text-accent">
                  {wearables.aiInsight.correlation}
                </Badge>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Cardiovascular Section */}
        <CollapsibleSection
          title="Cardiovascular & Vitals"
          icon={<Heart className="w-5 h-5" />}
          isExpanded={expandedSections.cardiovascular}
          onToggle={() => toggleSection("cardiovascular")}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Heart Rate Card */}
            <MetricCard
              title="Heart Rate"
              icon={<Heart className="w-5 h-5 text-red-500" />}
              value={wearables.cardiovascular.heartRate.current}
              unit="bpm"
              change={wearables.cardiovascular.heartRate.changePercent}
              status="elevated"
              subtitle={`Resting: ${wearables.cardiovascular.heartRate.resting} | Walking: ${wearables.cardiovascular.heartRate.walking}`}
              chartData={wearables.cardiovascular.heartRate.sparklineData}
              chartColor="hsl(var(--destructive))"
            />

            {/* HRV Card */}
            <MetricCard
              title="Heart Rate Variability"
              icon={<Activity className="w-5 h-5 text-blue-500" />}
              value={wearables.cardiovascular.hrv.current}
              unit="ms"
              change={wearables.cardiovascular.hrv.changePercent}
              status={wearables.cardiovascular.hrv.status}
              subtitle={wearables.cardiovascular.hrv.interpretation}
              chartData={wearables.cardiovascular.hrv.sparklineData}
              chartColor="hsl(var(--primary))"
            />

            {/* VO2 Max Card */}
            <MetricCard
              title="Cardio Fitness (VO₂ Max)"
              icon={<Wind className="w-5 h-5 text-green-500" />}
              value={wearables.cardiovascular.vo2Max.current}
              unit={wearables.cardiovascular.vo2Max.unit}
              change={wearables.cardiovascular.vo2Max.changePercent}
              status="good"
              subtitle={`${wearables.cardiovascular.vo2Max.fitnessLevel} (Age ${wearables.cardiovascular.vo2Max.ageGroup})`}
              chartData={wearables.cardiovascular.vo2Max.sparklineData}
              chartColor="hsl(var(--secondary))"
            />

            {/* Blood Oxygen Card */}
            <MetricCard
              title="Blood Oxygen (SpO₂)"
              icon={<Droplet className="w-5 h-5 text-cyan-500" />}
              value={wearables.cardiovascular.bloodOxygen.current}
              unit="%"
              status={wearables.cardiovascular.bloodOxygen.status}
              subtitle={`Sleep avg: ${wearables.cardiovascular.bloodOxygen.sleepAverage}%`}
              chartData={wearables.cardiovascular.bloodOxygen.sparklineData}
              chartColor="hsl(180, 70%, 50%)"
            />

            {/* Respiratory Rate Card */}
            <MetricCard
              title="Respiratory Rate"
              icon={<Wind className="w-5 h-5 text-teal-500" />}
              value={wearables.cardiovascular.respiratoryRate.current}
              unit="breaths/min"
              subtitle={`Sleep avg: ${wearables.cardiovascular.respiratoryRate.sleepAverage}`}
              chartData={wearables.cardiovascular.respiratoryRate.sparklineData}
              chartColor="hsl(173, 70%, 50%)"
            />

            {/* Blood Pressure Card */}
            <Card className="border-red-500/20 bg-red-500/5">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center">
                      <Thermometer className="w-5 h-5 text-red-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Blood Pressure</h3>
                      <p className="text-xs text-muted-foreground">7-day average</p>
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-foreground">
                      {wearables.cardiovascular.bloodPressure.systolic}/{wearables.cardiovascular.bloodPressure.diastolic}
                    </span>
                    <span className="text-muted-foreground">mmHg</span>
                  </div>
                  <Badge variant="destructive" className="mt-2 text-xs">
                    {wearables.cardiovascular.bloodPressure.status}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  Target: {wearables.cardiovascular.bloodPressure.target}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* HR Zones */}
          <Card className="mt-6">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-6">Heart Rate Zones (Last Workout)</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <ZoneCard
                  label="Warm-up"
                  range={`${wearables.cardiovascular.heartRate.zones.warmup.min}-${wearables.cardiovascular.heartRate.zones.warmup.max} bpm`}
                  time={wearables.cardiovascular.heartRate.zones.warmup.time}
                  percentage={wearables.cardiovascular.heartRate.zones.warmup.percentage}
                  color="bg-blue-500"
                />
                <ZoneCard
                  label="Fat Burn"
                  range={`${wearables.cardiovascular.heartRate.zones.fatBurn.min}-${wearables.cardiovascular.heartRate.zones.fatBurn.max} bpm`}
                  time={wearables.cardiovascular.heartRate.zones.fatBurn.time}
                  percentage={wearables.cardiovascular.heartRate.zones.fatBurn.percentage}
                  color="bg-green-500"
                />
                <ZoneCard
                  label="Cardio"
                  range={`${wearables.cardiovascular.heartRate.zones.cardio.min}-${wearables.cardiovascular.heartRate.zones.cardio.max} bpm`}
                  time={wearables.cardiovascular.heartRate.zones.cardio.time}
                  percentage={wearables.cardiovascular.heartRate.zones.cardio.percentage}
                  color="bg-yellow-500"
                />
                <ZoneCard
                  label="Peak"
                  range={`${wearables.cardiovascular.heartRate.zones.peak.min}-${wearables.cardiovascular.heartRate.zones.peak.max} bpm`}
                  time={wearables.cardiovascular.heartRate.zones.peak.time}
                  percentage={wearables.cardiovascular.heartRate.zones.peak.percentage}
                  color="bg-red-500"
                />
              </div>
            </CardContent>
          </Card>
        </CollapsibleSection>

        {/* Recovery & Readiness Section */}
        <CollapsibleSection
          title="Recovery & Readiness"
          icon={<Battery className="w-5 h-5" />}
          isExpanded={expandedSections.recovery}
          onToggle={() => toggleSection("recovery")}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Recovery Score */}
            <Card className={getStatusBg(wearables.recovery.recoveryScore.status)}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Battery className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Recovery Score</h3>
                      <p className="text-xs text-muted-foreground">Daily readiness</p>
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-foreground">{wearables.recovery.recoveryScore.current}</span>
                    <span className="text-muted-foreground">/100</span>
                  </div>
                  <Badge className={`mt-2 ${getStatusBg(wearables.recovery.recoveryScore.status)}`}>
                    {wearables.recovery.recoveryScore.status}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium text-foreground mb-2">Contributing Factors</div>
                  {wearables.recovery.recoveryScore.factors.map((factor, idx) => (
                    <div key={idx} className="flex items-center justify-between text-sm">
                      <span className={factor.impact === "negative" ? "text-red-500" : "text-green-500"}>
                        {factor.impact === "negative" ? "↓" : "↑"} {factor.name}
                      </span>
                      <span className="text-muted-foreground">{factor.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Training Load */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Training Load</h3>
                      <p className="text-xs text-muted-foreground">7-day strain</p>
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-foreground">{wearables.recovery.trainingLoad.current}</span>
                  </div>
                  <Badge className="mt-2 bg-yellow-500/10 text-yellow-600">
                    {wearables.recovery.trainingLoad.classification}
                  </Badge>
                </div>
                <div className="h-24 mb-4">
                  <VitalTrendChart
                    data={wearables.recovery.trainingLoad.sparklineData}
                    color="hsl(var(--secondary))"
                    showGradient
                    delay={0}
                  />
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">7-day avg:</span>
                    <span className="text-foreground">{wearables.recovery.trainingLoad.sevenDayAvg}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">28-day avg:</span>
                    <span className="text-foreground">{wearables.recovery.trainingLoad.twentyEightDayAvg}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stress Index */}
            <MetricCard
              title="Stress Index"
              icon={<Brain className="w-5 h-5 text-purple-500" />}
              value={wearables.recovery.stressIndex.current}
              unit="/100"
              change={wearables.recovery.stressIndex.changePercent}
              status={wearables.recovery.stressIndex.status}
              subtitle={wearables.recovery.stressIndex.factors.join(", ")}
              chartData={wearables.recovery.stressIndex.sparklineData}
              chartColor="hsl(280, 70%, 50%)"
            />

            {/* Energy Bank */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                      <Zap className="w-5 h-5 text-green-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Energy Bank</h3>
                      <p className="text-xs text-muted-foreground">Mental & physical reserve</p>
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-foreground">{wearables.recovery.energyBank.current}</span>
                    <span className="text-muted-foreground">/100</span>
                  </div>
                  <Badge className={`mt-2 ${getStatusBg(wearables.recovery.energyBank.status)}`}>
                    {wearables.recovery.energyBank.status}
                  </Badge>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-green-500">↑ Deposits</span>
                    <span className="text-foreground font-medium">+{wearables.recovery.energyBank.deposits}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-red-500">↓ Withdrawals</span>
                    <span className="text-foreground font-medium">-{wearables.recovery.energyBank.withdrawals}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t">
                    <span className="text-muted-foreground font-medium">Net Change</span>
                    <span className={wearables.recovery.energyBank.netChange < 0 ? "text-red-500 font-medium" : "text-green-500 font-medium"}>
                      {wearables.recovery.energyBank.netChange > 0 ? "+" : ""}{wearables.recovery.energyBank.netChange}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CollapsibleSection>

        {/* Sleep Section */}
        <CollapsibleSection
          title="Sleep Analysis"
          icon={<Moon className="w-5 h-5" />}
          isExpanded={expandedSections.sleep}
          onToggle={() => toggleSection("sleep")}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Total Sleep */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Moon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Total Sleep</h3>
                      <p className="text-xs text-muted-foreground">Last 7 days</p>
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-foreground">{wearables.sleep.totalSleep}</span>
                    <span className="text-muted-foreground">hrs</span>
                  </div>
                  <Badge variant="destructive" className="mt-2">
                    {wearables.sleep.changePercent}
                  </Badge>
                </div>
                <div className="h-24 mb-4">
                  <VitalTrendChart
                    data={wearables.sleep.sparklineData}
                    color="hsl(var(--primary))"
                    showGradient
                    delay={0}
                  />
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Time in bed:</span>
                    <span className="text-foreground">{wearables.sleep.timeInBed} hrs</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sleep efficiency:</span>
                    <span className="text-foreground">{wearables.sleep.efficiency}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sleep Stages */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-6">Sleep Stages</h3>
                <div className="space-y-4">
                  <SleepStageBar
                    label="Deep Sleep"
                    hours={wearables.sleep.stages.deep.hours}
                    percentage={wearables.sleep.stages.deep.percentage}
                    optimal={wearables.sleep.stages.deep.optimal}
                    color="bg-blue-600"
                  />
                  <SleepStageBar
                    label="REM Sleep"
                    hours={wearables.sleep.stages.rem.hours}
                    percentage={wearables.sleep.stages.rem.percentage}
                    optimal={wearables.sleep.stages.rem.optimal}
                    color="bg-purple-600"
                  />
                  <SleepStageBar
                    label="Light Sleep"
                    hours={wearables.sleep.stages.light.hours}
                    percentage={wearables.sleep.stages.light.percentage}
                    optimal={wearables.sleep.stages.light.optimal}
                    color="bg-cyan-600"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Sleep Consistency */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Sleep Consistency</h3>
                    <p className="text-xs text-muted-foreground">Bedtime & wake regularity</p>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-foreground">{wearables.sleep.consistency.score}</span>
                    <span className="text-muted-foreground">/100</span>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Bedtime variation:</span>
                    <span className="text-foreground">{wearables.sleep.consistency.bedtimeVariation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Wakeup variation:</span>
                    <span className="text-foreground">{wearables.sleep.consistency.wakeupVariation}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sleep Disruptions */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Overnight Vitals</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-2xl font-bold text-foreground">{wearables.sleep.disruptions.count}</div>
                    <div className="text-xs text-muted-foreground">Disruptions</div>
                    <div className="text-xs text-foreground mt-1">Avg: {wearables.sleep.disruptions.avgDuration}</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">{wearables.sleep.overnightVitals.avgHR}</div>
                    <div className="text-xs text-muted-foreground">Avg HR (bpm)</div>
                    <div className="text-xs text-foreground mt-1">Low: {wearables.sleep.overnightVitals.lowestHR}</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">{wearables.sleep.overnightVitals.avgSpO2}%</div>
                    <div className="text-xs text-muted-foreground">Avg SpO₂</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">{wearables.sleep.overnightVitals.avgRespiratoryRate}</div>
                    <div className="text-xs text-muted-foreground">Respiratory Rate</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CollapsibleSection>

        {/* Activity Rings Section */}
        <CollapsibleSection
          title="Activity & Movement"
          icon={<Footprints className="w-5 h-5" />}
          isExpanded={expandedSections.activity}
          onToggle={() => toggleSection("activity")}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Activity Rings */}
            <Card className="md:col-span-3 lg:col-span-1">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-6">Activity Rings</h3>
                <div className="space-y-4">
                  <ActivityRing
                    label="Move"
                    current={wearables.activity.rings.move.current}
                    goal={wearables.activity.rings.move.goal}
                    unit={wearables.activity.rings.move.unit}
                    percentage={wearables.activity.rings.move.percentage}
                    streak={wearables.activity.rings.move.streak}
                    color="bg-red-500"
                  />
                  <ActivityRing
                    label="Exercise"
                    current={wearables.activity.rings.exercise.current}
                    goal={wearables.activity.rings.exercise.goal}
                    unit={wearables.activity.rings.exercise.unit}
                    percentage={wearables.activity.rings.exercise.percentage}
                    streak={wearables.activity.rings.exercise.streak}
                    color="bg-green-500"
                  />
                  <ActivityRing
                    label="Stand"
                    current={wearables.activity.rings.stand.current}
                    goal={wearables.activity.rings.stand.goal}
                    unit={wearables.activity.rings.stand.unit}
                    percentage={wearables.activity.rings.stand.percentage}
                    streak={wearables.activity.rings.stand.streak}
                    color="bg-blue-500"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Steps */}
            <MetricCard
              title="Daily Steps"
              icon={<Footprints className="w-5 h-5 text-secondary" />}
              value={wearables.activity.steps.current}
              subtitle={`Goal: ${wearables.activity.steps.goal.toLocaleString()}`}
              chartData={wearables.activity.steps.sparklineData}
              chartColor="hsl(var(--secondary))"
            />

            {/* Distance & Flights */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Movement</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-3xl font-bold text-foreground">{wearables.activity.distance.current}</span>
                      <span className="text-muted-foreground">{wearables.activity.distance.unit}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">Distance today</div>
                    <div className="text-xs text-foreground mt-1">
                      Weekly: {wearables.activity.distance.weeklyTotal} {wearables.activity.distance.unit}
                    </div>
                  </div>
                  <div className="pt-4 border-t">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-3xl font-bold text-foreground">{wearables.activity.flightsClimbed.current}</span>
                      <span className="text-muted-foreground">flights</span>
                    </div>
                    <div className="text-sm text-muted-foreground">Flights climbed</div>
                    <div className="text-xs text-foreground mt-1">
                      Weekly avg: {wearables.activity.flightsClimbed.weeklyAverage}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Weekly Calories Chart */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Calories Burned</h3>
                  <p className="text-sm text-muted-foreground">Daily average</p>
                </div>
                <span className="text-2xl font-bold text-foreground">{wearables.activity.totalCalories.current}</span>
              </div>
              <div className="grid grid-cols-7 gap-2">
                {wearables.weeklyCalories.map((day, index) => (
                  <motion.div
                    key={index}
                    className="text-center"
                    initial={{ opacity: 0, scaleY: 0 }}
                    animate={{ opacity: 1, scaleY: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    data-testid={`calorie-day-${index}`}
                  >
                    <div className="h-24 bg-primary/20 rounded-t-lg relative overflow-hidden">
                      <div
                        className="absolute bottom-0 w-full bg-primary rounded-t-lg"
                        style={{ height: `${day.percentage}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{day.day}</p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </CollapsibleSection>

        {/* Body & Nutrition Section */}
        <CollapsibleSection
          title="Body & Nutrition"
          icon={<Apple className="w-5 h-5" />}
          isExpanded={expandedSections.bodyNutrition}
          onToggle={() => toggleSection("bodyNutrition")}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Weight */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                    <Weight className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Weight</h3>
                    <p className="text-xs text-muted-foreground">7-day trend</p>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-foreground">{wearables.bodyComposition.weight.current}</span>
                    <span className="text-muted-foreground">{wearables.bodyComposition.weight.unit}</span>
                  </div>
                  <Badge className="mt-2 bg-green-500/10 text-green-600">
                    {wearables.bodyComposition.weight.changePercent}
                  </Badge>
                </div>
                <div className="h-24 mb-4">
                  <VitalTrendChart
                    data={wearables.bodyComposition.weight.sparklineData}
                    color="hsl(var(--secondary))"
                    showGradient
                    delay={0}
                  />
                </div>
                <div className="text-sm text-muted-foreground">
                  Goal: {wearables.bodyComposition.weight.goal} {wearables.bodyComposition.weight.unit}
                </div>
              </CardContent>
            </Card>

            {/* Body Composition */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Body Composition</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">Body Fat</span>
                      <span className="text-foreground font-medium">{wearables.bodyComposition.bodyFat.current}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-500"
                        style={{ width: `${wearables.bodyComposition.bodyFat.current}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">Lean Mass</span>
                      <span className="text-foreground font-medium">{wearables.bodyComposition.leanMass.percentage}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500"
                        style={{ width: `${wearables.bodyComposition.leanMass.percentage}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">Muscle Mass</span>
                      <span className="text-foreground font-medium">{wearables.bodyComposition.muscleMass.percentage}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500"
                        style={{ width: `${wearables.bodyComposition.muscleMass.percentage}%` }}
                      />
                    </div>
                  </div>
                  <div className="pt-3 border-t">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">BMI</span>
                      <span className="text-foreground font-medium">{wearables.bodyComposition.bmi.current}</span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Target: {wearables.bodyComposition.bmi.target}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Nutrition */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Nutrition</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">Calories</span>
                      <span className="text-foreground font-medium">{wearables.nutrition.calories.consumed} / {wearables.nutrition.calories.goal}</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{ width: `${(wearables.nutrition.calories.consumed / wearables.nutrition.calories.goal) * 100}%` }}
                      />
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Net: {wearables.nutrition.calories.net} cal
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">Water</span>
                      <span className="text-foreground font-medium">{wearables.nutrition.water.current} / {wearables.nutrition.water.goal} oz</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-cyan-500"
                        style={{ width: `${wearables.nutrition.water.percentage}%` }}
                      />
                    </div>
                  </div>
                  <div className="pt-3 border-t">
                    <div className="text-sm font-medium text-foreground mb-2">Macros</div>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="text-center">
                        <div className="font-medium text-foreground">{wearables.nutrition.macros.protein.grams}g</div>
                        <div className="text-muted-foreground">Protein</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium text-foreground">{wearables.nutrition.macros.carbs.grams}g</div>
                        <div className="text-muted-foreground">Carbs</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium text-foreground">{wearables.nutrition.macros.fat.grams}g</div>
                        <div className="text-muted-foreground">Fat</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CollapsibleSection>

        {/* Trends Section */}
        <CollapsibleSection
          title="Advanced Analytics & Trends"
          icon={<BarChart3 className="w-5 h-5" />}
          isExpanded={expandedSections.trends}
          onToggle={() => toggleSection("trends")}
        >
          <AdvancedAnalytics wearables={wearables} />
        </CollapsibleSection>
      </div>
    </section>
  );
}

// Helper Components

function AdvancedAnalytics({ wearables }: { wearables: any }) {
  const [selectedTimeframe, setSelectedTimeframe] = useState<"7day" | "28day" | "90day">("7day");

  const getTimeframeData = (metric: string) => {
    const comparisons = wearables.trends.comparisons[metric];
    return {
      "7day": comparisons.sevenDay,
      "28day": comparisons.twentyEightDay,
      "90day": comparisons.ninetyDay
    };
  };

  const timeframeLabels = {
    "7day": "7 Days",
    "28day": "28 Days",
    "90day": "90 Days"
  };

  return (
    <div className="space-y-6">
      {/* Timeframe Selector */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Timeframe Analysis</h3>
            <div className="flex gap-2">
              {(["7day", "28day", "90day"] as const).map((timeframe) => (
                <Button
                  key={timeframe}
                  variant={selectedTimeframe === timeframe ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTimeframe(timeframe)}
                  data-testid={`button-timeframe-${timeframe}`}
                >
                  {timeframeLabels[timeframe]}
                </Button>
              ))}
            </div>
          </div>

          {/* Multi-Metric Comparison Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <MetricComparisonCard
              label="Heart Rate"
              value={getTimeframeData("heartRate")[selectedTimeframe]}
              unit="bpm"
              icon={<Heart className="w-5 h-5 text-red-500" />}
              trend={selectedTimeframe === "7day" ? "+9%" : selectedTimeframe === "28day" ? "+5%" : "+3%"}
              trendDirection="up"
            />
            <MetricComparisonCard
              label="HRV"
              value={getTimeframeData("hrv")[selectedTimeframe]}
              unit="ms"
              icon={<Activity className="w-5 h-5 text-blue-500" />}
              trend={selectedTimeframe === "7day" ? "-8%" : selectedTimeframe === "28day" ? "-4%" : "-2%"}
              trendDirection="down"
            />
            <MetricComparisonCard
              label="Sleep"
              value={getTimeframeData("sleep")[selectedTimeframe]}
              unit="hrs"
              icon={<Moon className="w-5 h-5 text-purple-500" />}
              trend={selectedTimeframe === "7day" ? "-15%" : selectedTimeframe === "28day" ? "-8%" : "-5%"}
              trendDirection="down"
            />
            <MetricComparisonCard
              label="Steps"
              value={getTimeframeData("steps")[selectedTimeframe]}
              unit="avg"
              icon={<Footprints className="w-5 h-5 text-green-500" />}
              trend={selectedTimeframe === "7day" ? "-2%" : selectedTimeframe === "28day" ? "+1%" : "+0.5%"}
              trendDirection={selectedTimeframe === "7day" ? "down" : "up"}
            />
            <MetricComparisonCard
              label="Weight"
              value={getTimeframeData("weight")[selectedTimeframe]}
              unit="lbs"
              icon={<Weight className="w-5 h-5 text-orange-500" />}
              trend={selectedTimeframe === "7day" ? "-1.3%" : selectedTimeframe === "28day" ? "-1.8%" : "-2.5%"}
              trendDirection="down"
            />
          </div>
        </CardContent>
      </Card>

      {/* Multi-Metric Overlay Visualization */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6">Key Metrics Overlay</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded"></div>
                <span className="text-muted-foreground">Heart Rate</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded"></div>
                <span className="text-muted-foreground">HRV</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-500 rounded"></div>
                <span className="text-muted-foreground">Sleep Quality</span>
              </div>
            </div>
            <div className="h-48 flex items-end gap-1">
              {wearables.cardiovascular.heartRate.sparklineData.map((_: number, index: number) => (
                <div key={index} className="flex-1 flex flex-col gap-1">
                  <div
                    className="w-full bg-red-500/30 rounded-t"
                    style={{ 
                      height: `${(wearables.cardiovascular.heartRate.sparklineData[index] / 80) * 100}%`
                    }}
                  />
                  <div
                    className="w-full bg-blue-500/30 rounded-t"
                    style={{ 
                      height: `${(wearables.cardiovascular.hrv.sparklineData[index] / 60) * 100}%`
                    }}
                  />
                  <div
                    className="w-full bg-purple-500/30 rounded-t"
                    style={{ 
                      height: `${(wearables.sleep.sparklineData[index] / 8) * 100}%`
                    }}
                  />
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1 text-xs text-center text-muted-foreground">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                <div key={day}>{day}</div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Training Load Classification */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6">Training Load Classification</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-muted-foreground">Current 7-day load vs 28-day baseline</span>
              <Badge className="bg-yellow-500/10 text-yellow-600">
                {wearables.recovery.trainingLoad.classification}
              </Badge>
            </div>
            
            {/* Training Load Zones Visualization */}
            <div className="relative">
              <div className="flex h-12 rounded-lg overflow-hidden">
                <div className="flex-1 bg-blue-500/30 flex items-center justify-center text-xs text-blue-600 font-medium">
                  Well Below
                </div>
                <div className="flex-1 bg-cyan-500/30 flex items-center justify-center text-xs text-cyan-600 font-medium">
                  Below
                </div>
                <div className="flex-1 bg-green-500/30 flex items-center justify-center text-xs text-green-600 font-medium">
                  Optimal
                </div>
                <div className="flex-1 bg-yellow-500/30 flex items-center justify-center text-xs text-yellow-600 font-medium">
                  Above
                </div>
                <div className="flex-1 bg-red-500/30 flex items-center justify-center text-xs text-red-600 font-medium">
                  Well Above
                </div>
              </div>
              {/* Current position indicator */}
              <div 
                className="absolute top-0 bottom-0 w-1 bg-foreground"
                style={{ 
                  left: `${((wearables.recovery.trainingLoad.current - wearables.recovery.trainingLoad.twentyEightDayAvg) / wearables.recovery.trainingLoad.twentyEightDayAvg * 50) + 50}%`,
                  transform: 'translateX(-50%)'
                }}
              >
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-foreground" />
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-6 text-sm">
              <div>
                <div className="text-2xl font-bold text-foreground">{wearables.recovery.trainingLoad.current}</div>
                <div className="text-xs text-muted-foreground">Current 7-day</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">{wearables.recovery.trainingLoad.sevenDayAvg}</div>
                <div className="text-xs text-muted-foreground">7-day average</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">{wearables.recovery.trainingLoad.twentyEightDayAvg}</div>
                <div className="text-xs text-muted-foreground">28-day baseline</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recovery vs Strain Correlation */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6">Recovery vs Strain Correlation</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="text-sm text-muted-foreground mb-2">Recovery Score</div>
                <div className="text-4xl font-bold text-foreground">{wearables.recovery.recoveryScore.current}</div>
                <Badge className="mt-2 bg-yellow-500/10 text-yellow-600">
                  {wearables.recovery.recoveryScore.status}
                </Badge>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-2">Training Load</div>
                <div className="text-4xl font-bold text-foreground">{wearables.recovery.trainingLoad.current}</div>
                <Badge className="mt-2 bg-yellow-500/10 text-yellow-600">
                  {wearables.recovery.trainingLoad.trend}
                </Badge>
              </div>
            </div>
            
            <div className="pt-4 border-t">
              <div className="text-sm text-muted-foreground mb-3">Analysis</div>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-1.5"></div>
                  <p className="text-foreground">
                    Your recovery score is <span className="font-medium">{wearables.recovery.recoveryScore.status}</span> while training load is <span className="font-medium">{wearables.recovery.trainingLoad.classification.toLowerCase()}</span> baseline
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></div>
                  <p className="text-foreground">
                    Consider reducing training intensity to improve recovery score
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5"></div>
                  <p className="text-foreground">
                    Focus on sleep quality (currently {wearables.sleep.efficiency}% efficiency) to boost recovery
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function MetricComparisonCard({ 
  label, 
  value, 
  unit, 
  icon, 
  trend, 
  trendDirection 
}: { 
  label: string; 
  value: number; 
  unit: string; 
  icon: React.ReactNode; 
  trend: string; 
  trendDirection: "up" | "down";
}) {
  return (
    <div className="border border-border rounded-lg p-4">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 bg-muted/10 rounded-lg flex items-center justify-center">
          {icon}
        </div>
        <div className="text-sm font-medium text-foreground">{label}</div>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold text-foreground">{value}</span>
        <span className="text-sm text-muted-foreground">{unit}</span>
      </div>
      <div className="mt-2 flex items-center gap-1">
        <span className={`text-xs ${trendDirection === "up" ? "text-red-500" : "text-green-500"}`}>
          {trendDirection === "up" ? "↑" : "↓"} {trend}
        </span>
        <span className="text-xs text-muted-foreground">vs previous period</span>
      </div>
    </div>
  );
}

function CollapsibleSection({
  title,
  icon,
  isExpanded,
  onToggle,
  children
}: {
  title: string;
  icon: React.ReactNode;
  isExpanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      className="mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 bg-card border border-border rounded-lg hover:bg-accent/5 transition-colors mb-4"
        data-testid={`section-toggle-${title.toLowerCase().replace(/\s+/g, '-')}`}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
            {icon}
          </div>
          <h3 className="text-xl font-semibold text-foreground">{title}</h3>
        </div>
        {isExpanded ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
      </button>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

interface MetricCardProps {
  title: string;
  icon: React.ReactNode;
  value: number;
  unit?: string;
  change?: string;
  status?: string;
  subtitle?: string;
  chartData?: number[];
  chartColor?: string;
}

function MetricCard({ title, icon, value, unit, change, status, subtitle, chartData, chartColor }: MetricCardProps) {
  const getStatusColor = (s?: string) => {
    if (!s) return "";
    switch (s) {
      case "excellent": case "normal": case "good": return "text-green-500 bg-green-500/10";
      case "fair": case "moderate": case "average": return "text-yellow-500 bg-yellow-500/10";
      case "poor": case "elevated": case "needs attention": return "text-red-500 bg-red-500/10";
      default: return "text-muted-foreground bg-muted/10";
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-muted/10 rounded-lg flex items-center justify-center">
              {icon}
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{title}</h3>
              {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
            </div>
          </div>
        </div>
        <div className="mb-4">
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-foreground">{typeof value === 'number' ? value.toLocaleString() : value}</span>
            {unit && <span className="text-muted-foreground">{unit}</span>}
          </div>
          {change && (
            <Badge className={`mt-2 ${getStatusColor(status)}`}>
              {change}
            </Badge>
          )}
        </div>
        {chartData && (
          <div className="h-24">
            <VitalTrendChart
              data={chartData}
              color={chartColor || "hsl(var(--primary))"}
              showGradient
              delay={0}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function ZoneCard({ label, range, time, percentage, color }: { label: string; range: string; time: number; percentage: number; color: string }) {
  return (
    <div className="text-center">
      <div className="mb-2">
        <div className={`h-2 rounded-full ${color}`} style={{ width: `${percentage}%`, margin: '0 auto' }}></div>
      </div>
      <div className="font-semibold text-foreground">{label}</div>
      <div className="text-xs text-muted-foreground">{range}</div>
      <div className="text-sm font-medium text-foreground mt-1">{time} min</div>
      <div className="text-xs text-muted-foreground">{percentage}%</div>
    </div>
  );
}

function SleepStageBar({ label, hours, percentage, optimal, color }: { label: string; hours: number; percentage: number; optimal: string; color: string }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-foreground font-medium">{label}</span>
        <span className="text-sm text-muted-foreground">{hours} hrs ({percentage}%)</span>
      </div>
      <div className="h-3 bg-muted rounded-full overflow-hidden">
        <div className={`h-full ${color}`} style={{ width: `${percentage}%` }}></div>
      </div>
      <div className="text-xs text-muted-foreground mt-1">Optimal: {optimal}</div>
    </div>
  );
}

function ActivityRing({ label, current, goal, unit, percentage, streak, color }: { label: string; current: number; goal: number; unit: string; percentage: number; streak: number; color: string }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-foreground font-medium">{label}</span>
        <span className="text-xs text-muted-foreground">{streak} day streak 🔥</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <div className="h-3 bg-muted rounded-full overflow-hidden">
            <div className={`h-full ${color}`} style={{ width: `${Math.min(percentage, 100)}%` }}></div>
          </div>
        </div>
        <div className="text-sm font-medium text-foreground">{Math.round(percentage)}%</div>
      </div>
      <div className="text-xs text-muted-foreground mt-1">
        {current} / {goal} {unit}
      </div>
    </div>
  );
}

function TrendComparison({ label, sevenDay, twentyEightDay, ninetyDay }: { label: string; sevenDay: number; twentyEightDay: number; ninetyDay: number }) {
  const getChange = (current: number, previous: number) => {
    const diff = ((current - previous) / previous) * 100;
    return diff.toFixed(1);
  };

  return (
    <div className="border border-border rounded-lg p-4">
      <div className="text-sm font-medium text-foreground mb-4">{label}</div>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-xs text-muted-foreground">7-day avg</span>
          <span className="text-foreground font-medium">{sevenDay}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs text-muted-foreground">28-day avg</span>
          <div className="flex items-center gap-2">
            <span className="text-foreground font-medium">{twentyEightDay}</span>
            <span className={`text-xs ${parseFloat(getChange(sevenDay, twentyEightDay)) > 0 ? 'text-red-500' : 'text-green-500'}`}>
              {parseFloat(getChange(sevenDay, twentyEightDay)) > 0 ? '↑' : '↓'}{Math.abs(parseFloat(getChange(sevenDay, twentyEightDay)))}%
            </span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs text-muted-foreground">90-day avg</span>
          <div className="flex items-center gap-2">
            <span className="text-foreground font-medium">{ninetyDay}</span>
            <span className={`text-xs ${parseFloat(getChange(sevenDay, ninetyDay)) > 0 ? 'text-red-500' : 'text-green-500'}`}>
              {parseFloat(getChange(sevenDay, ninetyDay)) > 0 ? '↑' : '↓'}{Math.abs(parseFloat(getChange(sevenDay, ninetyDay)))}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
