import { HTMLAttributes } from 'react'

export default function Card({
  className = '',
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={`card-glass ${className}`} {...props} />
}