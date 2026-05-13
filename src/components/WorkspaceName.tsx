import { useState } from 'react'

import {
  getWorkspaceSettings,
  updateWorkspaceName,
} from '../utils/workspaceSettings'

export function WorkspaceName() {
  const [settings, setSettings] = useState(() => getWorkspaceSettings())
  const [draftName, setDraftName] = useState(settings.workspaceName)
  const [isEditing, setIsEditing] = useState(false)

  const saveWorkspaceName = () => {
    const nextSettings = updateWorkspaceName(draftName)
    setSettings(nextSettings)
    setDraftName(nextSettings.workspaceName)
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <div className="vault-workspace-row">
        <input
          aria-label="ワークスペース名"
          className="vault-workspace-input"
          value={draftName}
          onChange={(event) => setDraftName(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              saveWorkspaceName()
            }
            if (event.key === 'Escape') {
              setDraftName(settings.workspaceName)
              setIsEditing(false)
            }
          }}
        />
        <button className="vault-text-button" type="button" onClick={saveWorkspaceName}>
          保存
        </button>
      </div>
    )
  }

  return (
    <div className="vault-workspace-row">
      <p className="vault-workspace">{settings.workspaceName}</p>
      <button
        className="vault-text-button"
        type="button"
        onClick={() => setIsEditing(true)}
      >
        編集
      </button>
    </div>
  )
}
