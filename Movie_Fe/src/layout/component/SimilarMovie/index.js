import { useEffect, useState } from 'react';
import styles from './Similar.module.scss';
import classNames from 'classnames/bind';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Img } from '~/apiService/instance';
import Skeleton from 'react-loading-skeleton';
import { getMovieByCategory } from '~/apiService/movie'; 

const cs = classNames.bind(styles);

function SimilarMovie({ category, slug }) {
    const [similar, setSimilar] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getCast() {
            const result = await getMovieByCategory(category);
            setSimilar(result.results);
            setLoading(false);
        }
        getCast();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [slug]);
    return (
        <div className={cs('wrapper')}>
            <Swiper grabCursor spaceBetween={10} slidesPerView={'auto'}>
                {loading
                    ? Array(5)
                          .fill(7)
                          .map((v, i) => (
                              <SwiperSlide key={i} className={cs('swiperItem', 'swiperItem-ske')}>
                                  <Skeleton className={cs('movieImg')} />
                              </SwiperSlide>
                          ))
                    : similar.map((list, index) => (
                          <SwiperSlide key={index} className={cs('swiperItem')}>
                              <a href={`/detail/${list.id}`}>
                                  <img className={cs('movieImg')} src={'http://localhost:8080/images/'+list.backdrop_path} alt="" />
                                  <span>{list.name}</span>
                              </a>
                          </SwiperSlide>
                      ))}
            </Swiper>
        </div>
    );
}

export default SimilarMovie;
