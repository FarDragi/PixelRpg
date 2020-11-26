import { CommandBase } from '@bot/models/commands'
import { Command } from '@bot/models/decorators'

@Command('ping')
export default class Ping extends CommandBase {
    async execCommand (): Promise<void> {
        this.ctx.channel.send(this.ctx.clientBot.ws.ping)
    }
}
