import { Route, Routes } from 'react-router-dom';
import './App.css';
import { CartProvider } from './contexts/cart-context';
import MenuList from './pages/MenuList/index';
import OrderComfirmation from './pages/OrderComfirmation';
import { OrderProvider } from './contexts/order-context';
import OrderPayment from './pages/OrderPayment';
import { OrderWithUserPoint } from './pages/OrderWithUserPoint';

function App() {
    return (
        <CartProvider>
            <OrderProvider>
                <Routes>
                    <Route path='/menu' element={<MenuList />} />

                    <Route path='/order' element={<OrderComfirmation />} />
                    <Route path='/payment' element={<OrderPayment />} />
                    <Route
                        path='/orderConfirm'
                        element={<OrderWithUserPoint />}
                    />
                </Routes>
            </OrderProvider>
        </CartProvider>
    );
}

export default App;
