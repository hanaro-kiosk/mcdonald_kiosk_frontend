/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export type AdminItem = {
    menuIdx: number;
    imgIdx: number;
    imgSrc: string;
    menuName: string;
    menuPrice: number;
    menuOption: string;
    menuCalory: number;
    menuCode: string;
    menuRecommend: boolean;
    menuUpdateDate: Date;
};

type AdminItems = {
    content: AdminItem[];
    pageable: {
        pageNumber: number;
        pageSize: number;
    };
    totalPages: number;
    totalElements: number;
};

function AdminMenuList() {
    const { categoryId } = useParams();
    const navigate = useNavigate();
    const [itemList, setItemList] = useState<AdminItems>();
    const [pageNumber, setPageNumber] = useState<number>(0);

    const token = localStorage.getItem('token');

    const pageRendering = () => {
        const result = [];
        if (itemList) {
            for (let i = 1; i <= itemList?.totalPages; i += 1) {
                result.push(
                    <button
                        key={i}
                        className={`w-8 text-base font-medium ${pageNumber === i - 1 ? 'text-slate-200' : 'text-stone-900'}`}
                        onClick={() => setPageNumber(i - 1)}
                    >
                        {i}
                    </button>
                );
            }
        }
        return result;
    };

    // 해당 카테고리 메뉴 리스트 api
    const getCategroyMenuData = async () => {
        if (token) {
            const response = await fetch(
                `http://localhost:8080/api/v1/admin/menu?categoryId=${categoryId}&page=${pageNumber}`,
                {
                    headers: {
                        'X-AUTH-TOKEN': token,
                    },
                }
            )
                .then((res) => res.json())
                .catch((err) => console.error(err));
            if (response.success && !response.data.empty) {
                setItemList(response.data);
            }
        } else {
            alert('로그인을 해주세요');
            location.href = '/login';
        }
    };

    // 해당 메뉴 삭제 api
    const deleteMenu = async (itemIdx: number) => {
        if (token) {
            if (confirm('해당 상품을 삭제하시겠습니까?')) {
                const response = await fetch(
                    `http://localhost:8080/api/v1/admin/menu/${itemIdx}`,
                    {
                        method: 'DELETE',
                        headers: {
                            'X-AUTH-TOKEN': token,
                        },
                    }
                )
                    .then((res) => res.json())
                    .catch((err) => console.error(err));
                if (response.success) {
                    getCategroyMenuData();
                }
            }
        } else {
            alert('로그인을 해주세요');
            location.href = '/login';
        }
    };

    useEffect(() => {
        getCategroyMenuData();
    }, [pageNumber]);

    return (
        <div className='flex flex-col justify-center items-center'>
            <h2 className='text-3xl font-bold mt-10'>상품 목록</h2>

            <div className='w-full mt-2 p-2'>
                <p className='text-base text-gray-300'>
                    총 {itemList?.totalElements}개의 상품이 있습니다.
                </p>
                <table className='w-full mt-3 text-base text-left text-gray-500'>
                    <thead className='text-base text-gray-700 bg-slate-300'>
                        <tr>
                            <th className='px-2 py-2'>번호</th>
                            <th className='px-2 py-2'>이름</th>
                            <th className='px-2 py-2'>이미지</th>
                            <th className='px-2 py-2'>가격</th>
                            <th className='px-2 py-2'>옵션</th>
                            <th className='px-2 py-2'>수정</th>
                            <th className='px-2 py-2'>삭제</th>
                        </tr>
                    </thead>
                    <tbody>
                        {itemList?.content.map((item, idx) => (
                            <tr
                                key={item.menuIdx}
                                className='bg-gray-200 dark:bg-gray-800'
                            >
                                <td className='px-5 py-1'>
                                    {itemList.pageable.pageNumber *
                                        itemList.pageable.pageSize +
                                        idx +
                                        1}
                                </td>
                                <td className='px-2 py-1 font-medium text-gray-900 text-ellipsis'>
                                    {item.menuName}
                                </td>
                                <td className='py-1'>
                                    <div className='w-28'>
                                        <img
                                            src={`/assets/${item.imgSrc}`}
                                            alt={item.menuName}
                                        />
                                    </div>
                                </td>
                                <td className='px-2 py-1'>{item.menuPrice}</td>
                                <td className='px-2 py-1'>{item.menuOption}</td>
                                <td className='pr-1.5'>
                                    <button
                                        onClick={() =>
                                            navigate(
                                                `/admin/menu/${categoryId}/${item.menuIdx}`
                                            )
                                        }
                                        className='w-14 border border-none bg-blue-500 rounded-lg px-3 py-2 text-white text-sm hover:bg-blue-700'
                                    >
                                        수정
                                    </button>
                                </td>
                                <td className='pl-1.5'>
                                    <button
                                        onClick={() => deleteMenu(item.menuIdx)}
                                        className='w-14 border border-none bg-red-600 rounded-lg px-3 py-2 text-white text-sm hover:bg-red-700'
                                    >
                                        삭제
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className='flex justify-center items-center mt-3'>
                    {pageRendering()}
                </div>
            </div>
        </div>
    );
}
export default AdminMenuList;
