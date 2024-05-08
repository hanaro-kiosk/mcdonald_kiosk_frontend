import { Route, Routes } from 'react-router-dom';
import './App.css';
import AdminOutlet from './pages/AdminOutlet';
import AdminMenu from './pages/AdminMenu/index';
import AdminMenuList from './pages/AdminMenu/AdminMenuList/index';
import AdminUpdateMenu from './pages/AdminMenu/AdmiUpdateMenu/index';
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
                    <Route path='/admin' element={<AdminOutlet />}>
                      <Route path=':menu' element={<AdminMenu />} />
                      <Route path=':menu/:categoryId' element={<AdminMenuList />} />
                      <Route
                          path=':menu/:categoryId/:menuId'
                          element={<AdminUpdateMenu />}
                      />
                    </Route>
                </Routes>
            </OrderProvider>
        </CartProvider>
    );
}

export default App;
