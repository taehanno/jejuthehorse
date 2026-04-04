import { useState } from 'react'
import Footer from '../components/Footer'
import { calcPersonPrice, formatPrice } from '../utils/pricing'
import { useLang } from '../context/LangContext'

export default function CompletePage({ data }) {
  const { t } = useLang()
  const { date, time, persons, total, customerName, customerPhone } = data
  const [copied, setCopied] = useState(false)

  const buildShareText = () => {
    const lines = [
      '📋 제주더홀스 예약 신청',
      `날짜: ${date}`,
      `시간: ${time}`,
      `예약자: ${customerName} / ${customerPhone}`,
      `총 인원: ${persons.length}명`,
      '',
      ...persons.map((p, i) => describePersonFull(p, i, t)),
      '',
      `총 금액: ${formatPrice(total)}원`,
      '',
      '※ 신청만 완료된 상태로, 담당자 확인 후 예약 확정 안내를 드립니다.',
      '문의: 010-2732-3666',
    ]
    return lines.join('\n')
  }

  const handleKakaoShare = async () => {
    const text = buildShareText()
    if (navigator.share) {
      try {
        await navigator.share({ title: '제주더홀스 예약 신청 완료', text })
      } catch {
        // 사용자가 취소한 경우 무시
      }
    } else {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 3000)
    }
  }

  const handleWhatsappShare = () => {
    const text = buildShareText()
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

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

        {/* Share Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleKakaoShare}
            className="flex-1 flex items-center justify-center gap-2 bg-[#FEE500] hover:bg-[#f0d800] text-[#3A1D1D] font-bold py-4 rounded-2xl text-sm transition-colors"
          >
            <img
              src="https://developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_small.png"
              alt="kakao"
              className="w-5 h-5"
              onError={(e) => { e.target.style.display = 'none' }}
            />
            {t.shareBtn}
          </button>
          <button
            onClick={handleWhatsappShare}
            className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold py-4 rounded-2xl text-sm transition-colors"
          >
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            {t.whatsappBtn}
          </button>
        </div>
        {copied && (
          <p className="text-center text-xs text-toss-secondary">{t.shareCopied}</p>
        )}
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

  const TEEN_VALUES = new Set(['청소년', 'Teen', '青少年'])
  const ADULT_VALUES = new Set(['성인', 'Adult', '成人'])
  if (ADULT_VALUES.has(p.ageType) || TEEN_VALUES.has(p.ageType)) {
    const bodyParts = []
    if (p.overWeight) bodyParts.push('체중 70kg↑')
    if (p.overHeight) bodyParts.push('키 180cm↑')
    if (bodyParts.length > 0) parts.push(bodyParts.join(', '))
  }

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
