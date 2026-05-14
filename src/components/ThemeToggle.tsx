import { useTheme } from '../hooks/useTheme'
import type { StockwiseTheme } from '../utils/theme'

const selectableThemes: Array<{
  ariaLabel: string
  label: string
  value: Exclude<StockwiseTheme, 'system'>
}> = [
  { ariaLabel: 'Paper Light', label: '紙', value: 'paper-light' },
  { ariaLabel: 'Vault Dark', label: '墨', value: 'vault-dark' },
]

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <div aria-label="Theme" className="theme-toggle">
      {selectableThemes.map((theme) => (
        <button
          aria-label={theme.ariaLabel}
          className={`theme-toggle-button ${
            resolvedTheme === theme.value ? 'is-active' : ''
          }`}
          key={theme.value}
          type="button"
          onClick={() => setTheme(theme.value)}
        >
          {theme.label}
        </button>
      ))}
    </div>
  )
}
