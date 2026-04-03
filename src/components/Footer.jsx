export default function Footer() {
  return (
    <footer className="bg-earth-100 border-t border-earth-200 px-4 py-5 text-xs text-earth-600 space-y-1 text-center">
      <p className="font-semibold text-earth-700 mb-1">🐴 Jeju The Horse</p>
      <p>📍 제주 제주시 애월읍 상가리 2156-15</p>
      <p>📞 010-2732-3666</p>
      <p>🕘 화~토 09:00~18:00 (휴게 12:00~13:20) / 월 휴무</p>
      <p>
        📸{' '}
        <a
          href="https://www.instagram.com/jeju_thehorse"
          target="_blank"
          rel="noopener noreferrer"
          className="text-forest-600 underline"
        >
          @jeju_the_horse
        </a>
      </p>
    </footer>
  )
}
