'use client'

import { askQuestion } from '@/lib/api'
import { useState } from 'react'

export default function Question() {
  const [question, setQuestion] = useState('')
  const [loading, setLoading] = useState(false)
  const [answer, setAnswer] = useState('')
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(question)
    setLoading(true)
    const _answer = await askQuestion(question)
    console.log(_answer)
    setAnswer(_answer)
    setQuestion('')
    setLoading(false)
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={question}
          placeholder="Ask a question"
          onChange={(e) => setQuestion(e.target.value)}
          className="px-4 py-2 text-lg rounded-lg border border-black/20"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 text-lg bg-blue-400 rounded-lg"
        >
          {loading ? 'Loading...' : 'Ask'}
        </button>
      </form>
      {answer && <div>{answer}</div>}
    </div>
  )
}
