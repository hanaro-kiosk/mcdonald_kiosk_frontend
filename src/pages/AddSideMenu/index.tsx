import { FC, useEffect, useState } from 'react';
import SideMenuItem, { Menu } from './component/SideMenuItem';

const AddSideMenu: FC = () => {
    const [menus, setMenus] = useState<Menu[]>();

    useEffect(() => {
        setMenus([
            {
                id: 1,
                name: '1',
                price: 2000,
                src: './public/assets/dessert&side/dessert1.png',
                calory: 59,
            },
            {
                id: 1,
                name: '1',
                price: 2000,
                src: './public/assets/dessert&side/dessert1.png',
                calory: 59,
            },
            {
                id: 1,
                name: '1',
                price: 2000,
                src: './public/assets/dessert&side/dessert1.png',
                calory: 59,
            },
            {
                id: 1,
                name: '1',
                price: 2000,
                src: './public/assets/dessert&side/dessert1.png',
                calory: 59,
            },
            {
                id: 1,
                name: '1',
                price: 2000,
                src: './public/assets/dessert&side/dessert1.png',
                calory: 59,
            },
            {
                id: 1,
                name: '아이스크림 콘',
                price: 2000,
                src: './public/assets/dessert&side/dessert1.png',
                calory: 59,
            },
        ]);
    }, []);

    return (
        <div className='grid grid-cols-3 gap-4'>
            {menus?.map((menu) => <SideMenuItem key={menu.id} menu={menu} />)}

            <div>
                <button>취소</button>
                <button>완료</button>
            </div>
        </div>
    );
};

export default AddSideMenu;
