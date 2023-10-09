import { TelegramBot } from './bot'

const main = async () => {
    const bot = new TelegramBot('6368835099:AAFPAfqLC-n8Y0AQGKHcsLzjxFb3n7E3n8c')

    await bot.start()
}

main().catch(console.error)