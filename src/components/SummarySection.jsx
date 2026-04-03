import { calcPersonPrice, formatPrice } from '../utils/pricing'

export default function SummarySection({ persons }) {
  const total = persons.reduce((sum, p) => sum + calcPersonPrice(p), 0)

  return (
    <div className="bg-toss-blue-light rounded-2xl border border-blue-100 p-4">
      <h3 className="font-bold text-toss-label mb-3 text-sm">예약 요약</h3>

      <div className="flex justify-between text-sm text-toss-secondary mb-2">
        <span>총 인원</span>
        <span className="font-semibold">{persons.length}명</span>
      </div>

      <div className="border-t border-blue-100 pt-2 mb-2 space-y-1">
        {persons.map((p, i) => (
          <div key={i} className="text-xs text-toss-tertiary flex justify-between">
            <span className="mr-2 shrink-0">인원 {i + 1}</span>
            <span className="text-right">{describePersonShort(p)}</span>
          </div>
        ))}
      </div>

      <div className="border-t border-blue-200 pt-2 flex justify-between items-center">
        <span className="font-bold text-toss-label text-sm">총 금액</span>
        <span className="font-bold text-toss-blue text-lg">{formatPrice(total)}원</span>
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
