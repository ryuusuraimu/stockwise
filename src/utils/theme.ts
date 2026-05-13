export type StockwiseTheme = 'paper-light' | 'vault-dark' | 'system'

export const STOCKWISE_THEME_STORAGE_KEY = 'stockwise-theme'

const themeValues: StockwiseTheme[] = ['paper-light', 'vault-dark', 'system']

const isTheme = (value: string | null): value is StockwiseTheme => {
  return themeValues.includes(value as StockwiseTheme)
}

export function getSavedTheme(): StockwiseTheme {
  if (typeof window === 'undefined') {
    return 'system'
  }

  const savedTheme = window.localStorage.getItem(STOCKWISE_THEME_STORAGE_KEY)
  return isTheme(savedTheme) ? savedTheme : 'system'
}

export function setSavedTheme(theme: StockwiseTheme) {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(STOCKWISE_THEME_STORAGE_KEY, theme)
}

export function resolveSystemPreference(): Exclude<StockwiseTheme, 'system'> {
  if (typeof window === 'undefined') {
    return 'paper-light'
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'vault-dark'
    : 'paper-light'
}

export function resolveTheme(
  theme: StockwiseTheme,
): Exclude<StockwiseTheme, 'system'> {
  return theme === 'system' ? resolveSystemPreference() : theme
}

export function applyTheme(theme: StockwiseTheme) {
  if (typeof document === 'undefined') {
    return
  }

  document.documentElement.dataset.theme = resolveTheme(theme)
}
