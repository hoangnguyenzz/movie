import instance from './instance';

export const getCommentByMovie = (id,token) => {
    const url = '/comment/getbymovie/' + id;
    return instance.get(url,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
};

export const getCountCommentMonth = () => {
    const url = '/comment/get-count-comment-month';
    return instance.get(url);
};

export const getCommentMonth = () => {
    const url = '/comment/get-comment-month';
    return instance.get(url);
};

export const getCountComments = (id) => {
    const url = '/comment/get-count-comment/' + id;
    return instance.get(url);
};

export const postComment = (data,token) => {
    const url = '/comment';
    return instance.post(url, data,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
};

export const updateComment = (id,data,token) => {
    const url = '/comment/' + id;
    return instance.put(url,data,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
};

export const deleteComment = (id,token) => {
    const url = '/comment/' + id;
    return instance.delete(url,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
};
