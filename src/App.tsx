import './App.css';
import { CartProvider } from './contexts/cart-context';
import MenuList from './pages/MenuList/index';

function App() {
    return (
        <CartProvider>
            <MenuList />
        </CartProvider>
    );
}

export default App;
