import { Route, Routes } from 'react-router-dom';
import './App.css';
import AdminOutlet from './pages/AdminOutlet';
import AdminMenu from './pages/AdminMenu/index';
import AdminMenuList from './pages/AdminMenu/AdminMenuList/index';
import AdminUpdateMenu from './pages/AdminMenu/AdminUpdateMenu/index';
import { CartProvider } from './contexts/cart-context';
import MenuList from './pages/MenuList/index';
import OrderComfirmation from './pages/OrderComfirmation';
import Home from './pages/home';
import NotFound from './pages/NotFound';
import ChoicePlace from './pages/ChoicePlace';
import { OrderProvider } from './contexts/order-context';
import OrderPayment from './pages/OrderPayment';
import { OrderWithUserPoint } from './pages/OrderWithUserPoint';
import { AdminOrder } from './pages/AdminOrder';
import { AdminUpdateOrder } from './pages/AdminUpdateOrder';

function App() {
    return (
        <CartProvider>
            <OrderProvider>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/place' element={<ChoicePlace />} />
                    <Route path='/menu' element={<MenuList />} />
                    <Route path='/order' element={<OrderComfirmation />} />
                    <Route path='/payment' element={<OrderPayment />} />
                    <Route
                        path='/orderConfirm'
                        element={<OrderWithUserPoint />}
                    />
                    <Route path='/admin' element={<AdminOutlet />}>
                        <Route path='menu' element={<AdminMenu />} />
                        <Route
                            path='menu/:categoryId'
                            element={<AdminMenuList />}
                        />
                        <Route
                            path='menu/:categoryId/:menuId'
                            element={<AdminUpdateMenu />}
                        />

                        <Route path='order' element={<AdminOrder />} />
                        <Route
                            path='order/:orderId'
                            element={<AdminUpdateOrder />}
                        />
                    </Route>
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </OrderProvider>
        </CartProvider>
    );
}

export default App;
