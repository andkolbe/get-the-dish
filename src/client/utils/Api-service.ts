export const TOKEN_KEY = 'token';

export default async <T = any>(uri: string , method: string = 'GET', body?: {}) => {

    const token = localStorage.getItem(TOKEN_KEY);

    const headers = new Headers();

    const options: {[ key: string ]: string | Headers} = {
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

        if (res.status === 404) {
            throw new Error('path not found. Check server routes or URI!')
        }

        if (res.status === 401) {
            throw new Error('token is invalid or does not exist')
        }

        if (res.status === 500) {
            throw new Error('my server code sucks :( check terminal!')
        }

        if (res.ok) { 
            return <T>await res.json();
        }

    } catch (error) { 
        console.log(error); 
    }
}

export const setStorage = (token: string) => {
    localStorage.setItem(TOKEN_KEY, token)
}

export const logout = () => localStorage.removeItem(TOKEN_KEY); 
// removeItem will only remove the token and not anything else stored in localStorage
