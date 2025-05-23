import { Request, Response } from 'express';
import OpenWeatherService from '../services/openWeatherService';

export default class WeatherController {
    private openWeatherService: OpenWeatherService;

    constructor(openWeatherService: OpenWeatherService) {
        this.openWeatherService = openWeatherService;
    }

    fetchWeather = async (req: Request, res: Response) => {
        const city = req.params.city || req.query.city as string;
        const lat = req.query.lat as string;
        const lon = req.query.lon as string;
        console.log(`[WeatherController] Received request for city: ${city}, lat: ${lat}, lon: ${lon}`);
        try {
            let weatherData;
            if (lat && lon) {
                weatherData = await this.openWeatherService.getWeatherByCoords(lat, lon);
            } else if (city) {
                weatherData = await this.openWeatherService.getWeatherByCity(city);
            } else {
                res.status(400).json({ message: 'Please provide a city or latitude and longitude.' });
                return;
            }
            console.log(`[WeatherController] Weather data:`, weatherData);
            res.status(200).json(weatherData);
        } catch (error: any) {
            console.error(`[WeatherController] Error fetching weather:`, error.message);
            res.status(500).json({ message: 'Error fetching weather data', error: error.message });
        }
    };
}