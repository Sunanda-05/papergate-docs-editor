import React, { useEffect, useState } from "react";
import { Edit3, Users } from "lucide-react";
import { VisibilityModal } from "@/components/editor/visibility/VisibilityModal";
import { VisibilityButton } from "@/components/editor/visibility/VisibilityButton";
import { DocType } from "@/types/docs";
import { EditableText } from "./EditableText";
import TagsComponent from "./TagsComponent";
import ShareModal from "./ShareModal";
import { Button } from "../ui/button";
import StarToggle from "./StarToggle";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { SimpleEditor } from "../tiptap-templates/simple/simple-editor";
import { DocumentFormData, VisibilityType } from "@/types/components";
import {
  useShareDocumentMutation,
  useUnshareDocumentMutation,
} from "@/hooks/share";

interface RichTextInterfaceProps {
  doc?: DocType;
  onSave?: (data: DocumentFormData) => void;
  onUpdate?: (data: Partial<DocumentFormData>) => void;
  canEdit?: boolean;
}

const EditorInterface: React.FC<RichTextInterfaceProps> = ({
  doc,
  onSave,
  onUpdate,
  canEdit = true,
}) => {
  const isExistingDoc = !!doc;

  const { mutate: shareDoc } = useShareDocumentMutation();
  const { mutate: unshareDoc } = useUnshareDocumentMutation();

  const [formData, setFormData] = useState<DocumentFormData>({
    title: doc?.title || "",
    content: doc?.content || {},
    visibility: doc?.visibility || "private",
    sharedUsers:
      doc?.sharedWith?.map((entry) => ({
        user: entry?.user?._id,
        permission: entry?.permission,
      })) ||
      [] ||
      [],
    addTags: [],
    removeTags: [],
    isStarred: doc?.isStarred || false,
  });

  const [editStates, setEditStates] = useState({
    title: false,
    content: false,
    visibility: false,
    isStarred: false,
    sharedUsers: false,
    tags: false,
  });

  console.log(doc?.tags);
  console.log({ formData });

  const [showVisibilityModal, setShowVisibilityModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  const handleVisibilityChange = (visibility: VisibilityType) => {
    setFormData((prev) => ({ ...prev, visibility }));
    onUpdate ? onUpdate({ visibility: visibility }) : null; //!linktoken send
  };

  const toggleEditState = (field: keyof typeof editStates) => {
    setEditStates((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleAddUser = (user: string, permission: "read" | "edit") => {
    setFormData((prev) => ({
      ...prev,
      sharedUsers: [...prev.sharedUsers, { user, permission }],
    }));
    onUpdate && doc?._id
      ? shareDoc({ id: doc?._id, userId: user, permission })
      : null;
  };

  const handleRemoveUser = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      sharedUsers: prev.sharedUsers.filter((user) => user.user !== id),
    }));
    onUpdate && doc?._id ? unshareDoc({ id: doc?._id, userId: id }) : null;
  };

  const handleAddTag = (tag: string) => {
    console.log({ tag });
    setFormData((prev) => ({
      ...prev,
      addTags: [...prev.addTags, tag],
    }));
    onUpdate?.({ addTags: [...formData.addTags, tag] });
  };

  const handleRemoveTag = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      removeTags: [...prev.removeTags, tag],
    }));
    onUpdate?.({ removeTags: [...formData.removeTags, tag] });
  };

  const handleStarToggle = () => {
    setFormData((prev) => ({ ...prev, isStarred: !prev.isStarred }));
    onUpdate?.({ isStarred: !formData.isStarred });
  };

  const handleSaveContent = () => {
    console.log(formData?.content);
    onUpdate?.({ content: formData.content });
    toggleEditState("content");
  };

  const handleContentCancel = () => {
    toggleEditState("content");
    setFormData((prev) => ({ ...prev, content: doc?.content }));
  };

  const handleDocSave = () => {
    onSave?.(formData);
  };

  useEffect(() => {
    if (!doc) return;

    setFormData((prev) => ({
      title: editStates.title ? prev.title : doc.title || "",
      content: editStates.content ? prev.content : doc.content || {},
      isStarred: editStates.isStarred ? prev.isStarred : doc.isStarred || false,
      visibility: editStates.visibility
        ? prev.visibility
        : doc?.visibility || "private",
      sharedUsers: editStates.sharedUsers
        ? prev.sharedUsers
        : doc.sharedWith?.map((entry) => ({
            user: entry?.user?._id,
            permission: entry?.permission,
          })) ||
          [] ||
          [],
      addTags: editStates.tags ? prev.addTags : [],
      removeTags: editStates.tags ? prev.removeTags : [],
    }));
  }, [doc, editStates]);

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-card rounded-t-lg border border-slate-200 dark:border-slate-700 p-6 space-y-6">
          {/* Title */}
          <div className="space-y-2">
            {isExistingDoc ? (
              <EditableText
                value={formData.title}
                onChange={(value) => {
                  setFormData((prev) => ({ ...prev, title: value }));
                  onUpdate ? onUpdate({ title: value }) : null;
                }}
                placeholder="Enter document title..."
                isEditing={editStates.title}
                onToggleEdit={() => canEdit && toggleEditState("title")}
                label="Document Title"
              />
            ) : (
              <>
                <Label htmlFor="document-title">Document Title</Label>
                <Input
                  id="document-title"
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, title: e.target.value }))
                  }
                  placeholder="Enter document title..."
                  spellCheck={false}
                  autoComplete="off"
                />
              </>
            )}
          </div>

          {/* Action Buttons Row */}
          <div className="flex flex-wrap gap-3 items-center">
            <VisibilityButton
              visibility={formData.visibility}
              onClick={() => canEdit && setShowVisibilityModal(true)}
              hasLinkToken={!!doc?.linkToken}
            />

            <Button
              onClick={() => canEdit && setShowShareModal(true)}
              variant="_outline"
              className="flex items-center gap-2 font-medium text-muted-foreground hover:text-foreground hover:bg-background"
            >
              <Users className="w-4 h-4" />
              Share ({formData.sharedUsers.length})
            </Button>

            <StarToggle
              isStarred={formData.isStarred}
              onToggle={canEdit ? handleStarToggle : undefined}
            />
          </div>

          {/* Tags Section */}
          <TagsComponent
            tags={doc?.tags ?? []}
            onAddTag={handleAddTag}
            onRemoveTag={handleRemoveTag}
            isEditable={canEdit}
            onToggleEdit={() => canEdit && toggleEditState("tags")}
          />
        </div>

        {/* Editor Placeholder */}
        <div className="flex flex-col justify-between bg-background dark:bg-background border-x border-slate-200 dark:border-slate-700 p-8 min-h-[400px]">
          <SimpleEditor
            key={editStates.content ? "editing" : "saved"}
            readOnly={!canEdit || (isExistingDoc && !editStates.content)}
            onContentChange={(json: any) =>
              setFormData((prev) => ({ ...prev, content: json }))
            }
            content={formData?.content}
          />
          {isExistingDoc && canEdit && (
            <div className="flex justify-between ">
              <Button
                onClick={() => handleContentCancel()}
                className="text-white"
              >
                {editStates.content ? (
                  "Cancel"
                ) : (
                  <>
                    <Edit3 /> Edit
                  </>
                )}
              </Button>
              <Button
                onClick={() => handleSaveContent()}
                disabled={!editStates.content}
                className="text-white"
              >
                Save
              </Button>
            </div>
          )}
        </div>

        {!isExistingDoc && (
          <div className="flex justify-between p-2 border-slate-200 dark:border-slate-700 border-x">
            <Button>Cancel</Button>{" "}
            <Button onClick={handleDocSave}>Save</Button>
          </div>
        )}
        {/* Footer */}
        <div className="bg-muted  rounded-b-lg border border-slate-200 dark:border-slate-700 border-t-0 p-4">
          <div className="flex justify-between items-center text-sm text-slate-500 dark:text-slate-400">
            <span>
              {isExistingDoc
                ? `Last saved: ${
                    doc?.updatedAt
                      ? new Date(doc.updatedAt).toLocaleString()
                      : "Unknown"
                  }`
                : "New document"}
            </span>
            <span>
              {formData.title ? formData.title.length : 0} characters in title
            </span>
          </div>
        </div>

        {/* Modals */}
        <VisibilityModal
          isOpen={showVisibilityModal}
          onClose={() => setShowVisibilityModal(false)}
          visibility={formData.visibility}
          linkToken={doc?.linkToken}
          onVisibilityChange={handleVisibilityChange}
          isExistingDoc={isExistingDoc}
        />

        <ShareModal
          isOpen={showShareModal}
          onClose={() => setShowShareModal(false)}
          sharedUsers={doc?.sharedWith ?? []}
          onAddUser={handleAddUser}
          onRemoveUser={handleRemoveUser}
        />
      </div>
    </div>
  );
};

export default EditorInterface;
