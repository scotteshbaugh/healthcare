import type { RangeWeeks } from '../types'

interface RangeSelectProps {
  range: RangeWeeks
  onChange: (range: RangeWeeks) => void
}

export function RangeSelect({ range, onChange }: RangeSelectProps) {
  return (
    <select
      value={range}
      onChange={(e) => onChange(Number(e.target.value) as RangeWeeks)}
      style={{ width: 'auto' }}
    >
      <option value={3}>3 weeks</option>
      <option value={6}>6 weeks</option>
      <option value={12}>12 weeks</option>
    </select>
  )
}
