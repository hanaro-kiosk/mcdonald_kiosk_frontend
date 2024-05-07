interface User {
    userIdx: number;
    userId: string;
    userPw: string;
    userName: string;
    userRole: string;
    userPoint: number;
    userCreateDate: string;
    userUpdateDate: string | null;
    isDeleted: boolean;
}
