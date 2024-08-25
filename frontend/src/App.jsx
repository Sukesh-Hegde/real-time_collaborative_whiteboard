import { Route, Routes } from 'react-router-dom';
import './App.css';
import Forms from './components/Forms';
import RoomPage from './pages/RoomPage/RoomPage';

const App = () => {

  const uuid = () => {
    let S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (
      S4() +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      S4() +
      S4()
    );
  };


  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Forms uuid={uuid} />} />
        {/* <Route path="/" element={<RoomPage />} /> */}
      </Routes>
    </div>
  );
}

export default App;
