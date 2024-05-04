interface CategoryItem {
    img: string;
    name: string;
    onClick: () => void;
}

function CategoryItem({ img, name, onClick }: CategoryItem) {
    return (
        <button
            onClick={onClick}
            className='w-full h-1/5 border border-1 rounded-lg mb-0.5 bg-white drop-shadow-2xl'
        >
            <div className='w-20 m-auto'>
                <img src={img} alt={name} className='w-full object-cover' />
            </div>
            <p className='text-base font-semibold text-center'>{name}</p>
        </button>
    );
}
export default CategoryItem;
