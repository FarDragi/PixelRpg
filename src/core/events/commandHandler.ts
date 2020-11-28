import customPrefix from '@bot/functions/customPrefix'
import { IBot } from '@bot/models/bot'
import { ICommandsInvoke } from '@bot/models/commandInvoke'
import { CommandBase } from '@bot/models/commands'
import { Context } from '@bot/models/context'
import { GuildConfig } from '@prisma/client'
import { Message } from 'discord.js'
import { env } from 'process'
import { registerPlayer } from 'src/database/functions/register'

export async function commandHandler (message: Message, commands: ICommandsInvoke, bot: IBot): Promise<void> {
    let guildConfig: GuildConfig | undefined

    if (message.guild && !message.author.bot) {
        guildConfig = (await registerPlayer(message.guild.id, message.author.id)).guild.config
    }

    const length = customPrefix(message, guildConfig ? guildConfig.prefix : env.BOT_PREFIX as string)

    if (length < 0) {
        return
    }

    const args = message.content.slice(length).trim().split(/ +/)

    const commandName = args.shift()?.toLowerCase()

    if (!commandName) {
        return
    }

    const invoke = commands[commandName]

    if (!invoke) {
        return
    }

    const context = {
        message: message,
        args: args,
        clientBot: bot.client,
        client: bot.client.user,
        memberClient: message.guild?.members.cache.get(bot.client.user?.id as string),
        bot: bot,
        author: message.author,
        memberAuthor: message.member,
        channel: message.channel,
        guild: message.guild,
        guildConfig: guildConfig
    } as Context

    const command = new invoke.ClassDefinition(context) as CommandBase

    if (!await command.validAuthorAndChannel()) {
        return
    }

    if (!await command.validPermission()) {
        return
    }

    await command.execCommand()
}
