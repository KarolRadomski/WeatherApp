//Plik generuje dane takie jak opis osi poziomej, temperaturę, wilgotność
//oraz czas odczytu potrzebne do wygenerowania wykresu

//Funkcja sprawdzająca czy dany rekord jest rekordem potrzebnym
//podczas generowania wykresu dla ustalonego interwału
//np rekord z godziny 12:23 nie jest rekordem, który powinien znaleźć
//się na wykresie z interwałem 15 min
function ifRecordMatchInterval(interval, record) {
  var time = parseInt(record.time.slice(3));
  return time % interval === 0;
}

//Generowanie danych w postaci obiektu zawierającego 3 tablice (temperatura, wilgotnosc, czas)
//o długości maksymalnie 10 najnowszych elementów pasujących do wybranego interwału.
export function generateDataset(interval, weather) {
  //zmienne pomocnicze
  let tempData = [];
  let humidityData = [];
  let time = [];
  var data = [];
  //usunięcie pierwszego elementu tablicy weather, który po dodaniu miasta jest niepotrzebnie dublowany
  weather = weather.slice(1);
  switch (interval) {
    //interwał 1 min
    case '1m':
      //redukcja ilości rekordów do 10 najnowszych.
      weather.length > 10
        ? (data = weather.slice(weather.length - 10))
        : (data = weather);
      //przepisanie danych do zmiennych pomocniczych
      for (let i = 0; i < data.length; i++) {
        tempData = [...tempData, data[i].temp];
        humidityData = [...humidityData, data[i].humidity];
        time = [...time, data[i].time];
      }
      break;
    //interwał 5 min
    case '5m':
      //filtracja rekordów pasujących do interwału 5 min
      data = weather.filter((record) => ifRecordMatchInterval(5, record));
      //redukcja ilości rekordów do 10 najnowszych.
      data = data.length > 10 ? data.slice(data.length - 10) : data;
      //przepisanie danych do zmiennych pomocniczych
      for (let i = 0; i < data.length; i++) {
        tempData = [...tempData, data[i].temp];
        humidityData = [...humidityData, data[i].humidity];
        time = [...time, data[i].time];
      }
      break;
    //interwał 15 min
    case '15m':
      //filtracja rekordów pasujących do interwału 5 min
      data = weather.filter((record) => ifRecordMatchInterval(15, record));
      //redukcja ilości rekordów do 10 najnowszych.
      data = data.length > 10 ? data.slice(data.length - 10) : data;
      //przepisanie danych do zmiennych pomocniczych
      for (let i = 0; i < data.length; i++) {
        tempData = [...tempData, data[i].temp];
        humidityData = [...humidityData, data[i].humidity];
        time = [...time, data[i].time];
      }
      break;
    default:
      break;
  }
  //utworzenie obiektu zawierajacego potrzebne dane
  const dataset = { tempData, humidityData, time };

  return dataset;
}
