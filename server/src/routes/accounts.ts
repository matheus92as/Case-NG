import { FastifyInstance } from "fastify"
import { prisma } from "../lib/prisma"
import { authenticate } from "../plugins/authenticate";

export async function accountsRoutes(fastify: FastifyInstance){
    fastify.get("/accounts/all", {
        onRequest: [authenticate],
    },async (request, reply) => {
        const allAccounts = await prisma.accounts.findMany();
    
        return reply.status(201).send(allAccounts);
    });
}