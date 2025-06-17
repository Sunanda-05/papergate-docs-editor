import { VisibilityButtonProps } from "@/types/components";
import { Eye, EyeOff, Link } from "lucide-react";
import { Button } from "@/components/ui/button";

const visibilityConfigMap = {
  public: {
    icon: <Eye className="w-4 h-4" />,
    label: "Public",
    className:
      "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700 text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900/30",
  },
  link: (hasLinkToken: boolean = false) => ({
    icon: <Link className="w-4 h-4" />,
    label: hasLinkToken ? "Link Access" : "Link Only",
    className:
      "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/30",
  }),
  private: {
    icon: <EyeOff className="w-4 h-4" />,
    label: "Private",
    className:
      "bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600",
  },
} as const;

export const VisibilityButton: React.FC<VisibilityButtonProps> = ({
  visibility,
  onClick,
  hasLinkToken,
}) => {
  const config =
    visibility === "link"
      ? visibilityConfigMap.link(hasLinkToken)
      : visibilityConfigMap[visibility] || visibilityConfigMap.private;

  return (
    <Button
      onClick={onClick}
      variant="_outline"
      className={`flex items-center gap-2 font-medium transition-colors shadow-sm focus:ring-2 ring-ring ring-offset-1 ${config.className}`}
    >
      {config.icon}
      {config.label}
    </Button>
  );
};
