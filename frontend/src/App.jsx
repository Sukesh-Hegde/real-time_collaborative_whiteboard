import { Route, Routes } from 'react-router-dom';
import './App.css';
import Forms from './components/Forms';
import RoomPage from './pages/RoomPage/RoomPage';

const App = () => {
  return (
    <div className="container">
      <Routes>
        {/* <Route path="/" element={<Forms />} /> */}
        <Route path="/" element={<RoomPage />} />
      </Routes>
    </div>
  );
}

export default App;
