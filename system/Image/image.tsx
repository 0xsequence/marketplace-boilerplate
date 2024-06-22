'use client'

import { forwardRef, memo } from 'react'

import { cn } from '../css/utils'

export interface ImageProps extends React.HTMLAttributes<HTMLImageElement> {
  src?: string
  alt?: string

  children?: React.ReactNode

  containerClassName?: string
  elementClassName?: string

  fallbackSrc?: string
  // disableFadeIn?: boolean
  loading?: boolean
}

export const placeholderImgUrl = '/images/placeholder.png'

export const BaseImage = memo(
  forwardRef<HTMLImageElement, ImageProps>(
    (
      {
        // disableFadeIn,
        loading,
        fallbackSrc = placeholderImgUrl,
        className,
        onLoad,
        children,
        elementClassName,
        containerClassName,
        ...props
      },
      ref
    ) => {
      //Disabling fade in for now, the onLoad event is firing to early for the useState hook

      // const [loaded, setLoaded] = useState(disableFadeIn ? true : false)

      return (
        <div className={cn('rounded-md', containerClassName)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={ref}
            className={cn(
              'h-full w-full rounded-[inherit] object-contain',
              // 'opacity-0 transition-opacity duration-300',
              className
            )}
            onLoad={e => {
              // if (!loaded) {
              //   setLoaded(true)
              // }
              if (onLoad) {
                onLoad(e)
              }
            }}
            onError={({ currentTarget }: any) => {
              if (currentTarget && fallbackSrc) {
                currentTarget.onerror = null // prevents looping
                currentTarget.src = fallbackSrc
              }
            }}
            {...props}
          />

          {children ? (
            <div className={cn(elementClassName)}>{children}</div>
          ) : null}
        </div>
      )
    }
  )
)