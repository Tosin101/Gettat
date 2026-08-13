import Image from 'next/image'

type LogoProps = {
  variant?: 'icon' | 'full'
  height?: number
  className?: string
  priority?: boolean
  /** icon variant only — omits the pale-blue circle so it can sit on a
   * colored badge (e.g. event type icons) without two circles clashing */
  bare?: boolean
}

function MaskIcon({
  size,
  className,
  bare,
}: {
  size: number
  className?: string
  bare?: boolean
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 79 79"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g opacity="0.8">
        {!bare && (
          <rect width="78.2188" height="78.2188" rx="39.1094" fill="#E8F9FF" />
        )}
        <path
          d="M49.8619 37.3174C47.1731 37.3174 45.3806 38.2136 44.4844 40.9024"
          stroke="#3A3550"
          strokeOpacity="0.65"
          strokeWidth="2.50952"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M24.7686 28.3535C23.8178 28.3535 22.9059 28.7312 22.2336 29.4035C21.5613 30.0759 21.1836 30.9877 21.1836 31.9385V39.1086C21.1836 41.4856 22.1279 43.7653 23.8087 45.4461C25.4895 47.1269 27.7691 48.0712 30.1462 48.0712C33.4582 48.1945 36.6253 49.4614 39.1087 51.6562C41.5922 49.4614 44.7592 48.1945 48.0713 48.0712C50.4483 48.0712 52.728 47.1269 54.4088 45.4461C56.0896 43.7653 57.0339 41.4856 57.0339 39.1086V31.9385C57.0339 30.9877 56.6561 30.0759 55.9838 29.4035C55.3115 28.7312 54.3996 28.3535 53.4488 28.3535H48.0713C44.7592 28.4769 41.5922 29.7437 39.1087 31.9385C36.6253 29.7437 33.4582 28.4769 30.1462 28.3535H24.7686Z"
          stroke="#3A3550"
          strokeOpacity="0.65"
          strokeWidth="2.50952"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M28.3516 37.3174C31.0403 37.3174 32.8328 38.2136 33.7291 40.9024"
          stroke="#3A3550"
          strokeOpacity="0.65"
          strokeWidth="2.50952"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  )
}

export default function Logo({
  variant = 'full',
  height = 32,
  className = '',
  priority = false,
  bare = false,
}: LogoProps) {
  if (variant === 'icon') {
    return <MaskIcon size={height} className={className} bare={bare} />
  }

  const width = Math.round(height * (226 / 79))
  return (
    <Image
      src="/images/gehtta-logo-full.svg"
      alt="Gehtta"
      width={width}
      height={height}
      priority={priority}
      className={className}
    />
  )
}