import { Route, Routes } from 'react-router-dom';
import './App.css';
import MenuList from './pages/MenuList/index';
import AdminOutlet from './pages/AdminOutlet';
import AdminMenu from './pages/AdminMenu/index';
import AdminMenuList from './pages/AdminMenu/AdminMenuList/index';

function App() {
    return (
        <Routes>
            <Route path='/menus' element={<MenuList />} />
            <Route path='/admin' element={<AdminOutlet />}>
                <Route path=':menu' element={<AdminMenu />} />
                <Route path=':menu/:categoryId' element={<AdminMenuList />} />
            </Route>
        </Routes>
    );
}

export default App;
