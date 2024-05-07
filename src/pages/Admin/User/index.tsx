import React, { useState, useEffect } from 'react';
import './Admin.css';

function Admin() {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        fetchUserList();
    }, []);

    // 사용자 목록 가져오는 함수
    const fetchUserList = async () => {
        try {
            const response = await fetch(
                'http://localhost:8080/api/v1/admin/user'
            );
            if (!response.ok) {
                throw new Error('사용자 목록을 가져오는 데 실패했습니다.');
            }
            const data = await response.json();
            setUsers(data.data); // 받아온 사용자 목록을 상태에 저장합니다.
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='admin-container'>
            <h2>사용자 목록</h2>
            <table className='user-table'>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>아이디</th>
                        <th>암호</th>
                        <th>이름</th>
                        <th>권한</th>
                        <th>가입일</th>
                        <th>수정</th>
                        <th>삭제</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{user.userId}</td>
                            <td>{user.userPw}</td>
                            <td>{user.userName}</td>
                            <td>{user.userRole}</td>
                            <td>{user.userCreateDate}</td>
                            <td>
                                <button>수정</button>
                            </td>
                            <td>
                                <button>삭제</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Admin;
