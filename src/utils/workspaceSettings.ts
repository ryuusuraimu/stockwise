export type WorkspaceSettings = {
  workspaceName: string
  createdAt: string
  updatedAt: string
}

export const WORKSPACE_SETTINGS_STORAGE_KEY = 'stockwise-workspace-settings'
export const DEFAULT_WORKSPACE_NAME = '投資理解のVault'

const createDefaultSettings = (): WorkspaceSettings => {
  const now = new Date().toISOString()

  return {
    workspaceName: DEFAULT_WORKSPACE_NAME,
    createdAt: now,
    updatedAt: now,
  }
}

const isWorkspaceSettings = (value: unknown): value is WorkspaceSettings => {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  const candidate = value as Record<string, unknown>
  return (
    typeof candidate.workspaceName === 'string' &&
    typeof candidate.createdAt === 'string' &&
    typeof candidate.updatedAt === 'string'
  )
}

export function getWorkspaceSettings(): WorkspaceSettings {
  if (typeof window === 'undefined') {
    return createDefaultSettings()
  }

  const savedSettings = window.localStorage.getItem(
    WORKSPACE_SETTINGS_STORAGE_KEY,
  )

  if (!savedSettings) {
    return createDefaultSettings()
  }

  try {
    const parsed = JSON.parse(savedSettings)
    return isWorkspaceSettings(parsed) ? parsed : createDefaultSettings()
  } catch {
    return createDefaultSettings()
  }
}

export function setWorkspaceSettings(
  settings: WorkspaceSettings,
): WorkspaceSettings {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(
      WORKSPACE_SETTINGS_STORAGE_KEY,
      JSON.stringify(settings),
    )
  }

  return settings
}

export function updateWorkspaceName(workspaceName: string): WorkspaceSettings {
  const currentSettings = getWorkspaceSettings()
  const trimmedWorkspaceName = workspaceName.trim() || DEFAULT_WORKSPACE_NAME
  const nextSettings = {
    ...currentSettings,
    workspaceName: trimmedWorkspaceName,
    updatedAt: new Date().toISOString(),
  }

  return setWorkspaceSettings(nextSettings)
}
