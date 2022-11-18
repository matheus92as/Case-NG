import Fastify from "fastify";
import dotenv from 'dotenv'
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import { usersRoutes } from "./routes/users";
import { accountsRoutes } from "./routes/accounts";
import { transactionsRoutes } from "./routes/transactions";
import { authRoutes } from "./routes/auth";

dotenv.config();

async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  });

  await fastify.register(cors, {
    origin: true,
  });

  await fastify.register(jwt, {
    secret: process.env.SECRET_KEY as string,
  });

  await fastify.register(accountsRoutes);
  await fastify.register(authRoutes);
  await fastify.register(transactionsRoutes);
  await fastify.register(usersRoutes);

  await fastify.listen({ port: 3333 });
}

bootstrap();
