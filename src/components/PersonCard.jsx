import { useLang } from '../context/LangContext'

export default function PersonCard({ person, index, onChange, onRemove, showRemove }) {
  const { t } = useLang()
  const { ageType, course, forestPath, horse } = person

  const selectCourse = (val) => {
    onChange(index, { course: val, horse: '', forestPath: val === 'A' ? false : forestPath })
  }

  const selectHorse = (val) => {
    onChange(index, { horse: val, course: '', forestPath: false })
  }

  const activeSection = horse ? 'horse' : course ? 'course' : null

  return (
    <div className="bg-toss-white rounded-2xl border border-toss-line overflow-hidden shadow-sm">
      {/* Card Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-toss-line">
        <span className="font-bold text-toss-label text-sm">{t.person} {index + 1}</span>
        {showRemove && (
          <button
            onClick={() => onRemove(index)}
            className="text-toss-placeholder hover:text-red-400 transition-colors text-lg leading-none"
            aria-label="remove"
          >
            ✕
          </button>
        )}
      </div>

      <div className="p-4 space-y-4">
        {/* Age Type */}
        <div>
          <p className="text-xs font-semibold text-toss-tertiary mb-2">{t.ageLabel}</p>
          <div className="flex gap-2">
            {[t.adult, t.child].map((opt) => (
              <label
                key={opt}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl border text-sm font-medium cursor-pointer transition-colors ${
                  ageType === opt
                    ? 'bg-toss-blue-light border-toss-blue text-toss-blue'
                    : 'border-toss-line text-toss-tertiary'
                }`}
              >
                <input
                  type="radio"
                  name={`age-${index}`}
                  value={opt}
                  checked={ageType === opt}
                  onChange={() => onChange(index, { ageType: opt })}
                  className="sr-only"
                />
                {opt}
              </label>
            ))}
          </div>
        </div>

        {/* Age Notice */}
        {ageType && (
          <div className="rounded-xl bg-amber-50 border border-amber-200 px-3 py-2.5 space-y-1.5">
            <p className="text-xs text-amber-800 whitespace-pre-line">
              {ageType === t.child ? t.ageNoticeChild : t.ageNoticeAdult}
            </p>
            <p className="text-xs text-amber-700 border-t border-amber-200 pt-1.5">{t.ageNoticeCommon}</p>
          </div>
        )}

        {/* Divider */}
        <div className="flex items-center gap-2 text-xs text-toss-placeholder">
          <div className="flex-1 h-px bg-toss-line" />
          <span>{t.orDivider}</span>
          <div className="flex-1 h-px bg-toss-line" />
        </div>

        {/* Course Section */}
        <div className={`rounded-xl border p-3 transition-colors ${activeSection === 'course' ? 'border-toss-blue bg-toss-blue-light' : 'border-toss-line'}`}>
          <p className="text-xs font-semibold text-toss-secondary mb-2.5">{t.courseSection}</p>
          <div className="space-y-2">
            {t.courses.map((opt) => (
              <label key={opt.value} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name={`selection-${index}`}
                  value={`course-${opt.value}`}
                  checked={course === opt.value && !horse}
                  onChange={() => selectCourse(opt.value)}
                  className="accent-toss-blue w-4 h-4 shrink-0"
                />
                <div className="flex-1 flex items-center justify-between">
                  <div>
                    <span className="text-sm font-medium text-toss-label">{opt.label}</span>
                    <span className="text-sm text-toss-secondary"> {opt.sub}</span>
                    <span className="ml-1.5 text-xs text-toss-placeholder">({opt.duration})</span>
                  </div>
                  <span className="text-sm font-semibold text-toss-blue shrink-0">{opt.price}</span>
                </div>
              </label>
            ))}
          </div>

          {/* Forest Path */}
          {(course === 'B' || course === 'C') && !horse && (
            <label className="flex items-center gap-2 mt-3 pt-3 border-t border-blue-100 cursor-pointer">
              <input
                type="checkbox"
                checked={forestPath}
                onChange={(e) => onChange(index, { forestPath: e.target.checked })}
                className="accent-toss-blue w-4 h-4"
              />
              <span className="text-sm text-toss-secondary">{t.forestAdd}</span>
              <span className="ml-auto text-sm font-semibold text-toss-blue">+10,000{t.priceUnit}</span>
            </label>
          )}
        </div>

        {/* Horse Section */}
        <div className={`rounded-xl border p-3 transition-colors ${activeSection === 'horse' ? 'border-toss-blue bg-toss-blue-light' : 'border-toss-line'}`}>
          <p className="text-xs font-semibold text-toss-secondary mb-2.5">{t.horseSection}</p>
          <div className="space-y-2">
            {t.horses.map((opt) => (
              <label key={opt.value} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name={`selection-${index}`}
                  value={`horse-${opt.value}`}
                  checked={horse === opt.value}
                  onChange={() => selectHorse(opt.value)}
                  className="accent-toss-blue w-4 h-4 shrink-0"
                />
                <div className="flex-1 flex items-center justify-between">
                  <span className="text-sm font-medium text-toss-label">{opt.label}</span>
                  <span className="text-sm font-semibold text-toss-blue">{opt.price}</span>
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
