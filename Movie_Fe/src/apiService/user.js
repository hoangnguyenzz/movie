import instance from './instance';

export const getAll = (token) => {
    const url = '/users';
    return instance.get(url,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
};

export const getInfo = (token) => {
    const url = '/users/info';
    return instance.get(url,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
};

export const updatePasswordSubname = (id,token,data) => {
    const url = '/users/update-password-subname/'+id;
    return instance.put(url,data,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
};

export const updateAvatar = (id,token,image) => {
    const url = '/users/updateAvatar/'+id;
    const formData = new FormData();
    formData.append('image', image);
    return instance.put(url,formData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        });
};

export const getUserById = (id,token) => {
    const url = '/users/'+id;
    return instance.get(url,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
};















export const getAllCount = () => {
    const url = '/user/get-user-all-year';
    return instance.get(url);
};

export const getDetail = (email) => {
    const url = '/user/get-detail/' + email;
    return instance.get(url);
};

export const getFavoritesMovies = (id,token) => {
    const url = '/favorite/check/' + id;
    return instance.get(url,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        } 
    );
};


export const updateUser = (data, id, token) => {
    const url = '/users/' + id;
    
    // Tạo FormData object để gửi dữ liệu multipart
    const formData = new FormData();
    
    // Thêm các trường dữ liệu khác vào FormData
    formData.append('subName', data.subName);
    formData.append('isAdmin', data.isAdmin);
    
    // Nếu có file avatar, thêm vào FormData
    if (data.avatar) {
        formData.append('avatar', data.avatar); // 'avatar' phải khớp với tên tham số trong controller
    }
    
    return instance.put(url, formData, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
        },
    });
};


export const deleteUserClient = (data) => {
    const url = '/user/delete-user-client';
    return instance.put(url, data);
};

export const changePassword = (data) => {
    const url = '/user/change-password';
    return instance.put(url, data);
};

export const deleteUser = (id,token) => {
    const url = '/users/' + id;
    return instance.delete(url,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
};

export const editUser = (data, userEmail) => {
    const url = '/user/edit-user/' + userEmail;
    return instance.put(url, data);
};

export const addFavouriteMovie = (user, movie,token) => {
    const url = `/favorite`;
    return instance.post(url, { user, movie },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
};

export const deleteFavouriteMovie = (data,token) => {
    const url = `/favorite?movieId=${data.movieId}&userId=${data.userId}`;
    
    return instance.delete(url, 
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
};

export const addHistoryMovie = (movieId, userId) => {
    const url = `/user/add-history`;
    return instance.post(url, { movieId, userId });
};
