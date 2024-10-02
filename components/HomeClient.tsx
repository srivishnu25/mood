// components/HomeClient.jsx
'use client'

import Link from 'next/link'

export default function HomeClient({ userId }: { userId: string }) {
  const href = userId ? '/journal' : '/new-user'

  return (
    <div className="flex justify-center items-center w-screen h-screen text-white bg-black">
      <div className="w-full max-w-[600px] mx-auto">
        <h1 className="mb-4 text-6xl">The best Journal app, period.</h1>
        <p className="mb-4 text-2xl text-white/60">
          This is the best app for tracking your mood throughout your life. All
          you have to do is be honest.
        </p>
        <div>
          <Link href={href}>
            <button className="px-4 py-2 text-xl bg-blue-600 rounded-lg">
              get started
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
