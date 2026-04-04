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

  const handleShare = async () => {
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

        {/* KakaoTalk Share */}
        <button
          onClick={handleShare}
          className="w-full flex items-center justify-center gap-2 bg-[#FEE500] hover:bg-[#f0d800] text-[#3A1D1D] font-bold py-4 rounded-2xl text-base transition-colors"
        >
          <img
            src="https://developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_small.png"
            alt="kakao"
            className="w-5 h-5"
            onError={(e) => { e.target.style.display = 'none' }}
          />
          {t.shareBtn}
        </button>
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
