import { useState, useEffect } from 'react';
import { FaUser } from 'react-icons/fa';
import style from '../styles/Login.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
//Strona logowania użytkownika
import { login, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';
import Alert from 'react-bootstrap/Alert';
function Login() {
  //Stan przechowujący dane wpisane do formularza
  const [formData, setFormData] = useState({
    name: '',
    password: '',
  });

  //Stan przechowujący informację czy komunikat o błędnych danych logowania
  //powinien zostać wyświetlony
  const [alertVisible, setAlertVisible] = useState(false);

  //destrukturyzacja danych z formularza
  const { name, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  //pobranie danych o stanie autoryzacji użytkownika
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  //Jeśli autoryzacja zakończyła się z błędem zostanie wyświetlony komunikat
  //jeśli wszystko poszło w porządku użytkownik zostanie przeniesiony na stornę główną
  useEffect(() => {
    if (isError) {
      setAlertVisible(true);
    }

    if (isSuccess || user) {
      navigate('/');
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  //Obsługa pól formularza
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //Obsługa przycisku zaloguj
  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      name,
      password,
    };

    dispatch(login(userData));
  };

  //jeśli aplikacja przetwarza autoryzację zostanie wyświetlony
  //komponent informujący o trwającym procesie
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <div className={style.containerForm}>
        <section className={style.heading}>
          <span className={style.icon}>
            <FaUser />
          </span>
          <div>Zaloguj się</div>
        </section>
        <section className={style.form}>
          <form onSubmit={onSubmit}>
            <div className={style.formGroup}>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={name}
                placeholder="Login"
                onChange={onChange}
              />
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={password}
                placeholder="Hasło"
                onChange={onChange}
              />
            </div>
            <div className={style.formGroup}>
              <button
                type="submit"
                className={`${style.btn} ${style.btnBlock}`}
              >
                Zaloguj się
              </button>
            </div>
          </form>
          <Alert key={message} variant="danger" show={alertVisible}>
            <p className="text-center mb-0">Złe dane logowania</p>
          </Alert>
        </section>
      </div>
    </>
  );
}

export default Login;
