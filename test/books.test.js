import { test } from 'node:test'
import assert from 'node:assert/strict'
import { getBook, listBooks } from '../src/books.js'

test('lists every book', () => assert.equal(listBooks().length, 3))
test('finds a book by id', () => assert.equal(getBook('2').title, 'Small Systems'))
test('refuses a bad id', () => assert.equal(getBook('x'), null))
