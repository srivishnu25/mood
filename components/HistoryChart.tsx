'use client'

import { ResponsiveContainer, Line, XAxis, Tooltip, LineChart } from 'recharts'

const CustomTooltip = ({ payload, label, active }: any) => {
  const dateLabel = new Date(label).toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  })

  if (active) {
    const analysis = payload[0].payload
    return (
      <div className="relative p-8 rounded-lg border shadow-md backdrop-blur-md custom-tooltip bg-white/5 border-black/10">
        <div
          className="absolute top-2 left-2 w-2 h-2 rounded-full"
          style={{ background: analysis.color }}
        ></div>
        <p className="text-sm label text-black/30">{dateLabel}</p>
        <p className="text-xl uppercase intro">{analysis.mood}</p>
      </div>
    )
  }

  return null
}

const HistoryChart = ({ data }: { data: any }) => {
  return (
    <ResponsiveContainer width={'100%'} height={'100%'}>
      <LineChart width={300} height={100} data={data}>
        <Line
          type="monotone"
          dataKey="sentimentScore"
          stroke="#8884d8"
          strokeWidth={2}
          activeDot={{ r: 8 }}
        />
        <XAxis dataKey="createdAt" />
        <Tooltip content={<CustomTooltip />} />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default HistoryChart
