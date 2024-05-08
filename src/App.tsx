import { Route, Routes } from 'react-router-dom';
import './App.css';
import AdminOutlet from './pages/AdminOutlet';
import AdminMenu from './pages/AdminMenu/index';
import AdminMenuList from './pages/AdminMenu/AdminMenuList/index';
import AdminUpdateMenu from './pages/AdminMenu/AdmiUpdateMenu/index';
import { CartProvider } from './contexts/cart-context';
import MenuList from './pages/MenuList/index';
import OrderComfirmation from './pages/OrderComfirmation';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import ChoicePlace from './pages/ChoicePlace';
import { OrderProvider } from './contexts/order-context';
import OrderPayment from './pages/OrderPayment';
import { OrderWithUserPoint } from './pages/OrderWithUserPoint';

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
                      <Route path=':menu' element={<AdminMenu />} />
                      <Route path=':menu/:categoryId' element={<AdminMenuList />} />
                      <Route
                          path=':menu/:categoryId/:menuId'
                          element={<AdminUpdateMenu />}
                      />
                      <Routes>
                      <Route path='/admin' element={<AdminOutlet />}>
                      <Route path=':order' element={<AdminOrder />} />
                      <Route 
                          path=':order/:orderId'
                          element={<AdminUpdateOrder />}
                      />
                </Route>
            </Routes>
                    </Route>
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </OrderProvider>
        </CartProvider>

    );
}

export default App;
