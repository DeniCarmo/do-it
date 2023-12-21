import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './routes/Login';
import Register from './routes/Register';
import Dashboard from './routes/Dashboard';
import Header from './components/Header';
import List from './routes/List';
import LostPassword from './routes/LostPassword';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Header />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="register" element={<Register />}></Route>
        <Route path="dashboard" element={<Dashboard />}></Route>
        <Route path="list/:listId" element={<List />}></Route>
        <Route path="lost-password" element={<LostPassword />}></Route>
      </Routes>
    </>
  );
}

export default App;
