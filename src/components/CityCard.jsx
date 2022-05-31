//Komponent zawierający kafelek dla każdego z subskrybowanych miast
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import style from '../styles/CityCard.module.css';
import { FaTemperatureHigh } from 'react-icons/fa';
import { IoIosWater } from 'react-icons/io';
import { useState, useEffect } from 'react';
import ChartModal from './ChartModal';
import CloseButton from 'react-bootstrap/CloseButton';

function CityCard({ city, handleCityUnsubscribe }) {
  //Stan przechowujacy aktualne dane
  const [currentWeather, setCurrentWeather] = useState({});
  //stan przechowujący wszystkie dane od uruchomienia aplikacji
  const [weatherHistory, setWeatherHistory] = useState([]);

  //Pobieranie danych z API
  const getData = () => {
    var today = new Date();
    var hours =
      today.getHours() < 10 ? `0${today.getHours()}` : `${today.getHours()}`;
    var minutes =
      today.getMinutes() < 10
        ? `0${today.getMinutes()}`
        : `${today.getMinutes()}`;

    var time = `${hours}:${minutes}`;
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=bcc968add403377216466931bb070e2e&lang=pl`
      )
      .then((res) => {
        setCurrentWeather({
          temp: Math.round(res.data.main.temp),
          humidity: res.data.main.humidity,
          name: city,
          icon: res.data.weather[0].icon,
          time: time,
          description: res.data.weather[0].description,
        });
        setWeatherHistory((weatherHistory) => {
          return [
            ...weatherHistory,
            {
              temp: Math.round(res.data.main.temp),
              humidity: res.data.main.humidity,
              time: time,
            },
          ];
        });
      });
  };

  //wywołanie pobierania danych z API przy pierwszym uruchomieniu
  //oraz ustawienie pobierania danych co minutę
  useEffect(() => {
    getData();
    const interval = setInterval(() => {
      getData();
    }, 1000 * 60);
    return () => clearInterval(interval);
  }, []);

  //stan przechowujący informację czy okno z wykresem powinno być otwarte
  const [chartShow, setChartShow] = useState(false);

  return (
    <>
      <Card>
        <Card.Title className={style.title}>
          <div className="d-flex justify-content-between align-items-center col-10">
            <div>
              {city}
              <h6>{currentWeather.description}</h6>
            </div>
            <img
              className="col-4"
              src={`http://openweathermap.org/img/wn/${currentWeather.icon}@2x.png`}
              alt={currentWeather.description}
            />
          </div>
          <div className="position-absolute top-0 end-0 pe-1">
            <CloseButton
              className={style.closeButton}
              onClick={() => handleCityUnsubscribe(city)}
              variant="white"
            />
          </div>
        </Card.Title>
        <Card.Body>
          <Card.Text className="">
            <div className={style.weather}>
              <div className={style.temperature}>
                <div className={style.iconTemperature}>
                  <FaTemperatureHigh />
                </div>
                <h2 className={style.text}>{currentWeather.temp}&#8451;</h2>
              </div>
              <div className={style.humidity}>
                <div className={style.iconHumidity}>
                  <IoIosWater />
                </div>
                <h2 className={style.text}>{currentWeather.humidity}%</h2>
              </div>
            </div>
          </Card.Text>
        </Card.Body>
        <div className={style.chartButton} onClick={() => setChartShow(true)}>
          <Card.Footer>
            <small className="text-muted d-flex justify-content-center">
              Zobacz wykres
            </small>
          </Card.Footer>
        </div>
      </Card>
      <ChartModal
        show={chartShow}
        onHide={() => setChartShow(false)}
        weatherHistory={weatherHistory}
        city={city}
      />
    </>
  );
}
export default CityCard;
