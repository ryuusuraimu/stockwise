import { useTheme } from '../hooks/useTheme'
import type { StockwiseTheme } from '../utils/theme'

const selectableThemes: Array<{
  label: string
  value: Exclude<StockwiseTheme, 'system'>
}> = [
  { label: 'Paper Light', value: 'paper-light' },
  { label: 'Vault Dark', value: 'vault-dark' },
]

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <div aria-label="Theme" className="theme-toggle">
      {selectableThemes.map((theme) => (
        <button
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
