/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './Detail.module.scss';
import classNames from 'classnames/bind';

import { getMovieById } from '~/apiService/movie';
import requestApi from '~/apiService';
import { Img } from '~/apiService/instance';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle, faSpinner } from '@fortawesome/free-solid-svg-icons';
import InforDetail from '~/layout/component/InforDetail';
const cs = classNames.bind(styles);

function Detail() {
    const { id , category } = useParams();
    const [movieDetail, setMovieDetail] = useState([]);
    const [loading, setLoading] = useState(true);
    const [width, setWidth] = useState(window.innerWidth);
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        async function getDeTailMovie() {
            const result = await getMovieById(id);
            setMovieDetail(result.results);
            setLoading(false);
        }
        getDeTailMovie();
    }, [id]);

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className={cs('wrapper')}>
            {loading ? (
                <div className={cs('wrapiconload')}>
                    <FontAwesomeIcon className={cs('iconLoading')} icon={faSpinner} />
                </div>
            ) : (
                <>
                    <div
                        className={cs('backgroudImg')}
                        style={{
                            backgroundImage: `url("${Img.baseImg('http://localhost:8080/images/'+movieDetail.backdrop_path)}")`,
                        }}
                    >
                        {width > 740 && (
                            <Link
                                to={`/${movieDetail.category || category}/watch/${movieDetail.id}`}
                                className={cs('playBtn')}
                            >
                                <FontAwesomeIcon className={cs('icon')} icon={faPlayCircle} />
                                <span>Xem Ngay</span>
                            </Link>
                        )}
                    </div>
                    <InforDetail width={width} movieDetail={movieDetail} />
                </>
            )}
        </div>
    );
}

export default Detail;

// {id && (
//     // eslint-disable-next-line jsx-a11y/iframe-has-title
//     <iframe
//         className={cs('videofilm')}
//         src={`https://www.2embed.to/embed/tmdb/movie?id=${id ?? 1}`}
//         width="100%"
//         height="500px"
//         allowFullScreen
//         frameBorder="0"
//     ></iframe>
// )}
