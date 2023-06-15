import { v4 } from 'uuid'
import { prisma } from '../lib/prisma'

interface BookProps {
  id?: string
  title: string
  sinopse: string
  author: string
  genre: string
  publicationYear: number
}

export class Book {
  public readonly id?: string
  public title: string
  public sinopse: string
  public author: string
  public genre: string
  public publicationYear: number

  constructor(props: BookProps) {
    this.id = props.id
    this.title = props.title
    this.sinopse = props.sinopse
    this.author = props.author
    this.genre = props.genre
    this.publicationYear = props.publicationYear

    if (!this.id) {
      this.id = v4()
    }
  }

  public async create() {
    const book = await prisma.book.create({
      data: {
        id: this.id,
        title: this.title,
        sinopse: this.sinopse,
        author: this.author,
        genre: this.genre,
        publicationYear: this.publicationYear
      }
    })

    return book
  }

  public async update(updateData: Omit<BookProps, 'id'>) {
    const book = await prisma.book.update({
      where: {
        id: this.id,
      },
      data: {
        title: updateData.title,
        sinopse: updateData.sinopse,
        author: updateData.author,
        genre: updateData.genre,
        publicationYear: updateData.publicationYear
      }
    })

    return book
  }

  public async remove() {
    await prisma.book.delete({
      where: {
        id: this.id,
      }
    })
  }
}