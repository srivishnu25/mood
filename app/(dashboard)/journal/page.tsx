import { getUserByClerkId } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import EntryCard from '@/components/EntryCard'
import NewEntryCard from '@/components/NewEntryCard'
import Link from 'next/link'
import { analyze } from '@/lib/ai'
import Question from '@/components/Question'

const getEntries = async () => {
  const user = await getUserByClerkId()
  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return entries
}
const JournalPage = async () => {
  const entries = await getEntries()

  return (
    <div className="p-10 h-full bg-zinc-400/10">
      <h2 className="mb-8 text-3xl">Journal</h2>
      <div className="my-8">
        <Question />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <NewEntryCard />
        {entries.map((entry) => (
          <Link key={entry.id} href={`/journal/${entry.id}`}>
            <EntryCard key={entry.id} entry={entry} />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default JournalPage
