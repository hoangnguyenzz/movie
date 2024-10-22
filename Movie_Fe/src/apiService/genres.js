import instance from './instance';

export const getAll = (currPage, limit = null) => {
    let url;
    if (limit) {
        url = `/genre?page=${currPage}&limit=${limit}`;
    } else {
        url = `/genre?page=${currPage}`;
    }
    return instance.get(url);
};

export const getMulti = (slug) => {
    const url = '/genres/get-multi/' + slug;
    return instance.get(url);
};

export const getById = (id,token) => {
    const url = '/genre/' + id;
    return instance.get(url,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
};


export const createGenres = (data,token) => {
    const url = '/genre';
    return instance.post(url, data,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
};



export const editGenres = (data, id,token) => {
    const url = '/genre/' + id;
    return instance.put(url, data,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
};

export const deleteGenres = (id,token) => {
    const url = '/genre/' + id;
    return instance.delete(url,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
};
