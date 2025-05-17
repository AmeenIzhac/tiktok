import Vapi from "@vapi-ai/web";

const vapi = new Vapi(import.meta.env.VITE_VAPI_API_KEY);

export const startPodcast = async () => {
    return await vapi.start(import.meta.env.VITE_ASSISTANT_ID);
}

vapi.on("transcription" as any, ({ isFinal, text }: any) => {
    console.log(`[${isFinal ? "Final" : "Partial"}]: ${text}`);
  });

vapi.on("event" as any, (data: any) => {
    console.log("Vapi event received:", data);
});

export const stopPodcast = async () => {
    try {
        await vapi.stop();
        return true;
    } catch (error) {
        console.error('Error stopping podcast:', error);
        return false;
    }
}