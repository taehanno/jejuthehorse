const COURSE_PRICES = { A: 33000, B: 66000, C: 99000 }
const HORSE_PRICES = { 한라마: 110000, 웜블러드: 132000 }
const FOREST_PRICE = 10000

export function calcPersonPrice(person) {
  // course and horse are mutually exclusive
  if (person.horse) {
    return HORSE_PRICES[person.horse] ?? 0
  }
  const course = COURSE_PRICES[person.course] ?? 0
  const forest = person.forestPath ? FOREST_PRICE : 0
  return course + forest
}

export function formatPrice(num) {
  return num.toLocaleString('ko-KR')
}

const ADULT_VALUES = new Set(['성인', 'Adult', '成人'])
const TEEN_VALUES = new Set(['청소년', 'Teen', '青少年'])

export function buildPersonsDetail(persons) {
  return persons
    .map((p, i) => {
      let ageLabel
      if (ADULT_VALUES.has(p.ageType)) ageLabel = '성인'
      else if (TEEN_VALUES.has(p.ageType)) ageLabel = '청소년'
      else ageLabel = '아동'

      const parts = [ageLabel]

      if (ADULT_VALUES.has(p.ageType) || TEEN_VALUES.has(p.ageType)) {
        const bodyParts = []
        if (p.overWeight) bodyParts.push('체중 70kg↑')
        if (p.overHeight) bodyParts.push('키 180cm↑')
        if (bodyParts.length > 0) parts.push(bodyParts.join(', '))
      }

      if (p.horse) {
        parts.push(`1회 기승 / ${p.horse}`)
      } else if (p.course) {
        const courseLabel = { A: '체험A 둘레길', B: '체험B 목장길', C: '체험C 목장둘레길' }[p.course]
        parts.push(courseLabel)
        if (p.forestPath) parts.push('숲길')
      } else {
        parts.push('미선택')
      }
      return `인원${i + 1}: ${parts.join(' / ')}`
    })
    .join('\n')
}
