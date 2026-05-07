import { useEffect, useMemo, useState } from "react"
import clsx from "clsx"
import {
  domainFromLogoUrl,
  logoCandidatesForDomain,
  resolveLogoUrl,
} from "../../data/services"

type Props = {
  name: string
  url?: string | null
  brandColor?: string
  size?: number
  className?: string
  rounded?: "lg" | "xl" | "2xl" | "full"
}

function isLight(hex: string): boolean {
  const m = hex.replace("#", "")
  if (m.length !== 6) return false
  const r = parseInt(m.slice(0, 2), 16)
  const g = parseInt(m.slice(2, 4), 16)
  const b = parseInt(m.slice(4, 6), 16)
  return r * 0.299 + g * 0.587 + b * 0.114 > 186
}

export default function BrandLogo({
  name,
  url,
  brandColor = "#26262b",
  size = 40,
  className,
  rounded = "xl",
}: Props) {
  const candidates = useMemo(() => {
    if (!url) return []
    const primary = resolveLogoUrl(url)
    const domain = domainFromLogoUrl(primary)
    if (domain) return logoCandidatesForDomain(domain)
    return [primary]
  }, [url])

  const [attempt, setAttempt] = useState(0)
  useEffect(() => {
    setAttempt(0)
  }, [candidates])

  const currentUrl = candidates[attempt] ?? null
  const showFallback = !currentUrl
  const initial = name.trim().charAt(0).toUpperCase() || "?"
  const radiusClass = {
    lg: "rounded-lg",
    xl: "rounded-xl",
    "2xl": "rounded-2xl",
    full: "rounded-full",
  }[rounded]

  if (showFallback) {
    return (
      <span
        className={clsx(
          "inline-grid place-items-center font-semibold shrink-0 select-none",
          radiusClass,
          className,
        )}
        style={{
          width: size,
          height: size,
          backgroundColor: brandColor,
          color: isLight(brandColor) ? "#0a0a0b" : "#ffffff",
          fontSize: Math.max(12, Math.round(size * 0.42)),
        }}
        aria-label={name}
      >
        {initial}
      </span>
    )
  }

  return (
    <img
      key={currentUrl}
      src={currentUrl}
      alt={name}
      width={size}
      height={size}
      loading="lazy"
      onError={() => setAttempt((a) => a + 1)}
      className={clsx("shrink-0 object-contain bg-white", radiusClass, className)}
      style={{ width: size, height: size }}
    />
  )
}
