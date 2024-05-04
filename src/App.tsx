import { Route, Routes } from 'react-router-dom';
import './App.css';
import { CartProvider } from './contexts/cart-context';
import MenuList from './pages/MenuList/index';
import AdminOutlet from './pages/AdminOutlet';
import AdminMenu from './pages/AdminMenu/index';

function App() {
    return (
        <CartProvider>
            <Routes>
                <Route path='/menus' element={<MenuList />} />
                <Route path='/admin' element={<AdminOutlet />}>
                    <Route path=':menu' element={<AdminMenu />} />
                </Route>
            </Routes>
        </CartProvider>
    );
}

export default App;
