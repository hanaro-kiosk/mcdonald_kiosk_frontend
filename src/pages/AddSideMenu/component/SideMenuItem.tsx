import { FC } from 'react';

export interface Menu {
    id: number;
    name: string;
    price: number;
    src: string;
    calory: number;
}

const SideMenuItem: FC<{ menu: Menu }> = ({ menu }) => {
    return (
        <div className='w-full md:w-1/3'>
            <img src={menu.src} />
            <div className='flex justify-between'>
                <span className='text-left'>{menu.name}</span>
                <span className='text-right'>{menu.calory}cal</span>
            </div>
            <p className='text-right'>{menu.price}원</p>
        </div>
    );
};

export default SideMenuItem;
