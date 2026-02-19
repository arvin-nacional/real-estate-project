'use client'
import { useRowLabel } from '@payloadcms/ui'
import type { RowLabelProps } from '@payloadcms/ui'

type HeroCarouselImageRow = {
  image?: {
    alt?: string
  }
}

export const RowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<HeroCarouselImageRow>()

  const label = data?.data?.image?.alt
    ? data.data.image.alt
    : `Image ${String((data.rowNumber ?? 0) + 1).padStart(2, '0')}`

  return <div>{label}</div>
}
