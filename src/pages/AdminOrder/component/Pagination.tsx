import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
}) => {
    return (
        <div className='flex items-center justify-center mt-8'>
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 0}
                className='px-4 py-2 font-bold text-white bg-blue-500 rounded-l hover:bg-blue-700 focus:outline-none'
            >
                이전
            </button>
            <span className='px-4 py-2 font-bold text-white bg-yellow-400'>
                {currentPage + 1}
            </span>
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className='px-4 py-2 font-bold text-white bg-blue-500 rounded-r hover:bg-blue-700 focus:outline-none'
            >
                다음
            </button>
        </div>
    );
};

export default Pagination;
