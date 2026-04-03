import logo from '../image/Jeju logo.jpg'
import { useLang } from '../context/LangContext'

export default function Footer() {
  const { t } = useLang()
  return (
    <footer className="bg-toss-white border-t border-toss-line px-4 py-5 text-xs text-toss-tertiary space-y-1 text-center">
      <div className="flex items-center justify-center gap-1.5 mb-1">
        <img src={logo} alt="Jeju The Horse 로고" className="h-5 w-5 rounded-full object-cover" />
        <p className="font-semibold text-toss-secondary">Jeju The Horse</p>
      </div>
      <p>📍 {t.footerAddr}</p>
      <p>📞 {t.footerPhone}</p>
      <p>🕘 {t.footerHours}</p>
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
