"use client"

import { useState } from "react"
import { NoteCard } from "./NoteCard"
import {SimpleEditor} from "@/components/tiptap-templates/simple/simple-editor"
import { Button } from "@/components/ui/button"

const notes = [
  {
    id: "1",
    content: {
      type: "doc",
      content: [
        { type: "paragraph", content: [{ type: "text", text: "Note one: something short and sweet." }] },
      ],
    },
  },
  {
    id: "2",
    content: {
      type: "doc",
      content: [
        { type: "paragraph", content: [{ type: "text", text: "Note two: a much longer paragraph that should get cut off in the preview if it exceeds the allowed height..." }] },
      ],
    },
  },
]

export default function NotesList() {
  const [selectedNote, setSelectedNote] = useState<any | null>(null)

  return (
    <div className="p-6">
      {!selectedNote ? (
        <>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">My Notes</h1>
            <Button onClick={() => setSelectedNote({})}>New Note</Button>
          </div>

          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {notes.map((note) => (
              <NoteCard
                key={note.id}
                note={note.content}
                onClick={() => setSelectedNote(note.content)}
              />
            ))}
          </div>
        </>
      ) : (
        <>
          <Button variant="ghost" onClick={() => setSelectedNote(null)} className="mb-4">
            ← Back to notes
          </Button>
          <SimpleEditor
            content={selectedNote}
            readOnly={false}
            onContentChange={(json) => console.log("Note updated", json)}
          />
        </>
      )}
    </div>
  )
}
