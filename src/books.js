import { query } from './db.js'

export function listBooks() {
  return query('SELECT * FROM books')
}

export function getBook(id) {
  const n = Number(id)
  if (!Number.isInteger(n) || n < 1) return null
  return query('SELECT * FROM books WHERE id = ?', [n])[0] ?? null
}
