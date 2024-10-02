'use client'

import { createNewEntry } from '@/lib/api'
import { useRouter } from 'next/navigation'
export default function NewEntryCard() {
  const router = useRouter()
  const handleOnClick = async () => {
    const entry = await createNewEntry()
    router.push(`/journal/${entry?.id}`)
  }
  return (
    <div
      className="overflow-hidden bg-white rounded-lg shadow cursor-pointer"
      onClick={handleOnClick}
    >
      <div className="px-4 py-5 sm:p-6">
        <span className="text-3xl">New Entry</span>
      </div>
    </div>
  )
}
