import { EditableTextProps } from "@/types/components";
import { Save, X, Edit3 } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export const EditableText: React.FC<EditableTextProps> = ({
  value,
  onChange,
  placeholder,
  className = "",
  isEditing,
  onToggleEdit,
  label,
  multiline = false,
}) => {
  const [tempValue, setTempValue] = useState(value);

  const handleSave = () => {
    onChange(tempValue.trim());
    onToggleEdit();
  };

  const handleCancel = () => {
    setTempValue(value);
    onToggleEdit();
  };

  const showPlaceholder = !value?.trim();

  return (
    <div className="flex flex-col group w-full space-y-1">
      {label && (
        <Label className="text-sm text-muted-foreground flex items-center justify-between">
          {label}
          {!isEditing && (
            <button
              type="button"
              onClick={onToggleEdit}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Edit3 className="w-4 h-4 text-muted-foreground hover:text-foreground" />
            </button>
          )}
        </Label>
      )}

      {isEditing ? (
        <div className="flex items-start gap-2 w-full">
          {multiline ? (
            <Textarea
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              placeholder={placeholder}
              className={`resize-none text-base tracking-tight shadow-sm focus:ring-2 ring-ring ring-offset-1 ${className}`}
              autoFocus
            />
          ) : (
            <Input
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              placeholder={placeholder}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSave();
                }
              }}
              className={`text-base tracking-tight shadow-sm focus:ring-2 ring-ring ring-offset-1 ${className}`}
              autoFocus
            />
          )}

          <div className="flex gap-1 pt-[2px]">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSave}
              className="text-green-600 hover:bg-green-100 hover:text-green-700 transition"
            >
              <Save className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCancel}
              className="text-muted-foreground hover:text-red-500 hover:bg-red-50 transition"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>
      ) : (
        <div
          className={`text-base font-medium tracking-tight py-[2px] min-h-[32px] transition-colors ${className}`}
        >
          {showPlaceholder ? (
            <span className="text-muted-foreground italic">{placeholder}</span>
          ) : (
            value
          )}
        </div>
      )}
    </div>
  );
};
