import { useEffect, useState } from 'react';
import styles from './Cast.module.scss';
import classNames from 'classnames/bind';

import requestApi from '~/apiService';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Img } from '~/apiService/instance';
import Images from '~/components/Images';

const cs = classNames.bind(styles);

function CastList({ category, id }) {
    const [castList, setCastList] = useState([]);
    useEffect(() => {
        async function getCast() {
            const result = await requestApi.getCast(category, id);
            setCastList(result.cast);
        }
        getCast();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);
    return (
        <div className={cs('wrapper')}>
            <Swiper grabCursor spaceBetween={10} slidesPerView={'auto'}>
                {castList.map((list, index) => (
                    <SwiperSlide key={index} className={cs('swiperItem')}>
                        <Images className={cs('castImg')} src={Img.posterImg(list.profile_path)} alt="" />
                        <span>{list.name || list.original_name}</span>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default CastList;
