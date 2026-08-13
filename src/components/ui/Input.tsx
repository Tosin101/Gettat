import { InputHTMLAttributes, ElementType } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  icon?: ElementType
}

export default function Input({
  icon: Icon,
  className = '',
  ...props
}: InputProps) {
  if (Icon) {
    return (
      <div className="relative">
        <Icon
          size={18}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-accent-primary"
        />
        <input className={`input-field pl-11 ${className}`} {...props} />
      </div>
    )
  }

  return <input className={`input-field ${className}`} {...props} />
}
