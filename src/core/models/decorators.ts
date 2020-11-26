import { ICommandInfo } from './commands'

export function Command (name: string, info?: ICommandInfo) {
    return (target: any) => {
        Reflect.defineMetadata('command:name', name, target)

        if (!info) {
            info = {
                description: '',
                subcommands: false,
                module: 'default'
            }
        }
        Reflect.defineMetadata('command:info', info, target)
    }
}
