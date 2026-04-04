async function hmacSHA256(secret, message) {
  const enc = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw', enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false, ['sign']
  )
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(message))
  return Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2, '0')).join('')
}

export async function sendSMS(text) {
  const apiKey = import.meta.env.VITE_SOLAPI_API_KEY
  const apiSecret = import.meta.env.VITE_SOLAPI_API_SECRET
  const from = import.meta.env.VITE_SOLAPI_SENDER
  const to = import.meta.env.VITE_SOLAPI_RECEIVER

  const date = new Date().toISOString()
  const salt = crypto.randomUUID().replace(/-/g, '')
  const signature = await hmacSHA256(apiSecret, date + salt)

  const res = await fetch('https://api.solapi.com/messages/v4/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `HMAC-SHA256 ApiKey=${apiKey}, Date=${date}, Salt=${salt}, Signature=${signature}`,
    },
    body: JSON.stringify({ message: { to, from, text } }),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.message || 'SMS 발송 실패')
  }
}
