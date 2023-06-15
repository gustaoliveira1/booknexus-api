import { FastifyRequest } from 'fastify'
import { z } from 'zod'
import { prisma } from '../../lib/prisma'

export class GetBookController {
  constructor(
    private request: FastifyRequest,
  ) { }

  public async getAll() {
    return prisma.book.findMany({
      take: 20,
    })
  }

  public async findById() {
    const paramsSchema = z.object({
      id: z.string(),
    })

    const { id } = paramsSchema.parse(this.request.params)

    const book = await prisma.book.findFirstOrThrow({
      where: {
        id,
      }
    })

    return book
  }

  public async findByName() {
    const querySchema = z.object({
      title: z.string(),
    })

    const { title } = querySchema.parse(this.request.query)

    const book = await prisma.book.findMany({
      where: {
        title: {
          contains: title,
        }
      }
    })

    return book
  }
}