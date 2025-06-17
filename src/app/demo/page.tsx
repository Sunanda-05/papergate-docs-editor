import EditorInterface from '@/components/editor/EditorInterface'
import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor'
import React from 'react'
import demoData from "@/components/tiptap-templates/simple/data/content.json"


const DemoPage = () => {
    console.log(demoData)
  return (
    <div><SimpleEditor content={demoData}/></div>
  )
}

export default DemoPage