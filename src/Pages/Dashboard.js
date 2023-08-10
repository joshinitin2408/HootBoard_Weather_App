import React, { useState } from 'react';
import { Row, Col, FormControl, Button } from 'react-bootstrap';
import './Dashboard.css'; // Import the CSS file

function Dashboard() {
    
    const [city, setCity] = useState('');

    const handleGetLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    window.location.href = "/weatherinfo?Latitude=" + latitude + "&Longitude=" + longitude;
                },
                (error) => {
                    console.error('Error getting location:', error);
                }
            );
        } else {
            console.error('Geolocation is not supported in this browser.');
        }
    };

    const handleChange = (e) => {
        setCity(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            if (city === "") {
                alert('Please Enter City Name')
            }
            else {
                window.location.href = "/weatherinfo?city=" + city
            }
        }
    };

    return (
        <div className="dashboard-container">
            <Row>
                <Col>
                    <div className="dashboard-box">
                        <h4 className="app-title">Weather App</h4>
                        <hr className="app-divider" />
                        <FormControl
                            type="search"
                            placeholder="Input City Name and Press Enter"
                            className="location-input"
                            onChange={handleChange}
                            onKeyUp={handleKeyPress}
                        />
                        <div className="or-line">
                            <span className="or-text">or</span>
                        </div>
                        <Button style={{ "background-color": "cornflowerblue", "border-color": "cornflowerblue" }}
                            variant="primary"
                            className="location-button"
                            onClick={handleGetLocation}
                        >
                            Get Device Location
                        </Button>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default Dashboard;
