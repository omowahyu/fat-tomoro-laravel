import * as React from 'react'
import { cn } from '@/lib/utils'

export type ChartPoint = { x: number; y: number }
export type ChartData = ChartPoint[]

export type ChartProps = {
  type?: 'line' | 'bar'
  data: ChartData
  width?: number
  height?: number
  className?: string
  padding?: { top?: number; right?: number; bottom?: number; left?: number }
  stroke?: string
  fill?: string
  strokeWidth?: number
  barWidth?: number
  grid?: boolean
  animated?: boolean
}

export function Chart({
  type = 'line',
  data,
  width = 400,
  height = 200,
  className,
  padding = { top: 12, right: 12, bottom: 20, left: 28 },
  stroke = 'hsl(var(--chart-1))',
  fill = 'hsl(var(--chart-1) / 0.2)',
  strokeWidth = 2,
  barWidth = 12,
  grid = true,
  animated = false,
}: ChartProps) {
  const p = { top: padding.top ?? 0, right: padding.right ?? 0, bottom: padding.bottom ?? 0, left: padding.left ?? 0 }
  const innerW = width - p.left - p.right
  const innerH = height - p.top - p.bottom

  const xs = data.map(d => d.x)
  const ys = data.map(d => d.y)
  const minX = Math.min(...xs)
  const maxX = Math.max(...xs)
  const minY = Math.min(...ys)
  const maxY = Math.max(...ys)

  const xScale = (x: number) => p.left + ((x - minX) / (maxX - minX || 1)) * innerW
  const yScale = (y: number) => p.top + innerH - ((y - minY) / (maxY - minY || 1)) * innerH

  const pathD = React.useMemo(() => {
    if (data.length === 0) return ''
    return data
      .map((d, i) => `${i === 0 ? 'M' : 'L'} ${xScale(d.x).toFixed(2)} ${yScale(d.y).toFixed(2)}`)
      .join(' ')
  }, [data])

  const areaD = React.useMemo(() => {
    if (data.length === 0) return ''
    const firstX = xScale(data[0].x).toFixed(2)
    const lastX = xScale(data[data.length - 1].x).toFixed(2)
    return [
      `M ${firstX} ${yScale(data[0].y).toFixed(2)}`,
      ...data.slice(1).map(d => `L ${xScale(d.x).toFixed(2)} ${yScale(d.y).toFixed(2)}`),
      `L ${lastX} ${p.top + innerH}`,
      `L ${firstX} ${p.top + innerH}`,
      'Z',
    ].join(' ')
  }, [data])

  const bars = React.useMemo(() => {
    if (data.length === 0) return [] as { x: number; y: number; h: number }[]
    const maxBar = Math.max(...data.map(d => d.y)) || 1
    return data.map(d => {
      const x = xScale(d.x) - barWidth / 2
      const h = ((d.y / maxBar) * innerH) || 0
      const y = p.top + innerH - h
      return { x, y, h }
    })
  }, [data, barWidth])

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={cn('w-full h-full', className)} width={width} height={height} role="img" aria-label="Chart">
      {/* Grid */}
      {grid && (
        <g stroke="hsl(var(--muted-foreground) / 0.2)" strokeWidth={1}>
          {Array.from({ length: 4 }).map((_, i) => {
            const y = p.top + (innerH / 4) * (i + 1)
            return <line key={i} x1={p.left} x2={p.left + innerW} y1={y} y2={y} />
          })}
        </g>
      )}

      {/* Content */}
      {type === 'line' ? (
        <g>
          <path d={areaD} fill={fill} opacity={0.7} />
          <path d={pathD} fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinejoin="round" strokeLinecap="round" />
          {data.map((d, i) => (
            <circle key={i} cx={xScale(d.x)} cy={yScale(d.y)} r={2.5} fill={stroke} />
          ))}
        </g>
      ) : (
        <g>
          {bars.map((b, i) => (
            <rect key={i} x={b.x} y={b.y} width={barWidth} height={b.h} fill={stroke} opacity={0.9} rx={2} />
          ))}
        </g>
      )}
    </svg>
  )
}

export default Chart
