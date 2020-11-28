import { PrismaClient } from '@prisma/client'

class Database {
    prisma: PrismaClient

    constructor () {
        this.prisma = new PrismaClient()
    }
}

const prisma = new Database()

export default prisma
