//Komponent zawierający pole typu select oraz przycisk "Dodaj miasto"

import React from 'react';
import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function CityForm({ handleCitySubscribe, subscribedCities }) {
  //stan przechowujacy wybrany element z pola typu select
  const [selectValue, setSelectValue] = useState('');
  //tablica przechowująca wszystkie miasta
  const cityList = [
    'Rzeszów',
    'Kraków',
    'Warszawa',
    'Szczecin',
    'Gdańsk',
    'Poznań',
  ];

  //stan przechowujący tablicę wszystkich miast, których nie obserwuje użytkownik
  const [availableCities, setAvailableCities] = useState(cityList);

  //funkcja filtrująca miasta, zapisuje do availableCities wszystkie miasta
  //których nie obserwuje użytkownik, na jej podstawie renderowane są elementy
  //pola typu select
  const filterAvailableCity = () => {
    setAvailableCities(
      cityList.filter((city) => subscribedCities.includes(city) === false)
    );
  };

  //Obsługa przyciśnięcia przycisku "Dodaj miasto"
  const handleAddCity = (e) => {
    e.preventDefault();
    if (availableCities.includes(selectValue)) handleCitySubscribe(selectValue);
  };

  //wywołanie funkcji filtrującej przy pierwszym załadowaniu komponentu oraz
  //gdy zmieni się stan przechowujący tablicę subskrybowanych miast.
  useEffect(() => {
    filterAvailableCity();
  }, [subscribedCities]);

  return (
    <>
      <Form onSubmit={handleAddCity} className="d-flex mt-5 ms-auto me-auto">
        <Form.Select
          size="sm"
          className="form-select me-3"
          onChange={(e) => setSelectValue(e.target.value)}
        >
          <option value="default">Wybierz miasto</option>
          {availableCities.map((city) => (
            <option value={city}>{city}</option>
          ))}
        </Form.Select>

        <Button size="sm" type="submit">
          Dodaj miasto
        </Button>
      </Form>
    </>
  );
}

export default CityForm;
