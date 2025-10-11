"use client"

import dynamic from "next/dynamic"
import { forwardRef } from "react"

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false })

interface RichTextEditorProps {
  value?: string
  onChange?: (value?: string) => void
  placeholder?: string
}

export const RichTextEditor = forwardRef<HTMLDivElement, RichTextEditorProps>(
  ({ value, onChange, placeholder }, ref) => {
    return (
      <div ref={ref} data-color-mode="light">
        <MDEditor
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          preview="edit"
          hideToolbar={false}
          visibleDragBar={false}
        />
      </div>
    )
  }
)

RichTextEditor.displayName = "RichTextEditor"