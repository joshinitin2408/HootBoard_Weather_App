import { Row, Col } from 'react-bootstrap';
import React, { useState, useEffect } from "react"; // Import React and the hooks
import { useLocation } from 'react-router-dom';
import {
    WiDaySunny,
    WiCloud,
    WiCloudy,
    WiRain,
    WiSnow,
    WiThunderstorm,
    WiFog,
    WiDayHaze,
    WiWindy,
    WiCloudRefresh,
    WiRefresh,
} from 'react-icons/wi';
import './Dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const WeatherInfo = () => {

    const location = useLocation();
    const [weatherData, setWeatherData] = useState([]);
    console.log(JSON.stringify(weatherData))

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const latitude = searchParams.get('Latitude');
        const longitude = searchParams.get('Longitude');
        const city = searchParams.get('city');
        if (latitude && longitude) {
            fetchWeatherDataByLocation(latitude, longitude);
        } else if (city) {
            fetchWeatherDataByCity(city);
        }
    }, [location.search]);

    const fetchWeatherDataByLocation = (latitude, longitude) => {
        const apiKey = "363422ec69179a7b6bb3063f82c7634b";
        fetch(process.env.REACT_APP_WEATHER_LALO_API + "weather?lat=" + latitude + "&lon=" + longitude + "&units=metric&appid=" + apiKey)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Request failed with status: " + response.status);
                }
                return response.json();
            })
            .then((jsonData) => {
                setWeatherData([jsonData]);
            })
            .catch((error) => {
                console.log("Error fetching data:", error);
            });
    };
    const fetchWeatherDataByCity = (city) => {
        const apiKey = "363422ec69179a7b6bb3063f82c7634b";

        fetch(process.env.REACT_APP_WEATHER_LALO_API + "weather?q=" + city + "&units=metric&appid=" + apiKey)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Request failed with status: " + response.status);
                }
                return response.json();
            })
            .then((jsonData) => {
                setWeatherData([jsonData]);
            })
            .catch((error) => {
                console.log("Error fetching data:", error);
            });
    };

    const weatherIcons = {
        Error: <WiRefresh size={64} color="#ffaa00" />,
        sunny: <WiDaySunny size={64} color="#ffaa00" />,
        clearsky: <WiDaySunny size={64} color="#ffaa00" />,
        scatteredCloud: <WiDayHaze size={64} color="#aaaaaa" />,
        brokenclouds: <WiCloudRefresh size={64} color="#aaaaaa" />,
        overcastClouds: <WiCloudy size={64} color="#888888" />,
        cloudy: <WiCloudy size={64} color="#888888" />,
        cloud: <WiCloud size={64} color="#888888" />,
        rain: <WiRain size={64} color="#6666cc" />,
        snow: <WiSnow size={64} color="#66aaff" />,
        thunderstorm: <WiThunderstorm size={64} color="#aa66cc" />,
        fog: <WiFog size={64} color="#777777" />,
        haze: <WiDayHaze size={64} color="#999999" />,
        windy: <WiWindy size={64} color="#777777" />,
        dust: <WiFog size={64} color="#777777" />,

    };
    const weatherCondition = Object.keys(weatherIcons).find(key => {
        const lowercaseKey = key.toLowerCase();
        const lowercaseDescription = weatherData[0]?.weather[0]?.description?.toLowerCase().split(" ").join("");
        console.log("Lowercase Key:", lowercaseKey);
        console.log("Lowercase Description:", lowercaseDescription);
        return weatherData.length > 0 && lowercaseDescription.includes(lowercaseKey);
    });

    return (
        <div className="dashboard-container">
            <Row>
                {
                    weatherData.length === 0 ? (
                        <Col>
                            <div className="dashboard-box">
                                <h4 className="app-title">
                                    <i className="bi bi-arrow-left-short" onClick={() => { window.location.href = "/" }}></i> Weather App
                                </h4>
                                <hr className="app-divider" />
                                <Row className="weather-icon">{weatherIcons["Error"]}</Row>
                                <p style={{ 'fontWeight': 'bold' }}>Please Go back and Enter correct details</p>
                                <p className="location"><i class="bi bi-geo-alt"></i> Not Found</p>
                                <hr className="app-divider" />
                                <Row className="max-temp-humidity">
                                    <Col className='subrow vertical-line'>
                                        <Row><p className="max-temp"><i class="bi bi-thermometer-sun"></i> Not Found</p></Row>
                                        <Row><span>MaxTemp</span></Row>
                                    </Col>
                                    <Col className='subrow'>
                                        <Row><p className="max-temp"><i className="bi bi-droplet"></i> Not Found</p></Row>
                                        <Row><span>Humidity</span></Row>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    ) : (weatherData.map((data, index) => (
                        <Col>
                            <div className="dashboard-box">
                                <h4 className="app-title"><i class="bi bi-arrow-left-short" onClick={() => { window.location.href = "/" }}></i> Weather App</h4>
                                <hr className="app-divider" />
                                <Row className="weather-icon">{weatherIcons[weatherCondition]}</Row>
                                <p className="temperature">{data?.main?.temp}°C</p>
                                <p className="weather-condition">{data?.weather[0]?.description}</p>
                                <p className="location"><i class="bi bi-geo-alt"></i> {data?.name}, {data?.sys?.country}</p>
                                <hr className="app-divider" />
                                <Row className="max-temp-humidity">
                                    <Col className='subrow vertical-line'>
                                        <Row><p className="max-temp"><i class="bi bi-thermometer-sun"></i> {data?.main?.temp_max}°C</p></Row>
                                        <Row><span>MaxTemp</span></Row>
                                    </Col>
                                    <Col className='subrow'>
                                        <Row><p className="max-temp"><i className="bi bi-droplet"></i> {data?.main?.humidity}%</p></Row>
                                        <Row><span>Humidity</span></Row>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    )))}
            </Row>
        </div>
    );
}

export default WeatherInfo;
