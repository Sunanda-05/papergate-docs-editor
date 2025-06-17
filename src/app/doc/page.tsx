"use client"

import { useDocsQuery, useDocumentQuery } from '@/hooks/docs'
import React from 'react'
// // import TiptapEditor from './TiptapEditor'
import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor'
import NotesList from './NoteList'

const DocHome = () => {
  // const {data} = useDocsQuery()

  // console.log(data)
  return (
    <div>
      {/* <NotesList/>*/}
      <SimpleEditor/> 
      
      </div>
  )
}

export default DocHome

