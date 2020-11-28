import { Message } from 'discord.js'

export default function customPrefix (message: Message, prefix: string) {
    if (message.content.startsWith(prefix)) {
        return prefix.length
    } else {
        return -1
    }
}
