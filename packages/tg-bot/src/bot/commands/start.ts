import { BotCommand } from '../types'

export default <BotCommand>{
    name: 'start',
    description: 'Clears the current conversation',
    handler: async (bot, ctx) => {
        ctx.sendMessage(`👋 Hello there! I am the Mark Zuckerbreg Bot, your digital companion on Telegram brought to you by AetherWave! While I may not have the same sweater collection as the real Mark, I'm here to assist you and provide a glimpse into the whimsical world of tech, all with a sprinkle of Facebook magic. ✨`)
        ctx.sendPhoto('https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/47bbd57f-eb45-4038-ae64-8a18ff4b664c/width=832/c823d377-7840-4e94-831d-b1175c06d3ad.jpeg')
    }
}
