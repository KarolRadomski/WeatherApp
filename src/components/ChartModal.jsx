//Komponent zawierający okienko z wykresem temperatury i wilgotności
//dla jednego miasta
import React from 'react';
import Modal from 'react-bootstrap/Modal';
import ChartGenerator from './ChartGenerator.jsx';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { generateDataset } from '../features/generateDataset';
import { useState, useEffect } from 'react';

function ChartModal({ show, weatherHistory, city, onHide }) {
  //stan przechowujący wybrany interwał(domyślnie 1 minuta)
  const [interval, setInterval] = useState('1m');
  //Stan przechowujący zbiór danych do generowania wykresu
  const [dataset, setDataset] = useState({});

  //Funkcja obsługująca zmianę interwału
  const changeInterval = (selectedInterval) => {
    setInterval(selectedInterval);
    setDataset(generateDataset(selectedInterval, weatherHistory));
  };

  //Wywołanie funkcji przygotowującej zbiór danych dla danego interwału
  useEffect(() => {
    setDataset(generateDataset(interval, weatherHistory));
  }, [weatherHistory]);

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{city}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex justify-content-end">
          <ButtonGroup size="sm">
            <Button
              variant={interval === '1m' ? 'primary' : 'secondary'}
              onClick={() => changeInterval('1m')}
            >
              1min
            </Button>
            <Button
              variant={interval === '5m' ? 'primary' : 'secondary'}
              onClick={() => changeInterval('5m')}
            >
              5min
            </Button>
            <Button
              variant={interval === '15m' ? 'primary' : 'secondary'}
              onClick={() => changeInterval('15m')}
            >
              15min
            </Button>
          </ButtonGroup>
        </div>
        <ChartGenerator dataset={dataset} />
      </Modal.Body>
    </Modal>
  );
}

export default ChartModal;
