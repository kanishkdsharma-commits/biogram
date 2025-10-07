import { useEffect } from "react";

interface KeyboardShortcutsProps {
  onSection1: () => void;
  onSection2: () => void;
  onSection3: () => void;
}

export default function useKeyboardShortcuts({
  onSection1,
  onSection2,
  onSection3,
}: KeyboardShortcutsProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input field
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return;
      }

      switch (e.key) {
        case "1":
          e.preventDefault();
          onSection1();
          break;
        case "2":
          e.preventDefault();
          onSection2();
          break;
        case "3":
          e.preventDefault();
          onSection3();
          break;
        default:
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onSection1, onSection2, onSection3]);
}
