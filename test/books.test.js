import { test } from 'node:test'
import assert from 'node:assert/strict'
import { getBook, listBooks } from '../src/books.js'

test('lists every book', () => assert.equal(listBooks().length, 3))
test('finds a book by id', () => assert.equal(getBook('2').title, 'Small Systems'))
test('refuses a bad id', () => assert.equal(getBook('x'), null))

test('formats a list', async () => {
  const { formatList } = await import('../src/format.js')
  assert.equal(formatList([{ title: 'A', author: 'B', year: 2020 }]), 'A by B (2020)')
  assert.equal(formatList([{ title: 'Two\nLines' }, {}]), 'Two Lines\nUntitled')
})

test('searches by author', async () => {
  const { searchByAuthor } = await import('../src/search.js')
  assert.equal(searchByAuthor(new URLSearchParams('author=Mia Chen'))[0].title, 'Quiet Code')
  assert.deepEqual(searchByAuthor(new URLSearchParams('author=')), [])
})
