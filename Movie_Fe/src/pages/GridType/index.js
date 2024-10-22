/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './GridType.module.scss';
import classNames from 'classnames/bind';

import requestApi from '~/apiService';
import MovieItem from '~/layout/component/MovieItem';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getMovieByGenre,getTypeMovie ,getAllMovieById } from '~/apiService/movie';


const cs = classNames.bind(styles);

function GridType() {
    const user = JSON.parse(localStorage.getItem('user'));
    const id1 = JSON.parse(localStorage.getItem('id'));
    const { category, type, name, id } = useParams();
    const [lists, setLists] = useState([]);
    const [loading, setLoading] = useState(false);


   

    useEffect(() => {
        async function getList() {
            let result = null;
            setLoading(true);

            try{ 
           switch (category) {
                case 'movie':
                    result = await getTypeMovie(category,type);
                    break;
                case 'tv':
                    result = await getTypeMovie(category,type);
                    break;
                case 'favorite':
                  const  result1 = await requestApi.getFavoritesList(id1,user);
                    result = await getAllMovieById(user,result1.results);
                    console.log("check result lan 1 :"+result.results)
                    break;
                // case 'history':
                //     result = await requestApi.getHistoryList(user.id);
                //     result.data = result.data.map((data) => data.movieId);

                //     break;
                case 'search':
                    result = await requestApi.getSearch(type);
                    //result = await requestApi.getSearch(debouncedValue);
                    break;
                default:
                    result = await getMovieByGenre(id);
            }
            
            setLists(result.results);
            setLoading(false);
            } catch(error){
             
            }
        }
        getList();
    }, [category, type, id]);
    console.log("check result lan 2 :" +lists)
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
                            

                            

                            <MovieItem key={index} category={category} list={list} className={cs('movieItem')} />
                        ))}
                    </div>
                    <h4 className={cs('noMore')}>Đã hết kết quả</h4>
                </>
            )}
        </div>
    );
}

export default GridType;
