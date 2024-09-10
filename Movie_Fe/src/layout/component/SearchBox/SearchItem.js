import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { Link } from 'react-router-dom';
import { Img } from '~/apiService/instance';
import Image from '~/components/Images';
const cs = classNames.bind(styles);

function SearchItem({ data, onClick }) {
    return (
        //có gạch chéo ở đầu thì chuyển trực tiếp sang trang đó nếu ko có thì nó sẽ tự nối nó vs cái đường dẫn hiện tại
        <Link to={`/${data.category}/${data.slug}`} className={cs('reslutItem')} onClick={onClick}>
            <Image src={Img.baseImg(data.poster_path || data.poster_path)} className={cs('image')} alt="" />
            <h4 className={cs('name')}>{data.name || data.original_title}</h4>
        </Link>
    );
}

export default SearchItem;
