import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { authenticate } from "../plugins/authenticate";

export async function transactionsRoutes(fastify: FastifyInstance) {
    fastify.get(
        "/transactions/all",
        {
            onRequest: [authenticate],
        },
        async (request, reply) => {
            const allTransactions = await prisma.transactions.findMany();

            return reply.status(201).send(allTransactions);
        }
    );

    fastify.post(
        "/transactions/cash-out/:userName/:receiverName",
        {
            onRequest: [authenticate],
        },
        async (request, reply) => {
            const getTransactionsParams = z.object({
                userName: z.string(),
                receiverName: z.string(),
            });

            const getTransactionsBody = z.object({
                value: z.number(),
            });

            const { userName, receiverName } = getTransactionsParams.parse(
                request.params
            );
            const { value } = getTransactionsBody.parse(request.body);

            if (userName === receiverName) {
                return reply.status(400).send({
                    message: "Impossível realizar transferências para a própria conta",
                });
            }

            if (value <= 0) {
                return reply.status(400).send({
                    message: "Valor informado é invalido",
                });
            }

            const findUser = await prisma.users.findUnique({
                where: {
                    username: userName,
                },
            });

            let debitedAccountId = "";

            if (findUser) {
                debitedAccountId = findUser.accountId;
            }

            if (!findUser) {
                return reply.status(400).send({
                    message: "Conta credora não encontrada",
                });
            }

            const findReceiver = await prisma.users.findUnique({
                where: {
                    username: receiverName,
                },
            });

            let creditedAccountId = "";

            if (findReceiver) {
                creditedAccountId = findReceiver.accountId;
            }

            if (!findReceiver) {
                return reply.status(400).send({
                    message: "Conta a debitar não encontrada",
                });
            }

            const findUserAccount = await prisma.accounts.findUnique({
                where: {
                    id: debitedAccountId,
                },
            });

            let userBalance = 0;

            if (findUserAccount) {
                userBalance = findUserAccount.balance;
            }

            if (userBalance && userBalance < value) {
                return reply.status(400).send({
                    message: "Valor excede saldo disponivel em conta",
                });
            }

            const findReceiverAccount = await prisma.accounts.findUnique({
                where: {
                    id: creditedAccountId,
                },
            });

            let receiverBalance = 0;

            if (findReceiverAccount) {
                receiverBalance = findReceiverAccount.balance;
            }

            if (userBalance && userBalance < value) {
                return reply.status(400).send({
                    message: "Valor excede saldo disponivel em conta",
                });
            }

            await prisma.accounts.update({
                where: {
                    id: debitedAccountId,
                },
                data: {
                    balance: userBalance - value,
                },
            });

            await prisma.accounts.update({
                where: {
                    id: creditedAccountId,
                },
                data: {
                    balance: receiverBalance + value,
                },
            });

            await prisma.transactions.create({
                data: {
                    value,
                    debitedAccountId,
                    creditedAccountId,
                },
            });

            return reply
                .status(201)
                .send(
                    `Os ${(value / 100).toFixed(
                        2
                    )} reais foram enviados para ${receiverName} com sucesso`
                );
        }
    );

    interface SortOrder {
        order: string;
    }

    fastify.get(
        "/transactions/cash-out/:userAccountId",
        {
            onRequest: [authenticate],
        },
        async (request, reply) => {
            const getTransactionsParams = z.object({
                userAccountId: z.string(),
            });

            const { userAccountId } = getTransactionsParams.parse(request.params);

            const findTransfers = await prisma.transactions.findMany({
                where: {
                    debitedAccountId: userAccountId, 
                },                
                orderBy: {
                    createdAt: "desc",
                },
                include:{
                    creditedAccount :{
                        select: {
                            users: {
                                select: {
                                    username: true
                                }
                            }
                        }
                    }
                }
            });

            return reply.status(201).send(findTransfers);
        }
    );

    fastify.get(
        "/transactions/cash-in/:userAccountId",
        {
            onRequest: [authenticate],
        },
        async (request, reply) => {
            const getTransactionsParams = z.object({
                userAccountId: z.string(),
            });

            const { userAccountId } = getTransactionsParams.parse(request.params);

            const findTransfers = await prisma.transactions.findMany({
                where: {
                    creditedAccountId: userAccountId,
                },
                orderBy: {
                    createdAt: "desc",
                },
                include:{
                    debitedAccount :{
                        select: {
                            username:true
                        }
                    }
                }
            });

            return reply.status(201).send(findTransfers);
        }
    );
}
