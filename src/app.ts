import fastify from 'fastify'
import { bookRoutes } from './routes/books'

export const app = fastify()

app.register(bookRoutes)