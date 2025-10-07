import { ReactNode } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface JargonTooltipProps {
  term: string;
  definition: string;
  children: ReactNode;
}

export default function JargonTooltip({ term, definition, children }: JargonTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="tooltip cursor-help border-b border-dotted border-primary">
            {children}
          </span>
        </TooltipTrigger>
        <TooltipContent 
          side="top" 
          className="max-w-[280px] p-3 bg-foreground text-background text-sm"
          data-testid={`tooltip-${term.toLowerCase().replace(/\s+/g, '-')}`}
        >
          <div>
            <p className="font-medium mb-1">{term}</p>
            <p className="text-xs leading-relaxed">{definition}</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
