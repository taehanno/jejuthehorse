import { calcPersonPrice, formatPrice } from '../utils/pricing'
import { useLang } from '../context/LangContext'

export default function SummarySection({ persons }) {
  const { t } = useLang()
  const total = persons.reduce((sum, p) => sum + calcPersonPrice(p), 0)

  return (
    <div className="bg-toss-blue-light rounded-2xl border border-blue-100 p-4">
      <h3 className="font-bold text-toss-label mb-3 text-sm">{t.summaryTitle}</h3>

      <div className="flex justify-between text-sm text-toss-secondary mb-2">
        <span>{t.totalPersons}</span>
        <span className="font-semibold">{persons.length}{t.personUnit}</span>
      </div>

      <div className="border-t border-blue-100 pt-2 mb-2 space-y-1">
        {persons.map((p, i) => (
          <div key={i} className="text-xs text-toss-tertiary flex justify-between">
            <span className="mr-2 shrink-0">{t.person} {i + 1}</span>
            <span className="text-right">{describePersonShort(p, t)}</span>
          </div>
        ))}
      </div>

      <div className="border-t border-blue-200 pt-2 flex justify-between items-center">
        <span className="font-bold text-toss-label text-sm">{t.totalPrice}</span>
        <span className="font-bold text-toss-blue text-lg">{formatPrice(total)}{t.priceUnit}</span>
      </div>
    </div>
  )
}

function describePersonShort(p, t) {
  const parts = []
  if (p.ageType) parts.push(p.ageType)
  if (p.horse) {
    const h = t.horses.find((h) => h.value === p.horse)
    parts.push(h ? h.label : p.horse)
  } else if (p.course) {
    const c = t.courses.find((c) => c.value === p.course)
    let label = c ? `${c.label} ${c.sub}` : p.course
    if (p.forestPath) label += ` + ${t.forestAdd}`
    parts.push(label)
  }
  return parts.length > 0 ? parts.join(' / ') : '—'
}
