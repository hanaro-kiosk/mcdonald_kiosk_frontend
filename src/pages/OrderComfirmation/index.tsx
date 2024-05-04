import OrderMenuItem from './component/OrderMenuItem';
import Button from '../../components/Button';
import { useCart } from '../../contexts/cart-context';
import { useNavigate } from 'react-router-dom';

export const OrderComfirmation = () => {
    const { cart, totalCount, totalPrice } = useCart();

    const navigate = useNavigate();

    const handlePayment = () => {
        //navigate('');
    };

    return (
        <div className='h-full'>
            <h1 className='m-20 text-2xl text-center text-white'>
                주문을 확인하세요.
            </h1>
            <div className='px-4 py-5 mx-8 mt-32 bg-white rounded-md'>
                <div className='flex flex-col items-center mb-3'>
                    {cart?.map((order) => (
                        <OrderMenuItem
                            key={order.id}
                            id={order.id}
                            name={order.menuName}
                            price={order.menuPrice}
                            quantity={order.totalCnt}
                            // onQuantityChange={handleQuantityChange}
                            // onRemove={handleRemoveItem}
                        />
                    ))}
                    {cart.length <= 0 && (
                        <p className='text-xl font-semibold mt-3'>
                            주문하신 내역이 없습니다.
                        </p>
                    )}
                </div>

                <div className='flex justify-end mb-5'>
                    <p>총 수량: {totalCount}</p>
                    <p className='mx-4'>총 가격: {totalPrice}</p>
                </div>
                <div className='flex justify-between items-center'>
                    <Button
                        bgColor='bg-gray-400'
                        text='뒤로가기'
                        textColor='white'
                        textSize='base'
                        classes='w-36 rounded-lg font-medium hover:bg-gray-500'
                        onClick={() => navigate('/menu')}
                    />
                    <Button
                        bgColor='bg-red-600'
                        text='추가메뉴'
                        textColor='white'
                        textSize='base'
                        classes='w-36 rounded-lg font-medium hover:bg-red-700'
                        // onClick={() => navigate('/asdf')}
                    />
                    <Button
                        bgColor='bg-green-700'
                        text='결제하기'
                        textColor='white'
                        textSize='base'
                        classes='w-36 rounded-lg font-medium hover:bg-green-800'
                        onClick={handlePayment}
                    />
                </div>
            </div>
        </div>
    );
};

export default OrderComfirmation;
