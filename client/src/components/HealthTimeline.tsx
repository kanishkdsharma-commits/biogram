import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle, Clock, AlertTriangle, Calendar, User, MapPin, 
  ChevronDown, ChevronRight, Filter, Search, X, Printer, StickyNote 
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import PrintTimelineModal from "@/components/PrintTimelineModal";
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
  const [showPrintModal, setShowPrintModal] = useState(false);

  // Load filter state from localStorage on mount
  const [searchQuery, setSearchQuery] = useState(() => {
    const saved = localStorage.getItem("timeline-search");
    return saved || "";
  });
  
  const [eventTypeFilters, setEventTypeFilters] = useState<Set<string>>(() => {
    const saved = localStorage.getItem("timeline-event-filters");
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });
  
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>(() => {
    const saved = localStorage.getItem("timeline-date-range");
    return saved ? JSON.parse(saved) : { start: "", end: "" };
  });

  // Persist filter changes to localStorage
  useEffect(() => {
    localStorage.setItem("timeline-search", searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    localStorage.setItem("timeline-event-filters", JSON.stringify(Array.from(eventTypeFilters)));
  }, [eventTypeFilters]);

  useEffect(() => {
    localStorage.setItem("timeline-date-range", JSON.stringify(dateRange));
  }, [dateRange]);

  const toggleDate = (date: string) => {
    setExpandedDate(expandedDate === date ? null : date);
  };

  const toggleEventType = (type: string) => {
    const newFilters = new Set(eventTypeFilters);
    if (newFilters.has(type)) {
      newFilters.delete(type);
    } else {
      newFilters.add(type);
    }
    setEventTypeFilters(newFilters);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setEventTypeFilters(new Set());
    setDateRange({ start: "", end: "" });
  };

  // Track quick notes state and listen for storage changes
  const [notesRefresh, setNotesRefresh] = useState(0);

  // Listen for storage changes to refresh notes when new ones are added
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "quickNotes") {
        setNotesRefresh(prev => prev + 1);
      }
    };

    // Also listen for custom event from same window
    const handleLocalUpdate = () => {
      setNotesRefresh(prev => prev + 1);
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("quickNotesUpdated", handleLocalUpdate);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("quickNotesUpdated", handleLocalUpdate);
    };
  }, []);

  // Load quick notes and convert to timeline events (reactive to notesRefresh)
  const quickNoteEvents = useMemo(() => {
    const savedNotes = localStorage.getItem("quickNotes");
    if (!savedNotes) return [];

    const notes = JSON.parse(savedNotes);
    return notes.map((note: any) => ({
      type: "note",
      title: "Quick Note",
      date: note.date,
      badge: "Note",
      description: note.text,
      timestamp: note.timestamp,
      isNote: true,
    }));
  }, [notesRefresh]);

  // Combine timeline events with quick notes and sort by date
  const allEvents = useMemo(() => {
    const combined = [...timeline.events, ...quickNoteEvents];
    
    // Sort by date (newest first), then by timestamp
    return combined.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      
      // Sort by date descending (newest first)
      if (dateA > dateB) return -1;
      if (dateA < dateB) return 1;
      
      // If same date, sort by timestamp if available
      if (a.timestamp && b.timestamp) {
        return b.timestamp.localeCompare(a.timestamp);
      }
      
      return 0;
    });
  }, [timeline.events, quickNoteEvents]);

  // Get all unique event types (including notes)
  const eventTypes = Array.from(new Set(allEvents.map((e: any) => e.type)));

  // Apply filters
  const filteredEvents = useMemo(() => {
    let filtered = allEvents;

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((event: any) =>
        event.title.toLowerCase().includes(query) ||
        event.description.toLowerCase().includes(query) ||
        event.provider?.toLowerCase().includes(query) ||
        event.location?.toLowerCase().includes(query)
      );
    }

    // Event type filter
    if (eventTypeFilters.size > 0) {
      filtered = filtered.filter((event: any) => eventTypeFilters.has(event.type));
    }

    // Date range filter
    if (dateRange.start || dateRange.end) {
      filtered = filtered.filter((event: any) => {
        const eventDate = new Date(event.date);
        const startDate = dateRange.start ? new Date(dateRange.start) : null;
        const endDate = dateRange.end ? new Date(dateRange.end) : null;

        if (startDate && eventDate < startDate) return false;
        if (endDate && eventDate > endDate) return false;
        return true;
      });
    }

    return filtered;
  }, [allEvents, searchQuery, eventTypeFilters, dateRange]);

  // Group filtered events by date
  const groupedEvents: GroupedEvent[] = filteredEvents.reduce((acc: GroupedEvent[], event: any) => {
    const existingGroup = acc.find(group => group.date === event.date);
    if (existingGroup) {
      existingGroup.events.push(event);
    } else {
      acc.push({ date: event.date, events: [event] });
    }
    return acc;
  }, []);

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
      case 'note':
        return StickyNote;
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
      case 'note':
        return 'text-yellow-500';
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

  const hasActiveFilters = searchQuery || eventTypeFilters.size > 0 || dateRange.start || dateRange.end;

  return (
    <section className="p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">Health Timeline</h2>
            <p className="text-muted-foreground">Your health journey organized by date</p>
          </div>
          <Button
            onClick={() => setShowPrintModal(true)}
            className="gap-2"
            data-testid="button-print-timeline"
          >
            <Printer className="w-4 h-4" />
            Print Summary
          </Button>
        </div>

        {/* Filter Bar */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search events, providers, locations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                    data-testid="input-timeline-search"
                  />
                </div>
              </div>

              {/* Event Type Filter */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="gap-2" data-testid="button-filter-event-type">
                    <Filter className="w-4 h-4" />
                    Event Type
                    {eventTypeFilters.size > 0 && (
                      <Badge variant="secondary" className="ml-1">
                        {eventTypeFilters.size}
                      </Badge>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-56" data-testid="popover-event-filters">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm">Filter by Event Type</h4>
                    {eventTypes.map((type: string) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox
                          id={`filter-${type}`}
                          checked={eventTypeFilters.has(type)}
                          onCheckedChange={() => toggleEventType(type)}
                          data-testid={`checkbox-filter-${type}`}
                        />
                        <Label htmlFor={`filter-${type}`} className="text-sm capitalize cursor-pointer">
                          {type}
                        </Label>
                      </div>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>

              {/* Date Range Filter */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="gap-2" data-testid="button-filter-date-range">
                    <Calendar className="w-4 h-4" />
                    Date Range
                    {(dateRange.start || dateRange.end) && (
                      <Badge variant="secondary" className="ml-1">
                        ✓
                      </Badge>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80" data-testid="popover-date-range">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-sm">Select Date Range</h4>
                    <div className="space-y-2">
                      <Label htmlFor="start-date">Start Date</Label>
                      <Input
                        id="start-date"
                        type="date"
                        value={dateRange.start}
                        onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                        data-testid="input-date-start"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="end-date">End Date</Label>
                      <Input
                        id="end-date"
                        type="date"
                        value={dateRange.end}
                        onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                        data-testid="input-date-end"
                      />
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              {/* Clear Filters */}
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="gap-2"
                  data-testid="button-clear-filters"
                >
                  <X className="w-4 h-4" />
                  Clear
                </Button>
              )}
            </div>

            {/* Active Filter Summary */}
            {hasActiveFilters && (
              <div className="mt-3 pt-3 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  Showing {groupedEvents.length} date{groupedEvents.length !== 1 ? 's' : ''} with {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Date-Centric Timeline */}
        {groupedEvents.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-muted-foreground">No events found matching your filters.</p>
              <Button variant="outline" onClick={clearFilters} className="mt-4">
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        ) : (
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
        )}
      </div>

      {/* Print Timeline Modal */}
      <PrintTimelineModal
        isOpen={showPrintModal}
        onClose={() => setShowPrintModal(false)}
      />
    </section>
  );
}
