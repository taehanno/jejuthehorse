export default function PersonCard({ person, index, onChange, onRemove, showRemove }) {
  const { ageType, course, forestPath, horse } = person

  const handleCourse = (val) => {
    const updates = { course: val }
    // reset forestPath when switching away from B/C
    if (val === 'A') updates.forestPath = false
    onChange(index, updates)
  }

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 border border-earth-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <span className="font-bold text-earth-700 text-base">인원 {index + 1}</span>
        {showRemove && (
          <button
            onClick={() => onRemove(index)}
            className="text-earth-400 hover:text-red-500 transition-colors text-xl leading-none"
            aria-label="인원 제거"
          >
            ✕
          </button>
        )}
      </div>

      {/* Age Type */}
      <div className="mb-3">
        <p className="text-xs font-semibold text-earth-500 uppercase tracking-wide mb-1.5">연령</p>
        <div className="flex gap-3">
          {['성인', '아동'].map((opt) => (
            <label key={opt} className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="radio"
                name={`age-${index}`}
                value={opt}
                checked={ageType === opt}
                onChange={() => onChange(index, { ageType: opt })}
                className="accent-forest-600 w-4 h-4"
              />
              <span className="text-sm text-earth-800">{opt}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Course */}
      <div className="mb-3">
        <p className="text-xs font-semibold text-earth-500 uppercase tracking-wide mb-1.5">코스</p>
        <div className="flex flex-col gap-1.5">
          {[
            { value: 'A', label: 'A코스', price: '33,000원' },
            { value: 'B', label: 'B코스', price: '66,000원' },
            { value: 'C', label: 'C코스', price: '99,000원' },
          ].map((opt) => (
            <label key={opt.value} className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="radio"
                name={`course-${index}`}
                value={opt.value}
                checked={course === opt.value}
                onChange={() => handleCourse(opt.value)}
                className="accent-forest-600 w-4 h-4"
              />
              <span className="text-sm text-earth-800">
                {opt.label}{' '}
                <span className="text-earth-500 text-xs">({opt.price})</span>
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Forest Path (B or C only) */}
      {(course === 'B' || course === 'C') && (
        <div className="mb-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={forestPath}
              onChange={(e) => onChange(index, { forestPath: e.target.checked })}
              className="accent-forest-600 w-4 h-4"
            />
            <span className="text-sm text-earth-800">
              숲길 <span className="text-earth-500 text-xs">(+10,000원)</span>
            </span>
          </label>
        </div>
      )}

      {/* Horse */}
      <div>
        <p className="text-xs font-semibold text-earth-500 uppercase tracking-wide mb-1.5">말 선택</p>
        <div className="flex flex-col gap-1.5">
          {[
            { value: '없음', label: '없음', price: null },
            { value: '한라마', label: '한라마', price: '110,000원' },
            { value: '웜블러드', label: '웜블러드', price: '132,000원' },
          ].map((opt) => (
            <label key={opt.value} className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="radio"
                name={`horse-${index}`}
                value={opt.value}
                checked={horse === opt.value}
                onChange={() => onChange(index, { horse: opt.value })}
                className="accent-forest-600 w-4 h-4"
              />
              <span className="text-sm text-earth-800">
                {opt.label}{' '}
                {opt.price && <span className="text-earth-500 text-xs">({opt.price})</span>}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}
