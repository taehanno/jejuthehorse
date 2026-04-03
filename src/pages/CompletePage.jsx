import Footer from '../components/Footer'
import { calcPersonPrice, formatPrice } from '../utils/pricing'
import { useLang } from '../context/LangContext'

export default function CompletePage({ data }) {
  const { t } = useLang()
  const { date, time, persons, total, customerName, customerPhone } = data

  return (
    <div className="min-h-screen flex flex-col bg-toss-bg">
      <div className="flex-1 max-w-[480px] mx-auto w-full px-4 py-8 space-y-4">
        {/* Hero */}
        <div className="text-center py-8">
          <div className="text-5xl mb-4">📋</div>
          <h1 className="text-xl font-bold text-toss-label">{t.completeTitle}</h1>
          <p className="text-amber-600 text-sm font-medium mt-1">{t.completeSub}</p>
        </div>

        {/* Reservation Details */}
        <div className="bg-toss-white rounded-2xl border border-toss-line p-5 space-y-3">
          <h2 className="text-sm font-bold text-toss-label border-b border-toss-line pb-2">{t.detailTitle}</h2>
          <Row label={t.labelReserver} value={customerName} />
          <Row label={t.labelPhone} value={customerPhone} />
          <Row label={t.labelDate} value={date} />
          <Row label={t.labelTime} value={time} />
          <Row label={t.labelTotalPersons} value={`${persons.length}${t.personUnit}`} />
        </div>

        {/* Persons breakdown */}
        <div className="bg-toss-blue-light rounded-2xl border border-blue-100 p-4">
          <h3 className="text-sm font-bold text-toss-label mb-2">{t.breakdownTitle}</h3>
          <div className="space-y-1">
            {persons.map((p, i) => (
              <p key={i} className="text-xs text-toss-tertiary">{describePersonFull(p, i, t)}</p>
            ))}
          </div>
          <div className="border-t border-blue-100 mt-3 pt-3 flex justify-between items-center">
            <span className="font-bold text-toss-label text-sm">{t.totalPrice}</span>
            <span className="font-bold text-toss-blue text-lg">{formatPrice(total)}{t.priceUnit}</span>
          </div>
        </div>

        {/* Note */}
        <div className="bg-amber-50 border-2 border-amber-400 rounded-2xl p-4 text-xs">
          <p className="font-bold text-amber-700 mb-2 text-sm">{t.noteTitle}</p>
          <p className="text-amber-800 font-medium leading-relaxed">{t.noteText}</p>
          <p className="mt-2 text-amber-700">{t.noteContact}</p>
        </div>
      </div>

      <Footer />
    </div>
  )
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-toss-tertiary">{label}</span>
      <span className="font-medium text-toss-label">{value}</span>
    </div>
  )
}

function describePersonFull(p, i, t) {
  const parts = [p.ageType || '—']
  if (p.horse) {
    const h = t.horses.find((h) => h.value === p.horse)
    parts.push(h ? h.label : p.horse)
  } else if (p.course) {
    const c = t.courses.find((c) => c.value === p.course)
    let label = c ? `${c.label} ${c.sub}` : p.course
    if (p.forestPath) label += ` + ${t.forestAdd}`
    parts.push(label)
  }
  return `${t.person} ${i + 1}: ${parts.join(' / ')} — ${formatPrice(calcPersonPrice(p))}${t.priceUnit}`
}
