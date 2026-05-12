import type { UserNote } from '../types'

const USER_NOTES_STORAGE_KEY = 'stockwise:user-notes'

const canUseLocalStorage = () => {
  return typeof window !== 'undefined' && Boolean(window.localStorage)
}

const isUserNote = (value: unknown): value is UserNote => {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  const note = value as Partial<UserNote>

  return (
    typeof note.id === 'string' &&
    typeof note.faqId === 'string' &&
    typeof note.sourceBlockId === 'string' &&
    typeof note.title === 'string' &&
    typeof note.excerpt === 'string' &&
    Array.isArray(note.sourceReferenceIds) &&
    note.sourceReferenceIds.every(
      (sourceReferenceId) => typeof sourceReferenceId === 'string',
    ) &&
    typeof note.createdAt === 'string' &&
    typeof note.updatedAt === 'string'
  )
}

export const getStoredUserNotes = (): UserNote[] => {
  if (!canUseLocalStorage()) {
    return []
  }

  const rawNotes = window.localStorage.getItem(USER_NOTES_STORAGE_KEY)

  if (!rawNotes) {
    return []
  }

  try {
    const parsedNotes: unknown = JSON.parse(rawNotes)

    return Array.isArray(parsedNotes) ? parsedNotes.filter(isUserNote) : []
  } catch {
    return []
  }
}

export const saveStoredUserNotes = (notes: UserNote[]) => {
  if (!canUseLocalStorage()) {
    return
  }

  window.localStorage.setItem(USER_NOTES_STORAGE_KEY, JSON.stringify(notes))
}

export const addStoredUserNote = (note: UserNote) => {
  const nextNotes = [
    ...getStoredUserNotes().filter((storedNote) => storedNote.id !== note.id),
    note,
  ]

  saveStoredUserNotes(nextNotes)

  return nextNotes
}

export const removeStoredUserNote = (noteId: string) => {
  const nextNotes = getStoredUserNotes().filter((note) => note.id !== noteId)

  saveStoredUserNotes(nextNotes)

  return nextNotes
}

export const clearStoredUserNotes = () => {
  if (!canUseLocalStorage()) {
    return
  }

  window.localStorage.removeItem(USER_NOTES_STORAGE_KEY)
}
