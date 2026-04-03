export default function Footer() {
  return (
    <footer className="bg-toss-white border-t border-toss-line px-4 py-5 text-xs text-toss-tertiary space-y-1 text-center">
      <p className="font-semibold text-toss-secondary mb-1">🐴 Jeju The Horse</p>
      <p>📍 제주 제주시 애월읍 상가리 2156-15</p>
      <p>📞 010-2732-3666</p>
      <p>🕘 화~토 09:00~18:00 (휴게 12:00~13:20) / 월 휴무</p>
      <p>
        📸{' '}
        <a
          href="https://www.instagram.com/jeju_thehorse"
          target="_blank"
          rel="noopener noreferrer"
          className="text-toss-blue underline"
        >
          @jeju_thehorse
        </a>
      </p>
    </footer>
  )
}
