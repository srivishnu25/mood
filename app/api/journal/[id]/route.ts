import { analyze } from '@/lib/ai'
import { getUserByClerkId } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

export const PATCH = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const user = await getUserByClerkId()
  const body = await req.json()
  const updatedEntry = await prisma.journalEntry.update({
    where: {
      userId_id: {
        userId: user.id,
        id: params.id,
      },
    },
    data: {
      content: body?.content || '',
    },
  })
  const analysis = await analyze(updatedEntry.content)
  await prisma.analysis.upsert({
    where: {
      entryId: updatedEntry.id,
    },
    update: {
      ...analysis,
    },
    create: {
      ...analysis,
      userId: user.id,
      entryId: updatedEntry.id,
    },
  })

  revalidatePath(`/journal/${updatedEntry.id}`)
  return NextResponse.json({
    data: { ...updatedEntry, analysis: analysis },
  })
}
