'use server:'

import OpenAI from "openai";

export const getResponse = async (message) => {

    const client = new OpenAI({ apiKey: import.meta.env.VITE_OPENAI_API_KEY, dangerouslyAllowBrowser:true });
    const res = await client.responses.create({
        model: "gpt-5-nano",
        input: message
    })
    return res.output_text
} 