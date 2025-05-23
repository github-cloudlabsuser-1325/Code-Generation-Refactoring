import { Router } from 'express';
import WeatherController from '../controllers/weatherController';
import OpenWeatherService from '../services/openWeatherService';

const router = Router();
const openWeatherService = new OpenWeatherService(process.env.API_KEY || '');
const weatherController = new WeatherController(openWeatherService);

router.get('/:city', weatherController.fetchWeather);

export default router;