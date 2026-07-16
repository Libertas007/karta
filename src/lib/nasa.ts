export interface ImageOfTheDay {
    date: string;
    explanation: string;
    hdurl: string;
    media_type: string;
    service_version: string;
    title: string;
    url: string;
}

export async function getImageOfTheDay(date?: string): Promise<ImageOfTheDay> {
    const apiKey = import.meta.env.VITE_NASA_API_KEY;
    const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}${date ? `&date=${date}` : ""}`;
    const response = await fetch(url);
    const data = await response.json();
    return data as ImageOfTheDay;
}
