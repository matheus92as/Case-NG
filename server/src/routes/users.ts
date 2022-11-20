import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { authenticate } from "../plugins/authenticate";
import { compare, hash } from "../services/hashManager";

export async function usersRoutes(fastify: FastifyInstance) {

  fastify.post("/users", async (request, reply) => {
    const createUserBody = z.object({
      username: z.string(),
      password: z.string(),
    });

    const { username, password } = createUserBody.parse(request.body);

    if (username.length < 3) {
      return reply.status(400).send({
        message: "Nome do usuário deve conter 3 caractéres ou mais",
      });
    }

    let regexPassword = /^(?=.*\d)(?=.*[A-Z])(?:([0-9A-Z])){8,}$/;
    const verifyPassword = regexPassword.test(password)

    if(verifyPassword === false){
      return reply.status(400).send({
        message:
          "Senha deve conter 8 caractéres ou mais, contendo números e ao menos uma letra maiúscula",
      });
    }

    const hashedPassword = await hash(password);

    const findUser = await prisma.users.findUnique({
      where: {
        username: username,
      },
    });

    if (findUser) {
      return reply.status(400).send({
        message: "Usuário já cadastrado",
      });
    }

    await prisma.users.create({
      data: {
        username,
        password: hashedPassword,
        account: {
          create: {},
        },
      },
    });

    const token = fastify.jwt.sign(
      {
        username: username,
        password: hashedPassword,
      },
      {
        expiresIn: "24 hours",
      }
    );

    return reply.status(201).send(token);
  });


  
  fastify.post("/users/login", async (request, reply) => {
    const createUserBody = z.object({
      username: z.string(),
      password: z.string(),
    });

    const { username, password } = createUserBody.parse(request.body);

    const findUser = await prisma.users.findUnique({
      where: {
        username: username,
      },
    });

    if (!findUser) {
      return reply.status(400).send({
        message: "Usuário não encontrado",
      });
    }

    let dbPassword = "";
    let userAccountId = "";

    if (findUser) {
      dbPassword = findUser.password;
      userAccountId = findUser.accountId;
    }

    const hashCompare = await compare(password, dbPassword);
    const hashedPassword = await hash(password);

    if (!hashCompare) {
      return reply.status(400).send({
        message: "Senha inválida",
      });
    }

    const token = fastify.jwt.sign(
      {
        username: username,
        userAccountId: userAccountId,
      },
      {
        expiresIn: "24 hours",
      }
    );

    return reply.status(201).send(token);
  });
}
