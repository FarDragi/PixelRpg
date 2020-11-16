import { config } from 'dotenv'
import 'reflect-metadata'

config()

init().catch(error => {
    console.error(error)
})

async function init () {
}
