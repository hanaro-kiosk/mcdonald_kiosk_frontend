import { FC } from 'react';

interface OrderWithUserPointProps {
    orderNumber: number;
    userPoint: number;
}

export const OrderWithUserPoint: FC<OrderWithUserPointProps> = ({
    orderNumber,
    userPoint,
}) => {
    return (
        <div className='h-full bg-gray-100 '>
            <div className='flex justify-center pt-20'>
                <img
                    className='w-1/2 h-1/3'
                    src='./public/assets/Mcdonald_Logo.png'
                />
            </div>
            <p className='text-center'>
                고객의 주문번호는{' '}
                <span className='font-bold'>{orderNumber}</span> 입니다.
            </p>
            <p className='font-bold text-center'>감사합니다.</p>
            <p className='mt-8 text-center'>
                회원님의 적립금은 <span className='font-bold'>{userPoint}</span>
                원 입니다.
            </p>
        </div>
    );
};
