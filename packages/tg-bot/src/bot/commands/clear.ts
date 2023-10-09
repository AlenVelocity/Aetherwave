import { clearConversation } from '../shared/respond'
import { BotCommand } from '../types'

export default <BotCommand>{
    name: 'clear',
    description: 'Clears the current conversation',
    handler: async (bot, ctx) => {
        const chatId = ctx.chat?.id

        const result = await clearConversation(chatId.toString())
        if (!result) {
            await ctx.reply(`Nothing to clear!`)
        }

        await ctx.reply(`Done! Let's begin again.`)
    }
}
