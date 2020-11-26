import { Context } from './context'

type types = 'Number' | 'String' | 'User'

export interface IUsage {
    name: string
    type: types
    description: string
    optional: boolean
    default?: string
}

export interface ICommandInfo {
    description: string
    module?: string
    subcommands?: boolean
    usages?: IUsage[]
}

export interface ICommand {
    validAuthorAndChannel(ctx: Context): Promise<boolean>
    validPermission(ctx: Context): Promise<boolean>
    execCommand(ctx: Context): Promise<void>
    visible(): boolean
}

export abstract class CommandBase implements ICommand {
    ctx: Context

    constructor (ctx: Context) {
        this.ctx = ctx
    }

    async validAuthorAndChannel (): Promise<boolean> {
        if (this.ctx.author.bot || !this.ctx.message.guild) {
            return false
        }

        return true
    }

    async validPermission (): Promise<boolean> {
        return true
    }

    abstract execCommand(): Promise<void>

    visible (): boolean {
        return true
    }
}
