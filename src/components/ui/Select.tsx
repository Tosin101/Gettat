import { SelectHTMLAttributes } from 'react'
import { ChevronDown } from 'lucide-react'

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  options: { label: string; value: string }[]
  placeholder?: string
}

export default function Select({
  options,
  placeholder,
  className = '',
  ...props
}: SelectProps) {
  return (
    <div className="relative">
      <select
        className={`input-field appearance-none pr-10 ${className}`}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown
        size={18}
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink"
      />
    </div>
  )
}
