import { respondToMessage } from '../../shared/respond'
import { BotMessageHandler } from '../../types'

export default <BotMessageHandler<['text']>>{
    type: ['text'],
    handler: async (bot, ctx) => respondToMessage(bot, ctx.message.text, ctx)
}
