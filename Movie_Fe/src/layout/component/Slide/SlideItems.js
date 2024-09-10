import { Img } from '~/apiService/instance';

import styles from './Slide.module.scss';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';

const cs = classNames.bind(styles);

function SlideItems({ category, item }) {
    const Navigate = useNavigate();

    return (
        <div className={cs('slideitem')} style={{backgroundImage: `url('http://localhost:8080/images/${item.backdrop_path}')`
    }}>
            <div className={cs('content')}>
                <h2 className={cs('title')}>{item.title || item.name}</h2>
                <div className={cs('overview')}>{item.overview}</div>
                <button className={cs('watchbtn')} onClick={() => Navigate(`/${category ?? 'tv'}/${item.slug}`)}>
                    Xem ngay
                </button>
            </div>
        </div>
    );
}

export default SlideItems;
