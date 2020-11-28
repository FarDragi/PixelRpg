import { PixelRpg } from '@bot'
import { config } from 'dotenv'
import { env } from 'process'
import 'reflect-metadata'
import prisma from './database'

config()

init().catch(error => {
    console.error(error)
}).finally(() => {
    prisma.$disconnect()
})

async function init () {
    const pixelRpg = new PixelRpg()
    const register = pixelRpg.registerCommands()
    pixelRpg.token = env.BOT_TOKEN as string
    await register
    pixelRpg.start()
}
