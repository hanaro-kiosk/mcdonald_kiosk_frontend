import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
    const [userId, setUserId] = useState('');
    const [userPw, setUserPw] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async () => {
        if (!userId || !userPw) {
            alert('모든 필드를 입력하세요.');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/v1/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: userId,
                    userPw,
                }),
            });
            if (!response.ok) {
                setErrorMessage('사용자가 존재하지 않습니다.'); // 오류 메시지를 설정합니다.
                return; // 오류가 발생했으므로 함수를 종료합니다.
            }
            const data = await response.json();
            // 여기서 data에서 userName과 token을 올바르게 추출하여 localStorage에 저장해야 합니다.
            const { userName, accessToken } = data.data; // 데이터 객체 내부에서 userName과 accessToken을 추출합니다.
            localStorage.setItem('token', accessToken); // 토큰을 localStorage에 저장합니다.
            localStorage.setItem('userName', userName); // 사용자 이름을 localStorage에 저장합니다.
            console.log('로그인 성공');
        } catch (error: any) {
            alert('로그인에 실패했습니다');
            console.error(error);
        }
    };

    // const handleGuestLogin = async () => {
    //     try {
    //         const response = await fetch(
    //             'http://localhost:8080/api/v1/guestLogin',
    //             {
    //                 method: 'POST',
    //             }
    //         );
    //         if (!response.ok) {
    //             throw new Error('비회원 로그인에 실패했습니다');
    //         }
    //         const data = await response.json();
    //         // 임시 비회원 계정 정보를 받아옵니다.
    //         const { guestUserId, guestUserPw } = data.data;

    //         // 받아온 임시 계정 정보로 실제 로그인을 수행합니다.
    //         setUserId(guestUserId);
    //         setUserPw(guestUserPw);
    //         handleLogin(); // 로그인 함수 호출
    //     } catch (error: any) {
    //         alert('로그인에 실패했습니다');
    //         console.error(error);
    //     }
    // };

    const handleGuestLogin = async () => {
        try {
            const response = await fetch(
                'http://localhost:8080/api/v1/guestLogin',
                {
                    method: 'POST',
                }
            );
            if (!response.ok) {
                throw new Error('비회원 로그인에 실패했습니다');
            }
            const data = await response.json();

            // 비회원 로그인 응답에서 받은 guestId와 guestPassword를 로컬 스토리지에 저장
            localStorage.setItem('guestId', data.data.guestId);
            localStorage.setItem('guestPassword', data.data.guestPassword);

            console.log('비회원 로그인 성공');
        } catch (error: any) {
            alert('로그인에 실패했습니다');
            console.error(error);
        }
    };

    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='bg-emerald-100 p-8 rounded-lg shadow-md'>
                <div className='mb-8 text-center'>
                    <img
                        src='/assets/Mcdonald_Logo.png'
                        alt="McDonald's Logo"
                        className='w-32 h-32 mx-auto'
                    />
                </div>
                <h2 className='mb-4 text-2xl font-semibold text-gray-800 text-center'>
                    로그인
                </h2>
                <div className='mb-4'>
                    <input
                        type='text'
                        placeholder='아이디'
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        className='input-field rounded-md px-4 py-2 mb-2 mt-5 block mx-auto border border-gray-300 focus:outline-none focus:ring focus:ring-blue-400'
                    />
                </div>
                <div className='mb-4'>
                    <input
                        type='password'
                        placeholder='비밀번호'
                        value={userPw}
                        onChange={(e) => setUserPw(e.target.value)}
                        className='input-field rounded-md px-4 py-2 mb-2 block mx-auto border border-gray-300 focus:outline-none focus:ring focus:ring-blue-400'
                    />
                </div>
                <div className='text-center mb-20'>
                    <button
                        onClick={handleLogin}
                        className='bg-blue-600 text-white rounded-md px-4 py-2 mr-2'
                    >
                        로그인
                    </button>
                    <button
                        onClick={handleGuestLogin}
                        className='bg-red-600 text-white rounded-md px-4 py-2'
                    >
                        비회원 로그인
                    </button>
                </div>
                {errorMessage && <div>{errorMessage}</div>}
                <div className='text-center'>
                    <p className='text-sm'>
                        *회원가입 하시면 포인트 적립을 받을 수 있습니다.
                    </p>
                    <Link to='/join'>
                        <button className='bg-gray-400 text-white rounded-md px-4 py-2 mt-4'>
                            회원가입
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
