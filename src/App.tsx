import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Join from './pages/User/Join/index';
import Login from './pages/User/Login/index';
import Admin from './pages/Admin/User/index';

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/join' element={<Join />} />
                <Route path='/login' element={<Login />} />
                <Route path='/admin' element={<Admin />} />
            </Routes>
        </Router>
    );
}

export default App;
