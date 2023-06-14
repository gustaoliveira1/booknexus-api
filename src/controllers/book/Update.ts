import { FastifyRequest } from 'fastify'
import { z } from 'zod'
import { prisma } from '../../lib/prisma'
import { Book } from '../../models/Book'

export class UpdateBookController {
  constructor(
    private request: FastifyRequest,
  ) { }

  public async handle() {
    const paramsSchema = z.object({
      id: z.string(),
    })

    const { id } = paramsSchema.parse(this.request.params)

    const bookData = await prisma.book.findFirstOrThrow({
      where: {
        id,
      }
    })

    const book = new Book(bookData)

    const bodySchema = z.object({
      title: z.string(),
      sinopse: z.string(),
      author: z.string(),
      genre: z.string(),
      publicationYear: z.number(),
    })

    const { title, sinopse, author, genre, publicationYear } = bodySchema.parse(this.request.body)

    const updateData = {
      title,
      sinopse,
      author,
      genre,
      publicationYear,
    }

    const updatedBook = await book.update(updateData)

    return updatedBook
  }
}