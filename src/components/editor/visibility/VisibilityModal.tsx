import { useState } from "react";
import { Check, Copy, Eye, EyeOff, Link, X } from "lucide-react";
import { VisibilityModalProps, VisibilityType } from "@/types/components";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const VisibilityModal: React.FC<VisibilityModalProps> = ({
  isOpen,
  onClose,
  visibility,
  linkToken,
  onVisibilityChange,
  isExistingDoc,
}) => {
  const [linkCopied, setLinkCopied] = useState(false);

  console.log({ linkToken });
  const copyLink = async () => {
    if (linkToken) {
      const fullLink = `${process.env.NEXT_PUBLIC_APP_URL}/doc/${linkToken}`;
      await navigator.clipboard.writeText(fullLink);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    }
  };

  const handleVisibilitySelect = (newVisibility: VisibilityType) => {
    if (newVisibility === "link" && isExistingDoc && !linkToken) {
      // onGenerateToken(); //! loading
    }
    onVisibilityChange(newVisibility);
    // onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="visibility-modal-title"
    >
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 w-full max-w-md shadow-lg">
        <header className="flex justify-between items-center mb-6">
          <h3
            id="visibility-modal-title"
            className="text-lg font-semibold text-slate-900 dark:text-white"
          >
            Document Visibility
          </h3>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Close visibility modal"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
          >
            <X className="w-5 h-5" />
          </Button>
        </header>

        <p className="mb-6 text-slate-600 dark:text-slate-300">
          Choose how others can access this document.
        </p>

        {/* Visibility Options */}
        <div className="space-y-3">
          {[
            {
              key: "private" as VisibilityType,
              icon: (
                <EyeOff className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              ),
              title: "Private",
              description: "Only you can access",
              activeBg: "bg-slate-50 dark:bg-slate-700",
              activeBorder: "border-slate-500 dark:border-slate-600",
              inactiveBorder: "border-slate-200 dark:border-slate-700",
            },
            {
              key: "link" as VisibilityType,
              icon: (
                <Link className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              ),
              title: "Link Access",
              description: (
                <>
                  Anyone with the link can access
                  {isExistingDoc && !linkToken && " (will generate token)"}
                </>
              ),
              activeBg: "bg-blue-50 dark:bg-blue-900/20",
              activeBorder: "border-blue-500 dark:border-blue-600",
              inactiveBorder: "border-slate-200 dark:border-slate-700",
            },
            {
              key: "public" as VisibilityType,
              icon: (
                <Eye className="w-5 h-5 text-green-600 dark:text-green-400" />
              ),
              title: "Public",
              description: "Discoverable by anyone",
              activeBg: "bg-green-50 dark:bg-green-900/20",
              activeBorder: "border-green-500 dark:border-green-600",
              inactiveBorder: "border-slate-200 dark:border-slate-700",
            },
          ].map(
            ({
              key,
              icon,
              title,
              description,
              activeBg,
              activeBorder,
              inactiveBorder,
            }) => {
              const isActive = visibility === key;
              return (
                <button
                  key={key}
                  onClick={() => handleVisibilitySelect(key)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg border-2 transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 ${
                    isActive
                      ? `${activeBg} ${activeBorder}`
                      : `${inactiveBorder} hover:border-slate-300 dark:hover:border-slate-600`
                  }`}
                  aria-pressed={isActive}
                >
                  {icon}
                  <div className="text-left">
                    <div className="font-medium text-slate-900 dark:text-white">
                      {title}
                    </div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">
                      {description}
                    </div>
                  </div>
                </button>
              );
            }
          )}
        </div>

        {/* Link Display */}
        {visibility === "link" && linkToken && (
          <div className="mt-6 space-y-2 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <label
              htmlFor="shareable-link"
              className="text-sm font-medium text-blue-800 dark:text-blue-300 block mb-1"
            >
              Shareable Link
            </label>
            <div className="flex gap-2">
              <Input
                id="shareable-link"
                type="text"
                value={`https://app.example.com/doc/${linkToken}`}
                readOnly
                className="flex-1 text-sm"
                aria-readonly
              />
              <Button
                onClick={copyLink}
                variant={linkCopied ? "secondary" : "outline"}
                className="flex items-center justify-center px-3"
                aria-label={
                  linkCopied ? "Link copied" : "Copy link to clipboard"
                }
              >
                {linkCopied ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
