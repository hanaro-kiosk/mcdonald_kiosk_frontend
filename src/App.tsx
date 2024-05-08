import { Route, Routes } from 'react-router-dom';
import './App.css';
import { CartProvider } from './contexts/cart-context';
import MenuList from './pages/MenuList/index';
import OrderComfirmation from './pages/OrderComfirmation';

function App() {
    return (
        <CartProvider>
            <Routes>
                <Route path='/menu' element={<MenuList />} />
                <Route path='/order' element={<OrderComfirmation />} />
            </Routes>
        </CartProvider>
    );
}

export default App;
