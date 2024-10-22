/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/iframe-has-title */
import styles from './WatchMovie.module.scss';
import classNames from 'classnames/bind';
import { useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import requestApi from '~/apiService';
import { getMovieById } from '~/apiService/movie';
// import Season from './Season';
import Episode from './Episode';
import { Img } from '~/apiService/instance';
import SimilarMovie from '~/layout/component/SimilarMovie';
import { addHistoryMovie } from '~/apiService/user';
import { getMulti } from '~/apiService/genres';
import Comment from '~/layout/component/Comments';
import { updateView } from '~/apiService/movie';
import Skeleton from 'react-loading-skeleton';

const cs = classNames.bind(styles);

function WatchMovie() {
    const user = JSON.parse(localStorage.getItem('user'));
    const { category, id, slug } = useParams();
    const [searchParams] = useSearchParams();
    const [genres, setGenres] = useState([]);
    const [movieDetail, setMovieDetail] = useState([]);
    const [loading, setLoading] = useState(true);

    let src = `https://www.2embed.to/embed/tmdb/${category}?id=${id}`;
    if (category === 'tv') {
        src += `&s=${movieDetail?.seasons ?? 1}&e=${searchParams.get('episode') ?? 1}`;
    }

    useEffect(() => {
        async function getDeTailMovie() {
            try {
               
                    const result = await getMovieById(id);
                    setMovieDetail(result.results);
                //const dataGenres = await getMulti(result.data.slug);
                setGenres(result.results.genres);
                
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        }
        getDeTailMovie();
    }, []);

    useEffect(() => {
        const handleAddView = async () => {
            try {
                await updateView(slug);
            } catch (error) {
                console.log(error);
            }
        };

        const index = setTimeout(() => {
            handleAddView();
        }, 10000);

        return () => clearTimeout(index);
    }, []);

    useEffect(() => {
        if (user && movieDetail) {
            const handleAddHistory = async () => {
                try {
                    await addHistoryMovie(movieDetail.id, user.id);
                } catch (error) {
                    console.log(error);
                }
            };

            const index = setTimeout(() => {
                handleAddHistory();
            }, 10000);

            return () => clearTimeout(index);
        }
    }, [movieDetail, slug]);

    return (
        <div className={cs('wrapper')}>
            <iframe
                className={cs('videofilm')}
                src={src}
                width="100%"
                height="550px"
                allowFullScreen
                // frameBorder="0"
            ></iframe>
            {movieDetail && (
                <>
                    <div className={cs('InforDetail')}>
                        {loading ? (
                            <Skeleton className={cs('poster')} style={{ width: '200px' }} />
                        ) : (
                            <img
                                src={'http://localhost:8080/images/'+movieDetail.poster_path ||'http://localhost:8080/images/'+ movieDetail.backdrop_path}
                                className={cs('poster')}
                                alt=""
                            ></img>
                        )}
                        {loading ? (
                            <div className={cs('content')}>
                                <Skeleton className={cs('title')} />
                                <div className={cs('genres')}>
                                    <Skeleton className={cs('genres-item')}   style={{ width: '100px'}}/>
                                </div>
                                <div className={cs('rate')}>
                                    <FontAwesomeIcon className={cs('icon')} icon={faStar} />
                                    {movieDetail.ibmPoints}
                                </div>
                                <div className={cs('summary')}>
                                    <h4>Tóm tắt</h4>
                                    <Skeleton className={cs('overview')} style={{ width: '900px',height:'70px' }} />
                                </div>
                            </div>
                        ) : (
                            <div className={cs('content')}>
                                <h2 className={cs('title')}>{movieDetail.name} </h2>
                                <div className={cs('genres')}>
                                    {genres.map((genre, index) => {
                                        return (
                                            <span className={cs('genres-item')} key={index}>
                                                {genre.name}
                                            </span>
                                        );
                                    })}
                                </div>
                                <div className={cs('rate')}>
                                    <FontAwesomeIcon className={cs('icon')} icon={faStar} />
                                    {movieDetail.ibmPoints}
                                </div>
                                <div className={cs('summary')}>
                                    <h4>Tóm tắt</h4>
                                    <p className={cs('overview')}>{movieDetail.overView}</p>
                                </div>
                            </div>
                        )}
                    </div>
                    {category === 'tv' && (
                        <>
                            {/* <h4 className={cs('titleTv')}>Season</h4>
                            <div className={cs('allSeaon')}>
                                {movieDetail.seasons
                                    .filter((season) => season.season_number !== 0 && season.episode_count > 0)
                                    .map((season, index) => (
                                        <Season key={index} season={season} />
                                    ))}
                            </div> */}
                            <h4 className={cs('titleTv')}>Tập</h4>
                            <Episode movieDetail={movieDetail} />
                        </>
                    )}

                    <div className={cs('Similar')}>
                        <h4 className={cs('titleOverview')}>Đề xuất</h4>
                        <SimilarMovie category={category} slug={movieDetail.slug} />
                    </div>

                    <div>
                        <Comment MovieId={movieDetail.id} />
                    </div>
                </>
            )}
        </div>
    );
}

export default WatchMovie;
