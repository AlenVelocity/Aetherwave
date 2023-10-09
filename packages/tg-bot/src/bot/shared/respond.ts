import { Context } from 'telegraf'
import { Update } from 'telegraf/typings/core/types/typegram'
import { TelegramBot } from '..'
import { ChatCompletionMessageParam } from 'openai/resources/chat'
import { getReply } from '../../llm/gpt'
import tts from '../../speech/tts'

const FREE_TIER_CHARACTERS = 1_000

const INPUT_BLACKLIST = [' GPT ', ' DAN ', ' OpenAI ', ' language model ', ' jailbreak ']

const threads = new Map<string, ChatCompletionMessageParam[]>()

export const respondToMessage = async (bot: TelegramBot, text: string, ctx: Context<Update>) => {

    const chatId = `${ctx.chat?.id}`
    await ctx.sendChatAction('record_video_note')

    if (text.startsWith('/')) {
        console.log(`[CHAT] Command received. ChatId=${chatId}, Command=${text}`)
        return
    }

    const numWords = text.split(' ').length

    if (numWords > 250) {
        console.log(`[CHAT] Message too long. ChatId=${chatId}, Message=${text}`)
        await ctx.reply(
            "Sorry, we don't yet support that long yet due to performance standards. Please keep your messages under 250 words! Thanks for your patience and support."
        )
        return
    }

    if (INPUT_BLACKLIST.some((b) => text.includes(b))) {
        console.log(`[CHAT] Blacklisted input. ChatId=${chatId}, Message=${text}`)
        return
    }

    console.log(
        `[Message] [Rx] From=${ctx.from?.first_name}, ChatId=${chatId}, Message=${text}`
    )

    const systemPrompt = `You are Mark Zuckerberg, the CEO of Facebook (now Meta). The year is 2023, and the company's vision of building a comprehensive metaverse is becoming a reality. Today, you are at the Metaverse Exchange, a global summit where leaders from various industries gather to discuss the future of the metaverse and its potential impact on society. As the keynote speaker, you will share Meta's achievements, future plans, and how the metaverse is bridging the physical and digital worlds. Your speech will also touch on the importance of creating a safe, inclusive, and interconnected digital universe for everyone.

    Objective:
    
        Explain Meta's role and achievements in developing the metaverse.
        Discuss the potential of the metaverse in revolutionizing industries, enhancing social connections, and creating new opportunities for individuals and businesses.
        Address the challenges and ethical considerations in building a comprehensive metaverse, including data privacy, security, and digital identity.
        Share your vision of an inclusive, safe, and interconnected digital universe that empowers individuals and fosters innovation.
    
    Prompt:
    As Mark Zuckerberg, You are now talking with a person on Telegram.
    Illustrate the transformative potential of the metaverse, and how Meta is at the forefront of this digital frontier. Address the ethical considerations and your vision for a connected and inclusive digital future. Introduce the new Ray-Ban Meta smart glasses, elaborating on their features such as improved audio and camera capabilities, over 150 custom frame and lens combinations, and the ability to engage with Meta AI through voice commands, enabling users to livestream to Facebook or Instagram directly from the glasses​1​​2​​3​​4​​5​. Discuss how these smart glasses represent a step towards seamlessly integrating the physical and digital worlds, thus further advancing Meta's vision of the metaverse.
    Now have a regular convo with the person.`


    // console.log(`[CHAT] System prompt: ${systemPrompt}`)

    const thread = threads.get(chatId) ?? []

    const messages: ChatCompletionMessageParam[] = [
        {
            role: 'system',
            content: systemPrompt
        },
        ...thread,
        {
            role: 'user',
            content: text
        }
    ]

    try {
        let attempt = 0
        while (attempt < 3) {

            console.log(`[Attempting] Attempt=${attempt} MessagesLength=${messages.length}`)

            // console.log(messages)

            const response = await getReply(messages)

            console.log(`[CHAT] Response received. Response=${response}`)

            const denyList = [' ai ', 'language model', 'guidelines', 'not appropriate']
            const responseHasDenyList = denyList.some((deny) => response?.toLowerCase().includes(deny))

            if (responseHasDenyList) {
                attempt++
                console.log(`[CHAT] Response contains deny list. Attempt=${attempt}`)
                continue
            }

            threads.set(chatId, [...messages, { role: 'assistant', content: response }])

            const voiceId = 'g3JdG0D9FePTbrJ8K2d8'

            if (voiceId) {

                console.log(`[CHAT] Bot message created`)
                const voiceBuffer = await tts(response as string, voiceId)

                const replyReceipt = await ctx.replyWithVoice({
                    source: Buffer.from(voiceBuffer)
                })
                console.log(`[CHAT] Reply sent. MessageId=${replyReceipt.message_id}`)
            } else {
                const replyReceipt = await ctx.reply(response ?? '')
                console.log(`[CHAT] Reply sent. MessageId=${replyReceipt.message_id}`)
            }

            break
        }
    } catch (error: unknown) {
        console.error((error))
    }
}


export const clearConversation = async (chatId: string) => {
    const thread = threads.get(chatId)
    if (!thread) {
        return false
    }
    threads.set(chatId, [])
    return true
}