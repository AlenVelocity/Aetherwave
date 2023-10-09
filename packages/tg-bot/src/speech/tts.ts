import { serializeError } from 'serialize-error'



export const elevenLabs = async (text: string, voiceId: string) => {
    const apiKey = process.env['ELEVEN_LABS_KEY'] || 'fbc3f9e5e84d9c11c9ed99ca441dd7fb'

    console.log(`[ElevenLabs] TTS: ${text}, ApiKey=${apiKey}`)

    const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
        method: 'POST',
        body: JSON.stringify({
            text: text,
            model_id: 'eleven_multilingual_v2'
        }),
        headers: {
            accept: 'audio/mpeg',
            'xi-api-key': apiKey,
            'Content-Type': 'application/json'
        }
    })

    console.log(`[ElevenLabs] [${res.status}] ${res.statusText}`)

    if (res.status !== 200) {
        try {
            const data = await res.json()
            console.log(data)
        } catch (err: unknown) {
            console.error(serializeError(err))
        }
    }

    return res.arrayBuffer()
}

const tts = elevenLabs

export default tts

