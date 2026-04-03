import { useState } from 'react'
import logo from '../image/Jeju logo.jpg'
import emailjs from '@emailjs/browser'
import PersonCard from '../components/PersonCard'
import SummarySection from '../components/SummarySection'
import Footer from '../components/Footer'
import { calcPersonPrice, formatPrice, buildPersonsDetail } from '../utils/pricing'

const TIME_OPTIONS = ['09:00', '10:00', '11:00', '13:30', '14:00', '15:00', '16:00', '17:00']

function isMonday(dateStr) {
  if (!dateStr) return false
  const d = new Date(dateStr)
  return d.getDay() === 1
}

function getTodayStr() {
  return new Date().toISOString().split('T')[0]
}

const newPerson = () => ({
  ageType: '성인',
  course: '',
  forestPath: false,
  horse: '없음',
})

export default function ReservationPage({ onSubmitted }) {
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [persons, setPersons] = useState([newPerson()])
  const [customerName, setCustomerName] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const handleDateChange = (e) => {
    const val = e.target.value
    if (isMonday(val)) {
      setErrors((prev) => ({ ...prev, date: '월요일은 휴무일입니다. 다른 날을 선택해주세요.' }))
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
    setPersons((prev) => [...prev, newPerson()])
  }

  const validate = () => {
    const errs = {}
    if (!date) errs.date = '날짜를 선택해주세요.'
    if (!time) errs.time = '시간을 선택해주세요.'
    if (persons.length === 0) errs.persons = '최소 1명 이상 추가해주세요.'
    const noCourse = persons.some((p) => !p.course)
    if (noCourse) errs.persons = '모든 인원의 코스를 선택해주세요.'
    if (!customerName.trim()) errs.customerName = '예약자 성함을 입력해주세요.'
    if (!customerPhone.trim()) errs.customerPhone = '연락처를 입력해주세요.'
    return errs
  }

  const handleSubmit = async () => {
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      // scroll to first error
      const firstKey = Object.keys(errs)[0]
      const el = document.getElementById(`field-${firstKey}`)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }
    setErrors({})
    setLoading(true)

    const total = persons.reduce((sum, p) => sum + calcPersonPrice(p), 0)
    const personsDetail = buildPersonsDetail(persons)

    try {
      await emailjs.send(
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
      )
      onSubmitted({
        date,
        time,
        persons,
        total,
        customerName,
        customerPhone,
      })
    } catch (err) {
      console.error(err)
      setErrors({ submit: '예약 전송에 실패했습니다. 잠시 후 다시 시도해주세요.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 max-w-[480px] mx-auto w-full px-4 py-6 space-y-5">
        {/* Header */}
        <div className="text-center pb-2">
          <div className="flex items-center justify-center gap-2">
            <img src={logo} alt="Jeju The Horse 로고" className="h-10 w-10 rounded-full object-cover" />
            <h1 className="text-2xl font-bold text-earth-800">Jeju The Horse</h1>
          </div>
          <p className="text-forest-600 font-medium mt-1">승마 체험 예약</p>
        </div>

        {/* Date Picker */}
        <div id="field-date" className="bg-white rounded-2xl shadow-sm border border-earth-100 p-4">
          <label className="block text-sm font-semibold text-earth-700 mb-2">
            날짜 선택 <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            value={date}
            min={getTodayStr()}
            onChange={handleDateChange}
            className="w-full border border-earth-200 rounded-xl px-3 py-2.5 text-earth-800 text-sm focus:outline-none focus:ring-2 focus:ring-forest-400 bg-earth-50"
          />
          {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
          <p className="text-xs text-earth-400 mt-1">* 월요일은 휴무입니다</p>
        </div>

        {/* Time Dropdown */}
        <div id="field-time" className="bg-white rounded-2xl shadow-sm border border-earth-100 p-4">
          <label className="block text-sm font-semibold text-earth-700 mb-2">
            시간 선택 <span className="text-red-500">*</span>
          </label>
          <select
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full border border-earth-200 rounded-xl px-3 py-2.5 text-earth-800 text-sm focus:outline-none focus:ring-2 focus:ring-forest-400 bg-earth-50"
          >
            <option value="">시간을 선택해주세요</option>
            {TIME_OPTIONS.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time}</p>}
        </div>

        {/* Person Cards */}
        <div id="field-persons" className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-sm font-semibold text-earth-700">인원 정보</h2>
            <span className="text-xs text-earth-400">{persons.length}명</span>
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
          {errors.persons && <p className="text-red-500 text-xs px-1">{errors.persons}</p>}
          <button
            onClick={addPerson}
            className="w-full border-2 border-dashed border-earth-300 rounded-2xl py-3 text-earth-500 text-sm font-medium hover:border-forest-400 hover:text-forest-600 transition-colors"
          >
            + 인원 추가
          </button>
        </div>

        {/* Summary */}
        <SummarySection persons={persons} />

        {/* Customer Info */}
        <div className="bg-white rounded-2xl shadow-sm border border-earth-100 p-4 space-y-3">
          <h2 className="text-sm font-semibold text-earth-700">예약자 정보</h2>

          <div id="field-customerName">
            <label className="block text-xs font-medium text-earth-500 mb-1">
              성함 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="홍길동"
              className="w-full border border-earth-200 rounded-xl px-3 py-2.5 text-earth-800 text-sm focus:outline-none focus:ring-2 focus:ring-forest-400 bg-earth-50"
            />
            {errors.customerName && <p className="text-red-500 text-xs mt-1">{errors.customerName}</p>}
          </div>

          <div id="field-customerPhone">
            <label className="block text-xs font-medium text-earth-500 mb-1">
              연락처 <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              placeholder="010-0000-0000"
              className="w-full border border-earth-200 rounded-xl px-3 py-2.5 text-earth-800 text-sm focus:outline-none focus:ring-2 focus:ring-forest-400 bg-earth-50"
            />
            {errors.customerPhone && <p className="text-red-500 text-xs mt-1">{errors.customerPhone}</p>}
          </div>
        </div>

        {/* Submit */}
        {errors.submit && (
          <p className="text-red-500 text-sm text-center">{errors.submit}</p>
        )}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-forest-600 hover:bg-forest-700 disabled:bg-earth-300 text-white font-bold py-4 rounded-2xl text-base transition-colors shadow-md"
        >
          {loading ? '전송 중...' : '예약 요청 보내기'}
        </button>
      </div>

      <Footer />
    </div>
  )
}
