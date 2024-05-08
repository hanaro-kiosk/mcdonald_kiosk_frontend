/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export type Category = {
    categoryIdx: number;
    categoryTitle: string;
};

function AdminMenu() {
    const [categories, setCategories] = useState<Category[]>([]);

    // 카테고리 리스트 api
    const getCategoriesData = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            const response = await fetch(
                `http://localhost:8080/api/v1/admin/categories`,
                {
                    headers: {
                        'X-AUTH-TOKEN': token,
                    },
                }
            )
                .then((res) => res.json())
                .catch((err) => console.error(err));
            if (response.success && !response.data.empty) {
                setCategories(response.data);
            }
        } else {
            alert('로그인을 해주세요');
            location.href = '/login';
        }
    };

    useEffect(() => {
        getCategoriesData();
    }, []);

    return (
        <div className='flex flex-col justify-center items-center'>
            <h2 className='text-3xl font-bold mt-10'>카테고리를 선택하세요</h2>
            <div className='w-full flex flex-wrap justify-center items-center mt-20'>
                {categories.map((category) => (
                    <Link
                        to={`/admin/menu/${category.categoryIdx}`}
                        key={category.categoryIdx}
                        className={`w-48 px-3 py-6 border-4 border-slate-300 rounded-md mx-3 my-5 hover:bg-slate-300`}
                    >
                        <p className='text-2xl font-semibold text-center'>
                            {category.categoryTitle}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
export default AdminMenu;