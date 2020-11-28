import { env } from 'process'
import prisma from '..'

export async function registerPlayer (guildId: string, userId: string) {
    let player = await prisma.player.findFirst({
        where: {
            user: {
                discordId: userId
            },
            guild: {
                discordId: guildId
            }
        },
        include: {
            guild: {
                include: {
                    config: true
                }
            }
        }
    })

    if (!player) {
        player = await prisma.player.create({
            data: {
                guild: {
                    connectOrCreate: {
                        where: {
                            discordId: guildId
                        },
                        create: {
                            discordId: guildId,
                            config: {
                                create: {
                                    prefix: env.BOT_PREFIX as string
                                }
                            }
                        }
                    }
                },
                user: {
                    connectOrCreate: {
                        where: {
                            discordId: userId
                        },
                        create: {
                            discordId: userId
                        }
                    }
                }
            },
            include: {
                guild: {
                    include: {
                        config: true
                    }
                }
            }
        })
    }

    return player
}
