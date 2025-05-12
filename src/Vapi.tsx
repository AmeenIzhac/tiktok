import Vapi from "@vapi-ai/web";

const vapi = new Vapi(import.meta.env.VITE_VAPI_API_KEY);

export const startPodcast = async () => {
    return await vapi.start(import.meta.env.VITE_ASSISTANT_ID);
}

export const stopPodcast = async () => {
    try {
        await vapi.stop();
        return true;
    } catch (error) {
        console.error('Error stopping podcast:', error);
        return false;
    }
}