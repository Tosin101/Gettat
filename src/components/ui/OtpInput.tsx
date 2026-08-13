'use client'

import { useRef, useState, KeyboardEvent } from 'react'

const LENGTH = 6

export default function OtpInput() {
  const [values, setValues] = useState<string[]>(Array(LENGTH).fill(''))
  const inputsRef = useRef<(HTMLInputElement | null)[]>([])

  const handleChange = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return // digits only, one character
    const next = [...values]
    next[index] = value
    setValues(next)
    if (value && index < LENGTH - 1) {
      inputsRef.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !values[index] && index > 0) {
      inputsRef.current[index - 1]?.focus()
    }
  }

  return (
    <div className="flex justify-between gap-2">
      {values.map((digit, index) => (
        <input
          key={index}
          ref={(el) => {
            inputsRef.current[index] = el
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          className="h-14 w-12 rounded-md border border-accent-mid bg-white text-center text-lg font-semibold text-ink focus:border-accent-primary focus:outline-none"
        />
      ))}
    </div>
  )
}
