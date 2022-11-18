import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const user1 = await prisma.users.create({
        data: {
            username: 'John Doe',
            password: '1234567J',
            
            account: {
                create: { }
            }
        }
    })

    const user2 = await prisma.users.create({
        data: {
            username: 'Jane Doe',
            password: '7654321J',
            
            account: {
                create: { }
            }
        }
    })

    const transaction = await prisma.transactions.create({
        data: {
            value: 2000,
            debitedAccountId: user1.accountId,
            creditedAccountId: user2.accountId
        }
    })
}

main ()