/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './GridType.module.scss';
import classNames from 'classnames/bind';

import requestApi from '~/apiService';
import MovieItem from '~/layout/component/MovieItem';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const cs = classNames.bind(styles);

function GridType() {
    const user = JSON.parse(localStorage.getItem('user'));
    const { category, type, name, id } = useParams();
    const [lists, setLists] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function getList() {
            let result = null;
            setLoading(true);

            switch (category) {
                case 'movie':
                    result = await requestApi.getTypeMovie(type, { params: {} });
                    break;
                case 'tv':
                    result = await requestApi.getTypeTV(type, { params: {} });
                    break;
                case 'favorite':
                    result = await requestApi.getFavoritesList(user.id);
                    result.data = result.data.map((data) => data.movieId);
                    break;
                case 'history':
                    result = await requestApi.getHistoryList(user.id);
                    result.data = result.data.map((data) => data.movieId);

                    break;
                case 'search':
                    result = await requestApi.getSearch({ params: { keyword: type } });
                    break;
                default:
                    result = await requestApi.getGenresMovie(id);
            }
            setLists(result.data);
            setLoading(false);
        }
        getList();
    }, [category, type, id]);

    return (
        <div className={cs('wrapper')}>
            {category !== 'search' ? (
                <h4 className={cs('title')}>
                    {type === 'upcoming'
                        ? 'Phim Mới'
                        : type === 'top_rated'
                        ? 'Đánh Giá Cao'
                        : type === 'popular'
                        ? 'Phổ Biến'
                        : type === 'favorite'
                        ? 'Danh sách yêu thích'
                        : type === 'history'
                        ? 'Xem gần đây'
                        : name}
                </h4>
            ) : (
                <h4 className={cs('title')}>{`Kết quả của '${type}'`}</h4>
            )}
            {loading ? (
                <div className={cs('wrapiconload')}>
                    <FontAwesomeIcon className={cs('iconLoading')} icon={faSpinner} />
                </div>
            ) : (
                <>
                    <div className={cs('movieList')}>
                        {lists.map((list, index) => (
                            <MovieItem key={index} category={list.category} list={list} className={cs('movieItem')} />
                        ))}
                    </div>
                    <h4 className={cs('noMore')}>Đã hết kết quả</h4>
                </>
            )}
        </div>
    );
}

export default GridType;
