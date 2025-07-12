
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// Ensure the API key is available from environment variables
if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getDevJoke(): Promise<string> {
    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: "gemini-2.5-flash-preview-04-17",
            contents: "Tell me a short, clever, SFW joke for software developers.",
            config: {
                temperature: 0.7,
                topK: 40,
                topP: 0.95,
            }
        });

        const text = response.text;
        
        if (!text) {
            throw new Error("No text returned from Gemini API");
        }

        return text.trim();
    } catch (error) {
        console.error("Error fetching dev joke from Gemini:", error);
        throw new Error("Failed to fetch joke from Gemini API.");
    }
}
