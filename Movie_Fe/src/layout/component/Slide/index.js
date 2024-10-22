import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay } from 'swiper';
import { useEffect, useState } from 'react';
// import requestApi from '~/apiService';
import SlideItems from './SlideItems';
import 'swiper/css';
import { getMovieByCategory } from '~/apiService/movie';

import styles from './Slide.module.scss';
import classNames from 'classnames/bind';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const cs = classNames.bind(styles);

function SlideShow({ category }) {
    const [movieItems, setMovieItems] = useState([]);
    const [loading, setLoading] = useState(true);
    function getMultipleRandom(arr, num) {
        const shuffled = arr.sort(() => 0.5 - Math.random());

        return shuffled.slice(0, num);
    }
    SwiperCore.use([Autoplay]);
    useEffect(
        function () {
            async function fetchMovie() {
                const result = await getMovieByCategory(category);
                setMovieItems(getMultipleRandom(result.results, 5));
                setLoading(false);
                // const result = await requestApi.getTypeTV('popular', { params: { page: 1 } });
                //     setMovieItems(getMultipleRandom(result.data, 5));
                //     setLoading(false);
            }
            fetchMovie();
        },

        [category],
    );
    return (
        <div className={cs('wrapper')}>
            <Swiper
                // modules={[Autoplay]}
                grabCursor={true}
                spaceBetween={0}
                loop={true}
                slidesPerView={1}
                autoplay={{ delay: 3000 }}
            >
                {loading ? (
                    <Skeleton className={cs('skeletonItem')} />
                ) : (
                    movieItems.map((item, index) => (
                        <SwiperSlide key={index}>
                            <SlideItems category={category} item={item} />
                        </SwiperSlide>
                    ))
                )}
            </Swiper>
        </div>
    );
}

export default SlideShow;
