import os
import requests
from dotenv import load_dotenv

def fetch_weather(city):
    api_key = os.getenv("OPENWEATHER_API_KEY")
    if not api_key:
        raise ValueError("OPENWEATHER_API_KEY not found in environment variables.")
    url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric"
    response = requests.get(url)
    if response.status_code != 200:
        raise Exception(f"Error fetching weather: {response.status_code} {response.text}")
    return response.json()

if __name__ == "__main__":
    load_dotenv()
    city = input("Enter city name: ")
    try:
        data = fetch_weather(city)
        print(f"Weather in {data['name']}: {data['weather'][0]['description'].capitalize()}, {data['main']['temp']}°C")
    except Exception as e:
        print("Error:", e)