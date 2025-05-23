import { Request, Response } from 'express';
import OpenWeatherService from '../services/openWeatherService';

export default class WeatherController {
    private openWeatherService: OpenWeatherService;

    constructor(openWeatherService: OpenWeatherService) {
        this.openWeatherService = openWeatherService;
    }

    fetchWeather = async (req: Request, res: Response) => {
        const city = req.params.city;
        console.log(`[WeatherController] Received request for city: ${city}`);
        try {
            const weatherData = await this.openWeatherService.getWeatherByCity(city);
            console.log(`[WeatherController] Weather data for ${city}:`, weatherData);
             res.status(200).json(weatherData);
        } catch (error: any) {
            console.error(`[WeatherController] Error fetching weather for ${city}:`, error.message);
             res.status(500).json({ message: 'Error fetching weather data', error: error.message });
        }
    };
}