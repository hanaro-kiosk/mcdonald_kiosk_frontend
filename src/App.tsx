import { Route, Routes } from 'react-router-dom';
import './App.css';
import { CartProvider } from './contexts/cart-context';
import MenuList from './pages/MenuList/index';
import OrderComfirmation from './pages/OrderComfirmation';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import ChoicePlace from './pages/ChoicePlace';

function App() {
    return (
        <CartProvider>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/place' element={<ChoicePlace />} />
                <Route path='/menu' element={<MenuList />} />
                <Route path='/order' element={<OrderComfirmation />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </CartProvider>
    );
}

export default App;
