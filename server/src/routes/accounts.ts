import { FastifyInstance } from "fastify"
import { z } from "zod";
import { prisma } from "../lib/prisma"
import { authenticate } from "../plugins/authenticate";

export async function accountsRoutes(fastify: FastifyInstance){
    fastify.get(
        "/accounts/balance/:accountId",
        {
          onRequest: [authenticate],
        },
        async (request, reply) => {
          const getUserAccountParams = z.object({
            accountId: z.string(),
          });
    
          const { accountId } = getUserAccountParams.parse(request.params);
    
          const findUser = await prisma.users.findUnique({
            where: {
              accountId: accountId,
            },
          });
    
          if (!findUser) {
            return reply.status(400).send({
              message: "Conta não encontrada",
            });
          }
    
          const findAccounts = await prisma.accounts.findUnique({
            select:{
                balance: true
            },
            where: {
              id: accountId,
            },
          });
    
          return reply.status(201).send(findAccounts);
        }
      );

       fastify.get(
    "/users/balance/user/:userName",
    {
      onRequest: [authenticate],
    },
    async (request, reply) => {
      const getUserAccountParams = z.object({
        userName: z.string(),
      });

      const { userName } = getUserAccountParams.parse(request.params);

      const findUser = await prisma.users.findUnique({
        where: {
          username: userName,
        },
      });

      if (!findUser) {
        return reply.status(400).send({
          message: "Conta não encontrada",
        });
      }

      const findAccounts = await prisma.accounts.findUnique({
        select:{
            balance: true
        },
        where: {
          id: findUser.accountId,
        },
      });

      return reply.status(201).send(findAccounts);
    }
  );

  fastify.get(
    "/accounts/balance/user/:userName",
    {
      onRequest: [authenticate],
    },
    async (request, reply) => {
      const getUserAccountParams = z.object({
        userName: z.string(),
      });

      const { userName } = getUserAccountParams.parse(request.params);

      const findUser = await prisma.users.findUnique({
        where: {
          username: userName,
        },
      });

      if (!findUser) {
        return reply.status(400).send({
          message: "Conta não encontrada",
        });
      }

      const findAccounts = await prisma.accounts.findUnique({
        select:{
            balance: true
        },
        where: {
          id: findUser.accountId,
        },
      });

      return reply.status(201).send(findAccounts);
    }
  );
}