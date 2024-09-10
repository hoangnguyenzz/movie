/* eslint-disable eqeqeq */
import { Link, useLocation, useSearchParams } from 'react-router-dom';

import styles from './WatchMovie.module.scss';
import classNames from 'classnames/bind';
const cs = classNames.bind(styles);

function Season({ season }) {
    const { pathname } = useLocation();
    const [searchParams] = useSearchParams();

    const s = searchParams.get('s') ?? 1;

    return (
        <>
            <Link
                to={`${pathname}?s=${season.season_number}&e=${1}`}
                className={cs('season', { active: s == season.season_number })}
            >
                {season.season_number}
            </Link>
        </>
    );
}

export default Season;
