import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Header from './components/Header';
import { useSelector } from 'react-redux';

function App() {
  //Pobranie stanu autoryzacji
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      {user ? <Header /> : ''}
      <Router>
        <div className="container">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
