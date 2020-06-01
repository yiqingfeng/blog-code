import request from './request';

interface UserInfo {
    name: string;
    [propName: string]: any;
}

export function getUserName(userId: string | number) {
    return request('/users/' + userId)
        .then((user: UserInfo) => user.name);
}
