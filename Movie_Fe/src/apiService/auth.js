import instance from "./instance";

export const register = (data) => {
    const url = '/users';
    return instance.post(url, data);
}

export const login = (data) => {
    const url = '/auth/login';
    return instance.post(url, data);
}