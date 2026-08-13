'use client'

import { useState, InputHTMLAttributes } from 'react'
import { Lock, Eye, EyeOff } from 'lucide-react'

export default function PasswordInput({
  className = '',
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  const [visible, setVisible] = useState(false)

  return (
    <div className="relative">
      <Lock
        size={18}
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-accent-primary"
      />
      <input
        type={visible ? 'text' : 'password'}
        className={`input-field pl-11 pr-11 ${className}`}
        {...props}
      />
      <button
        type="button"
        onClick={() => setVisible(!visible)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-muted"
        aria-label={visible ? 'Hide password' : 'Show password'}
      >
        {visible ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  )
}
