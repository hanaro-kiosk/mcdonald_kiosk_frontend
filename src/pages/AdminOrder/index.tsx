import { useEffect, useState } from 'react';
import Pagination from './component/Pagination';
import { OrderListItem } from './component/OrderListItem';

export interface OrderItemProps {
    idx: number;
    orderCode: string;
    orderPrice: number;
    orderNumber: number;
    orderStatus: string;
    orderTime: Date;
}

export interface OrderList {
    data: OrderItemProps[];
    pageable: {
        pageNumber: number;
        pageSize: number;
    };
    totalPages: number;
    totalElements: number;
}

export const AdminOrder = () => {
    const [orders, setOrders] = useState<OrderItemProps[]>([]);
    const [totalPage, setTotalPages] = useState(1);
    const [totalElements, setTotalElements] = useState(1);
    const [currentPage, setCurrentPage] = useState(0);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const getOrderList = async () => {
        await fetch(
            `http://localhost:8080/api/v1/admin/order?page=${currentPage}`,
            {
                method: 'GET',
                headers: {
                    'X-AUTH-TOKEN':
                        'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyNCIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTcxNTA0Njk3NCwiZXhwIjoxNzE1MTMzMzc0fQ.ZDrC3WqwpBjA91ejQ-ttS7Zf2lzApj1gSpF6n3zSfvQ',
                },
            }
        )
            .then((res) => {
                return res.json();
            })
            .then((response) => {
                console.log(response.data);
                setOrders(response.data.content);
                setTotalPages(response.data.totalPages);
                setTotalElements(response.data.totalElements);
            })
            .catch((err) => console.error(err));
    };

    useEffect(() => {
        getOrderList();
    }, [currentPage]);

    const handleOrderDelete = async (orderIdx: number) => {
        fetch(`http://localhost:8080/api/v1/admin/order/${orderIdx}`, {
            method: 'DELETE',
            headers: {
                'X-AUTH-TOKEN':
                    'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyNCIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTcxNTA0Njk3NCwiZXhwIjoxNzE1MTMzMzc0fQ.ZDrC3WqwpBjA91ejQ-ttS7Zf2lzApj1gSpF6n3zSfvQ',
            },
        })
            .then((res) => res.json())
            .then((response) => {
                if (response.success) {
                    setOrders(orders.filter((order) => orderIdx != order.idx));
                    alert('삭제되었습니다.');
                }
            })
            .catch((err) => console.error(err));
    };

    return (
        <div className='flex flex-col items-center justify-center'>
            <h2 className='text-3xl font-bold '> 주문 목록 </h2>

            <div className='w-full p-2 mt-2'>
                <p className='text-base text-gray-300'>
                    총 {totalElements}건의 주문이 있습니다.
                </p>
                <table className='w-full mt-3 text-base text-left text-gray-500'>
                    <thead className='text-base text-gray-700 bg-slate-300'>
                        <tr>
                            <th className='px-2 py-2'>번호</th>
                            <th className='px-2 py-2'>주문코드</th>
                            <th className='px-2 py-2'>주문총금액</th>
                            <th className='px-2 py-2'>임시번호</th>
                            <th className='px-2 py-2'>주문상태</th>
                            <th className='px-2 py-2'>주문일시</th>
                            <th className='px-2 py-2'>수정</th>
                            <th className='px-2 py-2'>삭제</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <OrderListItem
                                key={order.idx}
                                order={order}
                                onDelete={handleOrderDelete}
                            />
                        ))}
                    </tbody>
                </table>

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPage}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
};
