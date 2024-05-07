import './App.css';
import OrderPayment from './pages/OrderPayment';
import { OrderWithUserPoint } from './pages/OrderWithUserPoint';
import Home from './pages/home';

function App() {
    return (
        <>
            <OrderWithUserPoint orderNumber={200000} userPoint={10} />
        </>
    );
}

export default App;
