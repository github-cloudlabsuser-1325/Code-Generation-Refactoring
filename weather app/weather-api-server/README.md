# Weather API Server

This project is an Express.js application that provides an API to fetch weather data from the Open Weather Map API.

## Project Structure

```
weather-api-server
├── src
│   ├── app.js               # Entry point of the application
│   ├── routes
│   │   └── weather.js       # Routes related to weather data
│   ├── controllers
│   │   └── weatherController.js # Controller for handling weather data requests
│   └── services
│       └── openWeatherService.js # Service for interacting with the Open Weather Map API
├── package.json              # NPM configuration file
└── README.md                 # Project documentation
```

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd weather-api-server
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Start the server:
   ```
   npm start
   ```

## API Usage

### Fetch Weather Data

- **Endpoint**: `/api/weather?city={cityName}`
- **Method**: GET
- **Query Parameters**:
  - `city`: The name of the city for which to fetch weather data.

### Example Request

```
GET /api/weather?city=London
```

### Example Response

```json
{
  "city": "London",
  "temperature": "15°C",
  "description": "Clear sky"
}
```

## License

This project is licensed under the MIT License.