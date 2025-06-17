import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { Card, CardContent } from "@/components/ui/card"

type NoteCardProps = {
  note: any // tiptap JSON
  onClick: () => void
}

export function NoteCard({ note, onClick }: NoteCardProps) {
  const editor = useEditor({
    content: note,
    editable: false,
    extensions: [StarterKit],
    immediatelyRender: false
  })

  return (
    <Card
      onClick={onClick}
      className="cursor-pointer transition-shadow hover:shadow-md border-muted"
    >
      <CardContent className="p-4 overflow-hidden max-h-32 prose prose-sm">
        <EditorContent editor={editor} className="line-clamp-3" />
      </CardContent>
    </Card>
  )
}
