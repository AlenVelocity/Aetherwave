import { OpenAIApi } from '../lib/openai'

export const whisper = async (audio: File) => {
    const transcription = await OpenAIApi.audio.transcriptions.create({ 
        file: audio,
        model: 'whisper-1'
    })
    return transcription.text
}