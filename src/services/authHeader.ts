export default function authHeader(): Record<string, string> {
    const userStr = localStorage.getItem('user');
    if (userStr) {
        const user = JSON.parse(userStr);
        if (user.token) {
            return { Authorization: 'Bearer ' + user.token };
        }
    }
    return { Authorization: '' };
}
