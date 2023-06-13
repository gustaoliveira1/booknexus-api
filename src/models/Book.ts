import { v4 } from 'uuid'
import { prisma } from '../lib/prisma'

export class Book {
  public readonly id?: string
  public title: string
  public sinopse: string
  public author: string
  public genre: string
  public publicationYear: number

  constructor(props: Omit<Book, 'create'>) {
    Object.assign(this, props)

    if (!this.id) {
      this.id = v4()
    }
  }

  public async create(): Promise<void> {
    await prisma.book.create({
      data: {
        id: this.id,
        title: this.title,
        sinopse: this.sinopse,
        author: this.author,
        genre: this.genre,
        publicationYear: this.publicationYear
      }
    })
  }
}