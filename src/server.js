import { createServer } from 'node:http'
import { getBook, listBooks } from './books.js'

function send(res, status, body) {
  res.writeHead(status, { 'content-type': 'application/json' })
  res.end(JSON.stringify(body))
}

export const server = createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost')
  if (url.pathname === '/books') return send(res, 200, listBooks())
  const m = url.pathname.match(/^\/books\/(\d+)$/)
  if (m) {
    const book = getBook(m[1])
    return book ? send(res, 200, book) : send(res, 404, { error: 'not found' })
  }
  send(res, 404, { error: 'not found' })
})

if (import.meta.url === `file://${process.argv[1]}`) server.listen(Number(process.env.PORT) || 3000)
