import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
  size?: 'default' | 'small'
}

export const Logo = (props: Props) => {
  const {
    loading: loadingFromProps,
    priority: priorityFromProps,
    className,
    size = 'default',
  } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  // Size configurations
  const sizeConfig = {
    default: {
      width: 164,
      height: 50,
      maxWidth: 'max-w-[164px]',
      heightClass: 'h-[50px]',
    },
    small: {
      width: 120,
      height: 36,
      maxWidth: 'max-w-[120px]',
      heightClass: 'h-[36px]',
    },
  }

  const config = sizeConfig[size]

  return (
    /* eslint-disable @next/next/no-img-element */
    <img
      alt="Rvinpaul Logo"
      width={config.width}
      height={config.height}
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      className={clsx(
        `${config.maxWidth} w-full ${config.heightClass} transition-all duration-300`,
        className,
      )}
      src="/rvinpaul.png"
    />
  )
}
