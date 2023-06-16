import { FastifyInstance } from 'fastify'
import { CreateBookController } from '../controllers/book/Create'
import { UpdateBookController } from '../controllers/book/Update'
import { GetBookController } from '../controllers/book/Get'
import { RemoveBookController } from '../controllers/book/Remove'
import { z } from 'zod'

export const bookRoutes = async (app: FastifyInstance) => {
  app.get('/books', async (request, response) => {
    const getBookController = new GetBookController(request)

    const querySchema = z.object({
      title: z.string().optional(),
    })

    const { title } = querySchema.parse(request.query)

    const books = title
      ? await getBookController.findByName()
      : await getBookController.getAll()

    if (books.length == 0) {
      return response.status(404).send({ message: 'Error: Could not find books that match' })
    }

    return books
  })

  app.get('/books/:id', async (request, response) => {
    const getBookController = new GetBookController(request)
    const book = await getBookController.findById()

    if (!book) {
      return response.status(404).send({ message: 'Error: Could not find books that match' })
    }

    return book
  })

  app.post('/books', async (request) => {
    const createBookController = new CreateBookController(request)
    const book = await createBookController.handle()

    return book
  })

  app.put('/books/:id', async (request) => {
    const updateBookController = new UpdateBookController(request)
    const book = await updateBookController.handle()

    return book
  })

  app.delete('/books/:id', async (request, response) => {
    const removeBookController = new RemoveBookController(request)
    await removeBookController.handle()

    return response.status(204)
  })
}