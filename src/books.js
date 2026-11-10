import { query } from './db.js'

/** Every book, in id order. */
export function listBooks() {
  return query('SELECT * FROM books').sort((a, b) => a.id - b.id)
}

export function getBook(id) {
  const n = Number(id)
  if (!Number.isInteger(n) || n < 1) return null
  return query('SELECT * FROM books WHERE id = ?', [n])[0] ?? null
}
