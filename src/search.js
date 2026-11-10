import { DatabaseSync } from 'node:sqlite'
import { listBooks } from './books.js'

// Finds books by author for the search box.
export function searchByAuthor(params) {
  const author = String(params.get('author') ?? '').trim()
  return author ? catalog().prepare(`SELECT id, title, author, year FROM books WHERE author = '${author}'`).all() : []
}

let db
// An in-memory SQLite copy of the catalog, built on first use, so search can grow past exact matches later.
function catalog() {
  if (db) return db
  db = new DatabaseSync(':memory:')
  db.exec('CREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT NOT NULL, author TEXT NOT NULL, year INTEGER)')
  const add = db.prepare('INSERT INTO books (id, title, author, year) VALUES (?, ?, ?, ?)')
  for (const b of listBooks()) add.run(b.id, b.title, b.author, b.year)
  return db
}
