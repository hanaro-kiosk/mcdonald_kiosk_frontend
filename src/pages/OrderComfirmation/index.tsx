import { useEffect, useState } from 'react';
import OrderMenuItem from './component/OrderMenuItem';
import { Navigate, useNavigate } from 'react-router-dom';

interface MenuItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

export const OrderComfirmation = () => {
    const [orders, setOrders] = useState<MenuItem[]>();
    const [loading, setLoading] = useState<boolean>(false);

    //const navigate = useNavigate();

    useEffect(() => {
        setOrders([
            {
                id: 1,
                name: '치즈버거',
                price: 5900,
                quantity: 10,
            },
            {
                id: 2,
                name: '피자',
                price: 8000,
                quantity: 8,
            },
            {
                id: 3,
                name: '스테이크',
                price: 15000,
                quantity: 5,
            },
        ]);
    }, []);

    const handleQuantityChange = (id: number, increment: number) => {
        setOrders(
            orders?.map((order) =>
                order.id === id
                    ? { ...order, quantity: order.quantity + increment }
                    : order
            )
        );
    };

    const handleRemoveItem = (id: number) => {
        setOrders(orders?.filter((order) => order.id !== id));
    };

    const handlePayment = () => {
        //navigate('');
    };

    const totalPrice = orders?.reduce(
        (total, order) => total + order.price * order.quantity,
        0
    );
    const totalCount = orders?.reduce(
        (total, order) => total + order.quantity,
        0
    );

    return (
        <div>
            <div>
                <h1 className='text-center text-white '>주문을 확인하세요.</h1>
            </div>
            {loading ? (
                <p>로딩중....</p>
            ) : (
                <div className='px-4 py-8 mx-8 mt-40 bg-white rounded-md'>
                    {orders?.map((order) => (
                        <OrderMenuItem
                            key={order.id}
                            item={order}
                            onQuantityChange={handleQuantityChange}
                            onRemove={handleRemoveItem}
                        />
                    ))}

                    <div className='flex justify-end'>
                        <p>총 수량: {totalCount}</p>
                        <p className='mx-4'>총 가격: {totalPrice}</p>
                    </div>
                    <div className='flex justify-between'>
                        <button className='px-2 py-1 border border-gray-500 rounded-md'>
                            뒤로가기
                        </button>
                        <button
                            className='px-2 py-1 border border-gray-500 rounded-md'
                            // onClick={() => navigate('/asdf')}
                        >
                            추가메뉴
                        </button>
                        <button
                            className='px-2 py-1 border border-gray-500 rounded-md'
                            onClick={handlePayment}
                        >
                            결제하기
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderComfirmation;
