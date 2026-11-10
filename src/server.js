import { createServer } from 'node:http'
import { getBook, listBooks } from './books.js'
import { formatList } from './format.js'
import { searchByAuthor } from './search.js'

function send(res, status, body) {
  res.writeHead(status, { 'content-type': 'application/json' })
  res.end(JSON.stringify(body))
}

export const server = createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost')
  if (url.pathname === '/books') return send(res, 200, listBooks())
  if (url.pathname === '/books.txt') {
    res.writeHead(200, { 'content-type': 'text/plain; charset=utf-8' })
    return res.end(formatList(listBooks()))
  }
  if (url.pathname === '/search') return send(res, 200, searchByAuthor(url.searchParams))
  const m = url.pathname.match(/^\/books\/(\d+)$/)
  if (m) {
    const book = getBook(m[1])
    return book ? send(res, 200, book) : send(res, 404, { error: 'not found' })
  }
  send(res, 404, { error: 'not found' })
})

if (import.meta.url === `file://${process.argv[1]}`) server.listen(Number(process.env.PORT) || 3000)
