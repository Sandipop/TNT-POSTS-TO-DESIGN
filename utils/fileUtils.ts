
export const convertImageSrcToBuffer = async (src: string): Promise<{ buffer: string; mimeType: string }> => {
    const response = await fetch(src);
    const blob = await response.blob();
    const mimeType = blob.type;

    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (typeof reader.result !== 'string') {
                return reject(new Error("FileReader result is not a string"));
            }
            const base64String = reader.result.split(',')[1];
            resolve({ buffer: base64String, mimeType });
        };
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(blob);
    });
};
