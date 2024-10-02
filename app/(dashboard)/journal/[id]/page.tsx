import Editor from '@/components/Editor'
import { getUserByClerkId } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

const getEntry = async (id: string) => {
  const user = await getUserByClerkId()
  const entry = await prisma.journalEntry.findUnique({
    where: {
      userId_id: {
        userId: user.id,
        id,
      },
    },
    include: {
      analysis: true,
    },
  })
  return entry
}
const EntryPage = async ({ params }: { params: { id: string } }) => {
  const entry = await getEntry(params.id)
  return (
    <div className="w-full h-full">{entry && <Editor entry={entry} />}</div>
  )
}

export default EntryPage
