import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export interface OrderPaymentProps {
    totalPrice: number;
    totalCount: number;
}

const OrderPayment: FC<OrderPaymentProps> = ({ totalPrice, totalCount }) => {
    useEffect(() => {
        const timeout = setTimeout(() => {
            // 마지막 페이지로 넘어가는 로직
        }, 3000);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <div>
            <h1 className='pt-5 pb-5 text-center text-white'>
                주문을 확인하세요.
            </h1>

            <div className='p-2 mx-10 mt-2 text-center bg-white border rounded-lg'>
                <span>총 수량 : {totalCount}개</span>
                <span className='text-red-600'> 총 가격 : {totalPrice}원</span>
            </div>
            <div className='p-2 mx-10 mt-20 text-center bg-white border rounded-lg'>
                <p>
                    카드를 화살표 방향으로 투입구에 넣어주세요. 결제 오류시,
                    카드를 긁어주세요.
                </p>
                <img src='./public/assets/payment.png' className='p-4' />
            </div>
        </div>
    );
};

export default OrderPayment;
