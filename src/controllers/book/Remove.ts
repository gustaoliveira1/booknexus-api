import { FastifyRequest } from 'fastify'
import { z } from 'zod'
import { prisma } from '../../lib/prisma'
import { Book } from '../../models/Book'

export class RemoveBookController {
  constructor(
    private request: FastifyRequest
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

    await book.remove()
  }
}