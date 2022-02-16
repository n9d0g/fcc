import React, { MutableRefObject, useEffect } from 'react'

export const useOnClickOutside = (
  ref: MutableRefObject<HTMLDivElement>,
  handler: (value: React.Dispatch<React.SetStateAction<boolean>>) => void
) => {
  useEffect(() => {
    const listener = (event: any) => {
      if (!ref.current || ref.current.contains(event.target)) return
      handler(event)
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, handler])
}
