import { Link, useLocation, useSearchParams } from 'react-router-dom';

import styles from './WatchMovie.module.scss';
import classNames from 'classnames/bind';
const cs = classNames.bind(styles);

function Episode({ movieDetail }) {
    const { pathname } = useLocation();


    // const [searchParams] = useSearchParams();

    // const s = searchParams.get('s') ?? 1;
    // if (movieDetail.seasons[0].season_number !== 0 && movieDetail.seasons[0].episode_count > 0) {
    //     var episode = new Array( movieDetail.seasons[s - 1].episode_count).fill(null);
    // } else {
    //     episode = new Array(movieDetail.seasons[s].episode_count).fill(null);
    // }

        const episode = Array(movieDetail.episodes).fill(null);


    return (
        <div className={cs('allEpisode')}>
            {episode.map((item, index) => (
                <Link to={`${pathname}?episode=${index + 1}`} className={cs('episode')} key={index}>
                    {index + 1}
                </Link>
            ))}
        </div>
    );
}

export default Episode;
