import { Context, NarrowedContext } from 'telegraf'
import { message } from 'telegraf/filters'
import { Triggers } from 'telegraf/typings/composer'
import { FilteredContext } from 'telegraf/typings/context'
import { Message, Update } from 'telegraf/typings/core/types/typegram'
import { UnionKeys } from 'telegraf/typings/deunionize'
import { MountMap, UpdateType } from 'telegraf/typings/telegram-types'
import { TelegramBot } from '.'
import { Guard } from 'telegraf/typings/util'

export type DistinctKeys<T extends object> = Exclude<UnionKeys<T>, keyof T>
export type MessageFn<Ks extends DistinctKeys<Message>[]> = typeof message<Ks>

export type BotMessageHandler<Ts extends DistinctKeys<Message>[]> = {
    type: Ts
    handler: (bot: TelegramBot, ctx: FilteredContext<Context, ReturnType<MessageFn<Ts>>>) => Promise<void>
}

export type BotOnHandler<K extends UpdateType | Guard<Update>> = {
    type: K
    handler: (bot: TelegramBot, ctx: FilteredContext<Context, K>) => Promise<void>
}

export type BotCommand = {
    name: string
    description: string
    handler: (bot: TelegramBot, ctx: NarrowedContext<Context<Update>, MountMap['text']>) => Promise<void>
}

export type BotActionHandler = {
    type: Triggers<Context<Update>>
    handler: (
        bot: TelegramBot,
        ctx: NarrowedContext<Context<Update> & { match: RegExpExecArray }, MountMap['callback_query']>
    ) => Promise<void>
}
