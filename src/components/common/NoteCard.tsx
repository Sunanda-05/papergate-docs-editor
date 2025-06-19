import { Card, CardContent } from "@/components/ui/card"
import { getNotePreview } from "@/lib/utils";

type NoteCardProps = {
  note: any
  onClick: () => void
}

export function NoteCard({ note, onClick }: NoteCardProps) {
    const previewText = getNotePreview(note, 240);

  return (
    <Card
      onClick={onClick}
      className="cursor-pointer transition-shadow hover:shadow-md border-muted"
    >
      <CardContent className="p-4 overflow-hidden max-h-32 prose prose-sm">

        {previewText}
      </CardContent>
    </Card>
  )
}