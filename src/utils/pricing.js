const COURSE_PRICES = { A: 33000, B: 66000, C: 99000 }
const HORSE_PRICES = { 없음: 0, 한라마: 110000, 웜블러드: 132000 }
const FOREST_PRICE = 10000

export function calcPersonPrice(person) {
  const course = COURSE_PRICES[person.course] ?? 0
  const forest = person.forestPath ? FOREST_PRICE : 0
  const horse = HORSE_PRICES[person.horse] ?? 0
  return course + forest + horse
}

export function formatPrice(num) {
  return num.toLocaleString('ko-KR')
}

export function buildPersonsDetail(persons) {
  return persons
    .map((p, i) => {
      const parts = [
        p.ageType || '—',
        p.course ? `${p.course}코스` : '코스미선택',
        p.forestPath ? '숲길' : null,
        p.horse && p.horse !== '없음' ? p.horse : '말없음',
      ].filter(Boolean)
      return `인원${i + 1}: ${parts.join(' / ')}`
    })
    .join('\n')
}
