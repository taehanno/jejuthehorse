export default function PersonCard({ person, index, onChange, onRemove, showRemove }) {
  const { ageType, course, forestPath, horse } = person

  const handleCourse = (val) => {
    const updates = { course: val }
    if (val === 'A') updates.forestPath = false
    onChange(index, updates)
  }

  return (
    <div className="bg-toss-white rounded-2xl shadow-sm p-4 border border-toss-line">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <span className="font-bold text-toss-label text-base">인원 {index + 1}</span>
        {showRemove && (
          <button
            onClick={() => onRemove(index)}
            className="text-toss-placeholder hover:text-red-400 transition-colors text-xl leading-none"
            aria-label="인원 제거"
          >
            ✕
          </button>
        )}
      </div>

      {/* Age Type */}
      <div className="mb-4">
        <p className="text-xs font-semibold text-toss-tertiary mb-2">연령</p>
        <div className="flex gap-3">
          {['성인', '아동'].map((opt) => (
            <label key={opt} className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="radio"
                name={`age-${index}`}
                value={opt}
                checked={ageType === opt}
                onChange={() => onChange(index, { ageType: opt })}
                className="accent-toss-blue w-4 h-4"
              />
              <span className="text-sm text-toss-secondary">{opt}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Course */}
      <div className="mb-4">
        <p className="text-xs font-semibold text-toss-tertiary mb-2">코스</p>
        <div className="flex flex-col gap-2">
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
                className="accent-toss-blue w-4 h-4"
              />
              <span className="text-sm text-toss-secondary">
                {opt.label}{' '}
                <span className="text-toss-tertiary text-xs">({opt.price})</span>
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Forest Path (B or C only) */}
      {(course === 'B' || course === 'C') && (
        <div className="mb-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={forestPath}
              onChange={(e) => onChange(index, { forestPath: e.target.checked })}
              className="accent-toss-blue w-4 h-4"
            />
            <span className="text-sm text-toss-secondary">
              숲길 <span className="text-toss-tertiary text-xs">(+10,000원)</span>
            </span>
          </label>
        </div>
      )}

      {/* Horse */}
      <div>
        <p className="text-xs font-semibold text-toss-tertiary mb-2">말 선택</p>
        <div className="flex flex-col gap-2">
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
                className="accent-toss-blue w-4 h-4"
              />
              <span className="text-sm text-toss-secondary">
                {opt.label}{' '}
                {opt.price && <span className="text-toss-tertiary text-xs">({opt.price})</span>}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}
