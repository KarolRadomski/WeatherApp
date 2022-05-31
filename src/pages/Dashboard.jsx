//Strona główna aplikacji
import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CardGroup from 'react-bootstrap/CardGroup';
import CityForm from '../components/CityForm';
import CityCard from '../components/CityCard';

function Dashboard() {
  //pobranie danych o autoryzacji użytkownika
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  //Stan przechowujący tablicę zasubskrybowanych przez użytkownika miast
  const [subscribedCities, setSubscribedCities] = useState([]);

  //Funkcja obsługująca dodanie miasta do listy obserwowanych
  const handleCitySubscribe = (city) => {
    setSubscribedCities([...subscribedCities, city]);
  };

  //Funkcja obsługująca usunięcie miasta z listy obserwowanych
  const handleCityUnsubscribe = (city) => {
    setSubscribedCities(
      subscribedCities.filter((subscribedCity) => subscribedCity !== city)
    );
  };

  //Jeśli użytkownik nie jest zalogowany zostanie przeniesiony na stronę logowania
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  //Wyświetlenie formularza wyboru miast oraz kafelków z obserwowanymi miastami
  //jeśli użytkownik nie subskrybuje żadnych miast zostanie o to poproszony
  return (
    <div>
      <CityForm
        key={subscribedCities}
        handleCitySubscribe={handleCitySubscribe}
        subscribedCities={subscribedCities}
      />
      <div className="d-sm-flex flex-wrap mt-5">
        {subscribedCities.length ? (
          subscribedCities.map((city) => (
            <CardGroup className="col-sm-6 col-md-4 p-1">
              <CityCard
                city={city}
                handleCityUnsubscribe={handleCityUnsubscribe}
              />
            </CardGroup>
          ))
        ) : (
          <h4 className="text-muted ms-auto me-auto">
            Dodaj swoje pierwsze miasto
          </h4>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
