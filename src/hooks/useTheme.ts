import { useEffect, useState } from 'react'

import {
  applyTheme,
  getSavedTheme,
  resolveTheme,
  setSavedTheme,
  type StockwiseTheme,
} from '../utils/theme'

export function useTheme() {
  const [theme, setThemeState] = useState<StockwiseTheme>(() => getSavedTheme())

  useEffect(() => {
    applyTheme(theme)
    setSavedTheme(theme)
  }, [theme])

  useEffect(() => {
    if (theme !== 'system' || typeof window === 'undefined') {
      return undefined
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => applyTheme('system')
    mediaQuery.addEventListener('change', handleChange)

    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [theme])

  return {
    resolvedTheme: resolveTheme(theme),
    setTheme: setThemeState,
    theme,
  }
}
