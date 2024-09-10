import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import image from '~/assets/Images';
import SearchBox from '../SearchBox';
import MenuItems from '../MenuItems';

const cs = classNames.bind(styles);

function Header({ className, onClick }) {
    // eslint-disable-next-line no-unused-vars
    const navigate = useNavigate();
    const userFirebase = JSON.parse(localStorage.getItem('user'));

    return (
        <header className={cs('wrapper', className)}>
            <Link to="/movie" className={cs('logo')}>
                <img className={cs('logo-img')} src={image.logo} alt="logo" />
                <span className={cs('first-titl')}>TwT</span>
                <span className={cs('last-titl')}>Cinema</span>
            </Link>
            <SearchBox />


            <div className={cs('login')}>
                {userFirebase ? (
                    <MenuItems />
                ) : (
                    <button className={cs('btn-login')} onClick={() => navigate('/login')}>
                        Đăng nhập
                    </button>
                )}
            </div>
        </header>
    );
}

export default Header;
