import { useNavigate, useParams } from 'react-router-dom';
import { OrderItemProps } from '../AdminOrder';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';

export const AdminUpdateOrder = () => {
    const navigate = useNavigate();
    const { orderId } = useParams();
    const accessToken = sessionStorage.getItem('token');
    const [editedOrder, setEditedOrder] = useState<OrderItemProps>({
        idx: 0,
        orderCode: '',
        orderCount: 0,
        orderNumber: 0,
        orderPrice: 0,
        orderStatus: '',
        orderTime: new Date(),
    });

    const handleEditOrder = async () => {
        if (accessToken) {
            await fetch(`http://localhost:8080/api/v1/admin/order/${orderId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'X-AUTH-TOKEN': accessToken,
                },
                body: JSON.stringify({
                    orderCount: editedOrder.orderCount,
                    orderPrice: editedOrder.orderPrice,
                }),
            })
                .then((response) => response.json())
                .then((res) => {
                    if (res.success) {
                        navigate('/admin/order');
                    }
                });
        }
    };

    const getOrder = async () => {
        if (accessToken) {
            await fetch(`http://localhost:8080/api/v1/admin/order/${orderId}`, {
                headers: {
                    'X-AUTH-TOKEN': accessToken,
                },
            })
                .then((response) => response.json())
                .then((res) => {
                    console.log(res.data);
                    if (res.success) {
                        setEditedOrder(res.data);
                    }
                });
        }
    };

    useEffect(() => {
        getOrder();
    }, []);

    return (
        <div className='flex flex-col items-center h-full mt-8'>
            <h2 className='h-12 text-2xl font-semibold'>주문정보 수정</h2>
            <table className='w-4/5 border-2 rounded-md h-3/5 border-slate-700 bg-slate-400'>
                <tbody>
                    <tr className='border border-slate-700'>
                        <th className='text-base border-r border-slate-700'>
                            주문코드
                        </th>
                        <th className='box-border w-2/3 pl-2'>
                            <input
                                type='text'
                                value={editedOrder?.orderCode}
                                className='w-full text-base font-normal text-center bg-transparent border border-none rounded-lg h-3/4 focus:outline-none'
                                disabled
                            />
                        </th>
                    </tr>

                    <tr className='border border-slate-700'>
                        <th className='text-base border-r border-slate-700'>
                            주문총금액
                        </th>
                        <th>
                            <input
                                type='number'
                                value={editedOrder?.orderPrice}
                                onChange={(e) =>
                                    setEditedOrder((editedOrder) => {
                                        return {
                                            ...editedOrder,
                                            orderPrice: e.target.valueAsNumber,
                                        };
                                    })
                                }
                                className='w-full text-base font-normal text-center bg-transparent border border-none rounded-lg h-3/4 focus:outline-none'
                            />
                        </th>
                    </tr>
                    <tr className='border border-slate-700'>
                        <th className='text-base border-r border-slate-700'>
                            주문상품개수
                        </th>
                        <th>
                            <input
                                type='number'
                                value={editedOrder?.orderCount}
                                onChange={(e) =>
                                    setEditedOrder((order) => {
                                        return {
                                            ...order,
                                            orderCount: e.target.valueAsNumber,
                                        };
                                    })
                                }
                                className='w-full text-base font-normal text-center bg-transparent border border-none rounded-lg h-3/4'
                            />
                        </th>
                    </tr>
                    <tr className='border border-slate-700'>
                        <th className='text-base border-r border-slate-700'>
                            임시번호
                        </th>
                        <th>
                            <input
                                type='number'
                                value={editedOrder?.orderNumber}
                                disabled
                                className='w-full text-base font-normal text-center bg-transparent border border-none rounded-lg h-3/4 focus:outline-none'
                            />
                        </th>
                    </tr>
                    <tr className='border border-slate-700'>
                        <th className='text-base border-r border-slate-700'>
                            주문상태
                        </th>
                        <th>
                            <input
                                className='text-base font-medium bg-transparent w-36 focus:outline-none'
                                value={editedOrder?.orderStatus}
                            ></input>
                        </th>
                    </tr>
                    <tr className='border border-slate-700'>
                        <th className='text-base border-r border-slate-700'>
                            결제시간
                        </th>
                        <th>
                            <p>{format(editedOrder.orderTime, 'yyyy-MM-dd')}</p>
                        </th>
                    </tr>
                </tbody>
            </table>
            <div className='flex justify-between w-1/3 h-10 mt-5'>
                <button className='bg-red-300' onClick={handleEditOrder}>
                    수정{' '}
                </button>

                <button className='bg-blue-300' onClick={() => navigate(-1)}>
                    취소
                </button>
            </div>
        </div>
    );
};