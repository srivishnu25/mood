import { qa } from '@/lib/ai'
import { getUserByClerkId } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const user = await getUserByClerkId()
  const { question } = await req.json()

  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    select: {
      id: true,
      content: true,
      createdAt: true,
    },
  })

  const answer = await qa(question, entries)
  return NextResponse.json({ data: answer })
}
