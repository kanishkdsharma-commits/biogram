import { useState, useEffect } from "react";
import { Plus, StickyNote, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

export interface Note {
  id: string;
  text: string;
  timestamp: string;
  date: string;
}

export default function QuickNoteButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [notes, setNotes] = useState<Note[]>([]);

  // Load notes from localStorage
  useEffect(() => {
    const savedNotes = localStorage.getItem("quickNotes");
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  // Save notes to localStorage and dispatch event
  useEffect(() => {
    localStorage.setItem("quickNotes", JSON.stringify(notes));
    // Dispatch custom event so timeline can react immediately
    window.dispatchEvent(new Event("quickNotesUpdated"));
  }, [notes]);

  const handleAddNote = () => {
    if (!noteText.trim()) return;

    const now = new Date();
    const newNote: Note = {
      id: `note-${Date.now()}`,
      text: noteText,
      timestamp: now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      date: now.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
    };

    setNotes([newNote, ...notes]);
    setNoteText("");
    setIsOpen(false);
  };

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <>
      {/* Floating Action Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-shadow z-50"
        size="icon"
        data-testid="button-quick-note"
      >
        <Plus className="w-6 h-6" />
      </Button>

      {/* Quick Note Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl" data-testid="dialog-quick-note">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <StickyNote className="w-5 h-5" />
              Quick Note
            </DialogTitle>
            <DialogDescription>
              Jot down a symptom, question, or anything you want to remember for your doctor
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="note-text">Your Note</Label>
              <Textarea
                id="note-text"
                placeholder="e.g., Noticed chest tightness after climbing stairs today..."
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                className="mt-2 min-h-[100px]"
                rows={4}
                data-testid="input-note-text"
              />
            </div>

            {/* Recent Notes */}
            {notes.length > 0 && (
              <div className="mt-6 pt-4 border-t border-border">
                <h4 className="font-semibold text-sm mb-3">Recent Notes ({notes.length})</h4>
                <div className="space-y-2 max-h-[300px] overflow-y-auto">
                  {notes.map((note) => (
                    <div
                      key={note.id}
                      className="p-3 bg-muted rounded-lg"
                      data-testid={`note-${note.id}`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <p className="text-sm text-foreground mb-1">{note.text}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>{note.date}</span>
                            <span>•</span>
                            <span>{note.timestamp}</span>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteNote(note.id)}
                          className="h-8 w-8 p-0"
                          data-testid={`button-delete-note-${note.id}`}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddNote} data-testid="button-save-note">
              Add Note
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
