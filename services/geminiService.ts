import { GoogleGenAI, Modality, GenerateContentResponse } from "@google/genai";
import { convertImageSrcToBuffer } from '../utils/fileUtils';

// Ensure API_KEY is available
if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates an initial image based on a LinkedIn post.
 * It first creates a descriptive prompt and then uses an image generation model.
 */
export const generateImageFromText = async (postText: string): Promise<string> => {
    try {
        const promptGeneratorResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Analyze the following LinkedIn post and generate a concise, visually descriptive prompt for an AI image generator. The prompt should capture the core message, tone, and key elements of the post. The style should be professional, photorealistic, and engaging for a LinkedIn audience. Post: "${postText}"`,
        });

        const imagePrompt = promptGeneratorResponse.text;

        const imageResponse = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: imagePrompt,
            config: {
                numberOfImages: 1,
                outputMimeType: 'image/jpeg',
                aspectRatio: '16:9',
            },
        });

        const base64ImageBytes = imageResponse.generatedImages[0].image.imageBytes;
        return `data:image/jpeg;base64,${base64ImageBytes}`;

    } catch (error) {
        console.error("Error generating image:", error);
        throw new Error("Failed to generate image. Please check the console for details.");
    }
};

/**
 * Edits an existing image using a text prompt.
 */
export const editImage = async (base64Image: string, editPrompt: string): Promise<{ imageUrl: string; text: string }> => {
    try {
        const { buffer, mimeType } = await convertImageSrcToBuffer(base64Image);

        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image-preview',
            contents: {
                parts: [
                    {
                        inlineData: {
                            data: buffer,
                            mimeType: mimeType,
                        },
                    },
                    { text: editPrompt },
                ],
            },
            config: {
                responseModalities: [Modality.IMAGE, Modality.TEXT],
            },
        });

        let newImageUrl = '';
        let newText = '';

        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                const base64ImageBytes: string = part.inlineData.data;
                newImageUrl = `data:${part.inlineData.mimeType};base64,${base64ImageBytes}`;
            } else if (part.text) {
                newText = part.text;
            }
        }

        if (!newImageUrl) {
            throw new Error("The AI did not return an edited image.");
        }

        return { imageUrl: newImageUrl, text: newText };
    } catch (error) {
        console.error("Error editing image:", error);
        throw new Error("Failed to edit image. Please check the console for details.");
    }
};

/**
 * Generates a video based on a LinkedIn post and an optional YouTube reference.
 */
export const generateVideo = async (postText: string, youtubeUrl?: string): Promise<string> => {
    try {
        const promptGeneratorResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Based on the following LinkedIn post, create a detailed prompt for an AI video generator. The prompt should describe a short, engaging, and professional 15-second video with a cinematic feel that visually represents the post's content. Describe scenes, visual style, and pacing.
            Post: "${postText}"
            ${youtubeUrl ? `Reference YouTube video for style and tone: ${youtubeUrl}` : ''}`
        });

        const videoPrompt = promptGeneratorResponse.text;

        // FIX: The type 'VideosOperationResponse' is not exported by @google/genai.
        // The type annotation has been removed to allow TypeScript to infer the correct type.
        let operation = await ai.models.generateVideos({
            model: 'veo-2.0-generate-001',
            prompt: videoPrompt,
            config: { numberOfVideos: 1 }
        });

        while (!operation.done) {
            await new Promise(resolve => setTimeout(resolve, 10000));
            operation = await ai.operations.getVideosOperation({ operation: operation });
        }

        const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
        if (!downloadLink) {
            throw new Error("Video generation completed, but no download link was provided.");
        }

        const videoResponse = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
        if (!videoResponse.ok) {
            throw new Error(`Failed to download video: ${videoResponse.statusText}`);
        }
        
        const videoBlob = await videoResponse.blob();
        return URL.createObjectURL(videoBlob);

    } catch (error) {
        console.error("Error generating video:", error);
        throw new Error("Failed to generate video. This can take several minutes. If it fails, please try again.");
    }
};