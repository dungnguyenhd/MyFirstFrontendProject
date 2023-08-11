import axios from "axios";
import React, { useEffect, useState } from "react";
import { format } from 'date-fns';
import '../../styles/css/WeatherBar.css';

function WeatherBar() {
    const [neighbourhood, setNeighbourhood] = useState('');
    const [weather, setWeather] = useState({ summary: null, temperature: null })
    const [time, setTime] = useState(null);
    const [isLocationAllow, setIsLocationAllow] = useState(false);

    useEffect(() => {
        const currentDateTime = new Date();
        const formattedDateTime = format(currentDateTime, "hh:mm a, d/M");
        let latitude = 1;
        let longitude = 1
        setTime(formattedDateTime);

        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    latitude = position.coords.latitude;
                    longitude = position.coords.longitude;
                    setIsLocationAllow(true);
                },
            );
        }

        const nominatimApiUrl = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

        axios.get(nominatimApiUrl)
            .then(async (response) => {
                const data = response.data;
                const newCity = data.address.city;
                const newDistrict = data.address.suburb || data.address.district;
                const newNeighbourhood = await data.address.neighbourhood;
                setNeighbourhood(newNeighbourhood);

                const getPlaceUrl = `https://www.meteosource.com/api/v1/free/find_places?text=${newNeighbourhood}&language=en&key=u27ol0z4ex75k3b2jmkv1e16qjom381g61n3jpc2`;
                axios.get(getPlaceUrl).then(async (res) => {
                    const place_id = await res.data[0].place_id;

                    const getWeatherUrl = `https://www.meteosource.com/api/v1/free/point?place_id=${place_id}&sections=current%2Chourly&timezone=auto&language=en&units=auto&key=u27ol0z4ex75k3b2jmkv1e16qjom381g61n3jpc2`
                    axios.get(getWeatherUrl).then((res) => {
                        setWeather({ summary: res.data.current.summary, temperature: res.data.current.temperature });
                    })
                }).catch((err) => {
                    console.error(err);
                })
            })
            .catch(error => {
                const newNeighbourhood = 'Phường Trung Hòa';
                setNeighbourhood(newNeighbourhood);

                const getPlaceUrl = `https://www.meteosource.com/api/v1/free/find_places?text=${newNeighbourhood}&language=en&key=u27ol0z4ex75k3b2jmkv1e16qjom381g61n3jpc2`;
                axios.get(getPlaceUrl).then(async (res) => {
                    const place_id = await res.data[0].place_id;

                    const getWeatherUrl = `https://www.meteosource.com/api/v1/free/point?place_id=${place_id}&sections=current%2Chourly&timezone=auto&language=en&units=auto&key=u27ol0z4ex75k3b2jmkv1e16qjom381g61n3jpc2`
                    axios.get(getWeatherUrl).then((res) => {
                        setWeather({ summary: res.data.current.summary, temperature: res.data.current.temperature });
                    })
                }).catch((err) => {
                    console.error(err);
                })
            });
        // Do something with latitude and longitudeƒ
    }, [])

    return (
        <div className="weather-container">
            {/* Cloudy */}
            <div className="icon-and-temperatyre text-light">
                <div className="row">
                    <div className="col-5">
                        <div className="row">
                            <div className="col-6 icon">
                                <div className="element">
                                    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 60.7 40" style={{ enableBackground: 'new 0 0 60.7 40' }} xmlSpace="preserve">
                                        <g id="Cloud_1">
                                            <g id="White_cloud_1">
                                                <path id="XMLID_2_" className="white" d="M47.2,40H7.9C3.5,40,0,36.5,0,32.1l0,0c0-4.3,3.5-7.9,7.9-7.9h39.4c4.3,0,7.9,3.5,7.9,7.9v0 C55.1,36.5,51.6,40,47.2,40z" />
                                                <circle id="XMLID_3_" className="white" cx="17.4" cy="22.8" r="9.3" />
                                                <circle id="XMLID_4_" className="white" cx="34.5" cy="21.1" r="15.6" />
                                                <animateTransform attributeName="transform"
                                                    attributeType="XML"
                                                    dur="6s"
                                                    keyTimes="0;0.5;1"
                                                    repeatCount="indefinite"
                                                    type="translate"
                                                    values="0;5;0"
                                                    calcMode="linear">
                                                </animateTransform>
                                            </g>
                                            <g id="Gray_cloud_1">
                                                <path id="XMLID_6_" className="gray" d="M54.7,22.3H33.4c-3.3,0-6-2.7-6-6v0c0-3.3,2.7-6,6-6h21.3c3.3,0,6,2.7,6,6v0 C60.7,19.6,58,22.3,54.7,22.3z" />
                                                <circle id="XMLID_7_" className="gray" cx="45.7" cy="10.7" r="10.7" />
                                                <animateTransform attributeName="transform"
                                                    attributeType="XML"
                                                    dur="6s"
                                                    keyTimes="0;0.5;1"
                                                    repeatCount="indefinite"
                                                    type="translate"
                                                    values="0;-3;0"
                                                    calcMode="linear">
                                                </animateTransform>
                                            </g>
                                        </g>
                                    </svg>
                                </div>
                            </div>

                            <div className="col-6 temperature">
                                <span>{weather.temperature ? Math.floor(weather.temperature) : '...'}°</span>
                            </div>
                        </div>
                    </div>

                    <div className="col-7" style={{paddingLeft: 15}}>
                        <p className="text-white p-0 m-0" style={{ fontSize: '0.75rem' }}> <span> {isLocationAllow ? <i class="fas fa-map-marker-alt"></i> : (<><i class="fas fa-map-marker-alt"></i><span style={{ fontSize: '0.8rem', color: 'red' }}>x</span></>)} </span>
                            <span >{neighbourhood}</span>
                        </p>
                        <p className="text-white p-0 m-0" style={{ fontSize: '0.75rem' }}>
                            {time}
                        </p>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default WeatherBar;