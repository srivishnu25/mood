import z from 'zod'
import { StructuredOutputParser } from '@langchain/core/output_parsers'
import { PromptTemplate } from '@langchain/core/prompts'
import { ChatGroq } from '@langchain/groq'
import { ChatOpenAI, OpenAIEmbeddings } from '@langchain/openai'
import { MessageContentText } from '@langchain/core/messages'
import { JournalEntry } from '@prisma/client'
import { Document } from 'langchain/document'
import { loadQARefineChain } from 'langchain/chains'
import { MemoryVectorStore } from 'langchain/vectorstores/memory'

// Define a new type with only the fields we need
type JournalEntrySubset = Pick<JournalEntry, 'id' | 'content' | 'createdAt'>

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    mood: z
      .string()
      .describe('the mood of the person who wrote the journal entry.'),
    subject: z.string().describe('the subject of the journal entry.'),
    negative: z
      .boolean()
      .describe(
        'is the journal entry negative? (i.e. does it contain negative emotions?).'
      ),
    summary: z.string().describe('quick summary of the entire entry.'),
    color: z
      .string()
      .describe(
        'a hexidecimal color code that represents the mood of the entry. Example #0101fe for blue representing happiness.'
      ),
    sentimentScore: z
      .number()
      .describe(
        'sentiment of the text and rated on a scale from -10 to 10, where -10 is extremely negative, 0 is neutral, and 10 is extremely positive.'
      ),
  })
)

const getPrompt = async (content: string) => {
  const format_instructions = parser.getFormatInstructions()

  const prompt = new PromptTemplate({
    template:
      'Analyze the following journal entry. Follow the intrusctions and format your response to match the format instructions, no matter what! \n{format_instructions}\n{entry}',
    inputVariables: ['entry'],
    partialVariables: { format_instructions },
  })

  const input = await prompt.format({
    entry: content,
  })

  return input
}

export async function analyze(content: string) {
  const input = await getPrompt(content)
  const model = new ChatGroq({
    temperature: 0,
    modelName: 'llama3-70b-8192',
    apiKey: process.env.GROQ_API_KEY,
  })
  const output = await model.invoke(input)

  const contentText =
    typeof output.content === 'string'
      ? output.content
      : output.content
          .filter((c): c is MessageContentText => 'text' in c)
          .map((c) => c.text)
          .join('')
  const jsonString = contentText.replace(/\/\/.*$/gm, '').trim()
  return parser.parse(jsonString)
}

export const qa = async (question: string, entries: JournalEntrySubset[]) => {
  const docs = entries.map((entry) => {
    return new Document({
      pageContent: entry.content,
      metadata: { id: entry.id, createdAt: entry.createdAt },
    })
  })
  const model = new ChatOpenAI({
    temperature: 0,
    modelName: 'gpt-3.5-turbo',
    apiKey: process.env.OPENAI_API_KEY,
  })
  const chain = await loadQARefineChain(model)
  const embeddings = new OpenAIEmbeddings()
  const store = await MemoryVectorStore.fromDocuments(docs, embeddings)
  const relevantDocs = await store.similaritySearch(question)
  const res = await chain.invoke({
    input_documents: relevantDocs,
    question,
  })

  return res.output_text
}
