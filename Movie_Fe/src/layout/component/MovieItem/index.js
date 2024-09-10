import { Img } from '~/apiService/instance';
import { Link } from 'react-router-dom';
import styles from './MovieItem.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import LazyLoad from 'react-lazy-load';

const cs = classNames.bind(styles);

function MovieItem({ category, list, className }) {
    return (
        <Link to={`/${category ?? 'tv'}/${list.slug}`} className={cs('card', className)}>
            <LazyLoad threshold={0.8}>
                <img src={`http://localhost:8080/images/${list.backdrop_path}`} style={{width : '100%'}} alt="" />
            </LazyLoad>
            <div className={cs('rate')}>
                <span>{list.ibmPoints}</span>
                <FontAwesomeIcon className={cs('icon')} icon={faStar} />
            </div>
            <p>{list.title || list.name}</p>
        </Link>
    );
}

export default MovieItem;
