import { createReadStream } from 'fs'
import { tmpdir } from 'os'
import { respondToMessage } from '../../shared/respond'
import { BotMessageHandler } from '../../types'
import { downloadVoiceFile } from '../../../speech/downloadV'
import { whisper } from '../../../speech/whisper'

export default <BotMessageHandler<['voice']>>{
    type: ['voice'],
    handler: async (bot, ctx) => {
        const { file_id } = ctx.message.voice

        const filename = await downloadVoiceFile(tmpdir(), file_id, bot.bot)

        const text = await whisper(createReadStream(filename) as any as File)

        return respondToMessage(bot, text, ctx)
    }
}
