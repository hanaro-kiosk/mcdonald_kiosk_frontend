import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Join from './pages/User/Join/index';
import Login from './pages/User/Login/index';
import AdminOutlet from './pages/AdminOutlet';
import AdminUserList from './pages/AdminUser';
import { AdminUserUpdate } from './pages/AdminUserUpdate/index';

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/join' element={<Join />} />
                <Route path='/login' element={<Login />} />
                <Route path='/admin' element={<AdminOutlet />}>
                    <Route path='/admin/user' element={<AdminUserList />} />
                    <Route
                        path='/admin/user/:userIdx'
                        element={<AdminUserUpdate />}
                    />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
