import { Telegraf } from 'telegraf'
import { message } from 'telegraf/filters'
import { BotActionHandler, BotCommand, BotMessageHandler, BotOnHandler, DistinctKeys } from './types'
import { Message, Update } from 'telegraf/typings/core/types/typegram'
import { UpdateType } from 'telegraf/typings/telegram-types'
import chat from './messages/chat'
import voice from './messages/voice'
import clear from './commands/clear'
import start from './commands/start'
import { Guard } from 'telegraf/typings/util'


export class TelegramBot {
    private readonly _bot: Telegraf

    constructor(private token: string) {
        this._bot = new Telegraf(token)

    }

    public get bot() {
        return this._bot
    }


    private _applyMessageHandler = <Ts extends DistinctKeys<Message>[]>(pkg: BotMessageHandler<Ts>) => {
        console.log(`[INIT] Applying message handler: ${pkg.type}`)
        this._bot.on(message(...pkg.type), async (ctx) => pkg.handler(this, ctx).catch(console.error))
    }

    private _applyGeneralOnHandler = <T extends UpdateType | Guard<Update>>(pkg: BotOnHandler<T>) => {
        console.log(`[INIT] Applying 'on' handler: ${pkg.type}`)
        this._bot.on(pkg.type, async (ctx) => pkg.handler(this, ctx).catch(console.error))
    }

    private _applyActionHandler = (pkg: BotActionHandler) => {
        console.log(`[INIT] Applying action ${pkg.type}`)
        this._bot.action(pkg.type, async (ctx) => pkg.handler(this, ctx).catch(console.error))
    }

    private readonly _commands: BotCommand[] = []

    private _applyCommandHandler = (pkg: BotCommand) => {
        console.log(`[INIT] Applying command ${pkg.name}`)
        this._bot.command(pkg.name, async (ctx) => pkg.handler(this, ctx).catch(console.error))

        if (pkg.name !== 'start') {
            this._commands.push(pkg)
            this._bot.telegram.setMyCommands(
                this._commands.map((cmd) => ({
                    command: cmd.name,
                    description: cmd.description
                }))
            )
        }
    }

    public async start() {
        console.log(`[INIT] Starting bot`)
        this._bot.launch()
        console.log(`[INIT] Bot started`)

        // await this._bot.telegram.getUpdates(10_000, 1, 1, [])

        this.bot.use(async (ctx, next) => {
            const thirtySecondsAgo = Date.now() / 1000 - 30
            // ignore updates from more than 30 seconds ago
            if (ctx.update.update_id < thirtySecondsAgo) {
                next()
                return
            }
        })

        this._applyCommandHandler(start)
        this._applyCommandHandler(clear)

        this._applyMessageHandler(chat)
        this._applyMessageHandler(voice)

        process.once('SIGINT', () => this._bot.stop('SIGINT'))
        process.once('SIGTERM', () => this._bot.stop('SIGTERM'))
    }
}
