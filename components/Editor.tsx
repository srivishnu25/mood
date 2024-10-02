'use client'

import { useState } from 'react'
import { updateEntry } from '@/lib/api'
import { Analysis, JournalEntry } from '@prisma/client'
import { useAutosave } from 'react-autosave'

export default function Editor({ entry }: { entry: JournalEntry }) {
  const [content, setContent] = useState(entry?.content)
  const [isSaving, setIsSaving] = useState(false)
  const [analysis, setAnalysis] = useState<Analysis | undefined>(
    (entry as any)?.analysis
  )
  const { mood, summary, color, negative, subject } = analysis ?? {}
  const analysisData = [
    {
      name: 'Summary',
      value: summary,
    },
    {
      name: 'Subject',
      value: subject,
    },
    {
      name: 'Mood',
      value: mood,
    },
    {
      name: 'Color',
      value: color,
    },
    {
      name: 'Negative',
      value: negative ? 'True' : 'False',
    },
  ]
  useAutosave({
    data: content,
    onSave: async (value) => {
      setIsSaving(true)
      const data = await updateEntry(entry.id, value)
      setAnalysis(data.analysis)
      setIsSaving(false)
    },
  })
  return (
    <div className="grid grid-cols-3 w-full h-full">
      <div className="col-span-2">
        {isSaving && <div className="">Saving...</div>}
        <textarea
          className="p-4 w-full h-full text-lg focus:outline-none"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div className="border-l border-black/10">
        <div className="px-6 py-10" style={{ backgroundColor: color }}>
          <h2 className="text-2xl">Analysis</h2>
        </div>
        <div>
          <ul>
            {analysisData.map((item) => (
              <li
                key={item.name}
                className="flex justify-between items-center px-2 py-4 border-y border-black/10"
              >
                <span className="text-lg font-semibold">{item.name}</span>
                <span>{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
