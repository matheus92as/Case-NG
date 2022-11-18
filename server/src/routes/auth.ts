import { FastifyInstance } from "fastify";
import { authenticate } from "../plugins/authenticate";


export async function authRoutes(fastify: FastifyInstance) {

    fastify.get('/me', {
        onRequest: [authenticate] 
    }, async (request) => {
        return { user: request.user }
    })

    
}