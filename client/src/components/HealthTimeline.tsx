import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Clock, AlertTriangle, Calendar, User, MapPin, ChevronDown, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import insightsData from "@/data/insights.json";

interface TimelineEvent {
  type: string;
  title: string;
  date: string;
  badge: string;
  description: string;
  provider?: string;
  location?: string;
  metrics?: Array<{ name: string; value: string; status: string }>;
  details?: Array<{ time: string; event: string }>;
  outcome?: string;
}

interface GroupedEvent {
  date: string;
  events: TimelineEvent[];
}

export default function HealthTimeline() {
  const { timeline } = insightsData;
  const [expandedDate, setExpandedDate] = useState<string | null>(null);

  // Group events by date
  const groupedEvents: GroupedEvent[] = timeline.events.reduce((acc: GroupedEvent[], event: any) => {
    const existingGroup = acc.find(group => group.date === event.date);
    if (existingGroup) {
      existingGroup.events.push(event);
    } else {
      acc.push({ date: event.date, events: [event] });
    }
    return acc;
  }, []);

  const toggleDate = (date: string) => {
    setExpandedDate(expandedDate === date ? null : date);
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
        return 'text-primary';
      case 'lab':
        return 'text-secondary';
      case 'emergency':
        return 'text-accent';
      case 'medication':
        return 'text-primary';
      default:
        return 'text-primary';
    }
  };

  const formatDateHeader = (dateStr: string) => {
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    return { day, month, year };
  };

  const getEventSummary = (events: TimelineEvent[]) => {
    if (events.length === 1) {
      return events[0].title;
    }
    const types = events.map(e => e.badge).join(', ');
    return `${events.length} events: ${types}`;
  };

  const hasCriticalEvent = (events: TimelineEvent[]) => {
    return events.some(e => e.type === 'emergency');
  };

  return (
    <section className="p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Health Timeline</h2>
          <p className="text-muted-foreground">Your health journey organized by date</p>
        </div>

        {/* Date-Centric Timeline */}
        <div className="space-y-4">
          {groupedEvents.map((group, groupIndex) => {
            const { day, month, year } = formatDateHeader(group.date);
            const isExpanded = expandedDate === group.date;
            const isCritical = hasCriticalEvent(group.events);

            return (
              <motion.div
                key={group.date}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: groupIndex * 0.1, duration: 0.5 }}
                data-testid={`timeline-date-${groupIndex}`}
              >
                <Card 
                  className={`cursor-pointer hover:shadow-md transition-shadow ${isCritical ? 'border-accent border-2 bg-accent/5' : ''}`}
                  onClick={() => toggleDate(group.date)}
                >
                  <CardContent className="p-6">
                    {/* Date Header */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-6">
                        {/* Large Date Display */}
                        <div className="flex flex-col items-center justify-center bg-primary/10 rounded-lg p-4 min-w-[80px]">
                          <span className="text-3xl font-bold text-primary">{day}</span>
                          <span className="text-sm font-semibold text-primary">{month}</span>
                          <span className="text-xs text-muted-foreground">{year}</span>
                        </div>

                        {/* Event Summary */}
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-foreground mb-1">
                            {getEventSummary(group.events)}
                          </h3>
                          <div className="flex items-center gap-2 flex-wrap">
                            {group.events.map((event, idx) => (
                              <Badge 
                                key={idx}
                                variant={
                                  event.type === 'emergency' ? 'destructive' :
                                  event.type === 'lab' ? 'secondary' :
                                  event.type === 'visit' ? 'default' : 'outline'
                                }
                                className="text-xs"
                              >
                                {event.badge}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Expand Icon */}
                      <div className="flex items-center gap-2">
                        {isExpanded ? (
                          <ChevronDown className="w-5 h-5 text-muted-foreground" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-muted-foreground" />
                        )}
                      </div>
                    </div>

                    {/* Expanded Event Details */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-6 pt-6 border-t border-border"
                        >
                          <div className="space-y-6">
                            {group.events.map((event, eventIndex) => {
                              const Icon = getEventIcon(event.type);
                              const colorClass = getEventColor(event.type);

                              return (
                                <motion.div
                                  key={eventIndex}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: eventIndex * 0.1 }}
                                  className="pl-4 border-l-4 border-primary/20"
                                  data-testid={`event-${groupIndex}-${eventIndex}`}
                                >
                                  <div className="flex items-start gap-3 mb-3">
                                    <Icon className={`w-5 h-5 mt-0.5 ${colorClass}`} />
                                    <div className="flex-1">
                                      <h4 className="font-semibold text-foreground mb-1">{event.title}</h4>
                                      <p className="text-sm text-muted-foreground mb-2">{event.description}</p>

                                      {/* Provider and Location */}
                                      {(event.provider || event.location) && (
                                        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                                          {event.provider && (
                                            <div className="flex items-center gap-1">
                                              <User className="w-3 h-3" />
                                              <span>{event.provider}</span>
                                            </div>
                                          )}
                                          {event.location && (
                                            <div className="flex items-center gap-1">
                                              <MapPin className="w-3 h-3" />
                                              <span>{event.location}</span>
                                            </div>
                                          )}
                                        </div>
                                      )}

                                      {/* Metrics */}
                                      {event.metrics && (
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
                                          {event.metrics.map((metric, metricIndex) => (
                                            <div key={metricIndex} className="p-2 bg-muted rounded-lg">
                                              <p className="text-xs text-muted-foreground">{metric.name}</p>
                                              <p className="text-sm font-semibold text-foreground">{metric.value}</p>
                                              <span className="text-xs text-secondary">{metric.status}</span>
                                            </div>
                                          ))}
                                        </div>
                                      )}

                                      {/* Emergency Details */}
                                      {event.details && (
                                        <div className="mt-4 p-4 bg-accent/10 rounded-lg">
                                          <h5 className="font-semibold text-sm text-foreground mb-3">Detailed Timeline</h5>
                                          <div className="space-y-2">
                                            {event.details.map((detail, detailIndex) => (
                                              <div key={detailIndex} className="flex items-start gap-3 text-sm">
                                                <span className="text-muted-foreground min-w-[60px]">{detail.time}</span>
                                                <span className="text-foreground">{detail.event}</span>
                                              </div>
                                            ))}
                                          </div>
                                          {event.outcome && (
                                            <div className="mt-3 pt-3 border-t border-accent/20">
                                              <p className="text-sm text-foreground">
                                                <strong>Outcome:</strong> {event.outcome}
                                              </p>
                                            </div>
                                          )}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </motion.div>
                              );
                            })}
                          </div>
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
    </section>
  );
}
