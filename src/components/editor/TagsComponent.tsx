import { useState, useRef } from "react";
import { Tag, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils"; // for conditional classNames
import { TagsComponentProps } from "@/types/components";

const TagsComponent: React.FC<TagsComponentProps> = ({
  tags,
  onAddTag,
  onRemoveTag,
  isEditable,
  onToggleEdit,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [pendingTags, setPendingTags] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleTempTagAdd = () => {
    onToggleEdit();
    const trimmed = inputValue.trim();
    if (trimmed && !pendingTags.includes(trimmed)) {
      setPendingTags((prev) => [...prev, trimmed]);
      setInputValue("");
      inputRef.current?.focus();
    }
  };

  const handleSave = () => {
    if (pendingTags.length > 0) {
      pendingTags.forEach((tag) => onAddTag(tag));
    }
    tags? setPendingTags([]): null;
    onToggleEdit();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleTempTagAdd();
    } else if (
      e.key === "Backspace" &&
      inputValue === "" &&
      pendingTags.length > 0
    ) {
      setPendingTags((prev) => prev.slice(0, -1));
    }
  };

  const handlePendingTagRemove = (tagToRemove: string) => {
    setPendingTags((prev) => prev.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="space-y-4">
      <Label className="inline-flex items-center gap-2 select-none">
        <Tag className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        Tags
      </Label>

      {/* Saved Tags */}
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-900 dark:text-blue-300 text-sm rounded-full font-medium shadow-sm select-none"
          >
            {tag}
            {isEditable && (
              <button
                onClick={() => onRemoveTag(tag)}
                aria-label={`Remove tag ${tag}`}
                className="flex items-center justify-center p-0.5 rounded-full text-blue-600 hover:text-white hover:bg-blue-600 dark:hover:bg-blue-400 transition-colors duration-200"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </span>
        ))}
      </div>

      {isEditable && (
        <div className="flex items-center gap-3">
          {/* Input with inline pending tags */}
          <div
            className={cn(
              "flex flex-wrap items-center gap-2 flex-1 px-3 py-2 min-h-[44px] rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-card-foreground/5",
              "focus-within:ring-2 focus-within:ring-primary/80 transition"
            )}
            onClick={() => inputRef.current?.focus()}
          >
            {pendingTags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-3 py-1 bg-card-foreground/20  text-foreground text-sm rounded-full font-medium"
              >
                {tag}
                <button
                  onClick={() => handlePendingTagRemove(tag)}
                  className="p-0.5 rounded-full text-foreground"
                  type="button"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}

            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={pendingTags.length === 0 ? "Add a tag..." : ""}
              className="flex-grow bg-transparent outline-none border-none text-sm min-w-[60px]"
              autoComplete="off"
              spellCheck={false}
              aria-label="New tag"
            />
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleTempTagAdd}
              disabled={!inputValue.trim()}
              className="text-sm px-4"
            >
              Add
            </Button>
            <Button
              onClick={handleSave}
              disabled={pendingTags.length === 0}
              className="text-sm px-5 text-white"
            >
              Save
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TagsComponent;
