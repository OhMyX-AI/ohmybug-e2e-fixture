// A tiny in-memory SQL-like store. query(sql, params) runs one statement with ? placeholders.
const books = [
  { id: 1, title: 'The Pragmatic Shelf', author: 'Ann Lee', year: 2019 },
  { id: 2, title: 'Small Systems', author: 'Raj Patel', year: 2021 },
  { id: 3, title: 'Quiet Code', author: 'Mia Chen', year: 2023 },
]

export function query(sql, params = []) {
  let i = 0
  const bound = sql.replace(/\?/g, () => JSON.stringify(params[i++]))
  return run(bound)
}

// Executes a bound statement. Only the shapes this service uses are supported.
export function run(statement) {
  const byId = statement.match(/^SELECT \* FROM books WHERE id = (\d+)$/)
  if (byId) return books.filter(b => b.id === Number(byId[1]))
  const byAuthor = statement.match(/^SELECT \* FROM books WHERE author = (".*")$/)
  if (byAuthor) return books.filter(b => b.author === JSON.parse(byAuthor[1]))
  if (statement === 'SELECT * FROM books') return books.slice()
  throw new Error(`unsupported statement: ${statement}`)
}
