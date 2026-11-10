// Formats books for the plain-text listing: one "Title by Author (Year)" line per book.
// A field the record lacks is left out instead of printed as "undefined", and whitespace runs (line breaks
// included) fold to one space, so each book stays on one line.
const text = v => (typeof v === 'string' ? v.replace(/\s+/g, ' ').trim() : '')

export function formatBook(book) {
  const title = text(book?.title) || 'Untitled'
  const author = text(book?.author)
  const year = Number.isInteger(book?.year) ? ` (${book.year})` : ''
  return `${title}${author ? ` by ${author}` : ''}${year}`
}

export function formatList(books) {
  return Array.isArray(books) ? books.map(formatBook).join('\n') : ''
}
