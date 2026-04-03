import Footer from '../components/Footer'
import { calcPersonPrice, formatPrice } from '../utils/pricing'

function describePersonFull(p, i) {
  const parts = []
  if (p.ageType) parts.push(p.ageType)
  if (p.course) {
    let c = `${p.course}코스`
    if (p.forestPath) c += ' + 숲길'
    parts.push(c)
  }
  if (p.horse && p.horse !== '없음') parts.push(p.horse)
  else if (p.horse === '없음') parts.push('말 없음')
  return `인원 ${i + 1}: ${parts.join(' / ')} — ${formatPrice(calcPersonPrice(p))}원`
}

export default function CompletePage({ data }) {
  const { date, time, persons, total, customerName, customerPhone } = data

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 max-w-[480px] mx-auto w-full px-4 py-8 space-y-5">
        {/* Hero */}
        <div className="text-center py-6">
          <div className="text-5xl mb-3">✅</div>
          <h1 className="text-xl font-bold text-earth-800">예약 접수 완료!</h1>
          <p className="text-earth-500 text-sm mt-1">곧 연락드리겠습니다</p>
        </div>

        {/* Reservation Details */}
        <div className="bg-white rounded-2xl shadow-sm border border-earth-100 p-5 space-y-3">
          <h2 className="text-sm font-bold text-earth-700 border-b border-earth-100 pb-2">예약 상세</h2>

          <Row label="예약자" value={customerName} />
          <Row label="연락처" value={customerPhone} />
          <Row label="날짜" value={date} />
          <Row label="시간" value={time} />
          <Row label="총 인원" value={`${persons.length}명`} />
        </div>

        {/* Persons breakdown */}
        <div className="bg-earth-50 rounded-2xl border border-earth-200 p-4">
          <h3 className="text-sm font-bold text-earth-700 mb-2">인원별 내역</h3>
          <div className="space-y-1">
            {persons.map((p, i) => (
              <p key={i} className="text-xs text-earth-600">{describePersonFull(p, i)}</p>
            ))}
          </div>
          <div className="border-t border-earth-200 mt-3 pt-3 flex justify-between items-center">
            <span className="font-bold text-earth-800 text-sm">총 금액</span>
            <span className="font-bold text-forest-700 text-lg">{formatPrice(total)}원</span>
          </div>
        </div>

        {/* Note */}
        <div className="bg-forest-50 border border-forest-200 rounded-2xl p-4 text-xs text-forest-700">
          <p className="font-semibold mb-1">안내사항</p>
          <p>예약 확정은 담당자 확인 후 전화/문자로 안내드립니다.</p>
          <p className="mt-1">문의: 010-2732-3666</p>
        </div>
      </div>

      <Footer />
    </div>
  )
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-earth-500">{label}</span>
      <span className="font-medium text-earth-800">{value}</span>
    </div>
  )
}
