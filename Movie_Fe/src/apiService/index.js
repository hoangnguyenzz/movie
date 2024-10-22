import instance from './instance';

export const category = {
    movie: 'movie',
    tv: 'tv',
};
export const movieType = ['top_rated', 'popular', 'upcoming'];

export const tvType = ['top_rated', 'popular', 'upcoming'];

const requestApi = {
    getTypeMovie(category, type, token) {
        const url = `/movie/type/${category}`;
        const formData = new FormData();
        formData.append('type', type);
        return instance.get(url, formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            }
        );
    },
    getTypeTV(type, params) {
        const url = `tv/${type}`;
        return instance.get(url, params);
    },
    getSearch(keyword) {
        const url = `/movie/search-movie?keyword=${keyword}`;
        return instance.get(url); //?keyword=
    },
    getDetails(slug) {
        const url = `/get-detail/${slug}`;
        return instance.get(url);
    },
    getAll(currPage, category) {
        const url = `/get-all?page=${currPage}&category=${category}`;
        return instance.get(url);
    },

    getSimilar(slug) {
        const url = `/similar-movies/${slug}`;
        return instance.get(url);
    },

    getFavoritesList(id, token) {
        const url = `/favorite/check/${id}`;
        return instance.get(url,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        );
    },
    getHistoryList(id) {
        const url = `/user/user-history/${id}`;
        return instance.get(url);
    },
    getGenresMovie(id) {
        const url = `/get-by-genres/${id}`;
        return instance.get(url);
    },
};

export default requestApi;
