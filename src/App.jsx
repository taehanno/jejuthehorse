import { useState } from 'react'
import { LangProvider } from './context/LangContext'
import ReservationPage from './pages/ReservationPage'
import CompletePage from './pages/CompletePage'

export default function App() {
  const [submittedData, setSubmittedData] = useState(null)

  return (
    <LangProvider>
      {submittedData
        ? <CompletePage data={submittedData} />
        : <ReservationPage onSubmitted={setSubmittedData} />
      }
    </LangProvider>
  )
}
