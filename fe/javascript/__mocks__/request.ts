/**
 * @description 请求模拟
 */
const users = {
    1: {
        name: 'Alex',
    },
    2: {
        name: 'Jack',
    }
};

export default async function request(url) {
    return new Promise((resolve, reject) => {
        const userId = parseInt(url.substr('/users/'.length));
        process.nextTick(() =>
            users[userId] ?
            resolve(users[userId]) :
            reject({
                error: 'User with ' + userId + ' not found.',
            }),
        );
    });
}
