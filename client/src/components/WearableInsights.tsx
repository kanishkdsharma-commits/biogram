import { motion } from "framer-motion";
import { Heart, Zap, Moon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import VitalTrendChart from "@/components/VitalTrendChart";
import insightsData from "@/data/insights.json";

export default function WearableInsights() {
  const { wearables } = insightsData;

  return (
    <section className="p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-3xl font-bold text-foreground">Wearable Insights</h2>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
              <span className="text-sm text-muted-foreground">Synced 2 min ago</span>
            </div>
          </div>
          <p className="text-muted-foreground">Real-time health metrics from your devices</p>
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
              <svg className="w-7 h-7 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
              </svg>
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

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Resting Heart Rate */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <Card className="slide-in">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-destructive/10 rounded-lg flex items-center justify-center">
                      <Heart className="w-6 h-6 text-destructive" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Resting Heart Rate</h3>
                      <p className="text-xs text-muted-foreground">Last 7 days</p>
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex items-baseline space-x-2">
                    <span className="text-4xl font-bold text-foreground" data-testid="heart-rate-value">
                      {wearables.metrics.heartRate.current}
                    </span>
                    <span className="text-muted-foreground">bpm</span>
                  </div>
                  <div className="mt-2 flex items-center space-x-2">
                    <Badge variant="destructive" className="text-xs">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                      </svg>
                      {wearables.metrics.heartRate.changePercent}
                    </Badge>
                  </div>
                </div>
                <div className="h-32">
                  <VitalTrendChart 
                    data={wearables.metrics.heartRate.sparklineData}
                    color="hsl(var(--destructive))"
                    showGradient
                    delay={0}
                  />
                </div>
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Range</span>
                    <span className="font-medium text-foreground">{wearables.metrics.heartRate.range}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Card className="slide-in">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                      <Zap className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Daily Steps</h3>
                      <p className="text-xs text-muted-foreground">Last 7 days</p>
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex items-baseline space-x-2">
                    <span className="text-4xl font-bold text-foreground" data-testid="steps-value">
                      {wearables.metrics.steps.current.toLocaleString()}
                    </span>
                    <span className="text-muted-foreground">steps</span>
                  </div>
                  <div className="mt-2 flex items-center space-x-2">
                    <Badge variant="secondary" className="text-xs">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11l5-5m0 0l5 5m-5-5v12"></path>
                      </svg>
                      Goal: {wearables.metrics.steps.goal.toLocaleString()}
                    </Badge>
                  </div>
                </div>
                <div className="h-32">
                  <VitalTrendChart 
                    data={wearables.metrics.steps.sparklineData}
                    color="hsl(var(--secondary))"
                    showGradient
                    delay={0.3}
                  />
                </div>
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Weekly Avg</span>
                    <span className="font-medium text-foreground">
                      {wearables.metrics.steps.weeklyAverage.toLocaleString()} steps
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Sleep */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Card className="slide-in">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Moon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Sleep Quality</h3>
                      <p className="text-xs text-muted-foreground">Last 7 days</p>
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex items-baseline space-x-2">
                    <span className="text-4xl font-bold text-foreground" data-testid="sleep-value">
                      {wearables.metrics.sleep.current}
                    </span>
                    <span className="text-muted-foreground">hrs</span>
                  </div>
                  <div className="mt-2 flex items-center space-x-2">
                    <Badge variant="destructive" className="text-xs">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                      </svg>
                      {wearables.metrics.sleep.changePercent}
                    </Badge>
                  </div>
                </div>
                <div className="h-32">
                  <VitalTrendChart 
                    data={wearables.metrics.sleep.sparklineData}
                    color="hsl(var(--primary))"
                    showGradient
                    delay={0.6}
                  />
                </div>
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Deep Sleep</span>
                    <span className="font-medium text-foreground">{wearables.metrics.sleep.deepSleep}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Detailed Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-6">Weekly Activity Breakdown</h3>
              <div className="space-y-6">
                {wearables.detailedAnalysis.map((analysis, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
                    data-testid={`analysis-${index}`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-foreground">{analysis.title}</h4>
                        <p className="text-sm text-muted-foreground">{analysis.subtitle}</p>
                      </div>
                      <span className="text-2xl font-bold text-foreground">{analysis.value}</span>
                    </div>
                    <div className="relative pt-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-xs text-muted-foreground">{analysis.range.min}</div>
                        <div className="text-xs text-muted-foreground">{analysis.range.max}</div>
                      </div>
                      <div className="overflow-hidden h-3 text-xs flex rounded-full bg-muted">
                        <div 
                          style={{width: `${analysis.percentage}%`}} 
                          className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${analysis.color}`}
                        ></div>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Weekly Calorie Chart */}
                <div className="mt-8" data-testid="weekly-calories">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-medium text-foreground">Calories Burned</h4>
                      <p className="text-sm text-muted-foreground">Daily average</p>
                    </div>
                    <span className="text-2xl font-bold text-foreground">2,340</span>
                  </div>
                  <div className="grid grid-cols-7 gap-2 mt-3">
                    {wearables.weeklyCalories.map((day, index) => (
                      <motion.div
                        key={index}
                        className="text-center"
                        initial={{ opacity: 0, scaleY: 0 }}
                        animate={{ opacity: 1, scaleY: 1 }}
                        transition={{ delay: 0.8 + index * 0.1, duration: 0.3 }}
                        data-testid={`calorie-day-${index}`}
                      >
                        <div className="h-24 bg-primary/20 rounded-t-lg relative overflow-hidden">
                          <div 
                            className="absolute bottom-0 w-full bg-primary rounded-t-lg"
                            style={{height: `${day.percentage}%`}}
                          ></div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{day.day}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
