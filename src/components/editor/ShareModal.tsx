import { ShareModalProps } from "@/types/components";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useGetUserIdQuery } from "@/hooks/user";

// Dummy API call
const findUserIdByEmail = async (email: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === "notfound@example.com") {
        reject({ status: 404 });
      } else {
        resolve("user-id-123");
      }
    }, 500);
  });
};

const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  sharedUsers,
  onAddUser,
  onRemoveUser,
}) => {
  const [email, setEmail] = useState("");
  const [permission, setPermission] = useState<"read" | "edit">("read");
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [shouldFetch, setShouldFetch] = useState(false);

  const {
    data: user,
    isError,
    isSuccess,
    isPending,
  } = useGetUserIdQuery(email, shouldFetch);

  const handleEmailEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter" || !email.trim()) return;

    setError("");
    setUserId(null);
    setShouldFetch(true); // this triggers the query
  };

  console.log({ sharedUsers });
  const handleAddUser = () => {
    if (!email || !user?.id) return;
    onAddUser(user?.id, permission);
    setEmail("");
    setUserId(null);
  };

  useEffect(() => {
    if (isSuccess || isError) {
      setShouldFetch(false);
    }
  }, [isSuccess, isError]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Share Document</DialogTitle>
        </DialogHeader>

        <div className="flex gap-2">
          <Input
            type="email"
            placeholder="Enter email..."
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setUserId(null);
              setError("");
            }}
            onKeyDown={handleEmailEnter}
            disabled={loading}
          />
          <Select
            value={permission}
            onValueChange={(val) => setPermission(val as "read" | "edit")}
          >
            <SelectTrigger className="w-[100px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="read">Read</SelectItem>
              <SelectItem value="edit">Edit</SelectItem>
            </SelectContent>
          </Select>
          <Button
            onClick={handleAddUser}
            disabled={!email || !user?.id}
            variant="default"
          >
            Add
          </Button>
        </div>

        {error && <p className="text-sm text-red-500 m-1">{error}</p>}

        <ScrollArea className="max-h-64 mt-4 space-y-2 pr-2">
          {sharedUsers.length === 0 ? (
            <p className="text-center text-sm text-muted-foreground py-8">
              No users shared with yet.
            </p>
          ) : (
            sharedUsers.map((user, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-muted px-4 py-3 rounded-lg my-2"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <span className="text-blue-600 dark:text-blue-400 text-sm font-semibold">
                      {user?.user?.name?.[0]?.toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">{user?.user?.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {user?.permission} access
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onRemoveUser(user.user._id)}
                >
                  <X className="w-4 h-4 text-muted-foreground hover:text-red-500" />
                </Button>
              </div>
            ))
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ShareModal;
