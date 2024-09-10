import instance from './instance';

export const getCountMovieMonth = () => {
    const url = '/get-count-movie-month';
    return instance.get(url);
};
export const getAllMovie = (currPage,token) => {
    const url = `/movie?page=${currPage}`;
    return instance.get(url,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
};
export const getTotalView = () => {
    const url = '/get-total-view';
    return instance.get(url);
};
export const createMovie = (data,token) => {
    const url = '/movie';
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('trailerCode', data.trailerCode);
    formData.append('category', data.category);
    
    

    
    formData.append('genres', data.genres);
    formData.append('country', data.country);
    formData.append('url', data.url);

    formData.append('overView', data.overView);
    formData.append('releaseDate', data.releaseDate);
    formData.append('ibmPoints', data.ibmPoints);
    formData.append('poster_path', data.poster_path);
    formData.append('backdrop_path', data.backdrop_path);
    if(data.episodeCount!==null){
        formData.append('episodeCount', data.episodeCount);
    }
    if(data.seasons){
        formData.append('seasons', data.seasons);
    }
    
    return instance.post(url, formData, 
        {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            }
        }
    );
};

export const editMovie = (data, id,token) => {
    const url = '/movie/' + id;

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('trailerCode', data.trailerCode);
    formData.append('category', data.category);
    
    

    
    formData.append('genres', data.genres);
    formData.append('country', data.country);
    formData.append('url', data.url);

    formData.append('overView', data.overView);
    formData.append('releaseDate', data.releaseDate);
    formData.append('ibmPoints', data.ibmPoints);
    formData.append('poster_path', data.poster_path);
    formData.append('backdrop_path', data.backdrop_path);
    if(data.episodeCount!==null){
        formData.append('episodeCount', data.episodeCount);
    }
    if(data.seasons){
        formData.append('seasons', data.seasons);
    }
    return instance.put(url, formData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            }
        }
    );
};

export const updateView = (slug) => {
    const url = '/update-viewed/' + slug;
    return instance.put(url);
};

export const deleteMovie = (id,token) => {
    const url = '/movie/' + id;
    return instance.delete(url,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
};

export const getMovieById = (id , token ) => {
    const url = '/movie/'+id ;
    return instance.get(url , 
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        } 
    )
}

export const searchMovie = (keyword , currPage , token) => {
    const url = `/movie/search?keyword=${keyword}&page=${currPage}`;

    return instance.get(url,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        } 
    )
}

export const getMovieByCategory = (category, token) => {
    const url = `/movie/category/${category}`;
    return instance.get(url, 
        {
                headers: {
                    Authorization: `Bearer ${token}`
                }
        }
    )
}

// export const getTypeMovie = (category, type, token) => {
//     const url = `/movie/type/${category}`;
//     const formData = new FormData();
//     formData.append('type', type);
//     return instance.get(url, formData,
//         {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//                 'Content-Type': 'multipart/form-data',
//             }
//         }
//     );
// }

export const getTypeMovie = (category, type, token) => {
    // Thay đổi URL để gửi 'type' qua query parameters
    const url = `/movie/type/${category}?type=${encodeURIComponent(type)}`;
    
    // Gửi yêu cầu GET với header Authorization
    return instance.get(url, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
};
