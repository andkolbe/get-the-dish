export const TOKEN_KEY = 'token';

export default async <T = any>(uri: string, method: string = 'GET', body?: {}) => {

    const token = localStorage.getItem(TOKEN_KEY);

    const headers = new Headers();

    const options: { [key: string]: string | Headers } = {
        method,
        headers
    }

    if (method === 'POST' || method === 'PUT') {
        headers.append('Content-Type', 'application/json')
        options.body = JSON.stringify(body);
    }

    if (token) {
        headers.append('Authorization', `Bearer ${token}`)
    }

    try {
        const res = await fetch(uri, options)

        if (!res.ok) {
            // if the response from the server is not ok, parse the response json, and throw the error down
            const serverStatus = await res.json();
            throw new Error(serverStatus.msg);
        }

        if (res.ok) {
            return <T>await res.json();
        }

    } catch (error) { // catch the error from !res.ok and throw it back up to wherever it is on a useEffect
        throw error;
    }
}

export const setStorage = (token: string) => {
    localStorage.setItem(TOKEN_KEY, token)
}

export const logout = () => localStorage.removeItem(TOKEN_KEY);
// removeItem will only remove the token and not anything else stored in localStorage
