import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Clock, AlertTriangle, Calendar, User, MapPin, ChevronDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import JargonTooltip from "@/components/JargonTooltip";
import insightsData from "@/data/insights.json";

export default function HealthTimeline() {
  const { timeline } = insightsData;
  const [expandedEvent, setExpandedEvent] = useState<number | null>(null);

  const toggleEventDetails = (index: number) => {
    setExpandedEvent(expandedEvent === index ? null : index);
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'visit':
        return CheckCircle;
      case 'lab':
        return Clock;
      case 'emergency':
        return AlertTriangle;
      case 'medication':
        return Calendar;
      default:
        return CheckCircle;
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'visit':
        return 'bg-primary';
      case 'lab':
        return 'bg-secondary';
      case 'emergency':
        return 'bg-accent';
      case 'medication':
        return 'bg-primary';
      default:
        return 'bg-primary';
    }
  };

  return (
    <section className="p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Health Timeline</h2>
          <p className="text-muted-foreground">Your health journey at a glance</p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border"></div>

          {/* Timeline Events */}
          <div className="space-y-8">
            {timeline.events.map((event, index) => {
              const Icon = getEventIcon(event.type);
              const isExpanded = expandedEvent === index;
              const isCritical = event.type === 'emergency';

              return (
                <motion.div
                  key={index}
                  className={`relative pl-20 slide-in ${isCritical ? 'timeline-spike' : ''}`}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  data-testid={`timeline-event-${index}`}
                >
                  <div className={`absolute left-0 w-16 h-16 ${getEventColor(event.type)} rounded-full flex items-center justify-center border-4 border-background shadow-lg ${isCritical ? 'z-10' : ''}`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <Card 
                    className={`${isCritical ? 'bg-accent/10 border-2 border-accent cursor-pointer hover:shadow-lg transition-smooth' : ''}`}
                    onClick={isCritical ? () => toggleEventDetails(index) : undefined}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">
                            {event.jargonTerms?.length ? (
                              event.title.split(' ').map((word, wordIndex) => {
                                const tooltip = event.jargonTerms.find(term => 
                                  term.term.toLowerCase() === word.toLowerCase().replace(/[^\w]/g, '')
                                );
                                if (tooltip) {
                                  return (
                                    <JargonTooltip key={wordIndex} term={tooltip.term} definition={tooltip.definition}>
                                      {word}
                                    </JargonTooltip>
                                  );
                                }
                                return word + ' ';
                              })
                            ) : (
                              event.title
                            )}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">{event.date}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={
                            event.type === 'emergency' ? 'destructive' :
                            event.type === 'lab' ? 'secondary' :
                            event.type === 'visit' ? 'default' : 'outline'
                          }>
                            {event.badge}
                          </Badge>
                          {isCritical && (
                            <ChevronDown 
                              className={`w-5 h-5 text-accent transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
                            />
                          )}
                        </div>
                      </div>
                      
                      <p className={`mb-3 ${isCritical ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {event.description}
                      </p>

                      {event.provider && (
                        <div className="flex items-center space-x-4 text-sm">
                          <div className="flex items-center text-muted-foreground">
                            <User className="w-4 h-4 mr-1" />
                            <span>{event.provider}</span>
                          </div>
                          {event.location && (
                            <div className="flex items-center text-muted-foreground">
                              <MapPin className="w-4 h-4 mr-1" />
                              <span>{event.location}</span>
                            </div>
                          )}
                        </div>
                      )}

                      {event.metrics && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                          {event.metrics.map((metric, metricIndex) => (
                            <div key={metricIndex} className="p-3 bg-muted rounded-lg">
                              <p className="text-xs text-muted-foreground">{metric.name}</p>
                              <p className="text-lg font-semibold text-foreground">{metric.value}</p>
                              <span className="text-xs text-secondary">{metric.status}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Emergency Event Details */}
                      <AnimatePresence>
                        {isCritical && isExpanded && event.details && (
                          <motion.div
                            className="mt-4 pt-4 border-t border-accent/20"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            data-testid={`event-details-${index}`}
                          >
                            <h4 className="font-semibold text-foreground mb-3">Detailed Timeline</h4>
                            <div className="space-y-3">
                              {event.details.map((detail, detailIndex) => (
                                <motion.div
                                  key={detailIndex}
                                  className="flex items-start space-x-3"
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: detailIndex * 0.1, duration: 0.3 }}
                                >
                                  <div className="flex-shrink-0 w-20 text-sm text-muted-foreground">
                                    {detail.time}
                                  </div>
                                  <div className="flex-1">
                                    <p className="text-sm text-foreground">
                                      {detail.jargonTerm ? (
                                        <JargonTooltip term={detail.jargonTerm.term} definition={detail.jargonTerm.definition}>
                                          {detail.event}
                                        </JargonTooltip>
                                      ) : (
                                        detail.event
                                      )}
                                    </p>
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                            {event.outcome && (
                              <div className="mt-4 p-3 bg-muted rounded-lg">
                                <p className="text-sm text-muted-foreground">
                                  <strong>Outcome:</strong> {event.outcome}
                                </p>
                              </div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
