import { z } from 'zod'
import { FastifyRequest } from 'fastify'
import { Book } from '../../models/Book'

export class CreateBookController {
  constructor(
    private request: FastifyRequest,
  ) { }

  public async handle() {
    const bodySchema = z.object({
      title: z.string(),
      sinopse: z.string(),
      author: z.string(),
      genre: z.string(),
      publicationYear: z.number(),
    })

    const { title, sinopse, author, genre, publicationYear } = bodySchema.parse(this.request.body)

    const book = new Book({
      title: title,
      sinopse: sinopse,
      author: author,
      genre: genre,
      publicationYear: publicationYear,
    })

    const createdBook = await book.create()

    return createdBook
  }
}