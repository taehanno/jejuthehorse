import { useState } from 'react'
import emailjs from '@emailjs/browser'
import logo from '../image/Jeju logo.jpg'
import ImageGallery from '../components/ImageGallery'
import PersonCard from '../components/PersonCard'
import SummarySection from '../components/SummarySection'
import Footer from '../components/Footer'
import { calcPersonPrice, formatPrice, buildPersonsDetail } from '../utils/pricing'
import { sendSMS } from '../utils/sms'
import { useLang } from '../context/LangContext'

const TIME_OPTIONS = [
  '09:00', '09:30',
  '10:00', '10:30',
  '11:00', '11:30',
  '13:30',
  '14:00', '14:30',
  '15:00', '15:30',
  '16:00', '16:30',
  '17:00', '17:30',
]

function isMonday(dateStr) {
  if (!dateStr) return false
  return new Date(dateStr).getDay() === 1
}

function getTodayStr() {
  return new Date().toISOString().split('T')[0]
}

const newPerson = (t) => ({
  ageType: t.adult,
  course: '',
  forestPath: false,
  horse: '',
  overWeight: false,
  overHeight: false,
})

export default function ReservationPage({ onSubmitted }) {
  const { lang, setLang, t } = useLang()
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [persons, setPersons] = useState([newPerson(t)])
  const [customerName, setCustomerName] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const handleDateChange = (e) => {
    const val = e.target.value
    if (isMonday(val)) {
      setErrors((prev) => ({ ...prev, date: t.dateMondayError }))
      setDate('')
    } else {
      setErrors((prev) => ({ ...prev, date: '' }))
      setDate(val)
    }
  }

  const updatePerson = (index, updates) => {
    setPersons((prev) => prev.map((p, i) => (i === index ? { ...p, ...updates } : p)))
  }

  const removePerson = (index) => {
    setPersons((prev) => prev.filter((_, i) => i !== index))
  }

  const addPerson = () => {
    setPersons((prev) => [...prev, newPerson(t)])
  }

  const validate = () => {
    const errs = {}
    if (!date) errs.date = t.dateError
    if (!time) errs.time = t.timeError
    if (persons.length === 0) errs.persons = t.personsError
    const noSelection = persons.some((p) => !p.course && !p.horse)
    if (noSelection) errs.persons = t.personsError
    if (!customerName.trim()) errs.customerName = t.nameError
    if (!customerPhone.trim()) errs.customerPhone = t.phoneError
    return errs
  }

  const handleSubmit = async () => {
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      const firstKey = Object.keys(errs)[0]
      const el = document.getElementById(`field-${firstKey}`)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }
    setErrors({})
    setLoading(true)

    const total = persons.reduce((sum, p) => sum + calcPersonPrice(p), 0)
    const personsDetail = buildPersonsDetail(persons)

    const smsText = `[제주더홀스] 예약신청\n날짜: ${date}\n시간: ${time}\n예약자: ${customerName} / ${customerPhone}\n인원: ${persons.length}명 / ${formatPrice(total)}원\n${personsDetail}`

    try {
      await Promise.all([
        emailjs.send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          {
            reservation_date: date,
            reservation_time: time,
            customer_name: customerName,
            customer_phone: customerPhone,
            total_persons: persons.length,
            total_price: formatPrice(total),
            persons_detail: personsDetail,
            submitted_at: new Date().toLocaleString('ko-KR'),
          },
          import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        ),
        sendSMS(smsText),
      ])
      onSubmitted({ date, time, persons, total, customerName, customerPhone })
    } catch (err) {
      console.error(err)
      setErrors({ submit: t.submitError })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-toss-bg">
      {/* Sticky Header */}
      <div className="bg-toss-white border-b border-toss-line sticky top-0 z-10">
        <div className="max-w-[480px] mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img src={logo} alt="Jeju The Horse 로고" className="h-8 w-8 rounded-full object-cover" />
            <div>
              <p className="font-bold text-toss-label text-sm leading-tight">Jeju The Horse</p>
              <p className="text-toss-tertiary text-xs">{t.subtitle}</p>
            </div>
          </div>
          {/* Language Toggle */}
          <div className="flex items-center gap-1 bg-toss-bg rounded-xl p-1">
            {[['ko', '한국어'], ['en', 'EN'], ['zh', '中文']].map(([l, label]) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                  lang === l
                    ? 'bg-toss-white text-toss-blue shadow-sm'
                    : 'text-toss-tertiary'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-[480px] mx-auto w-full px-4 py-4 space-y-3">
        {/* Image Gallery */}
        <ImageGallery />

        {/* Date Picker */}
        <div id="field-date" className="bg-toss-white rounded-2xl border border-toss-line p-4">
          <label className="block text-sm font-semibold text-toss-label mb-2">
            {t.dateLabel} <span className="text-red-400">*</span>
          </label>
          <input
            type="date"
            value={date}
            min={getTodayStr()}
            onChange={handleDateChange}
            className="w-full border border-toss-line rounded-xl px-3 py-2.5 text-toss-label text-sm focus:outline-none focus:ring-2 focus:ring-toss-blue bg-toss-bg"
          />
          {errors.date && <p className="text-red-400 text-xs mt-1">{errors.date}</p>}
          <p className="text-xs text-toss-placeholder mt-1">{t.dateNote}</p>
        </div>

        {/* Time Dropdown */}
        <div id="field-time" className="bg-toss-white rounded-2xl border border-toss-line p-4">
          <label className="block text-sm font-semibold text-toss-label mb-2">
            {t.timeLabel} <span className="text-red-400">*</span>
          </label>
          <select
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full border border-toss-line rounded-xl px-3 py-2.5 text-toss-label text-sm focus:outline-none focus:ring-2 focus:ring-toss-blue bg-toss-bg"
          >
            <option value="">{t.timePlaceholder}</option>
            {TIME_OPTIONS.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          {errors.time && <p className="text-red-400 text-xs mt-1">{errors.time}</p>}
        </div>

        {/* Person Cards */}
        <div id="field-persons" className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-sm font-semibold text-toss-label">{t.personsLabel}</h2>
            <span className="text-xs text-toss-tertiary">{persons.length}{t.personUnit}</span>
          </div>
          {persons.map((p, i) => (
            <PersonCard
              key={i}
              person={p}
              index={i}
              onChange={updatePerson}
              onRemove={removePerson}
              showRemove={persons.length > 1}
            />
          ))}
          {errors.persons && <p className="text-red-400 text-xs px-1">{errors.persons}</p>}
          <button
            onClick={addPerson}
            className="w-full border-2 border-dashed border-toss-line rounded-2xl py-3 text-toss-tertiary text-sm font-medium hover:border-toss-blue hover:text-toss-blue transition-colors"
          >
            {t.addPerson}
          </button>
        </div>

        {/* Summary */}
        <SummarySection persons={persons} />

        {/* Directions */}
        <div className="bg-toss-white rounded-2xl border border-toss-line p-4">
          <div className="flex items-center gap-1.5 mb-2">
            <span className="text-base">🗺️</span>
            <h3 className="text-sm font-semibold text-toss-label">{t.directionsTitle}</h3>
          </div>
          <p className="text-xs text-toss-tertiary leading-relaxed">{t.directionsAddr}</p>
          <p className="text-xs text-toss-secondary leading-relaxed mt-1 font-medium whitespace-pre-line">{t.directionsDesc}</p>
          <a
            href="https://map.kakao.com/link/search/제주 제주시 애월읍 산록서로 81"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 mt-2.5 text-xs text-toss-blue font-medium"
          >
            {t.mapLink}
          </a>
        </div>

        {/* Customer Info */}
        <div className="bg-toss-white rounded-2xl border border-toss-line p-4 space-y-4">
          <h2 className="text-sm font-semibold text-toss-label">{t.customerTitle}</h2>

          <div id="field-customerName">
            <label className="block text-xs font-medium text-toss-tertiary mb-1.5">
              {t.nameLabel} <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder={t.namePlaceholder}
              className="w-full border border-toss-line rounded-xl px-3 py-2.5 text-toss-label text-sm focus:outline-none focus:ring-2 focus:ring-toss-blue bg-toss-bg placeholder-toss-placeholder"
            />
            {errors.customerName && <p className="text-red-400 text-xs mt-1">{errors.customerName}</p>}
          </div>

          <div id="field-customerPhone">
            <label className="block text-xs font-medium text-toss-tertiary mb-1.5">
              {t.phoneLabel} <span className="text-red-400">*</span>
            </label>
            <input
              type="tel"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              placeholder={t.phonePlaceholder}
              className="w-full border border-toss-line rounded-xl px-3 py-2.5 text-toss-label text-sm focus:outline-none focus:ring-2 focus:ring-toss-blue bg-toss-bg placeholder-toss-placeholder"
            />
            {errors.customerPhone && <p className="text-red-400 text-xs mt-1">{errors.customerPhone}</p>}
          </div>
        </div>

        {errors.submit && <p className="text-red-400 text-sm text-center">{errors.submit}</p>}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-toss-blue hover:bg-toss-blue-hover disabled:bg-toss-placeholder text-white font-bold py-4 rounded-2xl text-base transition-colors"
        >
          {loading ? t.submitting : t.submitBtn}
        </button>
      </div>

      <Footer />
    </div>
  )
}
