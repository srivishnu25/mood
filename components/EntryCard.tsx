import { JournalEntry } from '@prisma/client'

export default function EntryCard({ entry }: { entry: JournalEntry }) {
  const date = new Date(entry.createdAt)
    .toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
    .replace(/,/g, '')
  return (
    <div className="overflow-hidden bg-white rounded-lg divide-y divide-gray-200 shadow">
      <div className="px-4 py-5 sm:px-6">{date}</div>
      <div className="px-4 py-5 sm:p-6">{'summary'}</div>
      <div className="px-4 py-4 sm:px-6">{'mood'}</div>
    </div>
  )
}
