import { describe, test, expect } from '@jest/globals'
import { Book } from '../../src/models/Book'

describe('Book model', () => {
  test('should create a book with valid properties', () => {
    const book = new Book({
      id: '01',
      title: 'Pandas are cute',
      author: 'John Doe',
      genre: 'Comedy',
      publicationYear: 2004,
      sinopse: 'I Dont Know'
    })

    expect(book.id).toBe('01')
    expect(book.title).toBe('Pandas are cute')
    expect(book.author).toBe('John Doe')
    expect(book.genre).toBe('Comedy')
    expect(book.publicationYear).toBe(2004)
    expect(book.sinopse).toBe('I Dont Know')
  })

  test('should generate and id for an new book', () => {
    const book = new Book({
      title: 'Pandas are cute',
      author: 'John Doe',
      genre: 'Comedy',
      publicationYear: 2004,
      sinopse: 'I Dont Know',
    })

    expect(book.id).toBeDefined()
    expect(book.title).toBe('Pandas are cute')
    expect(book.author).toBe('John Doe')
    expect(book.genre).toBe('Comedy')
    expect(book.publicationYear).toBe(2004)
    expect(book.sinopse).toBe('I Dont Know')
  })
})