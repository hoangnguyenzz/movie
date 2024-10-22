import SlideShow from '~/layout/component/Slide';
import ListMovie from '~/layout/component/ListMovie';
import { movieType, tvType } from '~/apiService';
import { useEffect } from 'react';
import {useNavigate, Link, useParams } from 'react-router-dom';
import styles from './category.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

const cs = classNames.bind(styles);

function Category() {
    const { category } = useParams();

    const navigate = useNavigate(); 

    if (category === 'movie') {
        var categoryType = movieType;
    } else {
        categoryType = tvType;
    }
    useEffect(() => {
        if (!category) {
            navigate('/movie');
        }
    }, [category, navigate]);
    return (
        <div className={cs('wrapper')}>
            <SlideShow category={category} />

            <div className={cs('content')}>
                
                {categoryType.map(function (type, index) { 
                    return (
                        <div className={cs('section')} key={index}>
                            <div className={cs('header')}>
                                <h4 className={cs('title')}>
                                    {type === 'upcoming'
                                        ? 'Phim Mới'
                                        : type === 'top_rated'
                                        ? 'Đánh Giá Cao'
                                        : 'Phổ Biến'}
                                </h4>
                                <Link className={cs('seemore')} to={`/${category ?? 'tv'}/mores/${type}`}>
                                    <p className={cs('more')}>Xem tất cả</p>
                                    <FontAwesomeIcon className={cs('icon')} icon={faChevronRight} />
                                </Link>
                            </div>
                            <ListMovie category={category} type={type} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Category;
