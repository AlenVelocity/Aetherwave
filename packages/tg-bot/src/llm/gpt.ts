import { OpenAIApi } from "../lib/openai";
import { ChatCompletionMessageParam } from "openai/resources/chat";

export const getReply = async (messages: ChatCompletionMessageParam[]) => {
    const response = await OpenAIApi.chat.completions.create({
        messages,
        model: 'gpt-3.5-turbo'
    })

    return response.choices[0].message.content
}