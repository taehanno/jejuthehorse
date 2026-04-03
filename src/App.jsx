import { useState } from 'react'
import ReservationPage from './pages/ReservationPage'
import CompletePage from './pages/CompletePage'

export default function App() {
  const [submittedData, setSubmittedData] = useState(null)

  if (submittedData) {
    return <CompletePage data={submittedData} />
  }

  return <ReservationPage onSubmitted={setSubmittedData} />
}
