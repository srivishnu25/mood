const createPath = (path: string) => window.location.origin + path

export const updateEntry = async (id: string, content: string) => {
  const res = await fetch(
    new Request(createPath(`/api/journal/${id}`), {
      method: 'PATCH',
      body: JSON.stringify({ content }),
    })
  )
  if (res.ok) {
    const data = await res.json()
    return data.data
  }
}

export const createNewEntry = async () => {
  const res = await fetch(
    new Request(createPath('/api/journal'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
  )

  if (res.ok) {
    const data = await res.json()
    console.log('new entry', data)
    return data.data
  }
}

export const askQuestion = async (question: string) => {
  const res = await fetch(
    new Request('/api/question', {
      method: 'POST',
      body: JSON.stringify({ question }),
    })
  )

  if (res.ok) {
    const data = await res.json()
    return data.data
  }
}
