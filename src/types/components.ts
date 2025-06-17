import { SharedWithEntry } from "./docs";

export type VisibilityType = "public" | "private" | "link";

export interface VisibilityButtonProps {
  visibility: VisibilityType;
  onClick: () => void;
  hasLinkToken?: boolean;
}

export interface VisibilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  visibility: VisibilityType;
  linkToken?: string;
  onVisibilityChange: (visibility: VisibilityType) => void;
  // onGenerateToken?: () => void;
  isExistingDoc: boolean;
}

export interface EditableTextProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  className?: string;
  isEditing: boolean;
  onToggleEdit: () => void;
  label: string;
  multiline?: boolean;
}

export interface TagsComponentProps {
  tags: string[];
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
  isEditable: boolean;
  onToggleEdit: () => void;
}

export interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  sharedUsers: SharedWithEntry[];
  onAddUser: (userId: string, permission: "read" | "edit") => void;
  onRemoveUser: (userId: string) => void;
}

export interface DocumentFormData {
  title: string;
  content: any;
  visibility: VisibilityType;
  sharedUsers: {
    user: string;
    permission: "read" | "edit";
  }[];
  addTags: string[];
  removeTags: string[];
  isStarred: boolean;
}
