import pixelRpg from '@bot'
import { config } from 'dotenv'
import { env } from 'process'
import 'reflect-metadata'

config()

init().catch(error => {
    console.error(error)
})

async function init () {
    const register = pixelRpg.registerCommands()
    pixelRpg.token = env.BOT_TOKEN as string
    await register
    pixelRpg.start()
}
