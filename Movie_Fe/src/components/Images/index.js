import { forwardRef, useState } from 'react';
import image from '~/assets/Images';
import classNames from 'classnames/bind';
import styles from './image.module.scss';
const cx = classNames.bind(styles);

const Image = ({ src, className, alt, altImg = image.logo, ...props }, ref) => {
    //cái onerror kia là khi cái src lỗi thì nó set lại stage cho fallback
    const [fallBack, setFallBack] = useState();
    return (
        <img
            className={cx(className)}
            alt={alt}
            ref={ref}
            src={fallBack || src}
            {...props}
            onError={() => setFallBack(altImg)}
        />
    );
};

export default forwardRef(Image);
