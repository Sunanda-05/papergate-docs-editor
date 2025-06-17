import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Star, StarOff } from "lucide-react";
import { Button } from "../ui/button";

const StarToggle = ({
  isStarred,
  onToggle,
}: {
  isStarred: boolean;
  onToggle: (() => void) | undefined;
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={onToggle}
            variant="_ghost"
            className={`flex items-center gap-2 font-medium transition-all ${
              isStarred
                ? "text-yellow-300 border-yellow-200 dark:border-yellow-700 "
                : "text-muted-foreground"
            }`}
          >
            {isStarred ? (
              <Star className="w-4 h-4 fill-current" />
            ) : (
              <StarOff className="w-4 h-4" />
            )}
            {isStarred ? "Starred" : "Star"}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {isStarred ? "Unstar this item" : "Mark as starred"}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default StarToggle;
