import { createWriteStream } from 'fs'
import ffmpeg from 'fluent-ffmpeg'
import { Telegraf } from 'telegraf'
import fetch from 'node-fetch'
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg'

ffmpeg.setFfmpegPath(ffmpegInstaller.path)

export async function downloadVoiceFile(workDir: string, fileId: string, bot: Telegraf) {
    const ogg = `${workDir}/${fileId}.ogg`
    const wav = `${workDir}/${fileId}.mp3`

    const fileLink = await bot.telegram.getFileLink(fileId)

    const writestream = createWriteStream(ogg)
    const response = await fetch(fileLink.toString())

    await new Promise(async (resolve, reject) => {
        response.body.pipe(writestream)
        writestream.on('finish', resolve)
        writestream.on('error', reject)
    })

    await new Promise((resolve, reject) => {
        ffmpeg(ogg)
            .format('mp3')
            .on('error', (err) => reject(err))
            .on('end', () => {
                console.log('Conversion finished!')
                resolve(void 0)
            })
            .save(wav)
    })

    return wav
}