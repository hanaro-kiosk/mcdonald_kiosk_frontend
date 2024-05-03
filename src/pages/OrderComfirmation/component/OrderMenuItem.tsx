import { FC, useEffect } from 'react';

interface OrderItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

interface OrderItemProps {
    item: OrderItem;
    onQuantityChange: (id: number, quantityChange: number) => void;
    onRemove: (id: number) => void;
}

const OrderMenuItem: FC<OrderItemProps> = ({
    item,
    onQuantityChange,
    onRemove,
}) => {
    useEffect(() => {}, []);

    return (
        <div className='' key={item.id}>
            <div className='flex items-center justify-between px-4 py-1 my-2 border rounded text-black-400 '>
                <div className='flex items-center space-x-4'>
                    <span>
                        {item.name} - {item.price}원
                    </span>
                    <button
                        className='px-2 text-center align-middle border border-gray-900 rounded-md select-none'
                        onClick={() => onQuantityChange(item.id, -1)}
                    >
                        -
                    </button>
                    <span>{item.quantity}개</span>
                    <button
                        className='px-2 text-center align-middle border border-gray-900 rounded-md select-none'
                        onClick={() => onQuantityChange(item.id, +1)}
                    >
                        +
                    </button>
                    <button
                        className='px-2 py-1 text-sm text-white bg-red-500 rounded-md'
                        onClick={() => onRemove(item.id)}
                    >
                        삭제
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderMenuItem;
