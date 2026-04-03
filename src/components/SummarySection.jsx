import { calcPersonPrice, formatPrice } from '../utils/pricing'

export default function SummarySection({ persons }) {
  const total = persons.reduce((sum, p) => sum + calcPersonPrice(p), 0)

  return (
    <div className="bg-earth-50 rounded-2xl border border-earth-200 p-4">
      <h3 className="font-bold text-earth-700 mb-3 text-sm">예약 요약</h3>

      <div className="flex justify-between text-sm text-earth-700 mb-2">
        <span>총 인원</span>
        <span className="font-semibold">{persons.length}명</span>
      </div>

      <div className="border-t border-earth-200 pt-2 mb-2 space-y-1">
        {persons.map((p, i) => (
          <div key={i} className="text-xs text-earth-600 flex justify-between">
            <span className="mr-2 shrink-0">인원 {i + 1}</span>
            <span className="text-right text-earth-500">{describePersonShort(p)}</span>
          </div>
        ))}
      </div>

      <div className="border-t border-earth-300 pt-2 flex justify-between items-center">
        <span className="font-bold text-earth-800 text-sm">총 금액</span>
        <span className="font-bold text-forest-700 text-lg">{formatPrice(total)}원</span>
      </div>
    </div>
  )
}

function describePersonShort(p) {
  const parts = []
  if (p.ageType) parts.push(p.ageType)
  if (p.course) {
    let c = `${p.course}코스`
    if (p.forestPath) c += ' + 숲길'
    parts.push(c)
  }
  if (p.horse && p.horse !== '없음') parts.push(p.horse)
  return parts.length > 0 ? parts.join(' / ') : '—'
}
