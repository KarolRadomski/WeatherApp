//Komponent zawierający wykres temperatury i wilgotności w czasie.
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

function ChartGenerator({ dataset }) {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  //Ustawienia wykresu
  const options = {
    responsive: 'true',
    interaction: {
      mode: 'index',
      intersect: false,
    },
    scales: {
      //ustawienia skali temperatury
      temperature: {
        type: 'linear',
        display: true,
        position: 'left',
        beginAtZero: false,
        //ustawienie skalowania się osi temperatury
        min:
          dataset.tempData.length > 0 ? Math.min(...dataset.tempData) - 3 : 0,
        max:
          dataset.tempData.length > 0 ? Math.max(...dataset.tempData) + 3 : 30,
        grid: {
          drawOnChartArea: false,
        },
      },
      //ustawienia skali wilgotności
      humidity: {
        min: 0,
        max: 100,
        position: 'right',
        grid: {
          drawOnChartArea: false,
        },
      },
      xAxisID: {
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };
  //Wykres wyrenderuje się tylko wtedy gdy aplikacja zdąży zebrać odpowiednią ilość danych
  //w przeciwnym wypadku poprosi użytkownika aby poczekał na zebranie danych lub aby zmienił
  //interwał na niższy.
  return (
    <>
      {dataset.tempData.length > 0 ? (
        <Bar
          options={options}
          data={{
            labels: dataset.time,
            datasets: [
              {
                yAxisID: 'temperature',
                label: 'Temperatura',
                data: dataset.tempData,
                borderColor: 'rgb(237, 26, 71)',
                backgroundColor: 'rgba(237, 26, 71, 0.5)',
              },
              {
                yAxisID: 'humidity',
                label: 'Wilgotność',
                data: dataset.humidityData,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
              },
            ],
          }}
        />
      ) : (
        <h5 className="d-flex justify-content-center p-5">
          Za mało danych, poczekaj lub przełącz na mniejszy interwał
        </h5>
      )}
    </>
  );
}

export default ChartGenerator;
