export default class OpenWeatherService {
    private apiKey: string;
    private baseUrl: string;

    constructor(apiKey: string) {
        this.apiKey = apiKey;
        this.baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
    }

    async getWeatherByCity(city: string): Promise<any> {
        try {
            const url = `${this.baseUrl}?q=${city}&appid=${this.apiKey}&units=metric`;
            console.log(`[OpenWeatherService] Fetching: ${url}`);
            const response = await fetch(url);
            console.log(`[OpenWeatherService] Response status: ${response.status}`);
            if (!response.ok) {
                const errorText = await response.text();
                console.error(`[OpenWeatherService] Error response: ${errorText}`);
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;
        } catch (error: any) {
            console.error(`[OpenWeatherService] Failed to fetch weather data: ${error.message}`);
            throw new Error(`Failed to fetch weather data: ${error.message}`);
        }
    }

    async getWeatherByCoords(lat: string, lon: string): Promise<any> {
        try {
            const url = `${this.baseUrl}?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`;
            console.log(`[OpenWeatherService] Fetching by coords: ${url}`);
            const response = await fetch(url);
            console.log(`[OpenWeatherService] Response status: ${response.status}`);
            if (!response.ok) {
                const errorText = await response.text();
                console.error(`[OpenWeatherService] Error response: ${errorText}`);
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;
        } catch (error: any) {
            console.error(`[OpenWeatherService] Failed to fetch weather data by coords: ${error.message}`);
            throw new Error(`Failed to fetch weather data: ${error.message}`);
        }
    }
}